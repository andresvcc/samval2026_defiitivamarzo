
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Heart, BookOpen, Activity } from 'lucide-react';
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
    { key: 'mobile', icon: Code }, // Using Code icon as placeholder, consistent with original
    { key: 'ai', icon: Code },
    { key: 'consulting', icon: Code }
  ];

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <SEO page="home" />
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-slate-900 py-12">
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.ibb.co/23vCh1H2/Gemini-Generated-Image-tvcl5gtvcl5gtvcl.png"
            alt="Paisaje Colombiano y Tecnología"
            className="w-full h-full object-cover"
          />
          {/* Degradado localizado: solo protege el texto, deja nítida la parte derecha de la foto */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <span className="inline-block py-1.5 px-4 rounded-full bg-samval-guinda/40 text-samval-accent text-xs sm:text-sm font-bold mb-6 border border-samval-guinda/50 uppercase tracking-widest backdrop-blur-sm drop-shadow-lg">
              {t('home.hero_tagline')}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
              {t('home.hero_title')}
            </h1>
            <p className="text-lg sm:text-xl text-slate-100 mb-10 leading-relaxed max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {t('home.hero_desc')}
              <span className="block mt-4 font-bold text-white border-l-4 border-samval-guinda pl-4">
                {t('home.hero_bold')}
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/donar" className="inline-flex items-center justify-center px-10 py-4 bg-samval-guinda text-white font-black rounded-2xl hover:bg-samval-dark transition-all shadow-xl shadow-samval-guinda/20 text-lg">
                {t('home.cta_invest')}
              </Link>
              <Link to="/servicios-tech" className="inline-flex items-center justify-center px-10 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-2xl hover:bg-white/20 transition-all border border-white/20 text-lg">
                {t('home.cta_services')}
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>
            {/* Structured Data for SEO */}
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

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">{t('home.mission_title')}</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-samval-guinda to-samval-accent mx-auto rounded-full"></div>
            <p className="mt-6 text-slate-600 text-lg max-w-2xl mx-auto font-medium">
              {t('home.mission_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-samval-guinda mb-8 group-hover:bg-samval-guinda group-hover:text-white transition-all">
                <BookOpen size={36} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{t('home.mission_card_title')}</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {t('home.mission_card_desc')}
              </p>
            </div>

            <div className="group bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-samval-guinda mb-8 group-hover:bg-samval-guinda group-hover:text-white transition-all">
                <Activity size={36} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{t('home.vision_card_title')}</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {t('home.vision_card_desc')}
              </p>
            </div>

            <div className="group bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-samval-guinda mb-8 group-hover:bg-samval-guinda group-hover:text-white transition-all">
                <Heart size={36} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{t('home.values_card_title')}</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {t('home.values_card_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-samval-guinda rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-samval-accent rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">{t('home.impact_title')}</h2>
              <p className="text-slate-400 text-xl mb-12 max-w-xl">
                {t('home.impact_desc')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.map((item, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 hover:border-samval-accent/50 transition-colors">
                    <p className="text-4xl font-black text-white mb-2">{item.value}+</p>
                    <p className="text-slate-500 font-bold uppercase tracking-wider text-sm">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full h-[400px] bg-white/5 rounded-[3rem] p-8 border border-white/10 shadow-3xl">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px', color: '#fff' }}
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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">{t('home.services_title')}</h2>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto mb-16">
            {t('home.services_desc')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {services.map((service, idx) => (
              <div key={idx} className="group p-8 bg-slate-50 rounded-[2rem] hover:bg-white hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:-translate-y-2">
                <div className="w-14 h-14 bg-red-50 text-samval-guinda rounded-2xl flex items-center justify-center mb-6 group-hover:bg-samval-guinda group-hover:text-white transition-colors duration-300">
                  <service.icon size={28} />
                </div>
                <h3 className="font-black text-xl text-slate-900 mb-4 tracking-tight">{t(`home.services_list.${service.key}`)}</h3>
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
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-samval-guinda opacity-95"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight italic">{t('home.cta_bottom_title')}</h2>
          <p className="text-red-50 text-xl md:text-2xl mb-12 font-medium">
            {t('home.cta_bottom_desc')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/donar" className="px-12 py-5 bg-white text-samval-guinda font-black rounded-2xl hover:scale-105 transition-all shadow-2xl text-lg uppercase tracking-widest">
              {t('home.cta_donate_now')}
            </Link>
            <Link to="/voluntariado" className="px-12 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all border border-white/10 shadow-2xl text-lg uppercase tracking-widest">
              {t('home.cta_volunteer')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
