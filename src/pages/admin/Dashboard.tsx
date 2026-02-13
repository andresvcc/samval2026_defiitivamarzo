
import React, { useEffect, useState } from 'react';
import { staticPhotosData, staticPartnersData, staticTeamData } from '../../data/staticData';
import { Image, Users, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AdminVisualDashboard: React.FC = () => {
    const { t } = useTranslation();
    const [stats, setStats] = useState({
        photos: 0,
        partners: 0,
        team: 0,
    });

    useEffect(() => {
        // Cargar estadísticas estáticas
        setStats({
            photos: staticPhotosData.length,
            partners: staticPartnersData.length,
            team: staticTeamData.length,
        });
    }, []);

    const CARDS = [
        {
            title: t('admin.dashboard.stats.photos'),
            description: t('admin.dashboard.welcome'), // Placeholder description
            icon: <Image size={48} className="text-blue-500" />,
            link: '/admin/photos',
            bg: 'bg-blue-50 hover:bg-blue-100',
            border: 'border-blue-100',
            stat: `${stats.photos} ${t('admin.dashboard.stats.photos')}`
        },
        {
            title: t('admin.dashboard.stats.partners'),
            description: t('admin.dashboard.welcome'), // Placeholder description
            icon: <Users size={48} className="text-purple-500" />,
            link: '/admin/partners',
            bg: 'bg-purple-50 hover:bg-purple-100',
            border: 'border-purple-100',
            stat: `${stats.partners} ${t('admin.dashboard.stats.partners')}`
        },
        {
            title: t('admin.dashboard.stats.team'),
            description: t('admin.dashboard.welcome'), // Placeholder description
            icon: <Users size={48} className="text-teal-500" />,
            link: '/admin/team',
            bg: 'bg-teal-50 hover:bg-teal-100',
            border: 'border-teal-100',
            stat: `${stats.team} ${t('admin.dashboard.stats.team')}`
        },
        {
            title: t('admin.dashboard.stats.financials'),
            description: t('admin.dashboard.welcome'), // Placeholder description
            icon: <FileText size={48} className="text-amber-500" />,
            link: '/admin/financials',
            bg: 'bg-amber-50 hover:bg-amber-100',
            border: 'border-amber-100',
            stat: t('admin.financials.file')
        }
    ];

    return (
        <div className="p-8 bg-white min-h-screen">
            <header className="mb-12 text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">{t('admin.dashboard.title')}</h1>
                <p className="text-slate-500 text-lg">{t('admin.dashboard.welcome')}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {CARDS.map((card, idx) => (
                    <Link
                        to={card.link}
                        key={idx}
                        className={`group relative p-8 rounded-3xl transition-all duration-300 border ${card.border} ${card.bg} shadow-sm hover:shadow-2xl hover:-translate-y-2 cursor-pointer`}
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className="p-4 bg-white rounded-2xl shadow-sm">{card.icon}</div>
                            <span className="inline-block px-4 py-2 bg-white/60 rounded-full text-sm font-bold text-slate-600 backdrop-blur-sm">
                                {card.stat}
                            </span>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-slate-900">{card.title}</h3>
                        {/* <p className="text-slate-600 mb-8 leading-relaxed max-w-sm">{card.description}</p> */}

                        <div className="flex items-center text-slate-900 font-bold group-hover:translate-x-2 transition-transform">
                            {t('admin.layout.dashboard')} <ArrowRight size={20} className="ml-2" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AdminVisualDashboard;
