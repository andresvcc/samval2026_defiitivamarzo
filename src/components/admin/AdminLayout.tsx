
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Users, FileText, Image, LogOut } from 'lucide-react';

const AdminLayout: React.FC = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Verificación de sesión simulada
        const session = localStorage.getItem('samval_admin_session');
        if (!session) {
            navigate('/admin/login');
        }
        setLoading(false);
    }, [navigate]);

    if (loading) return <div>{t('admin.layout.loading')}</div>;

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-4 text-center font-bold text-xl border-b border-slate-700">
                    {t('admin.layout.title')}
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/admin/dashboard" className="flex items-center space-x-3 p-3 rounded hover:bg-slate-700 block">
                        <LayoutDashboard size={20} />
                        <span>{t('admin.layout.dashboard')}</span>
                    </Link>
                    <Link to="/admin/photos" className="flex items-center space-x-3 p-3 rounded hover:bg-slate-700 block">
                        <Image size={20} />
                        <span>{t('admin.layout.photos')}</span>
                    </Link>
                    <Link to="/admin/financials" className="flex items-center space-x-3 p-3 rounded hover:bg-slate-700 block">
                        <FileText size={20} />
                        <span>{t('admin.layout.financials')}</span>
                    </Link>
                    <Link to="/admin/partners" className="flex items-center space-x-3 p-3 rounded hover:bg-slate-700 block">
                        <Users size={20} />
                        <span>{t('admin.layout.partners')}</span>
                    </Link>
                    <Link to="/admin/team" className="flex items-center space-x-3 p-3 rounded hover:bg-slate-700 block">
                        <Users size={20} />
                        <span>{t('admin.layout.team')}</span>
                    </Link>
                </nav>
                <div className="p-4 border-t border-slate-700">
                    <button
                        onClick={() => {
                            localStorage.removeItem('samval_admin_session');
                            navigate('/admin/login');
                        }}
                        className="flex items-center space-x-3 p-3 w-full rounded hover:bg-red-600 text-left transition"
                    >
                        <LogOut size={20} />
                        <span>{t('admin.layout.logout')}</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
