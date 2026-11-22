import {changeSiteLanguage} from '../i18n';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        changeSiteLanguage(lng);
    };

    return (
        <div className="relative group z-50">
            <button className="neu-icon w-10 h-10 text-stone-500 hover:text-samval-guinda transition-all duration-200">
                <Globe size={18} />
            </button>
            <div className="absolute right-0 top-full pt-2 w-36 hidden group-hover:block animate-neu-fade-in">
                <div className="neu-raised-sm p-2 space-y-1">
                    {[
                        { code: 'es', label: 'Español' },
                        { code: 'en', label: 'English' },
                        { code: 'fr', label: 'Français' },
                        { code: 'de', label: 'Deutsch' },
                    ].map(lang => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`block w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                                i18n.language.startsWith(lang.code)
                                    ? 'neu-pressed-sm text-samval-guinda font-bold'
                                    : 'text-stone-600 hover:text-samval-guinda hover:bg-stone-200/30'
                            }`}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LanguageSwitcher;
