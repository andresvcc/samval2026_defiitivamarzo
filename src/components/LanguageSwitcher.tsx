
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="relative group z-50">
            <button className="flex items-center space-x-1 p-2 rounded-full hover:bg-slate-100 transition text-slate-600">
                <Globe size={20} />
                <span className="uppercase font-bold text-xs">{i18n.language.split('-')[0]}</span>
            </button>
            <div className="absolute right-0 top-full pt-2 w-32 hidden group-hover:block animate-fade-in">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
                    <button onClick={() => changeLanguage('es')} className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50 text-slate-700 font-medium">Español</button>
                    <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50 text-slate-700 font-medium">English</button>
                    <button onClick={() => changeLanguage('fr')} className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50 text-slate-700 font-medium">Français</button>
                    <button onClick={() => changeLanguage('de')} className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50 text-slate-700 font-medium">Deutsch</button>
                </div>
            </div>
        </div>
    );
};

export default LanguageSwitcher;
