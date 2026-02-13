import React, { useState } from 'react';
import { Heart, Hand, ShieldCheck, TrendingUp, Info, CheckCircle, Smartphone, Users2, Sparkles, GraduationCap } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import SEO from '../components/SEO';

const GetInvolved: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'donate' | 'volunteer'>('donate');
  const { t } = useTranslation();

  const reasons = t('get_involved_page.invest_project.reasons', { returnObjects: true }) as string[];
  const personalGroups = t('get_involved_page.personal_contributions.groups', { returnObjects: true }) as string[];
  const impactItems = t('get_involved_page.impact_collection.items', { returnObjects: true }) as string[];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <SEO
        title={t('seo.get_involved.title')}
        description={t('seo.get_involved.description')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Intro Section */}
        <div className="text-center pt-20 mb-12">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm text-slate-500 px-4 py-1.5 rounded-full mb-8 border border-slate-200 shadow-sm transition-all hover:border-samval-guinda/30">
            <ShieldCheck size={16} className="text-samval-guinda" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{t('get_involved_page.esal_tag')}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-none">
            {t('get_involved_page.hero_title')}
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
            <Trans i18nKey="get_involved_page.hero_desc" components={{ 1: <strong className="text-slate-900" /> }} />
          </p>
        </div>

        {/* Toggle Custom */}
        <div className="flex justify-center mb-16">
          <div className="bg-white p-2 rounded-3xl shadow-xl shadow-slate-200/50 inline-flex border border-slate-100">
            <button
              onClick={() => setActiveTab('donate')}
              className={`px-12 py-4 rounded-2xl text-base font-black transition-all duration-500 ${activeTab === 'donate'
                ? 'bg-samval-guinda text-white shadow-lg shadow-samval-guinda/20 scale-[1.02]'
                : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              {t('get_involved_page.tabs.donate')}
            </button>
            <button
              onClick={() => setActiveTab('volunteer')}
              className={`px-12 py-4 rounded-2xl text-base font-black transition-all duration-500 ${activeTab === 'volunteer'
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-[1.02]'
                : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              {t('get_involved_page.tabs.volunteer')}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'donate' ? (
            <div className="space-y-12 animate-fade-in">

              {/* SECTION 1: EMPRESAS (Sierra Nevada - Propuesta Arhuaca) */}
              <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 overflow-hidden border border-slate-100 group">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr]">
                  <div className="p-10 lg:p-16">
                    <div className="inline-flex items-center space-x-2 bg-red-50 text-samval-guinda px-4 py-2 rounded-full mb-8">
                      <TrendingUp size={16} strokeWidth={3} />
                      <span className="text-xs font-black uppercase tracking-widest">{t('get_involved_page.invest_project.tag')}</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-[1.1] font-primary tracking-tight">{t('get_involved_page.invest_project.title')}</h2>
                    <p className="text-lg text-slate-500 mb-12 leading-relaxed font-medium">
                      <Trans i18nKey="get_involved_page.invest_project.description" components={{ 1: <strong className="text-slate-900" /> }} />
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 mb-12">
                      <div className="flex items-start space-x-4 group/item">
                        <CheckCircle className="text-samval-guinda mt-1 shrink-0 group-hover/item:scale-110 transition-transform" size={20} />
                        <span className="text-base text-slate-700 font-medium">
                          <Trans i18nKey="get_involved_page.invest_project.details.equipment" components={{ 0: <strong className="font-black" /> }} />
                        </span>
                      </div>
                      <div className="flex items-start space-x-4 group/item">
                        <CheckCircle className="text-samval-guinda mt-1 shrink-0 group-hover/item:scale-110 transition-transform" size={20} />
                        <span className="text-base text-slate-700 font-medium">
                          <Trans i18nKey="get_involved_page.invest_project.details.capacity" components={{ 0: <strong className="font-black" /> }} />
                        </span>
                      </div>
                      <div className="flex items-start space-x-4 group/item">
                        <CheckCircle className="text-samval-guinda mt-1 shrink-0 group-hover/item:scale-110 transition-transform" size={20} />
                        <span className="text-base text-slate-700 font-medium">
                          <Trans i18nKey="get_involved_page.invest_project.details.sustainability" components={{ 0: <strong className="font-black" /> }} />
                        </span>
                      </div>
                      <div className="flex items-start space-x-4 group/item">
                        <CheckCircle className="text-samval-guinda mt-1 shrink-0 group-hover/item:scale-110 transition-transform" size={20} />
                        <span className="text-base text-slate-700 font-medium">
                          <Trans i18nKey="get_involved_page.invest_project.details.impact" components={{ 0: <strong className="font-black" /> }} />
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 bg-slate-50/80 p-8 rounded-[2rem] border border-slate-100/50">
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[.25em] mb-4">{t('get_involved_page.invest_project.why_invest_title')}</h4>
                      <ul className="text-sm font-bold text-slate-600 space-y-3">
                        {reasons.map((reason, idx) => (
                          <li key={idx} className="flex items-center justify-between group/li">
                            <span className="group-hover/li:text-slate-900 transition-colors">{reason}</span>
                            <span className="w-2 h-2 bg-samval-guinda rounded-full scale-50 group-hover/li:scale-100 transition-transform" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-[#0f172a] p-10 lg:p-16 text-white flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-samval-guinda/20 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                    <div className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
                      <div className="flex items-center justify-between mb-8 opacity-80">
                        <p className="text-xs font-black text-samval-accent uppercase tracking-[0.2em]">{t('get_involved_page.budget_card.total_investment')}</p>
                        <ShieldCheck className="text-samval-accent" size={24} />
                      </div>
                      <p className="text-7xl font-black mb-4 tracking-tighter leading-none">{t('get_involved_page.budget_card.total_amount')}</p>
                      <p className="text-slate-400 text-sm mb-12 font-medium leading-relaxed">{t('get_involved_page.budget_card.description')}</p>

                      <div className="space-y-6 mb-12">
                        <div className="flex justify-between items-end border-b border-white/10 pb-4">
                          <div>
                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{t('get_involved_page.budget_card.tax_savings')}</p>
                            <p className="text-2xl font-black text-samval-accent">-$60.000.000</p>
                          </div>
                          <span className="text-[10px] bg-samval-guinda px-3 py-1.5 rounded-full text-white font-black tracking-widest">{t('get_involved_page.budget_card.discount')}</span>
                        </div>
                        <div className="flex justify-between items-end pt-2">
                          <div>
                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{t('get_involved_page.budget_card.net_cost')}</p>
                            <p className="text-5xl font-black tracking-tighter">{t('get_involved_page.budget_card.net_amount')}</p>
                          </div>
                        </div>
                      </div>

                      <a
                        href="https://wa.me/573233207532"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-5 bg-samval-guinda text-white text-lg font-black rounded-2xl hover:bg-[#962121] transition-all shadow-2xl shadow-samval-guinda/30 flex items-center justify-center group/btn"
                      >
                        <span className="group-hover:scale-105 transition-transform">{t('get_involved_page.budget_card.cta_button')}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Breakdown detail from PDF */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
                {Object.entries(t('get_involved_page.breakdown', { returnObjects: true })).map(([key, value]: [string, any]) => {
                  const icons: Record<string, React.ReactNode> = {
                    tech: <Smartphone className="text-samval-guinda" size={24} />,
                    talent: <Users2 className="text-samval-guinda" size={24} />,
                    logistics: <TrendingUp className="text-samval-guinda" size={24} />,
                    eval: <ShieldCheck className="text-samval-guinda" size={24} />,
                  };
                  return (
                    <div key={key} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-samval-guinda/5 transition-colors">
                        {icons[key] || <Info className="text-samval-guinda" size={24} />}
                      </div>
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[.25em] mb-4">{value.title}</h5>
                      <p className="text-sm text-slate-600 font-bold leading-relaxed">{value.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* BOTTOM CARDS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
                {/* Personas Naturales */}
                <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white flex flex-col justify-between shadow-2xl shadow-slate-900/40 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-samval-guinda/20 rounded-full blur-[100px] -mr-40 -mt-40 transition-transform duration-700 group-hover:scale-110"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-10 border border-white/20 backdrop-blur-sm">
                      <Users2 size={32} className="text-samval-accent" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-black mb-8 tracking-tighter leading-none">{t('get_involved_page.personal_contributions.title')}</h3>
                    <p className="text-xl text-slate-300 mb-12 leading-relaxed font-medium">
                      <Trans i18nKey="get_involved_page.personal_contributions.description" components={{ 1: <strong className="text-white" /> }} />
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {personalGroups.map((group, idx) => (
                        <div key={idx} className="flex items-center space-x-3 bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors group/item">
                          <Sparkles size={18} className="text-samval-accent group-hover/item:rotate-12 transition-transform" />
                          <span className="font-bold text-sm tracking-wide text-slate-200">{group}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-20 space-y-6 relative z-10">
                    <button className="w-full py-6 bg-samval-guinda text-white text-xl font-black rounded-2xl hover:bg-samval-light transition-all shadow-2xl shadow-samval-guinda/30 group/btn">
                      <span className="flex items-center justify-center space-x-2">
                        <span>{t('get_involved_page.personal_contributions.monthly_btn')}</span>
                        <Heart size={20} className="group-hover/btn:scale-110 transition-transform" />
                      </span>
                    </button>
                    <p className="text-center text-[11px] text-slate-500 font-bold tracking-[0.1em] uppercase">{t('get_involved_page.personal_contributions.monthly_note')}</p>
                  </div>
                </div>

                {/* Impacto por Colección */}
                <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.05)] flex flex-col justify-between group relative overflow-hidden">
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mb-32"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-10 border border-red-100/50">
                      <GraduationCap size={32} className="text-samval-guinda" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 tracking-tighter leading-none">{t('get_involved_page.impact_collection.title')}</h3>
                    <p className="text-xl text-slate-500 mb-12 leading-relaxed font-medium">
                      {t('get_involved_page.impact_collection.description')}
                    </p>
                    <div className="space-y-2">
                      {impactItems.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-6 rounded-2xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:shadow-lg transition-all duration-300 group/impact">
                          <span className="text-slate-800 font-black text-lg tracking-tight">{item}</span>
                          <div className="w-8 h-8 rounded-full bg-samval-guinda/10 flex items-center justify-center group-hover/impact:bg-samval-guinda group-hover/impact:text-white transition-all">
                            <CheckCircle size={16} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full py-6 bg-slate-900 text-white text-xl font-black rounded-2xl hover:bg-black transition-all shadow-2xl shadow-slate-900/20 mt-20 leading-none">
                    {t('get_involved_page.impact_collection.global_btn')}
                  </button>
                </div>
              </div>

              {/* Final Footer Info */}
              <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-10 border border-slate-200 shadow-sm text-center flex flex-col md:flex-row items-center justify-center gap-10 mx-2 mt-20">
                <div className="shrink-0 w-20 h-20 bg-samval-guinda/5 rounded-3xl flex items-center justify-center">
                  <ShieldCheck size={48} className="text-samval-guinda" strokeWidth={1.5} />
                </div>
                <p className="text-slate-500 text-base max-w-3xl leading-relaxed font-bold tracking-tight text-left italic">
                  <Trans i18nKey="get_involved_page.legal_note" components={{ 0: <strong className="text-slate-900 not-italic" />, 2: <strong className="text-slate-900 not-italic" /> }} />
                </p>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/60 p-10 md:p-24 animate-fade-in border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-samval-guinda via-samval-light to-slate-900"></div>

              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-20">
                  <div className="inline-flex p-6 bg-slate-50 rounded-[2rem] mb-10 border border-slate-100">
                    <Hand size={56} className="text-samval-guinda" strokeWidth={1} />
                  </div>
                  <h2 className="text-5xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-none">{t('get_involved_page.volunteer_form.title')}</h2>
                  <p className="text-xl lg:text-2xl text-slate-500 font-medium max-w-2xl mx-auto">{t('get_involved_page.volunteer_form.subtitle')}</p>
                </div>

                <form className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-6">{t('get_involved_page.volunteer_form.area_label')}</label>
                      <div className="relative group/select">
                        <select className="w-full px-10 py-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-samval-guinda/10 focus:bg-white focus:border-samval-guinda outline-none font-bold text-lg text-slate-700 transition-all appearance-none cursor-pointer">
                          <option>{t('get_involved_page.volunteer_form.area_options.eng')}</option>
                          <option>{t('get_involved_page.volunteer_form.area_options.edu')}</option>
                          <option>{t('get_involved_page.volunteer_form.area_options.soc')}</option>
                          <option>{t('get_involved_page.volunteer_form.area_options.health')}</option>
                          <option>{t('get_involved_page.volunteer_form.area_options.comms')}</option>
                        </select>
                        <div className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover/select:text-samval-guinda transition-colors">
                          <TrendingUp size={20} className="rotate-90" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-6">{t('get_involved_page.volunteer_form.name_label')}</label>
                      <div className="relative">
                        <Users2 className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input type="text" className="w-full pl-20 pr-10 py-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-samval-guinda/10 focus:bg-white focus:border-samval-guinda outline-none font-bold text-lg placeholder:text-slate-300 text-slate-700 transition-all" placeholder={t('get_involved_page.volunteer_form.name_placeholder')} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-6">{t('get_involved_page.volunteer_form.contact_label')}</label>
                      <div className="relative">
                        <Smartphone className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input type="text" className="w-full pl-20 pr-10 py-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-samval-guinda/10 focus:bg-white focus:border-samval-guinda outline-none font-bold text-lg placeholder:text-slate-300 text-slate-700 transition-all" placeholder={t('get_involved_page.volunteer_form.contact_placeholder')} />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-6">{t('get_involved_page.volunteer_form.availability_label')}</label>
                      <div className="relative">
                        <Sparkles className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input type="text" className="w-full pl-20 pr-10 py-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-samval-guinda/10 focus:bg-white focus:border-samval-guinda outline-none font-bold text-lg placeholder:text-slate-300 text-slate-700 transition-all" placeholder={t('get_involved_page.volunteer_form.availability_placeholder')} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-16">
                    <button className="w-full py-8 bg-slate-900 text-white font-black rounded-[2rem] hover:bg-black transition-all shadow-2xl shadow-slate-900/40 text-lg uppercase tracking-[0.4em] flex items-center justify-center group/btn">
                      <span className="group-hover:scale-105 transition-transform">{t('get_involved_page.volunteer_form.submit_btn')}</span>
                    </button>
                    <p className="text-center mt-10 text-slate-400 font-bold text-sm tracking-wide">
                      {t('footer.tagline')}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default GetInvolved;
