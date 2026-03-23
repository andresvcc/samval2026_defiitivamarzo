import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Scale, FileText, ShieldCheck, CreditCard, AlertTriangle, Gavel } from 'lucide-react';
import SEO from '../components/SEO';

const TermsOfUse: React.FC = () => {
    const { t } = useTranslation();

    const sections = [
        { icon: ShieldCheck, titleKey: 'terms_page.acceptance_title', contentKey: 'terms_page.acceptance_content', isTrans: true },
        { icon: FileText, titleKey: 'terms_page.property_title', contentKey: 'terms_page.property_content' },
        { icon: CreditCard, titleKey: 'terms_page.donation_title', content1Key: 'terms_page.donation_content1', content2Key: 'terms_page.donation_content2' },
        { icon: AlertTriangle, titleKey: 'terms_page.exemption_title', contentKey: 'terms_page.exemption_content' },
        { icon: Gavel, titleKey: 'terms_page.jurisdiction_title', contentKey: 'terms_page.jurisdiction_content' },
    ];

    return (
        <div className="min-h-screen py-16" style={{ background: '#e0d6cc' }}>
            <SEO page="terms" />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 neu-raised-sm px-5 py-2.5 mb-6">
                        <Scale size={16} className="text-samval-guinda" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-samval-guinda">LEGAL</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-stone-800 mb-4">
                        {t('terms_page.title')}
                    </h1>
                    <p className="text-sm text-stone-400 font-bold uppercase tracking-widest">
                        {t('terms_page.validity', { defaultValue: t('terms_page.last_updated') })}
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-8">
                    {sections.map((section, idx) => {
                        const titleText = t(section.titleKey, { defaultValue: '' });
                        if (!titleText || titleText === section.titleKey) return null;

                        return (
                            <div key={idx} className="neu-raised-lg p-8 md:p-10">
                                <div className="flex items-center mb-6">
                                    <div className="neu-icon w-12 h-12 text-samval-guinda shrink-0 mr-5">
                                        <section.icon size={22} />
                                    </div>
                                    <h2 className="text-xl font-bold text-stone-800">{titleText}</h2>
                                </div>

                                {/* Trans content */}
                                {section.contentKey && section.isTrans && (
                                    <p className="text-stone-500 leading-relaxed">
                                        <Trans i18nKey={section.contentKey} components={{ 0: <strong className="text-stone-800" /> }} />
                                    </p>
                                )}

                                {/* Plain content */}
                                {section.contentKey && !section.isTrans && (
                                    <p className="text-stone-500 leading-relaxed">
                                        {t(section.contentKey)}
                                    </p>
                                )}

                                {/* Double content (donations) */}
                                {section.content1Key && (
                                    <div className="space-y-4">
                                        <p className="text-stone-500 leading-relaxed">{t(section.content1Key)}</p>
                                        {section.content2Key && (
                                            <p className="text-stone-500 leading-relaxed">{t(section.content2Key)}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Legal Footer */}
                <div className="mt-12 neu-pressed p-8 text-center">
                    <p className="text-sm text-stone-400 font-medium italic">
                        Fundación SAMVAL — NIT: 901.036.033-0 · Barranquilla, Colombia
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfUse;
