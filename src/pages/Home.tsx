
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Heart, BookOpen, Activity, Languages, Bot, Fingerprint, Leaf, Users, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import InstagramFeed from '../components/InstagramFeed';

const COLORS = ['#801b1b', '#a62d2d', '#5a1212', '#d4a373'];

const Home: React.FC = () => {
  const { t } = useTranslation();

  const data = [
    { name: t('home.impact_stats.kids'), value: 1200 },
    { name: t('home.impact_stats.families'), value: 450 },
    { name: t('home.impact_stats.projects'), value: 35 },
    { name: t('home.impact_stats.volunteers'), value: 120 },
  ];

  const services = [
    { key: 'web', icon: Code },
    { key: 'mobile', icon: Code },
    { key: 'ai', icon: Code },
    { key: 'consulting', icon: Code }
  ];

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <SEO page="home" />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden py-12" style={{ background: '#1e1b18' }}>
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.ibb.co/23vCh1H2/Gemini-Generated-Image-tvcl5gtvcl5gtvcl.png"
            alt="Paisaje Colombiano y Tecnología"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <span className="inline-block py-2 px-5 rounded-2xl text-xs sm:text-sm font-bold mb-6 uppercase tracking-widest text-samval-accent"
              style={{
                background: 'rgba(128,27,27,0.3)',
                backdropFilter: 'blur(8px)',
                boxShadow: '4px 4px 8px rgba(0,0,0,0.3), -4px -4px 8px rgba(255,255,255,0.05)'
              }}
            >
              {t('home.hero_tagline')}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
              {t('home.hero_title')}
            </h1>
            <p className="text-lg sm:text-xl text-stone-200 mb-6 leading-relaxed max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {t('home.hero_desc')}
              <span className="block mt-4 font-bold text-white border-l-4 border-samval-guinda pl-4">
                {t('home.hero_bold')}
              </span>
            </p>
            <p className="text-sm sm:text-base text-samval-accent/90 font-bold mb-10 max-w-2xl italic tracking-wide"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
            >
              {t('home.hero_positioning')}
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/donar" className="group inline-flex items-center justify-center px-10 py-4 text-white font-black rounded-2xl text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(145deg, #8c1e1e, #6e1515)',
                  boxShadow: '8px 8px 16px rgba(0,0,0,0.5), -4px -4px 12px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'inset 4px 4px 8px rgba(0,0,0,0.4), inset -4px -4px 8px rgba(255,255,255,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '8px 8px 16px rgba(0,0,0,0.5), -4px -4px 12px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.1)';
                }}
              >
                {t('home.cta_invest')}
              </Link>
              <Link to="/servicios-tech" className="group inline-flex items-center justify-center px-10 py-4 text-white font-bold rounded-2xl text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '6px 6px 12px rgba(0,0,0,0.4), -4px -4px 10px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'inset 4px 4px 8px rgba(0,0,0,0.3), inset -4px -4px 8px rgba(255,255,255,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '6px 6px 12px rgba(0,0,0,0.4), -4px -4px 10px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.1)';
                }}
              >
                {t('home.cta_services')}
                <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "NGO",
                "name": "Fundación SAMVAL",
                "alternateName": "SAMVAL STIFTUNG",
                "url": "https://samval.org",
                "logo": "https://i.ibb.co/DDs8DDfy/SAMVALLOGO.png",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+57-323-320-7532",
                  "contactType": "customer service",
                  "areaServed": "CO",
                  "availableLanguage": ["Spanish", "English", "French", "German"]
                },
                "sameAs": [
                  "https://instagram.com/fundacionsamval",
                  "https://linkedin.com/company/fundacion-samval"
                ]
              })}
            </script>
          </div>
        </div>
      </section>

      {/* What Makes Us Unique */}
      <section className="py-24" style={{ background: '#e0d6cc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 neu-raised-sm px-5 py-2.5 mb-6">
              <Fingerprint size={16} className="text-samval-guinda" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-samval-guinda">{t('home.unique_tag')}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-stone-800 mb-6">{t('home.unique_title')}</h2>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">{t('home.unique_subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Languages, titleKey: 'home.unique_1_title', descKey: 'home.unique_1_desc', accent: '#801b1b' },
              { icon: Bot, titleKey: 'home.unique_2_title', descKey: 'home.unique_2_desc', accent: '#a62d2d' },
              { icon: Fingerprint, titleKey: 'home.unique_3_title', descKey: 'home.unique_3_desc', accent: '#d4a373' },
            ].map((card, idx) => (
              <div key={idx} className="group neu-raised-lg p-10 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl" style={{ background: card.accent }}></div>
                <div className="neu-icon w-16 h-16 mb-8 text-samval-guinda">
                  <card.icon size={32} />
                </div>
                <h3 className="text-xl font-black text-stone-800 mb-4">{t(card.titleKey)}</h3>
                <p className="text-stone-500 leading-relaxed">{t(card.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where Mass Programs Don't Reach */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#1e1b18' }}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-samval-guinda/10 rounded-full blur-[150px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl mb-6"
              style={{ background: 'rgba(128,27,27,0.2)', boxShadow: '4px 4px 8px rgba(0,0,0,0.3), -4px -4px 8px rgba(255,255,255,0.03)' }}
            >
              <Leaf size={16} className="text-samval-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-samval-accent">{t('home.complement_tag')}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{t('home.complement_title')}</h2>
            <p className="text-stone-400 text-lg max-w-3xl mx-auto">{t('home.complement_desc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Leaf, titleKey: 'home.complement_1_title', descKey: 'home.complement_1_desc' },
              { icon: Users, titleKey: 'home.complement_2_title', descKey: 'home.complement_2_desc' },
              { icon: Clock, titleKey: 'home.complement_3_title', descKey: 'home.complement_3_desc' },
            ].map((card, idx) => (
              <div key={idx} className="neu-dark-raised p-10 hover:scale-[1.02] transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 text-samval-accent"
                  style={{ background: 'rgba(128,27,27,0.15)', boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.3), inset -2px -2px 4px rgba(255,255,255,0.03)' }}
                >
                  <card.icon size={28} />
                </div>
                <h3 className="text-xl font-black text-white mb-4">{t(card.titleKey)}</h3>
                <p className="text-stone-400 leading-relaxed">{t(card.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24" style={{ background: '#e0d6cc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-stone-800 mb-6">{t('home.mission_title')}</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-samval-guinda to-samval-accent mx-auto rounded-full"></div>
            <p className="mt-6 text-stone-500 text-lg max-w-2xl mx-auto font-medium">
              {t('home.mission_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: BookOpen, titleKey: 'home.mission_card_title', descKey: 'home.mission_card_desc' },
              { icon: Activity, titleKey: 'home.vision_card_title', descKey: 'home.vision_card_desc' },
              { icon: Heart, titleKey: 'home.values_card_title', descKey: 'home.values_card_desc' },
            ].map((card, idx) => (
              <div key={idx} className="group neu-raised-lg p-10 hover:scale-[1.02] transition-all duration-300">
                <div className="neu-icon w-16 h-16 mb-8 text-samval-guinda group-hover:text-white transition-all duration-300"
                  style={{
                    background: 'linear-gradient(145deg, #e8e0d8, #d8cfc5)',
                  }}
                >
                  <card.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-stone-800 mb-4">{t(card.titleKey)}</h3>
                <p className="text-stone-500 leading-relaxed text-lg">
                  {t(card.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-24 text-white relative overflow-hidden" style={{ background: '#1e1b18' }}>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-samval-guinda rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-samval-accent rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">{t('home.impact_title')}</h2>
              <p className="text-stone-400 text-xl mb-12 max-w-xl">
                {t('home.impact_desc')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.map((item, index) => (
                  <div key={index} className="neu-dark-raised p-6 hover:scale-[1.02] transition-all duration-300">
                    <p className="text-4xl font-black text-white mb-2">{item.value}+</p>
                    <p className="text-stone-500 font-bold uppercase tracking-wider text-sm">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full h-[400px] neu-dark-pressed p-8" style={{ borderRadius: '28px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" stroke="#6b5f52" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e1b18', border: '1px solid #2a2622', borderRadius: '16px', color: '#fff' }}
                    itemStyle={{ color: '#d4a373' }}
                    cursor={{ fill: 'rgba(255,255,255,0.05)', radius: 10 }}
                  />
                  <Bar dataKey="value" radius={[10, 10, 10, 10]} barSize={40}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Services Teaser */}
      <section className="py-24" style={{ background: '#e0d6cc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-stone-800 mb-6">{t('home.services_title')}</h2>
          <p className="text-stone-500 text-xl max-w-2xl mx-auto mb-16">
            {t('home.services_desc')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {services.map((service, idx) => (
              <div key={idx} className="group neu-raised-lg p-8 hover:scale-[1.02] transition-all duration-300">
                <div className="neu-icon w-14 h-14 text-samval-guinda mb-6">
                  <service.icon size={26} />
                </div>
                <h3 className="font-black text-xl text-stone-800 mb-4 tracking-tight">{t(`home.services_list.${service.key}`)}</h3>
                <Link to="/servicios-tech" className="text-sm text-samval-guinda font-black uppercase tracking-widest hover:underline inline-flex items-center">
                  {t('home.view_details')} <ArrowRight size={14} className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InstagramFeed />

      {/* CTA Bottom */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(145deg, #8c1e1e, #6a1515)' }}>
        <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight italic">{t('home.cta_bottom_title')}</h2>
          <p className="text-red-100/80 text-xl md:text-2xl mb-12 font-medium">
            {t('home.cta_bottom_desc')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/donar" className="group px-12 py-5 bg-white text-samval-guinda font-black rounded-2xl transition-all duration-300 text-lg uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98]"
              style={{
                boxShadow: '8px 8px 16px rgba(0,0,0,0.35), -4px -4px 12px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.5)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'inset 4px 4px 8px rgba(0,0,0,0.15), inset -4px -4px 8px rgba(255,255,255,0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '8px 8px 16px rgba(0,0,0,0.35), -4px -4px 12px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.5)';
              }}
            >
              {t('home.cta_donate_now')}
            </Link>
            <Link to="/voluntariado" className="group px-12 py-5 font-black rounded-2xl transition-all duration-300 text-lg uppercase tracking-widest text-white hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: '#1e1b18',
                boxShadow: '8px 8px 16px rgba(0,0,0,0.4), -4px -4px 12px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.06)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'inset 4px 4px 8px rgba(0,0,0,0.4), inset -4px -4px 8px rgba(255,255,255,0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '8px 8px 16px rgba(0,0,0,0.4), -4px -4px 12px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)';
              }}
            >
              {t('home.cta_volunteer')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
