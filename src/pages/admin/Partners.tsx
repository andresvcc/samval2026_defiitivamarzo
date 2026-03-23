import React, { useEffect, useState } from 'react';
import { Partner } from '../../data/staticData';
import { Trash2, Edit2, Info, Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../supabase';

const Partners: React.FC = () => {
    const { t } = useTranslation();
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [name, setName] = useState('');
    const [website, setWebsite] = useState('');
    const [logoFile, setLogoFile] = useState<File | null>(null);

    const fetchPartners = async () => {
        try {
            setFetching(true);
            const { data, error } = await supabase
                .from('partners')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPartners(data || []);
        } catch (error) {
            console.error('Error fetching partners:', error);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchPartners();
    }, []);

    const handleCreate = async () => {
        if (!name) return alert('Name is required');
        setLoading(true);

        try {
            let logoUrl = null;
            if (logoFile) {
                const fileExt = logoFile.name.split('.').pop();
                const fileName = `partners/${Date.now()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
                    .from('partners')
                    .upload(fileName, logoFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('partners')
                    .getPublicUrl(fileName);
                logoUrl = publicUrl;
            }

            const { error: insertError } = await supabase
                .from('partners')
                .insert([{
                    name,
                    website_url: website,
                    logo_url: logoUrl
                }]);

            if (insertError) throw insertError;

            await fetchPartners();
            setName('');
            setWebsite('');
            setLogoFile(null);
            alert('Partner added!');
        } catch (error) {
            console.error('Error creating partner:', error);
            alert('Error creating partner');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            const { error } = await supabase
                .from('partners')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setPartners(partners.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting:', error);
            alert('Error deleting partner');
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{t('admin.partners.title')}</h1>
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm border border-blue-100">
                    <Info size={16} />
                    <span>{fetching ? 'Cargando...' : 'Live Mode'}</span>
                </div>
            </div>

            <div className="mb-8 p-4 bg-white rounded-lg shadow-md max-w-lg relative">
                <h3 className="text-lg font-semibold mb-4">{t('admin.partners.add')}</h3>
                <div className="space-y-4">
                    <input type="text" placeholder={t('admin.login.email') || "Name"} value={name} onChange={e => setName(e.target.value)} className="w-full border p-2 rounded" />
                    <input type="text" placeholder="Website URL" value={website} onChange={e => setWebsite(e.target.value)} className="w-full border p-2 rounded" />
                    <div className="flex items-center gap-2">
                        <label className="flex items-center gap-2 cursor-pointer bg-gray-100 px-3 py-2 rounded hover:bg-gray-200">
                            <Upload size={16} />
                            <span className="text-sm">{logoFile ? logoFile.name : 'Upload Logo'}</span>
                            <input type="file" accept="image/*" onChange={e => e.target.files && setLogoFile(e.target.files[0])} className="hidden" />
                        </label>
                    </div>
                    <button onClick={handleCreate} disabled={loading} className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition">
                        {loading ? 'Saving...' : t('admin.partners.add')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fetching ? <div className="col-span-full text-center">Loading...</div> : partners.map((partner) => (
                    <div key={partner.id} className="bg-white p-6 rounded-lg shadow border border-gray-100 flex flex-col items-center">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                            {partner.logo_url ? <img src={partner.logo_url} alt={partner.name} className="w-full h-full object-cover" /> : <span className="text-gray-400 text-2xl font-bold">{partner.name[0]}</span>}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">{partner.name}</h3>
                        <a href={partner.website_url || '#'} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline mt-1">{partner.website_url || 'No website'}</a>

                        <div className="mt-4 flex gap-3">
                            {/* <button className="text-gray-500 hover:text-blue-500" title="Edit"><Edit2 size={18} /></button> */}
                            <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(partner.id)}><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Partners;
