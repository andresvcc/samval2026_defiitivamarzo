
import React, { useEffect, useState } from 'react';
import { FinancialStatement, staticFinancialsData } from '../../data/staticData';
import { Trash2, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Financials: React.FC = () => {
    const { t } = useTranslation();
    const [financials, setFinancials] = useState<FinancialStatement[]>([]);
    const [uploading, setUploading] = useState(false);
    const [year, setYear] = useState(new Date().getFullYear());
    const [title, setTitle] = useState(t('admin.financials.title') + ' ' + new Date().getFullYear());

    useEffect(() => {
        // Cargar datos estáticos
        setFinancials(staticFinancialsData);
    }, []);

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        alert(t('admin.photos.empty')); // Placeholder for static mode alert
        setUploading(false);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{t('admin.financials.title')}</h1>
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm border border-blue-100">
                    <Info size={16} />
                    <span>{t('admin.layout.loading') === 'Cargando...' ? 'Modo Estático Activado' : 'Static Mode Enabled'}</span>
                </div>
            </div>

            <form onSubmit={handleUpload} className="bg-white p-6 rounded-lg shadow-md mb-8 space-y-4 max-w-lg opacity-75 grayscale-[0.5] pointer-events-none relative">
                <div className="absolute inset-0 z-10 bg-white/50 flex items-center justify-center">
                    <span className="bg-gray-800 text-white px-3 py-1 rounded text-sm font-bold">Demo</span>
                </div>
                <h3 className="text-lg font-semibold mb-4">{t('admin.financials.add')}</h3>
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t('admin.financials.year')}</label>
                    <input type="number" value={year} onChange={e => setYear(Number(e.target.value))} className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 sm:text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t('admin.financials.year')}</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 sm:text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t('admin.financials.file')}</label>
                    <input type="file" accept=".pdf" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                </div>
                <button type="submit" disabled={uploading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    {uploading ? t('admin.login.logging_in') : t('admin.financials.add')}
                </button>
            </form>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {financials.map((item) => (
                        <li key={item.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                            <div>
                                <p className="text-sm font-medium text-blue-600 truncate">{t(`data.financials.${item.id}`) || item.title}</p>
                                <p className="mt-1 flex items-center text-sm text-gray-500">
                                    {t('admin.financials.year')}: {item.year}
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">{t('admin.financials.file')}</a>
                                <button onClick={() => alert('Edite src/data/staticData.ts para eliminar')} className="text-red-600/50 cursor-not-allowed">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </li>
                    ))}
                    {financials.length === 0 && <li className="px-6 py-4 text-center text-gray-500">{t('admin.photos.empty')}</li>}
                </ul>
            </div>
        </div>
    );
};

export default Financials;
