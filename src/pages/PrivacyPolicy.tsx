import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

const PrivacyPolicy: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-black text-slate-900 mb-8 font-primary">{t('privacy_page.title')}</h1>
                <p className="text-sm text-slate-500 mb-12 uppercase tracking-widest font-bold">{t('privacy_page.validity')}</p>

                <section className="space-y-8 text-slate-700 leading-relaxed">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('privacy_page.responsible_title')}</h2>
                        <p>
                            <Trans
                                i18nKey="privacy_page.responsible_content"
                                components={{ 0: <strong /> }}
                            />
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('privacy_page.purposes_title')}</h2>
                        <p>{t('privacy_page.purposes_intro')}</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            {(t('privacy_page.purposes_list', { returnObjects: true }) as string[]).map((purpose, index) => (
                                <li key={index}>{purpose}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('privacy_page.rights_title')}</h2>
                        <p>{t('privacy_page.rights_intro')}</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            {(t('privacy_page.rights_list', { returnObjects: true }) as string[]).map((right, index) => (
                                <li key={index}>{right}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('privacy_page.procedure_title')}</h2>
                        <p>
                            <Trans
                                i18nKey="privacy_page.procedure_content"
                                components={{ 1: <strong /> }}
                            />
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('privacy_page.security_title')}</h2>
                        <p>{t('privacy_page.security_content')}</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
