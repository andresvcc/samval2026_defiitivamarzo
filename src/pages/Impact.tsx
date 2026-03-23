import React from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, MapPin, Users, BookOpen, Clock, ChevronRight, Download, Activity, Globe } from 'lucide-react';
import SEO from '../components/SEO';

const Impact: React.FC = () => {
  const { t } = useTranslation();

  const metrics = [
    { icon: Users, valueKey: 'impact_page.metric_1_value', descKey: 'impact_page.metric_1_desc', labelKey: 'impact_page.metric_1' },
    { icon: Globe, valueKey: 'impact_page.metric_2_value', descKey: 'impact_page.metric_2_desc', labelKey: 'impact_page.metric_2' },
    { icon: Clock, valueKey: 'impact_page.metric_3_value', descKey: 'impact_page.metric_3_desc', labelKey: 'impact_page.metric_3' },
    { icon: BookOpen, valueKey: 'impact_page.metric_4_value', descKey: 'impact_page.metric_4_desc', labelKey: 'impact_page.metric_4' },
  ];

  const mapLocations = [
    { nameKey: 'impact_page.map_location_1', descKey: 'impact_page.map_location_1_desc' },
    { nameKey: 'impact_page.map_location_2', descKey: 'impact_page.map_location_2_desc' },
    { nameKey: 'impact_page.map_location_3', descKey: 'impact_page.map_location_3_desc' },
  ];

  const timeline = t('impact_page.timeline', { returnObjects: true }) as Array<{ year: string, event: string }>;

  return (
    <div className="pt-20 bg-samval-light min-h-screen">
      <SEO 
        title={`${t('impact_page.title')} | Fundación SAMVAL`}
        description={t('impact_page.subtitle')}
        keywords="impacto social, tecnología territorios vulnerables, robótica etnopertinente, sierra nevada, palenque"
      />

      {/* Hero Section */}
      <section className="py-20 md:py-32 relative overflow-hidden" style={{ background: '#e0d6cc' }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-samval-guinda/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-samval-accent/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <div className="inline-flex items-center space-x-2 neu-raised-sm px-5 py-2.5 mb-6">
                <BarChart size={16} className="text-samval-guinda" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-samval-guinda">{t('impact_page.tag')}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-stone-800 leading-tight mb-6 drop-shadow-sm">
                {t('impact_page.title')}
              </h1>
              <p className="text-xl text-stone-500 font-medium max-w-xl">
                {t('impact_page.subtitle')}
              </p>
            </div>
            <div className="md:w-1/2 w-full flex justify-center">
               <div className="neu-pressed-lg p-8 rounded-full flex items-center justify-center w-64 h-64 md:w-80 md:h-80 opacity-90">
                 <Activity size={120} className="text-samval-guinda animate-pulse" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Dashboard */}
      <section className="py-24" style={{ background: '#d8cecf' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-center text-stone-800 mb-16">{t('impact_page.metrics_title')}</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
             {metrics.map((metric, idx) => (
                <div key={idx} className="neu-raised-lg p-8 text-center group hover:scale-[1.02] transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 neu-pressed text-samval-guinda group-hover:text-samval-accent transition-colors">
                     <metric.icon size={32} />
                  </div>
                  <h3 className="text-5xl font-black text-stone-800 mb-2">{t(metric.valueKey)}</h3>
                  <p className="text-sm font-bold uppercase tracking-wider text-samval-guinda mb-4">{t(metric.labelKey)}</p>
                  <p className="text-stone-500 font-medium">{t(metric.descKey)}</p>
                </div>
             ))}
           </div>
        </div>
      </section>

      {/* Map Context Section */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#1e1b18' }}>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/3">
                 <div className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl mb-6"
                    style={{ background: 'rgba(128,27,27,0.2)', boxShadow: '4px 4px 8px rgba(0,0,0,0.3), -4px -4px 8px rgba(255,255,255,0.03)' }}
                  >
                    <MapPin size={16} className="text-samval-accent" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-samval-accent">TERRITORIO</span>
                  </div>
                 <h2 className="text-4xl font-black text-white mb-6">{t('impact_page.map_title')}</h2>
                 <p className="text-stone-400 text-lg mb-10">{t('impact_page.map_desc')}</p>
                 
                 <div className="space-y-8">
                   {mapLocations.map((loc, idx) => (
                     <div key={idx} className="flex gap-4">
                        <div className="mt-1">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-samval-guinda/20 text-samval-accent">
                             <MapPin size={16} />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg mb-2">{t(loc.nameKey)}</h4>
                          <p className="text-stone-400 leading-relaxed">{t(loc.descKey)}</p>
                        </div>
                     </div>
                   ))}
                 </div>
              </div>
              <div className="lg:w-2/3 neu-dark-pressed p-4 md:p-8 rounded-[32px] min-h-[500px] flex items-center justify-center relative">
                 {/* Decorative abstract map representation for now */}
                 <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #801b1b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                 <div className="relative z-10 flex flex-col items-center justify-center">
                    <Globe size={100} className="text-samval-accent/50 mb-6" />
                    <p className="text-stone-500 font-bold uppercase tracking-[0.2em]">Mapa Interactivo en Construcción</p>
                 </div>
              </div>
           </div>
         </div>
      </section>

      {/* Case Studies */}
      <section className="py-24" style={{ background: '#e0d6cc' }}>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-5xl font-black text-center text-stone-800 mb-16">{t('impact_page.cases_title')}</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
               {/* Case 1 */}
               <div className="neu-raised-lg p-10 flex flex-col h-full bg-white/40">
                  <div className="mb-6 flex-grow">
                    <h3 className="text-2xl font-black text-samval-guinda mb-4">{t('impact_page.case_1_title')}</h3>
                    <p className="text-stone-600 leading-relaxed text-lg">{t('impact_page.case_1_desc')}</p>
                  </div>
                  <div className="neu-pressed-sm p-6 mt-auto border-l-4 border-samval-accent">
                     <p className="italic text-stone-800 font-medium mb-3">"{t('impact_page.case_1_quote')}"</p>
                     <p className="text-sm font-bold text-stone-500 uppercase tracking-wider">{t('impact_page.case_1_author')}</p>
                  </div>
               </div>

               {/* Case 2 */}
               <div className="neu-raised-lg p-10 flex flex-col h-full bg-white/40">
                  <div className="mb-6 flex-grow">
                    <h3 className="text-2xl font-black text-samval-guinda mb-4">{t('impact_page.case_2_title')}</h3>
                    <p className="text-stone-600 leading-relaxed text-lg">{t('impact_page.case_2_desc')}</p>
                  </div>
                  <div className="neu-pressed-sm p-6 mt-auto border-l-4 border-samval-accent">
                     <p className="italic text-stone-800 font-medium mb-3">"{t('impact_page.case_2_quote')}"</p>
                     <p className="text-sm font-bold text-stone-500 uppercase tracking-wider">{t('impact_page.case_2_author')}</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Timeline */}
      <section className="py-24" style={{ background: '#d8cecf' }}>
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-center text-stone-800 mb-16">{t('impact_page.timeline_title')}</h2>
            
            <div className="relative">
               <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-samval-guinda/20 via-samval-guinda to-samval-accent/20 md:-translate-x-1/2 rounded-full"></div>
               
               <div className="space-y-12">
                 {Array.isArray(timeline) && timeline.map((item, idx) => (
                    <div key={idx} className={`flex flex-col md:flex-row items-center relative ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                       <div className="hidden md:flex flex-1"></div>
                       <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-samval-guinda shadow-[0_0_10px_rgba(128,27,27,0.5)] md:-translate-x-1/2 z-10 border-4 border-[#d8cecf]"></div>
                       <div className={`flex flex-1 w-full pl-12 md:pl-0 ${idx % 2 === 0 ? 'md:pr-12 md:justify-end text-left md:text-right' : 'md:pl-12 text-left'}`}>
                          <div className="neu-raised-sm p-6 w-full max-w-sm hover:-translate-y-1 transition-transform">
                             <span className="text-sm font-black text-samval-accent tracking-[0.2em] mb-2 block">{item.year}</span>
                             <p className="text-stone-700 font-medium">{item.event}</p>
                          </div>
                       </div>
                    </div>
                 ))}
               </div>
            </div>
         </div>
      </section>

      {/* Impact Report Download */}
      <section className="py-32 relative overflow-hidden flex justify-center items-center" style={{ background: '#1e1b18' }}>
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <Download size={48} className="text-samval-accent mx-auto mb-8 opacity-50" />
          <h2 className="text-4xl font-black text-white mb-6">{t('impact_page.report_title')}</h2>
          <p className="text-xl text-stone-400 mb-10 max-w-2xl mx-auto">
            {t('impact_page.report_desc')}
          </p>
          <button className="neu-dark-pressed px-12 py-5 text-stone-500 font-bold uppercase tracking-widest rounded-2xl cursor-not-allowed mb-6 opacity-70">
            {t('impact_page.report_btn')}
          </button>
          <p className="text-sm text-stone-500 max-w-xl mx-auto italic">
            {t('impact_page.report_note')}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Impact;
