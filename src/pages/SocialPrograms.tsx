
import React from 'react';
import { Book, Users } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import SEO from '../components/SEO';

const SocialPrograms: React.FC = () => {
  const { t } = useTranslation();

  const projects = [
    {
      title: t('social_programs_page.projects.p1_title'),
      category: t('social_programs_page.projects.p1_cat'),
      image: "https://i.ibb.co/W46TrSDw/Gemini-Generated-Image-j509xvj509xvj509.png",
      description: t('social_programs_page.projects.p1_desc'),
      impact: t('social_programs_page.projects.p1_impact')
    },
    {
      title: t('social_programs_page.projects.p2_title'),
      category: t('social_programs_page.projects.p2_cat'),
      image: "https://i.ibb.co/2Yq3L7nC/imgi-2-event-1.jpg",
      description: t('social_programs_page.projects.p2_desc'),
      impact: t('social_programs_page.projects.p2_impact')
    },
    {
      title: t('social_programs_page.projects.p3_title'),
      category: t('social_programs_page.projects.p3_cat'),
      image: "https://www.storagereview.com/wp-content/uploads/2025/02/Storagereview_news_HPE_Intel_Family_Gen12-scaled-e1739303306226-1536x814.jpg",
      description: t('social_programs_page.projects.p3_desc'),
      impact: t('social_programs_page.projects.p3_impact')
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <SEO page="projects" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 px-4">
          <span className="inline-block py-1 px-3 rounded-full bg-red-50 text-samval-guinda font-black tracking-widest uppercase text-[10px] sm:text-xs mb-4">{t('social_programs_page.tag')}</span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6">
            <Trans i18nKey="social_programs_page.title" components={{ 1: <span className="text-samval-guinda" /> }} />
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            {t('social_programs_page.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {projects.map((project, idx) => (
            <div key={idx} className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 group hover:-translate-y-2 transition-all duration-500">
              <div className="relative h-64 sm:h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-samval-guinda shadow-xl">
                  {project.category}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight leading-tight">{project.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  {project.description}
                </p>
                <div className="pt-6 border-t border-slate-100">
                  <p className="text-sm font-black text-samval-guinda uppercase tracking-widest flex items-center">
                    <Users size={20} className="mr-3" />
                    {project.impact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="bg-slate-900 rounded-[3rem] p-8 sm:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-samval-guinda/20 rounded-full blur-[100px]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-center text-white mb-12 italic">{t('social_programs_page.testimonials_title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem]">
                <p className="text-white text-xl italic mb-8 leading-relaxed">"{t('social_programs_page.testimonials.t1_quote')}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-samval-guinda rounded-2xl flex items-center justify-center text-white mr-4 shadow-lg shadow-samval-guinda/30">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="font-black text-white text-lg tracking-tight">{t('social_programs_page.testimonials.t1_author')}</p>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">{t('social_programs_page.testimonials.t1_role')}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem]">
                <p className="text-white text-xl italic mb-8 leading-relaxed">"{t('social_programs_page.testimonials.t2_quote')}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-samval-guinda rounded-2xl flex items-center justify-center text-white mr-4 shadow-lg shadow-samval-guinda/30">
                    <Book size={24} />
                  </div>
                  <div>
                    <p className="font-black text-white text-lg tracking-tight">{t('social_programs_page.testimonials.t2_author')}</p>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">{t('social_programs_page.testimonials.t2_role')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialPrograms;
