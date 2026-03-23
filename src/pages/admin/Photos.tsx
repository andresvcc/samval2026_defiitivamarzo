import React, { useEffect, useState } from 'react';
import { Photo } from '../../data/staticData';
import { Trash2, Upload, Eye, Layout, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../supabase';

const PhotosVisual: React.FC = () => {
    const { t } = useTranslation();
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);

    // Contextual labels translated
    const SECTIONS = {
        'home': {
            label: t('navbar.home'),
            sections: [
                { id: 'hero', label: 'Banner Principal (Hero)' },
                { id: 'mission', label: 'Misión - Imagen' },
                { id: 'vision', label: 'Visión - Imagen' }
            ]
        },
        'projects': {
            label: t('navbar.projects'),
            sections: [
                { id: 'gallery', label: 'Galería de Proyectos' },
                { id: 'main', label: 'Imagen Destacada' }
            ]
        },
        'events': {
            label: t('admin.layout.photos'),
            sections: [
                { id: 'highlight', label: 'Evento Destacado' },
                { id: 'general', label: 'Galería General' }
            ]
        }
    };

    // State for filtering/viewing
    const [selectedPage, setSelectedPage] = useState('home');
    const [selectedSection, setSelectedSection] = useState('hero');

    const fetchPhotos = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('photos')
                .select('*')
                .eq('page', selectedPage)
                .eq('section', selectedSection)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPhotos(data || []);
        } catch (error) {
            console.error('Error fetching photos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, [selectedPage, selectedSection]);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('photos')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('photos')
                .getPublicUrl(filePath);

            const { error: insertError } = await supabase
                .from('photos')
                .insert([
                    {
                        url: publicUrl,
                        page: selectedPage,
                        section: selectedSection,
                        title: file.name,
                        description: '',
                        category: selectedPage
                    }
                ]);

            if (insertError) throw insertError;

            await fetchPhotos();
            alert('Photo uploaded successfully!');
        } catch (error) {
            console.error('Error uploading photo:', error);
            alert('Error uploading photo!');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string, url: string) => {
        if (!confirm('Are you sure you want to delete this photo?')) return;
        
        try {
            // Extract filename from URL to delete from storage if needed
            // For now just deleting record
            const { error } = await supabase
                .from('photos')
                .delete()
                .eq('id', id);

            if (error) throw error;
            
            setPhotos(photos.filter(photo => photo.id !== id));
        } catch (error) {
            console.error('Error deleting photo:', error);
            alert('Error deleting photo');
        }
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black text-slate-900 flex items-center gap-2">
                    <Layout className="text-blue-600" /> {t('admin.photos.title')}
                </h1>
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm border border-blue-100">
                    <Info size={16} />
                    <span>{loading ? 'Cargando...' : 'Live Mode Active'}</span>
                </div>
            </div>

            {/* Selector de Contexto Visual */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">{t('admin.dashboard.recent')}:</h3>

                <div className="flex flex-wrap gap-2 mb-6">
                    {Object.entries(SECTIONS).map(([key, config]) => (
                        <button
                            key={key}
                            onClick={() => { setSelectedPage(key); setSelectedSection(config.sections[0].id); }}
                            className={`px-6 py-3 rounded-xl font-bold transition-all ${selectedPage === key
                                ? 'bg-slate-900 text-white shadow-lg scale-105'
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                }`}
                        >
                            {config.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                    <span className="text-slate-500 font-medium">{t('admin.team.role')}:</span>
                    <div className="flex gap-2">
                        {SECTIONS[selectedPage as keyof typeof SECTIONS].sections.map(sec => (
                            <button
                                key={sec.id}
                                onClick={() => setSelectedSection(sec.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${selectedSection === sec.id
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                                    }`}
                            >
                                {sec.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Zona de Trabajo */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                            {SECTIONS[selectedPage as keyof typeof SECTIONS].sections.find(s => s.id === selectedSection)?.label}
                        </h2>
                        <p className="text-slate-500">{t('admin.dashboard.welcome')}</p>
                    </div>

                    <label className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition cursor-pointer shadow-lg shadow-blue-600/20">
                        <Upload size={20} />
                        {uploading ? t('admin.login.logging_in') : t('admin.photos.add')}
                        <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} className="hidden" />
                    </label>
                </div>

                {/* Grid Visual */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Visual Placeholder */}
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-slate-50/50">
                        <Layout size={48} className="text-slate-300 mb-4" />
                        <p className="text-slate-400 font-medium max-w-xs uppercase">
                            {selectedPage}
                        </p>
                    </div>

                    {loading ? (
                         <div className="col-span-full text-center py-10 text-gray-400">Loading photos...</div>
                    ) : photos.map(photo => (
                        <div key={photo.id} className="group relative bg-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                            <img src={photo.url} alt={photo.title || "Content"} className="w-full h-64 object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4 backdrop-blur-sm">
                                <a href={photo.url} target="_blank" rel="noreferrer" className="p-3 bg-white/20 text-white rounded-full hover:bg-white hover:text-black transition">
                                    <Eye size={20} />
                                </a>
                                <button
                                    onClick={() => handleDelete(photo.id, photo.url)}
                                    className="p-3 bg-red-500/20 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white font-medium text-sm truncate">{photo.title || t(`data.photos.${photo.id}`) || photo.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PhotosVisual;
