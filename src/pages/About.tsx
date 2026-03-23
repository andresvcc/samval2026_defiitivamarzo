
import React from 'react';
import { Target, Users, BookOpen, Rocket, CheckCircle2, Clock, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import SEO from '../components/SEO';
import InstagramFeed from '../components/InstagramFeed';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen" style={{ background: '#e0d6cc' }}>
      <SEO page="about" />

      {/* Hero */}
      <section className="relative py-32 overflow-hidden min-h-[60vh] flex items-center" style={{ background: '#1e1b18' }}>
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.ibb.co/LzNmC5xS/IMG-4859.jpg"
            alt="Territorio Colombiano"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block py-2 px-5 rounded-2xl text-sm font-bold mb-6 text-samval-accent"
              style={{
                background: 'rgba(128,27,27,0.25)',
                backdropFilter: 'blur(8px)',
                boxShadow: '3px 3px 6px rgba(0,0,0,0.3), -3px -3px 6px rgba(255,255,255,0.05)'
              }}
            >
              {t('about_page.hero_tag')}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
              <Trans i18nKey="about_page.hero_title" components={{ 1: <span className="text-transparent bg-clip-text bg-gradient-to-r from-samval-light to-samval-accent" /> }} />
            </h1>
            <p className="text-xl text-stone-200 mb-10 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              <Trans i18nKey="about_page.hero_desc" components={{ 1: <strong /> }} />
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <a href="https://wa.me/573233207532" target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center justify-center px-8 py-4 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
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
                {t('about_page.cta_schedule')}
              </a>
              <div className="flex items-center px-4 text-stone-400 text-sm italic">
                <Clock size={16} className="mr-2" />
                {t('about_page.cta_response')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14" style={{ background: '#e0d6cc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MapPin, value: '5', label: t('about_page.stats.territories') },
              { icon: Calendar, value: '6', label: t('about_page.stats.weeks') },
              { icon: CheckCircle2, value: '100%', label: t('about_page.stats.included') },
              { icon: Rocket, value: 'Ready', label: t('about_page.stats.ready') },
            ].map((stat, idx) => (
              <div key={idx} className="neu-raised flex items-center space-x-4 p-6">
                <div className="neu-icon-pressed w-12 h-12 text-samval-guinda shrink-0">
                  <stat.icon size={22} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-800">{stat.value}</p>
                  <p className="text-sm text-stone-400 font-medium uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Propuesta */}
      <section className="py-20" style={{ background: '#e0d6cc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-stone-800 mb-6">{t('about_page.how_title')}</h2>
            <p className="text-lg text-stone-500">
              <Trans i18nKey="about_page.how_desc" components={{ 1: <strong /> }} />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Users, titleKey: 'about_page.cards.culture_title', descKey: 'about_page.cards.culture_desc' },
              { icon: Target, titleKey: 'about_page.cards.measure_title', descKey: 'about_page.cards.measure_desc' },
              { icon: BookOpen, titleKey: 'about_page.cards.support_title', descKey: 'about_page.cards.support_desc' },
            ].map((card, idx) => (
              <div key={idx} className="neu-raised-lg p-8 hover:scale-[1.02] transition-all duration-300">
                <div className="neu-icon w-14 h-14 text-samval-guinda mb-6">
                  <card.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-4">{t(card.titleKey)}</h3>
                <p className="text-stone-500 leading-relaxed">{t(card.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alianzas & Red */}
      <section className="py-20" style={{ background: '#e0d6cc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block py-2 px-5 rounded-2xl text-sm font-bold mb-6 text-samval-accent"
              style={{
                background: 'rgba(128,27,27,0.1)',
                border: '1px solid rgba(128,27,27,0.2)'
              }}
            >
              {t('about_page.alliances_badge')}
            </span>
            <h2 className="text-3xl font-bold text-stone-800 mb-6">{t('about_page.alliances_title')}</h2>
            <p className="text-lg text-stone-500">
              {t('about_page.alliances_desc')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60 hover:opacity-100 transition-all duration-500">
             <div className="w-40 h-20 rounded-xl flex items-center justify-center font-bold text-stone-500 neu-pressed-sm text-center px-4 leading-tight">Code.org NAIPI</div>
             <div className="w-40 h-20 rounded-xl flex items-center justify-center font-bold text-stone-500 neu-pressed-sm text-center px-4 leading-tight">Siemens Stiftung</div>
             <div className="w-40 h-20 rounded-xl flex items-center justify-center font-bold text-stone-500 neu-pressed-sm text-center px-4 leading-tight">OEA (OAS)</div>
             <div className="w-40 h-20 rounded-xl flex items-center justify-center font-bold text-stone-500 neu-pressed-sm text-center px-4 leading-tight">SENA</div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24" style={{ background: '#e0d6cc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">{t('about_page.evolution_title')}</h2>
              <p className="text-lg text-stone-500">{t('about_page.evolution_desc')}</p>
            </div>
            <div className="neu-btn-primary !rounded-2xl !px-8 !py-6 transform rotate-2">
              <p className="text-sm font-semibold uppercase tracking-widest mb-1 opacity-80">{t('data.photos.impact_year') || 'Impacto 2024'}</p>
              <p className="text-2xl font-bold italic">{t('data.photos.real_learning') || 'Aprendizaje Real'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative mt-16 lg:mt-24">
            <div className="absolute top-1/2 left-0 w-full h-1 hidden lg:block" style={{ background: '#d0c6bb' }}></div>

            {[
              { year: "2024", title: t('about_page.timeline.2024_title'), desc: t('about_page.timeline.2024_desc') },
              { year: "2025", title: t('about_page.timeline.2025_title'), desc: t('about_page.timeline.2025_desc') },
              { year: "2026", title: t('about_page.timeline.2026_title'), desc: t('about_page.timeline.2026_desc') }
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                <div className="neu-raised w-20 h-20 flex items-center justify-center text-samval-guinda font-black text-2xl mb-8 group-hover:scale-105 transition-all duration-300"
                  style={{ borderRadius: '24px' }}
                >
                  {item.year}
                </div>
                <h3 className="text-2xl font-black text-stone-800 mb-4 tracking-tight">{item.title}</h3>
                <p className="text-stone-500 italic text-lg leading-relaxed">"{item.desc}"</p>
                {idx < 2 && <div className="h-16 w-1 lg:hidden mt-8" style={{ background: '#d0c6bb' }}></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <InstagramFeed />

      {/* CTA Final */}
      <section className="py-20 overflow-hidden relative" style={{ background: '#1e1b18' }}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-samval-guinda/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">{t('about_page.cta_final_title')}</h2>
          <p className="text-xl text-stone-400 mb-12 max-w-2xl mx-auto">
            {t('about_page.cta_final_desc')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="https://wa.me/573233207532" target="_blank" rel="noopener noreferrer"
              className="group px-10 py-5 text-white font-black rounded-2xl flex items-center justify-center text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(145deg, #8c1e1e, #6e1515)',
                boxShadow: '8px 8px 16px #0e0d0b, -4px -4px 12px #302c26, inset 0 1px 0 rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.08)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'inset 4px 4px 8px rgba(0,0,0,0.4), inset -4px -4px 8px rgba(255,255,255,0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '8px 8px 16px #0e0d0b, -4px -4px 12px #302c26, inset 0 1px 0 rgba(255,255,255,0.1)';
              }}
            >
              {t('about_page.cta_final_btn')} <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
