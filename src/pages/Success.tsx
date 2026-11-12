import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Heart, CheckCircle, ArrowRight, ArrowLeft, Mail, Code, HandHeart, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { trackConversion } from '../utils/conversions';

const successTypes = {
  contacto: {
    icon: Mail,
    secondaryPath: '/contacto',
  },
  servicios: {
    icon: Code,
    secondaryPath: '/servicios-tech#cotizar',
  },
  donacion: {
    icon: Heart,
    secondaryPath: '/donar',
  },
  voluntariado: {
    icon: HandHeart,
    secondaryPath: '/voluntariado',
  },
} as const;

type SuccessType = keyof typeof successTypes;

const isSuccessType = (value: string): value is SuccessType => value in successTypes;

const Success: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const rawType = new URLSearchParams(location.search).get('tipo') || 'donacion';
  const type: SuccessType = isSuccessType(rawType) ? rawType : 'donacion';
  const config = successTypes[type];
  const Icon = config.icon;
  const steps = t(`success_page.${type}.steps`, { returnObjects: true }) as string[];

  useEffect(() => {
    trackConversion('thank_you_view', {
      label: type,
      pageSection: 'thank_you',
      thankYouType: type,
    });
  }, [type]);

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-20 px-4" style={{ background: '#e0d6cc' }}>
      <SEO 
        title={`${t(`success_page.${type}.title`)} | SAMVAL`}
        description={t(`success_page.${type}.subtitle`)}
      />
      
      <div className="max-w-3xl w-full">
        <article className="neu-raised-lg p-6 sm:p-8 md:p-10 animate-neu-fade-in relative overflow-hidden" style={{ borderRadius: '28px' }}>
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-samval-guinda via-samval-light to-stone-800"></div>

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-start gap-5 text-left">
              <div className="inline-flex self-start p-4 neu-pressed text-samval-guinda relative shrink-0" style={{ borderRadius: '22px' }}>
                <div className="absolute -top-2 -right-2">
                  <CheckCircle className="text-samval-accent bg-[#e0d6cc] rounded-full" size={22} />
                </div>
                <Icon size={42} strokeWidth={1.5} />
              </div>

              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.24em] text-samval-guinda mb-3">
                  {t(`success_page.${type}.tag`)}
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-stone-800 tracking-tighter leading-none">
                  {t(`success_page.${type}.title`)}
                </h1>
                <p className="mt-4 text-lg md:text-xl text-stone-600 font-bold leading-relaxed">
                  {t(`success_page.${type}.subtitle`)}
                </p>
              </div>
            </div>

            <p className="mt-7 text-base md:text-lg text-stone-600 leading-relaxed font-medium text-left">
              {t(`success_page.${type}.description`)}
            </p>

            <div className="mt-8 border-y border-stone-300/70 py-6">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-stone-500 mb-5">
                {t(`success_page.${type}.next_title`)}
              </h2>
              <ol className="space-y-4">
                {steps.map((step, index) => (
                  <li key={step} className="flex gap-4 text-left">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-samval-guinda text-xs font-black text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm md:text-base font-bold leading-relaxed text-stone-700">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-left">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-400">
                {t('success_page.common.response_time_label')}
              </span>
              <span className="text-sm md:text-base font-black text-samval-guinda">
                {t(`success_page.${type}.response_time`)}
              </span>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => navigate('/')}
                className="group inline-flex items-center justify-center gap-2 w-full py-4 px-5 text-white font-black text-[11px] uppercase tracking-[0.12em] leading-snug transition-all duration-300 hover:scale-[1.01]"
                style={{ borderRadius: '16px', background: '#701610' }}
              >
                <Home size={16} className="shrink-0" />
                <span className="min-w-0 text-center">{t('success_page.common.home_action')}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate(config.secondaryPath)}
                className="group inline-flex items-center justify-center gap-2 w-full py-4 px-5 text-stone-600 font-black text-[11px] uppercase tracking-[0.12em] leading-snug transition-all duration-300 hover:text-stone-800 neu-raised-sm"
                style={{ borderRadius: '16px' }}
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="min-w-0 text-center">{t(`success_page.${type}.secondary_action`)}</span>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Success;
