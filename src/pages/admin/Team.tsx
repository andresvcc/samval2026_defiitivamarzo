
import React, { useEffect, useState } from 'react';
import { TeamMember, staticTeamData } from '../../data/staticData';
import { Trash2, UserPlus, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Team: React.FC = () => {
    const { t } = useTranslation();
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [bio, setBio] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Cargar datos estáticos en lugar de fetch a DB
        setTeam(staticTeamData);
    }, []);

    const handleCreate = async () => {
        setLoading(true);
        // Simulación de creación
        alert(t('admin.photos.empty')); // Placeholder for static mode alert
        setLoading(false);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{t('admin.team.title')}</h1>
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm border border-blue-100">
                    <Info size={16} />
                    <span>{t('admin.layout.loading') === 'Cargando...' ? 'Modo Estático Activado' : 'Static Mode Enabled'}</span>
                </div>
            </div>

            <div className="mb-8 bg-white p-6 rounded-lg shadow-md max-w-2xl opacity-75 grayscale-[0.5] pointer-events-none relative">
                <div className="absolute inset-0 z-10 bg-white/50 flex items-center justify-center">
                    <span className="bg-gray-800 text-white px-3 py-1 rounded text-sm font-bold">Demo</span>
                </div>
                <h3 className="text-lg font-semibold mb-4">{t('admin.team.add')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder={t('admin.login.email')} value={name} onChange={e => setName(e.target.value)} className="w-full border p-2 rounded" />
                    <input type="text" placeholder={t('admin.team.role')} value={role} onChange={e => setRole(e.target.value)} className="w-full border p-2 rounded" />
                    <textarea placeholder={t('admin.team.bio')} value={bio} onChange={e => setBio(e.target.value)} className="w-full border p-2 rounded col-span-2" rows={3}></textarea>
                    <button onClick={handleCreate} disabled={loading} className="col-span-2 w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700 transition flex items-center justify-center gap-2">
                        <UserPlus size={18} /> {loading ? t('admin.login.logging_in') : t('admin.team.add')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {team.map((member) => (
                    <div key={member.id} className="bg-white p-6 rounded-lg shadow border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4 overflow-hidden border-4 border-white shadow-sm">
                            {member.photo_url ? <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover" /> : <span className="text-gray-400 text-3xl font-bold">{member.name[0]}</span>}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                        <p className="text-teal-600 font-medium mb-2">{t(`data.team.${member.id}.role`) || member.role}</p>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-3">{t(`data.team.${member.id}.bio`) || member.bio}</p>
                        <button className="mt-auto text-red-500/50 cursor-not-allowed text-sm flex items-center gap-1" onClick={() => alert('Edite src/data/staticData.ts para eliminar')}>
                            <Trash2 size={14} /> {t('admin.photos.delete')}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;
