import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Download, FileText, Lock, Globe, FileKey, Layers } from 'lucide-react';
import SEO from '../components/SEO';

const Resources: React.FC = () => {
  const { t } = useTranslation();

  const guides = [
    { titleKey: 'resources_page.guide_1_title', descKey: 'resources_page.guide_1_desc', statusKey: 'resources_page.guide_1_status', icon: FileText },
    { titleKey: 'resources_page.guide_2_title', descKey: 'resources_page.guide_2_desc', statusKey: 'resources_page.guide_2_status', icon: FileKey },
    { titleKey: 'resources_page.guide_3_title', descKey: 'resources_page.guide_3_desc', statusKey: 'resources_page.guide_3_status', icon: Layers },
  ];

  const modules = [
    { titleKey: 'resources_page.module_arahuaco_title', descKey: 'resources_page.module_arahuaco_desc', icon: Globe },
    { titleKey: 'resources_page.module_palenquero_title', descKey: 'resources_page.module_palenquero_desc', icon: BookOpen },
  ];

  return (
    <div className="pt-20 bg-samval-light min-h-screen">
      <SEO 
        title={`${t('resources_page.title')} | Fundación SAMVAL`}
        description={t('resources_page.subtitle')}
        keywords="recursos robótica educativa, guías steam indígenas, robótica etnopertinente, palenque, arahuaco"
      />

      {/* Hero Section */}
      <section className="py-20 md:py-32 relative overflow-hidden" style={{ background: '#e0d6cc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 neu-raised-sm px-5 py-2.5 mb-6">
            <BookOpen size={16} className="text-samval-guinda" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-samval-guinda">{t('resources_page.tag')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-stone-800 leading-tight mb-6 drop-shadow-sm max-w-4xl mx-auto">
            {t('resources_page.title')}
          </h1>
          <p className="text-xl text-stone-500 font-medium max-w-2xl mx-auto">
            {t('resources_page.subtitle')}
          </p>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-24" style={{ background: '#d8cecf' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-center text-stone-800 mb-16">{t('resources_page.guides_title')}</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {guides.map((guide, idx) => (
                <div key={idx} className="neu-raised-lg p-8 flex flex-col h-full group hover:translate-y-[-4px] transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-stone-200/50 text-samval-guinda neu-pressed-sm">
                     <guide.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-stone-800 mb-4">{t(guide.titleKey)}</h3>
                  <p className="text-stone-500 mb-8 flex-grow">{t(guide.descKey)}</p>
                  
                  <div className="neu-pressed p-4 rounded-xl flex items-center justify-between mt-auto">
                     <span className="text-xs font-bold uppercase tracking-wider text-samval-accent flex items-center gap-2">
                        <Lock size={14} />
                        {t('resources_page.coming_soon')}
                     </span>
                     <span className="text-sm font-medium text-stone-600 block sm:hidden md:block">
                        {t(guide.statusKey).split('—')[1] || ''}
                     </span>
                  </div>
                </div>
             ))}
           </div>
        </div>
      </section>

      {/* Modules by Community */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#1e1b18' }}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-samval-guinda/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-samval-accent/10 rounded-full blur-[150px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <h2 className="text-3xl font-black text-center text-white mb-16">{t('resources_page.modules_title')}</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             {modules.map((mod, idx) => (
                <div key={idx} className="neu-dark-raised p-10 flex flex-col sm:flex-row gap-8 items-start hover:scale-[1.02] transition-transform duration-300">
                  <div className="w-20 h-20 shrink-0 rounded-[20px] flex items-center justify-center bg-samval-guinda/10 text-samval-accent"
                    style={{ boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.3), inset -2px -2px 4px rgba(255,255,255,0.03)' }}
                  >
                     <mod.icon size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-4">{t(mod.titleKey)}</h3>
                    <p className="text-stone-400 leading-relaxed mb-6">{t(mod.descKey)}</p>
                    <button className="flex items-center gap-2 px-6 py-3 neu-dark-pressed rounded-xl text-stone-400 font-bold uppercase tracking-wider text-sm cursor-not-allowed opacity-80">
                      <Lock size={16} />
                      {t('resources_page.coming_soon')}
                    </button>
                  </div>
                </div>
             ))}
           </div>
        </div>
      </section>

      {/* License Footer */}
      <section className="py-16 text-center" style={{ background: '#e0d6cc' }}>
         <p className="text-stone-500 font-medium max-w-2xl mx-auto px-4">
            {t('resources_page.license_text')}
         </p>
      </section>
    </div>
  );
};

export default Resources;
