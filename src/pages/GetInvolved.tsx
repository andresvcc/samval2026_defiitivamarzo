import React, { useState, useEffect, useRef } from 'react';

import { Heart, Hand, ShieldCheck, TrendingUp, Info, CheckCircle, Smartphone, Users2, Sparkles, GraduationCap } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import SEO from '../components/SEO';

const SubscriptionButton: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderButton = () => {
      if ((window as any).paypal && containerRef.current && containerRef.current.children.length === 0) {
        (window as any).paypal.Buttons({
          style: {
            shape: 'pill',
            color: 'blue',
            layout: 'horizontal',
            label: 'subscribe'
          },
          createSubscription: function(data: any, actions: any) {
            return actions.subscription.create({
              plan_id: 'P-19Y73375FD6273356NHAMERQ'
            });
          },
          onApprove: function(data: any, actions: any) {
            alert('¡Gracias por tu apoyo! ID de suscripción: ' + data.subscriptionID);
          }
        }).render(containerRef.current);
      }
    };

    const scriptId = 'paypal-subs-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.paypal.com/sdk/js?client-id=ATC0Qg05DJbLnk3fShu4DNQ30SqzDSvGURmMXd87fg5_y55Gd7w_0LtcgYSPWu_JdIgoKEwxSEK3gOjx&vault=true&intent=subscription';
      script.setAttribute('data-sdk-integration-source', 'button-factory');
      script.async = true;
      script.onload = renderButton;
      document.body.appendChild(script);
    } else {
      if ((window as any).paypal) {
        renderButton();
      } else {
        script.addEventListener('load', renderButton);
      }
    }
  }, []);

  return <div ref={containerRef} id="paypal-button-container-P-19Y73375FD6273356NHAMERQ" className="w-[11.625rem] mx-auto min-h-[42px] flex justify-center items-center"></div>;
};

const GetInvolved: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'donate' | 'volunteer'>('donate');
  const { t } = useTranslation();

  const reasons = t('get_involved_page.invest_project.reasons', { returnObjects: true }) as string[];
  const personalGroups = t('get_involved_page.personal_contributions.groups', { returnObjects: true }) as string[];
  const impactItems = t('get_involved_page.impact_collection.items', { returnObjects: true }) as string[];



  return (
    <div className="min-h-screen pb-24" style={{ background: '#e0d6cc' }}>
      <SEO
        title={t('seo.get_involved.title')}
        description={t('seo.get_involved.description')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Intro */}
        <div className="text-center pt-20 mb-12">
          <div className="inline-flex items-center space-x-2 neu-raised-sm px-5 py-2.5 mb-8">
            <ShieldCheck size={16} className="text-samval-guinda" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">{t('get_involved_page.esal_tag')}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-stone-800 mb-8 tracking-tight leading-none">
            {t('get_involved_page.hero_title')}
          </h1>
          <p className="text-xl md:text-2xl text-stone-500 max-w-3xl mx-auto font-medium leading-relaxed">
            <Trans i18nKey="get_involved_page.hero_desc" components={{ 1: <strong className="text-stone-800" /> }} />
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-16">
          <div className="neu-pressed p-2 inline-flex">
            <button
              onClick={() => setActiveTab('donate')}
              className={`px-12 py-4 rounded-2xl text-base font-black transition-all duration-300 ${activeTab === 'donate'
                ? 'neu-btn-primary !shadow-none'
                : 'text-stone-400 hover:text-stone-600'
                }`}
            >
              {t('get_involved_page.tabs.donate')}
            </button>
            <button
              onClick={() => setActiveTab('volunteer')}
              className={`px-12 py-4 rounded-2xl text-base font-black transition-all duration-300 ${activeTab === 'volunteer'
                ? 'text-white'
                : 'text-stone-400 hover:text-stone-600'
                }`}
              style={activeTab === 'volunteer' ? {
                background: '#1e1b18',
                boxShadow: '4px 4px 8px #c4b8ac, -4px -4px 8px #f0e8e0'
              } : {}}
            >
              {t('get_involved_page.tabs.volunteer')}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'donate' ? (
            <div className="space-y-12 animate-neu-fade-in">

              {/* EMPRESAS */}
              <div className="neu-raised-lg overflow-hidden" style={{ borderRadius: '36px' }}>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr]">
                  <div className="p-10 lg:p-16">
                    <div className="inline-flex items-center space-x-2 neu-raised-sm px-5 py-2.5 mb-8">
                      <TrendingUp size={16} strokeWidth={3} className="text-samval-guinda" />
                      <span className="text-xs font-black uppercase tracking-widest text-samval-guinda">{t('get_involved_page.invest_project.tag')}</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-stone-800 mb-8 leading-[1.1] tracking-tight">{t('get_involved_page.invest_project.title')}</h2>
                    <p className="text-lg text-stone-500 mb-12 leading-relaxed font-medium">
                      <Trans i18nKey="get_involved_page.invest_project.description" components={{ 1: <strong className="text-stone-800" /> }} />
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6 mb-12">
                      {['equipment', 'capacity', 'sustainability', 'impact'].map((key) => (
                        <div key={key} className="flex items-start space-x-3 group/item">
                          <CheckCircle className="text-samval-guinda mt-1 shrink-0 group-hover/item:scale-110 transition-transform" size={18} />
                          <span className="text-base text-stone-600 font-medium">
                            <Trans i18nKey={`get_involved_page.invest_project.details.${key}`} components={{ 0: <strong className="font-black" /> }} />
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="neu-pressed p-8" style={{ borderRadius: '24px' }}>
                      <h4 className="text-[11px] font-black text-stone-400 uppercase tracking-[.25em] mb-4">{t('get_involved_page.invest_project.why_invest_title')}</h4>
                      <ul className="text-sm font-bold text-stone-500 space-y-3">
                        {reasons.map((reason, idx) => (
                          <li key={idx} className="flex items-center justify-between group/li">
                            <span className="group-hover/li:text-stone-800 transition-colors">{reason}</span>
                            <span className="w-2 h-2 bg-samval-guinda rounded-full scale-50 group-hover/li:scale-100 transition-transform" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-10 lg:p-16 text-white flex flex-col justify-center relative overflow-hidden" style={{ background: '#1e1b18' }}>
                    <div className="absolute top-0 right-0 w-80 h-80 bg-samval-guinda/15 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                    <div className="relative z-10 neu-dark-raised p-10" style={{ borderRadius: '28px' }}>
                      <div className="flex items-center justify-between mb-8 opacity-80">
                        <p className="text-xs font-black text-samval-accent uppercase tracking-[0.2em]">{t('get_involved_page.budget_card.total_investment')}</p>
                        <ShieldCheck className="text-samval-accent" size={24} />
                      </div>
                      <p className="text-7xl font-black mb-4 tracking-tighter leading-none">{t('get_involved_page.budget_card.total_amount')}</p>
                      <p className="text-stone-500 text-sm mb-12 font-medium leading-relaxed">{t('get_involved_page.budget_card.description')}</p>

                      <div className="space-y-6 mb-12">
                        <div className="flex justify-between items-end pb-4" style={{ borderBottom: '1px solid #2a2622' }}>
                          <div>
                            <p className="text-[10px] text-stone-500 font-black uppercase tracking-widest mb-1">{t('get_involved_page.budget_card.tax_savings')}</p>
                            <p className="text-2xl font-black text-samval-accent">-$60.000.000</p>
                          </div>
                          <span className="text-[10px] px-3 py-1.5 rounded-full text-white font-black tracking-widest"
                            style={{ background: 'linear-gradient(145deg, #8c1e1e, #741818)' }}
                          >{t('get_involved_page.budget_card.discount')}</span>
                        </div>
                        <div className="flex justify-between items-end pt-2">
                          <div>
                            <p className="text-[10px] text-stone-500 font-black uppercase tracking-widest mb-1">{t('get_involved_page.budget_card.net_cost')}</p>
                            <p className="text-5xl font-black tracking-tighter">{t('get_involved_page.budget_card.net_amount')}</p>
                          </div>
                        </div>
                      </div>

                      <a
                        href="https://wa.me/573233207532"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-5 text-white text-lg font-black rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-[1.02]"
                        style={{
                          background: 'linear-gradient(145deg, #8c1e1e, #741818)',
                          boxShadow: '5px 5px 10px #141210, -5px -5px 10px #282420'
                        }}
                      >
                        <span>{t('get_involved_page.budget_card.cta_button')}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
                {Object.entries(t('get_involved_page.breakdown', { returnObjects: true })).map(([key, value]: [string, any]) => {
                  const icons: Record<string, React.ReactNode> = {
                    tech: <Smartphone className="text-samval-guinda" size={22} />,
                    talent: <Users2 className="text-samval-guinda" size={22} />,
                    logistics: <TrendingUp className="text-samval-guinda" size={22} />,
                    eval: <ShieldCheck className="text-samval-guinda" size={22} />,
                  };
                  return (
                    <div key={key} className="neu-raised p-8 hover:scale-[1.02] transition-all duration-300 group" style={{ borderRadius: '24px' }}>
                      <div className="neu-icon-pressed w-12 h-12 mb-6">
                        {icons[key] || <Info className="text-samval-guinda" size={22} />}
                      </div>
                      <h5 className="text-[10px] font-black text-stone-400 uppercase tracking-[.25em] mb-4">{value.title}</h5>
                      <p className="text-sm text-stone-500 font-bold leading-relaxed">{value.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
                {/* Personas Naturales */}
                <div className="neu-raised p-12 text-white flex flex-col justify-between relative overflow-hidden group" style={{ borderRadius: '36px', background: '#801b1b', boxShadow: '10px 10px 20px #c4b8ac, -10px -10px 20px #f0e8e0' }}>
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] -mr-40 -mt-40 transition-transform duration-700 group-hover:scale-110"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 flex items-center justify-center mb-10 rounded-2xl" style={{ background: '#731818', boxShadow: 'inset 5px 5px 10px #5c1313, inset -5px -5px 10px #8a1d1d' }}>
                      <Users2 size={28} className="text-samval-accent" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-black mb-8 tracking-tighter leading-none">{t('get_involved_page.personal_contributions.title')}</h3>
                    <p className="text-xl text-stone-400 mb-12 leading-relaxed font-medium">
                      <Trans i18nKey="get_involved_page.personal_contributions.description" components={{ 1: <strong className="text-white" /> }} />
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {personalGroups.map((group, idx) => (
                        <div key={idx} className="flex items-center space-x-3 p-5 hover:scale-[1.02] transition-all duration-300 group/item rounded-2xl" style={{ background: '#8c1e1e', boxShadow: '5px 5px 10px #731818, -5px -5px 10px #992424' }}>
                          <Sparkles size={16} className="text-samval-accent group-hover/item:rotate-12 transition-transform" />
                          <span className="font-bold text-sm tracking-wide text-white">{group}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-20 space-y-6 relative z-10">
                    <div className="w-full flex justify-center items-center py-6 px-4 bg-white rounded-3xl" style={{ zIndex: 20, boxShadow: 'inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff', color: '#1c1917' }}>
                      <SubscriptionButton />
                    </div>
                    <p className="text-center text-[11px] text-stone-300 font-bold tracking-[0.1em] uppercase">{t('get_involved_page.personal_contributions.monthly_note')}</p>
                  </div>
                </div>

                {/* Impacto por Colección */}
                <div className="neu-raised-lg p-12 flex flex-col justify-between group relative overflow-hidden" style={{ borderRadius: '36px' }}>
                  <div className="relative z-10">
                    <div className="neu-icon w-16 h-16 mb-10 text-samval-guinda">
                      <GraduationCap size={28} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-black text-stone-800 mb-8 tracking-tighter leading-none">{t('get_involved_page.impact_collection.title')}</h3>
                    <p className="text-xl text-stone-500 mb-12 leading-relaxed font-medium">
                      {t('get_involved_page.impact_collection.description')}
                    </p>
                    <div className="space-y-3">
                      {impactItems.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between neu-flat p-5 hover:scale-[1.01] transition-all duration-300 group/impact" style={{ borderRadius: '16px' }}>
                          <span className="text-stone-700 font-black text-lg tracking-tight">{item}</span>
                          <div className="neu-icon-pressed w-8 h-8 text-samval-guinda group-hover/impact:text-white transition-all"
                            style={{ borderRadius: '10px' }}
                          >
                            <CheckCircle size={16} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href="https://www.paypal.com/ncp/payment/QXKY6ZSGJ8UEA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-6 text-white text-xl font-black rounded-2xl transition-all duration-300 hover:scale-[1.02] mt-20 flex justify-center items-center"
                    style={{
                      background: '#1e1b18',
                      boxShadow: '5px 5px 10px #c4b8ac, -5px -5px 10px #f0e8e0'
                    }}
                  >
                    {t('get_involved_page.impact_collection.global_btn')}
                  </a>
                </div>
              </div>

              {/* Legal Note */}
              <div className="neu-raised-lg p-10 text-center flex flex-col md:flex-row items-center justify-center gap-10 mx-2 mt-20" style={{ borderRadius: '28px' }}>
                <div className="shrink-0 neu-icon w-20 h-20 text-samval-guinda" style={{ borderRadius: '20px' }}>
                  <ShieldCheck size={40} strokeWidth={1.5} />
                </div>
                <p className="text-stone-500 text-base max-w-3xl leading-relaxed font-bold tracking-tight text-left italic">
                  <Trans i18nKey="get_involved_page.legal_note" components={{ 0: <strong className="text-stone-800 not-italic" />, 2: <strong className="text-stone-800 not-italic" /> }} />
                </p>
              </div>

            </div>
          ) : (
            <div className="neu-raised-lg p-10 md:p-24 animate-neu-fade-in relative overflow-hidden" style={{ borderRadius: '36px' }}>
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-samval-guinda via-samval-light to-stone-800"></div>

              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-20">
                  <div className="inline-flex p-6 neu-pressed mb-10" style={{ borderRadius: '24px' }}>
                    <Hand size={48} className="text-samval-guinda" strokeWidth={1} />
                  </div>
                  <h2 className="text-5xl lg:text-7xl font-black text-stone-800 mb-6 tracking-tighter leading-none">{t('get_involved_page.volunteer_form.title')}</h2>
                  <p className="text-xl lg:text-2xl text-stone-500 font-medium max-w-2xl mx-auto">{t('get_involved_page.volunteer_form.subtitle')}</p>
                </div>

                <form className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="block text-[11px] font-black text-stone-400 uppercase tracking-[0.3em] ml-2">{t('get_involved_page.volunteer_form.area_label')}</label>
                      <select className="neu-input w-full !py-5 !px-6 !text-base font-bold text-stone-600">
                        <option>{t('get_involved_page.volunteer_form.area_options.eng')}</option>
                        <option>{t('get_involved_page.volunteer_form.area_options.edu')}</option>
                        <option>{t('get_involved_page.volunteer_form.area_options.soc')}</option>
                        <option>{t('get_involved_page.volunteer_form.area_options.health')}</option>
                        <option>{t('get_involved_page.volunteer_form.area_options.comms')}</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      <label className="block text-[11px] font-black text-stone-400 uppercase tracking-[0.3em] ml-2">{t('get_involved_page.volunteer_form.name_label')}</label>
                      <div className="relative">
                        <Users2 className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                        <input type="text" className="neu-input w-full !py-5 !pl-14 !pr-6 !text-base font-bold" placeholder={t('get_involved_page.volunteer_form.name_placeholder')} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="block text-[11px] font-black text-stone-400 uppercase tracking-[0.3em] ml-2">{t('get_involved_page.volunteer_form.contact_label')}</label>
                      <div className="relative">
                        <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                        <input type="text" className="neu-input w-full !py-5 !pl-14 !pr-6 !text-base font-bold" placeholder={t('get_involved_page.volunteer_form.contact_placeholder')} />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="block text-[11px] font-black text-stone-400 uppercase tracking-[0.3em] ml-2">{t('get_involved_page.volunteer_form.availability_label')}</label>
                      <div className="relative">
                        <Sparkles className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                        <input type="text" className="neu-input w-full !py-5 !pl-14 !pr-6 !text-base font-bold" placeholder={t('get_involved_page.volunteer_form.availability_placeholder')} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-16">
                    <button className="w-full py-8 text-white font-black text-lg uppercase tracking-[0.4em] flex items-center justify-center transition-all duration-300 hover:scale-[1.01]"
                      style={{
                        background: '#1e1b18',
                        borderRadius: '24px',
                        boxShadow: '8px 8px 16px #c4b8ac, -8px -8px 16px #f0e8e0'
                      }}
                    >
                      <span>{t('get_involved_page.volunteer_form.submit_btn')}</span>
                    </button>
                    <p className="text-center mt-10 text-stone-400 font-bold text-sm tracking-wide">
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
