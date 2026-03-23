import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Shield, FileText, Eye, Lock, UserCheck } from 'lucide-react';
import SEO from '../components/SEO';

const PrivacyPolicy: React.FC = () => {
    const { t } = useTranslation();

    const sections = [
        {
            icon: UserCheck,
            titleKey: 'privacy_page.responsible_title',
            contentKey: 'privacy_page.responsible_content',
            isTrans: true,
        },
        {
            icon: Eye,
            titleKey: 'privacy_page.purposes_title',
            introKey: 'privacy_page.purposes_intro',
            listKey: 'privacy_page.purposes_list',
        },
        {
            icon: FileText,
            titleKey: 'privacy_page.rights_title',
            introKey: 'privacy_page.rights_intro',
            listKey: 'privacy_page.rights_list',
        },
        {
            icon: Lock,
            titleKey: 'privacy_page.procedure_title',
            contentKey: 'privacy_page.procedure_content',
            isTrans: true,
        },
        {
            icon: Shield,
            titleKey: 'privacy_page.security_title',
            contentKey: 'privacy_page.security_content',
        },
    ];

    return (
        <div className="min-h-screen py-16" style={{ background: '#e0d6cc' }}>
            <SEO
                title={t('privacy_page.title') + ' | Fundación SAMVAL'}
                description="Política de tratamiento de datos personales de la Fundación SAMVAL."
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 neu-raised-sm px-5 py-2.5 mb-6">
                        <Shield size={16} className="text-samval-guinda" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-samval-guinda">LEGAL</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-stone-800 mb-4">
                        {t('privacy_page.title')}
                    </h1>
                    <p className="text-sm text-stone-400 font-bold uppercase tracking-widest">
                        {t('privacy_page.validity', { defaultValue: t('privacy_page.last_updated', { defaultValue: 'Última actualización: 2024' }) })}
                    </p>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {sections.map((section, idx) => {
                        const titleText = t(section.titleKey, { defaultValue: '' });
                        // Skip sections with no translation
                        if (!titleText || titleText === section.titleKey) return null;

                        return (
                            <div key={idx} className="neu-raised-lg p-8 md:p-10">
                                <div className="flex items-center mb-6">
                                    <div className="neu-icon w-12 h-12 text-samval-guinda shrink-0 mr-5">
                                        <section.icon size={22} />
                                    </div>
                                    <h2 className="text-xl font-bold text-stone-800">{titleText}</h2>
                                </div>

                                {/* Intro text */}
                                {section.introKey && (
                                    <p className="text-stone-500 leading-relaxed mb-4">
                                        {t(section.introKey)}
                                    </p>
                                )}

                                {/* List items */}
                                {section.listKey && (
                                    <ul className="space-y-2 mt-4">
                                        {(t(section.listKey, { returnObjects: true, defaultValue: [] }) as string[]).map?.((item, i) => (
                                            <li key={i} className="flex items-start text-stone-500">
                                                <div className="w-2 h-2 bg-samval-guinda rounded-full mr-3 mt-2 shrink-0"></div>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Trans content */}
                                {section.contentKey && section.isTrans && (
                                    <p className="text-stone-500 leading-relaxed">
                                        <Trans i18nKey={section.contentKey} components={{ 0: <strong className="text-stone-800" />, 1: <strong className="text-stone-800" /> }} />
                                    </p>
                                )}

                                {/* Plain content */}
                                {section.contentKey && !section.isTrans && (
                                    <p className="text-stone-500 leading-relaxed">
                                        {t(section.contentKey)}
                                    </p>
                                )}
                            </div>
                        );
                    })}

                    {/* Fallback: if old translation keys (p1, p2, p3) exist, render them */}
                    {(() => {
                        const p1 = t('privacy_page.p1', { defaultValue: '' });
                        if (p1 && !p1.startsWith('privacy_page.')) {
                            return (
                                <div className="neu-raised-lg p-8 md:p-10 space-y-6">
                                    {['p1', 'p2', 'p3'].map((key) => {
                                        const text = t(`privacy_page.${key}`, { defaultValue: '' });
                                        if (!text || text.startsWith('privacy_page.')) return null;
                                        return <p key={key} className="text-stone-500 leading-relaxed">{text}</p>;
                                    })}
                                </div>
                            );
                        }
                        return null;
                    })()}
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

export default PrivacyPolicy;
