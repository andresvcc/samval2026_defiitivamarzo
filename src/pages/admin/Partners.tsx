
import React, { useEffect, useState } from 'react';
import { Partner, staticPartnersData } from '../../data/staticData';
import { Trash2, Edit2, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Partners: React.FC = () => {
    const { t } = useTranslation();
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [website, setWebsite] = useState('');

    useEffect(() => {
        // Cargar datos estáticos
        setPartners(staticPartnersData);
    }, []);

    const handleCreate = async () => {
        setLoading(true);
        alert(t('admin.photos.empty')); // Placeholder for static mode alert
        setLoading(false);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{t('admin.partners.title')}</h1>
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm border border-blue-100">
                    <Info size={16} />
                    <span>{t('admin.layout.loading') === 'Cargando...' ? 'Modo Estático Activado' : 'Static Mode Enabled'}</span>
                </div>
            </div>

            <div className="mb-8 p-4 bg-white rounded-lg shadow-md max-w-lg opacity-75 grayscale-[0.5] pointer-events-none relative">
                <div className="absolute inset-0 z-10 bg-white/50 flex items-center justify-center">
                    <span className="bg-gray-800 text-white px-3 py-1 rounded text-sm font-bold">Demo</span>
                </div>
                <h3 className="text-lg font-semibold mb-4">{t('admin.partners.add')}</h3>
                <div className="space-y-4">
                    <input type="text" placeholder={t('admin.login.email')} value={name} onChange={e => setName(e.target.value)} className="w-full border p-2 rounded" />
                    <input type="text" placeholder="Website" value={website} onChange={e => setWebsite(e.target.value)} className="w-full border p-2 rounded" />
                    <button onClick={handleCreate} disabled={loading} className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition">
                        {loading ? t('admin.login.logging_in') : t('admin.partners.add')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {partners.map((partner) => (
                    <div key={partner.id} className="bg-white p-6 rounded-lg shadow border border-gray-100 flex flex-col items-center">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                            {partner.logo_url ? <img src={partner.logo_url} alt={partner.name} className="w-full h-full object-cover" /> : <span className="text-gray-400 text-2xl font-bold">{partner.name[0]}</span>}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">{partner.name}</h3>
                        <a href={partner.website_url || '#'} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline mt-1">{partner.website_url || 'No website'}</a>

                        <div className="mt-4 flex gap-3">
                            <button className="text-gray-500/50 cursor-not-allowed" title="Edición deshabilitada"><Edit2 size={18} /></button>
                            <button className="text-gray-500/50 cursor-not-allowed" onClick={() => alert('Edite src/data/staticData.ts para eliminar')}><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Partners;
