
import React from 'react';
import { Target, Users, BookOpen, Rocket, CheckCircle2, Clock, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import SEO from '../components/SEO';
import InstagramFeed from '../components/InstagramFeed';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white min-h-screen">
      <SEO page="about" />
      {/* Hero Nosotros */}
      <section className="relative py-32 bg-slate-900 overflow-hidden min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.ibb.co/LzNmC5xS/IMG-4859.jpg"
            alt="Territorio Colombiano"
            className="w-full h-full object-cover"
          />
          {/* Degradado para legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-samval-guinda/20 text-samval-light text-sm font-semibold mb-6 border border-samval-guinda/30">
              {t('about_page.hero_tag')}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
              <Trans i18nKey="about_page.hero_title" components={{ 1: <span className="text-transparent bg-clip-text bg-gradient-to-r from-samval-light to-samval-accent" /> }} />
            </h1>
            <p className="text-xl text-slate-100 mb-10 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              <Trans i18nKey="about_page.hero_desc" components={{ 1: <strong /> }} />
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://wa.me/573233207532" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-samval-guinda text-white font-bold rounded-xl hover:bg-samval-dark transition-all shadow-lg hover:shadow-samval-guinda/30">
                {t('about_page.cta_schedule')}
              </a>
              <div className="flex items-center px-4 text-slate-400 text-sm italic">
                <Clock size={16} className="mr-2" />
                {t('about_page.cta_response')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cifras y Compromisos */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center space-x-4">
              <div className="bg-red-50 p-3 rounded-lg text-samval-guinda">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">5</p>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">{t('about_page.stats.territories')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-red-50 p-3 rounded-lg text-samval-guinda">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">6</p>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">{t('about_page.stats.weeks')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-red-50 p-3 rounded-lg text-samval-guinda">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">100%</p>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">{t('about_page.stats.included')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-red-50 p-3 rounded-lg text-samval-guinda">
                <Rocket size={24} />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-800">Ready</p>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">{t('about_page.stats.ready')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Propuesta de Valor */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 font-primary">{t('about_page.how_title')}</h2>
            <p className="text-lg text-slate-600">
              <Trans i18nKey="about_page.how_desc" components={{ 1: <strong /> }} />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-red-50 text-samval-guinda rounded-xl flex items-center justify-center mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">{t('about_page.cards.culture_title')}</h3>
              <p className="text-slate-600 leading-relaxed">
                {t('about_page.cards.culture_desc')}
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-red-50 text-samval-guinda rounded-xl flex items-center justify-center mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">{t('about_page.cards.measure_title')}</h3>
              <p className="text-slate-600 leading-relaxed">
                {t('about_page.cards.measure_desc')}
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-red-50 text-samval-guinda rounded-xl flex items-center justify-center mb-6">
                <BookOpen size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">{t('about_page.cards.support_title')}</h3>
              <p className="text-slate-600 leading-relaxed">
                {t('about_page.cards.support_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Evolución / Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{t('about_page.evolution_title')}</h2>
              <p className="text-lg text-slate-600">{t('about_page.evolution_desc')}</p>
            </div>
            <div className="bg-samval-guinda text-white p-6 rounded-2xl shadow-lg transform rotate-2">
              <p className="text-sm font-semibold uppercase tracking-widest mb-1">{t('data.photos.impact_year') || 'Impacto 2024'}</p>
              <p className="text-3xl font-bold italic">{t('data.photos.real_learning') || 'Aprendizaje Real'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative mt-16 lg:mt-24">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 hidden lg:block"></div>

            {[
              { year: "2019", title: t('about_page.timeline.2019_title'), desc: t('about_page.timeline.2019_desc') },
              { year: "2021", title: t('about_page.timeline.2021_title'), desc: t('about_page.timeline.2021_desc') },
              { year: "2024", title: t('about_page.timeline.2024_title'), desc: t('about_page.timeline.2024_desc') }
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-white border-4 border-samval-guinda rounded-[2rem] flex items-center justify-center text-samval-guinda font-black text-2xl mb-8 shadow-xl group-hover:bg-samval-guinda group-hover:text-white transition-all transform group-hover:rotate-6">
                  {item.year}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-600 italic text-lg leading-relaxed">"{item.desc}"</p>
                {idx < 2 && <div className="h-16 w-1 bg-slate-100 lg:hidden mt-8"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <InstagramFeed />

      {/* CTA Final */}
      <section className="py-20 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-samval-guinda/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">{t('about_page.cta_final_title')}</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            {t('about_page.cta_final_desc')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="https://wa.me/573233207532" target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-samval-guinda text-white font-black rounded-2xl hover:bg-samval-light transition-all shadow-2xl flex items-center justify-center text-lg">
              {t('about_page.cta_final_btn')} <ArrowRight className="ml-2" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
