import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

const TermsOfUse: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-black text-slate-900 mb-8 font-primary">{t('terms_page.title')}</h1>
                <p className="text-sm text-slate-500 mb-12 uppercase tracking-widest font-bold">{t('terms_page.validity')}</p>

                <section className="space-y-8 text-slate-700 leading-relaxed">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('terms_page.acceptance_title')}</h2>
                        <p>
                            <Trans
                                i18nKey="terms_page.acceptance_content"
                                components={{ 0: <strong /> }}
                            />
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('terms_page.property_title')}</h2>
                        <p>{t('terms_page.property_content')}</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('terms_page.donation_title')}</h2>
                        <p>{t('terms_page.donation_content1')}</p>
                        <p className="mt-4">{t('terms_page.donation_content2')}</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('terms_page.exemption_title')}</h2>
                        <p>{t('terms_page.exemption_content')}</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('terms_page.jurisdiction_title')}</h2>
                        <p>{t('terms_page.jurisdiction_content')}</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TermsOfUse;
