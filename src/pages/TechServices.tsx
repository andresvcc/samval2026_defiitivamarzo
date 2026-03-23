
import React, { useState } from 'react';
import { Code, Smartphone, Cpu, Cloud, CheckCircle, ArrowRight, BarChart3, ShieldCheck, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

const TechServices: React.FC = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    consentData: false,
    consentComms: false
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consentData) {
      setErrorMessage('Debes aceptar que SAMVAL almacene y trate tus datos personales para continuar.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    
    const portalId = '51241676';
    const formId = '3ac4b906-6c2d-403b-9e71-a2c7ab1b87c0';
    const apiUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

    const payload = {
      fields: [
        { name: 'company', value: formData.company },
        { name: 'firstname', value: formData.firstName },
        { name: 'lastname', value: formData.lastName },
        { name: 'email', value: formData.email },
        { name: 'phone', value: formData.phone },
        { name: 'message', value: formData.message }
      ],
      context: {
        pageUri: window.location.href,
        pageName: "Solicitud de Cotización — SAMVAL"
      },
      legalConsentOptions: {
        consent: {
          consentToProcess: formData.consentData,
          text: 'Acepto que SAMVAL almacene y trate mis datos personales.',
          communications: [
            {
              value: formData.consentComms,
              subscriptionTypeId: 999,
              text: 'Acepto recibir otras comunicaciones de SAMVAL.'
            }
          ]
        }
      }
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', company: '', email: '', phone: '', message: '', consentData: false, consentComms: false });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        const err = await response.json().catch(() => ({}));
        setErrorMessage(err.message || 'Intenta de nuevo en unos momentos.');
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Error de conexión. Verifica tu red e intenta de nuevo.');
      setStatus('error');
    }
  };

  const services = [
    {
      id: "web", icon: Code,
      title: t('tech_services_page.solutions.web_title'),
      description: t('tech_services_page.solutions.web_desc'),
      features: t('tech_services_page.solutions.web_features', { returnObjects: true }) as string[]
    },
    {
      id: "mobile", icon: Smartphone,
      title: t('tech_services_page.solutions.mobile_title'),
      description: t('tech_services_page.solutions.mobile_desc'),
      features: t('tech_services_page.solutions.mobile_features', { returnObjects: true }) as string[]
    },
    {
      id: "ai", icon: Cpu,
      title: t('tech_services_page.solutions.ai_title'),
      description: t('tech_services_page.solutions.ai_desc'),
      features: t('tech_services_page.solutions.ai_features', { returnObjects: true }) as string[]
    },
    {
      id: "cloud", icon: Cloud,
      title: t('tech_services_page.solutions.cloud_title'),
      description: t('tech_services_page.solutions.cloud_desc'),
      features: t('tech_services_page.solutions.cloud_features', { returnObjects: true }) as string[]
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: '#e0d6cc' }}>
      <SEO page="services" />

      {/* Header */}
      <div className="py-20" style={{ background: '#1e1b18' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t('tech_services_page.hero_title')}</h1>
          <p className="text-xl text-stone-400 max-w-3xl mx-auto">
            {t('tech_services_page.hero_desc')}
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-20" style={{ background: '#e0d6cc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-stone-800 mb-8">{t('tech_services_page.why_title')}</h2>
              <div className="space-y-4">
                {[
                  t('tech_services_page.why_list.senior_team'),
                  t('tech_services_page.why_list.social_impact'),
                  t('tech_services_page.why_list.agile_methodology'),
                  t('tech_services_page.why_list.tax_benefits')
                ].map((item, i) => (
                  <div key={i} className="flex items-start neu-flat p-4" style={{ borderRadius: '14px' }}>
                    <div className="neu-icon-pressed w-8 h-8 shrink-0 mr-4 text-samval-guinda" style={{ borderRadius: '10px' }}>
                      <CheckCircle size={16} />
                    </div>
                    <p className="text-stone-600 font-medium text-sm mt-1">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-80 overflow-hidden neu-raised-lg">
              <img src="https://picsum.photos/id/3/800/600" alt="Equipo de desarrollo" className="object-cover w-full h-full" style={{ borderRadius: '28px' }} />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6" style={{ borderRadius: '0 0 28px 28px' }}>
                <p className="text-white font-medium">"{t('tech_services_page.excellence_quote')}"</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-stone-800">{t('tech_services_page.solutions_title')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {services.map((service) => (
            <div key={service.id} id={service.id} className="scroll-mt-24 neu-raised-lg p-8 hover:scale-[1.01] transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="neu-icon w-14 h-14 text-samval-guinda mr-5">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-stone-800">{service.title}</h3>
              </div>
              <p className="text-stone-500 mb-6 leading-relaxed">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center text-sm text-stone-500">
                    <div className="w-2 h-2 bg-samval-guinda rounded-full mr-3 shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Casos de Éxito */}
      <div id="cases" className="py-20 scroll-mt-24" style={{ background: '#d8cfc5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-samval-guinda font-bold tracking-wider uppercase text-sm">{t('tech_services_page.cases_tag')}</span>
            <h2 className="text-3xl font-bold text-stone-800 mt-2">{t('tech_services_page.cases_title')}</h2>
            <p className="text-stone-500 mt-4 max-w-2xl mx-auto">
              {t('tech_services_page.cases_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Tirrty */}
            <div className="neu-raised-lg overflow-hidden group hover:scale-[1.02] transition-all duration-500 flex flex-col">
              <div className="h-56 relative overflow-hidden" style={{ borderRadius: '28px 28px 0 0' }}>
                <img src="https://i.ibb.co/S4Qd27Vs/Dise-o-sin-t-tulo-2.jpg" alt="Tirrty.com" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 neu-btn-primary !py-1.5 !px-4 !text-xs !font-black !uppercase !tracking-tighter z-10 !rounded-xl">
                  {t('tech_services_page.cases.tirrty_amount') || 'Proyecto: $25k USD'}
                </div>
              </div>
              <div className="p-8 flex-grow">
                <h3 className="text-xl font-black text-stone-800 mb-4 tracking-tight">{t('tech_services_page.cases.tirrty_title')}</h3>
                <p className="text-stone-500 text-sm mb-6 leading-relaxed">{t('tech_services_page.cases.tirrty_desc')}</p>
                <div className="neu-pressed-sm p-4 mb-6">
                  <p className="text-[10px] font-black text-samval-guinda uppercase tracking-widest mb-3">{t('tech_services_page.cases.tirrty_impact_tech')}</p>
                  <div className="grid grid-cols-1 gap-y-2">
                    {(t('tech_services_page.cases.tirrty_tech_list', { returnObjects: true }) as string[]).map((item, idx) => (
                      <div key={idx} className="flex items-center text-[10px] font-bold text-stone-500 uppercase leading-none"><CheckCircle size={14} className="mr-2 text-samval-guinda shrink-0" /> {item}</div>
                    ))}
                  </div>
                </div>
                <p className="text-[10px] italic text-stone-400 font-medium line-clamp-2">{t('tech_services_page.cases.tirrty_benefit')}</p>
              </div>
            </div>

            {/* Agro */}
            <div className="neu-raised-lg overflow-hidden group hover:scale-[1.02] transition-all duration-500 flex flex-col">
              <div className="h-56 relative overflow-hidden" style={{ borderRadius: '28px 28px 0 0' }}>
                <img src="https://i.ibb.co/MxW7wLg6/Dise-o-sin-t-tulo-3.jpg" alt="Agro-Tech" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 neu-raised-sm !px-4 !py-1.5 text-xs font-black text-stone-600 uppercase tracking-tighter z-20">{t('tech_services_page.cases.agro_tag') || 'Aliado Ganadero'}</div>
              </div>
              <div className="p-8 flex-grow">
                <h3 className="text-xl font-black text-stone-800 mb-4 tracking-tight">{t('tech_services_page.cases.agro_title')}</h3>
                <p className="text-stone-500 text-sm mb-6 leading-relaxed">{t('tech_services_page.cases.agro_desc')}</p>
                <div className="neu-pressed-sm p-4 mb-6">
                  <p className="text-[10px] font-black text-samval-guinda uppercase tracking-widest mb-3">{t('tech_services_page.cases.agro_impact_eng')}</p>
                  <div className="grid grid-cols-1 gap-y-2">
                    {(t('tech_services_page.cases.agro_tech_list', { returnObjects: true }) as string[]).map((item, idx) => (
                      <div key={idx} className="flex items-center text-[10px] font-bold text-stone-500 uppercase leading-none"><CheckCircle size={14} className="mr-2 text-samval-guinda shrink-0" /> {item}</div>
                    ))}
                  </div>
                </div>
                <p className="text-[10px] italic text-stone-400 font-medium line-clamp-2">{t('tech_services_page.cases.agro_impact')}</p>
              </div>
            </div>

            {/* Robótica */}
            <div className="neu-raised-lg overflow-hidden group hover:scale-[1.02] transition-all duration-500 flex flex-col">
              <div className="h-56 relative overflow-hidden" style={{ borderRadius: '28px 28px 0 0' }}>
                <img src="https://i.ibb.co/8DHKqmRP/Dise-o-sin-t-tulo-15.png" alt="Robótica" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 neu-btn-primary !py-1.5 !px-4 !text-xs !font-black !uppercase !tracking-tighter z-20 !rounded-xl">{t('tech_services_page.cases.robotics_tag') || 'Distrito Barranquilla'}</div>
              </div>
              <div className="p-8 flex-grow">
                <h3 className="text-xl font-black text-stone-800 mb-4 tracking-tight">{t('tech_services_page.cases.robotics_title')}</h3>
                <p className="text-stone-500 text-sm mb-6 leading-relaxed">{t('tech_services_page.cases.robotics_desc')}</p>
                <div className="neu-pressed-sm p-4 mb-6">
                  <p className="text-[10px] font-black text-samval-guinda uppercase tracking-widest mb-3">{t('tech_services_page.cases.robotics_impact_social')}</p>
                  <div className="grid grid-cols-1 gap-y-2">
                    {(t('tech_services_page.cases.robotics_tech_list', { returnObjects: true }) as string[]).map((item, idx) => (
                      <div key={idx} className="flex items-center text-[10px] font-bold text-stone-500 uppercase leading-none"><CheckCircle size={14} className="mr-2 text-samval-guinda shrink-0" /> {item}</div>
                    ))}
                  </div>
                </div>
                <p className="text-[10px] italic text-stone-400 font-medium line-clamp-2">{t('tech_services_page.cases.robotics_goal')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Form */}
      <div className="py-20 flex justify-center" id="cotizar" style={{ background: '#1e1b18' }}>
        <div className="w-full max-w-[720px] px-4 sm:px-6 lg:px-8">
          <div className="relative font-sans rounded-[16px] p-8 sm:p-10 w-full overflow-hidden" style={{ background: '#701610', fontFamily: '"DM Sans", sans-serif' }}>
            <div className="absolute top-[-60px] right-[-60px] w-[200px] h-[200px] rounded-full pointer-events-none" style={{ background: 'rgba(193, 139, 138, 0.12)' }}></div>
            
            <div className="text-[11px] tracking-[2px] uppercase font-medium mb-2" style={{ color: '#C18B8A' }}>Fundación SAMVAL</div>
            <div className="text-[26px] font-bold text-white mb-8 leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
              Solicite una <span style={{ color: '#C18B8A' }}>Cotización</span>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Nombre de la empresa */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[11px] font-medium tracking-[1px] uppercase" style={{ color: 'rgba(255, 255, 255, 0.55)' }}>Nombre de la empresa</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Nombre de su empresa u organización..."
                    className="w-full bg-white/5 border border-white/15 rounded-[10px] px-4 py-3 text-[14px] text-white outline-none transition-all duration-200 focus:border-[#C18B8A] focus:bg-[#c18b8a]/10 placeholder:text-white/30"
                  />
                </div>

                {/* Nombre y Apellidos */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium tracking-[1px] uppercase" style={{ color: 'rgba(255, 255, 255, 0.55)' }}>Nombre <span className="text-[#C18B8A] ml-0.5">*</span></label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Su nombre..."
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-[10px] px-4 py-3 text-[14px] text-white outline-none transition-all duration-200 focus:border-[#C18B8A] focus:bg-[#c18b8a]/10 placeholder:text-white/30"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium tracking-[1px] uppercase" style={{ color: 'rgba(255, 255, 255, 0.55)' }}>Apellidos <span className="text-[#C18B8A] ml-0.5">*</span></label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Sus apellidos..."
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-[10px] px-4 py-3 text-[14px] text-white outline-none transition-all duration-200 focus:border-[#C18B8A] focus:bg-[#c18b8a]/10 placeholder:text-white/30"
                  />
                </div>

                {/* Correo */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[11px] font-medium tracking-[1px] uppercase" style={{ color: 'rgba(255, 255, 255, 0.55)' }}>Correo <span className="text-[#C18B8A] ml-0.5">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="correo@empresa.com"
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-[10px] px-4 py-3 text-[14px] text-white outline-none transition-all duration-200 focus:border-[#C18B8A] focus:bg-[#c18b8a]/10 placeholder:text-white/30"
                  />
                </div>

                {/* Número de teléfono */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[11px] font-medium tracking-[1px] uppercase" style={{ color: 'rgba(255, 255, 255, 0.55)' }}>Número de teléfono <span className="text-[#C18B8A] ml-0.5">*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+57 300 000 0000"
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-[10px] px-4 py-3 text-[14px] text-white outline-none transition-all duration-200 focus:border-[#C18B8A] focus:bg-[#c18b8a]/10 placeholder:text-white/30"
                  />
                </div>

                {/* Mensaje */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[11px] font-medium tracking-[1px] uppercase" style={{ color: 'rgba(255, 255, 255, 0.55)' }}>Mensaje <span className="text-[#C18B8A] ml-0.5">*</span></label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Dinos qué necesitas..."
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-[10px] px-4 py-3 text-[14px] text-white outline-none transition-all duration-200 focus:border-[#C18B8A] focus:bg-[#c18b8a]/10 placeholder:text-white/30 resize-y min-h-[100px] leading-[1.5]"
                  ></textarea>
                </div>

                {/* GDPR */}
                <div className="flex flex-col gap-3 sm:col-span-2 mt-1 p-4 rounded-[10px] border border-white/10" style={{ background: 'rgba(0,0,0,0.2)' }}>
                  <p className="text-[12px] leading-[1.6] mb-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    SAMVAL se compromete a proteger y respetar tu privacidad, y solo usaremos tu información personal para administrar tu cuenta y proporcionar los productos y servicios que nos solicitaste.
                  </p>
                  
                  <div className="flex items-start gap-[10px]">
                    <input
                      type="checkbox"
                      id="consentComms"
                      name="consentComms"
                      checked={formData.consentComms}
                      onChange={handleCheckboxChange}
                      className="mt-[2px] w-[16px] min-w-[16px] h-[16px] cursor-pointer bg-transparent border-none appearance-auto p-0"
                      style={{ accentColor: '#C18B8A' }}
                    />
                    <label htmlFor="consentComms" className="text-[12px] leading-[1.5] cursor-pointer font-normal" style={{ color: 'rgba(255,255,255,0.6)', textTransform: 'none', letterSpacing: '0' }}>
                      Acepto recibir otras comunicaciones de SAMVAL.
                    </label>
                  </div>

                  <div className="flex items-start gap-[10px]">
                    <input
                      type="checkbox"
                      id="consentData"
                      name="consentData"
                      checked={formData.consentData}
                      onChange={handleCheckboxChange}
                      required
                      className="mt-[2px] w-[16px] min-w-[16px] h-[16px] cursor-pointer bg-transparent border-none appearance-auto p-0"
                      style={{ accentColor: '#C18B8A' }}
                    />
                    <label htmlFor="consentData" className="text-[12px] leading-[1.5] cursor-pointer font-normal" style={{ color: 'rgba(255,255,255,0.6)', textTransform: 'none', letterSpacing: '0' }}>
                      Acepto que SAMVAL almacene y trate mis datos personales. <span className="text-[#C18B8A] ml-0.5 text-[12px]">*</span>
                    </label>
                  </div>

                  <p className="text-[12px] leading-[1.6] mt-2 mb-0" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    Puedes darte de baja en cualquier momento. Consulta nuestra <a href="https://www.samval.org/privacidad" target="_blank" rel="noreferrer" className="no-underline hover:underline transition-all" style={{ color: 'rgba(193,139,138,0.7)' }}>Política de privacidad</a>.
                  </p>
                </div>
              </div>

              {status === 'success' ? (
                <div className="mt-4 p-4 rounded-xl text-[13px] leading-relaxed block border" style={{ background: 'rgba(112, 22, 16, 0.6)', borderColor: 'rgba(193, 139, 138, 0.5)', color: '#f0d0cf' }}>
                  ¡Solicitud enviada con éxito! Nos pondremos en contacto contigo pronto.
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full mt-5 p-[14px] bg-white text-[14px] font-semibold border-none rounded-[10px] cursor-pointer tracking-[0.5px] transition-all duration-200 hover:bg-[#f6f6f6] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                  style={{ color: '#701610' }}
                >
                  {status === 'loading' ? (
                    <><span className="inline-block w-3 h-3 border-2 border-t-[#C18B8A] rounded-full animate-spin mr-2" style={{ borderColor: 'rgba(193, 139, 138, 0.4)',  borderTopColor: '#C18B8A' }}></span>Enviando a HubSpot...</>
                  ) : 'Enviar'}
                </button>
              )}

              {status === 'error' && (
                <div className="mt-4 p-3 rounded-xl text-[13px] leading-relaxed block border" style={{ background: 'rgba(80, 0, 0, 0.4)', borderColor: 'rgba(255, 100, 50, 0.4)', color: '#ffaa80' }}>
                  Error al enviar: {errorMessage}
                </div>
              )}

              <div className="mt-5 text-[11px] text-center" style={{ color: 'rgba(255, 255, 255, 0.25)' }}>
                Protegido por HubSpot reCAPTCHA · <a href="https://www.samval.org/privacidad" target="_blank" rel="noreferrer" className="no-underline hover:underline" style={{ color: 'rgba(193,139,138,0.7)' }}>Política de privacidad</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechServices;
