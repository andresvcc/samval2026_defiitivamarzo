import React, { useEffect, useState } from 'react';
import { TeamMember } from '../../data/staticData';
import { Trash2, UserPlus, Info, Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../supabase';

const Team: React.FC = () => {
    const { t } = useTranslation();
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [bio, setBio] = useState('');
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const fetchTeam = async () => {
        try {
            setFetching(true);
            const { data, error } = await supabase
                .from('team_members')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setTeam(data || []);
        } catch (error) {
            console.error('Error fetching team:', error);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    const handleCreate = async () => {
        if (!name || !role) return alert('Name and Role are required');
        setLoading(true);

        try {
            let photoUrl = null;
            if (photoFile) {
                const fileExt = photoFile.name.split('.').pop();
                const fileName = `team/${Date.now()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
                    .from('team')
                    .upload(fileName, photoFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('team')
                    .getPublicUrl(fileName);
                photoUrl = publicUrl;
            }

            const { error: insertError } = await supabase
                .from('team_members')
                .insert([{
                    name,
                    role,
                    bio,
                    photo_url: photoUrl
                }]);

            if (insertError) throw insertError;

            await fetchTeam();
            setName('');
            setRole('');
            setBio('');
            setPhotoFile(null);
            alert('Team member added!');
        } catch (error) {
            console.error('Error creating team member:', error);
            alert('Error creating team member');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            const { error } = await supabase
                .from('team_members')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setTeam(team.filter(t => t.id !== id));
        } catch (error) {
            console.error('Error deleting:', error);
            alert('Error deleting team member');
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{t('admin.team.title')}</h1>
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm border border-blue-100">
                    <Info size={16} />
                    <span>{fetching ? 'Cargando...' : 'Live Mode'}</span>
                </div>
            </div>

            <div className="mb-8 bg-white p-6 rounded-lg shadow-md max-w-2xl relative">
                <h3 className="text-lg font-semibold mb-4">{t('admin.team.add')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder={t('admin.login.email') || "Name"} value={name} onChange={e => setName(e.target.value)} className="w-full border p-2 rounded" />
                    <input type="text" placeholder={t('admin.team.role')} value={role} onChange={e => setRole(e.target.value)} className="w-full border p-2 rounded" />
                    <textarea placeholder={t('admin.team.bio')} value={bio} onChange={e => setBio(e.target.value)} className="w-full border p-2 rounded col-span-2" rows={3}></textarea>

                    <div className="col-span-2">
                        <label className="flex items-center gap-2 cursor-pointer bg-gray-100 px-3 py-2 rounded hover:bg-gray-200 w-full justify-center">
                            <Upload size={16} />
                            <span className="text-sm">{photoFile ? photoFile.name : 'Upload Photo'}</span>
                            <input type="file" accept="image/*" onChange={e => e.target.files && setPhotoFile(e.target.files[0])} className="hidden" />
                        </label>
                    </div>

                    <button onClick={handleCreate} disabled={loading} className="col-span-2 w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700 transition flex items-center justify-center gap-2">
                        <UserPlus size={18} /> {loading ? 'Saving...' : t('admin.team.add')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {fetching ? <div className="col-span-full text-center">Loading...</div> : team.map((member) => (
                    <div key={member.id} className="bg-white p-6 rounded-lg shadow border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4 overflow-hidden border-4 border-white shadow-sm">
                            {member.photo_url ? <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover" /> : <span className="text-gray-400 text-3xl font-bold">{member.name[0]}</span>}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                        <p className="text-teal-600 font-medium mb-2">{t(`data.team.${member.id}.role`) || member.role}</p>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-3">{t(`data.team.${member.id}.bio`) || member.bio}</p>
                        <button className="mt-auto text-red-500 hover:text-red-700 text-sm flex items-center gap-1" onClick={() => handleDelete(member.id)}>
                            <Trash2 size={14} /> {t('admin.photos.delete')}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;
