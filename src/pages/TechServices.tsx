
import React, { useState } from 'react';
import { Code, Smartphone, Cpu, Cloud, CheckCircle, ArrowRight, BarChart3, ShieldCheck, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

const TechServices: React.FC = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    serviceType: 'web',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mapeo de tipos de servicio
    const serviceTypeMap: { [key: string]: string } = {
      web: 'Desarrollo Web',
      mobile: 'Desarrollo Móvil',
      ai: 'Inteligencia Artificial',
      custom: 'Solución Personalizada'
    };

    const serviceTypeName = serviceTypeMap[formData.serviceType] || formData.serviceType;

    // Construir el cuerpo del email
    const emailBody = `
Solicitud de Cotización - ${serviceTypeName}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 INFORMACIÓN DEL CLIENTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nombre: ${formData.name}
${formData.company ? `Empresa: ${formData.company}` : ''}
Email: ${formData.email}
Tipo de Servicio: ${serviceTypeName}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 DESCRIPCIÓN DEL PROYECTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${formData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Este correo fue generado desde el formulario de cotizaciones de SAMVAL.
Fecha: ${new Date().toLocaleString('es-CO', { dateStyle: 'full', timeStyle: 'short' })}
    `.trim();

    // Crear el mailto link
    const mailtoLink = `mailto:jorge.jimenez@samval.org?subject=${encodeURIComponent(`Nueva Cotización: ${serviceTypeName} - ${formData.name}`)}&body=${encodeURIComponent(emailBody)}`;

    // Abrir el cliente de correo
    window.location.href = mailtoLink;

    // Limpiar el formulario después de un breve delay
    setTimeout(() => {
      setFormData({
        name: '',
        company: '',
        email: '',
        serviceType: 'web',
        message: ''
      });
    }, 500);
  };

  const services = [
    {
      id: "web",
      icon: Code,
      title: t('tech_services_page.solutions.web_title'),
      description: t('tech_services_page.solutions.web_desc'),
      features: t('tech_services_page.solutions.web_features', { returnObjects: true }) as string[]
    },
    {
      id: "mobile",
      icon: Smartphone,
      title: t('tech_services_page.solutions.mobile_title'),
      description: t('tech_services_page.solutions.mobile_desc'),
      features: t('tech_services_page.solutions.mobile_features', { returnObjects: true }) as string[]
    },
    {
      id: "ai",
      icon: Cpu,
      title: t('tech_services_page.solutions.ai_title'),
      description: t('tech_services_page.solutions.ai_desc'),
      features: t('tech_services_page.solutions.ai_features', { returnObjects: true }) as string[]
    },
    {
      id: "cloud",
      icon: Cloud,
      title: t('tech_services_page.solutions.cloud_title'),
      description: t('tech_services_page.solutions.cloud_desc'),
      features: t('tech_services_page.solutions.cloud_features', { returnObjects: true }) as string[]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO page="services" />
      {/* Header */}
      <div className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t('tech_services_page.hero_title')}</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t('tech_services_page.hero_desc')}
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">{t('tech_services_page.why_title')}</h2>
              <div className="space-y-4">
                {[
                  t('tech_services_page.why_list.senior_team'),
                  t('tech_services_page.why_list.social_impact'),
                  t('tech_services_page.why_list.agile_methodology'),
                  t('tech_services_page.why_list.tax_benefits')
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <CheckCircle className="text-emerald-500 mr-3 shrink-0 mt-1" size={20} />
                    <p className="text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://picsum.photos/id/3/800/600" alt="Equipo de desarrollo" className="object-cover w-full h-full" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-medium">"{t('tech_services_page.excellence_quote')}"</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800">{t('tech_services_page.solutions_title')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.id} id={service.id} className="scroll-mt-24 bg-white p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg mr-4">
                  <service.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">{service.title}</h3>
              </div>
              <p className="text-slate-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center text-sm text-slate-500">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Casos de Éxito Section */}
      <div id="cases" className="py-20 bg-slate-100 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">{t('tech_services_page.cases_tag')}</span>
            <h2 className="text-3xl font-bold text-slate-800 mt-2">{t('tech_services_page.cases_title')}</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              {t('tech_services_page.cases_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Caso Tirrty */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 group transition-all duration-500 hover:-translate-y-2 flex flex-col">
              <div className="h-56 relative flex items-center justify-center overflow-hidden">
                <img src="https://i.ibb.co/S4Qd27Vs/Dise-o-sin-t-tulo-2.jpg" alt="Tirrty.com Success Case" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-samval-guinda px-4 py-1.5 rounded-full text-xs font-black text-white uppercase tracking-tighter shadow-lg z-10">{t('tech_services_page.cases.tirrty_amount') || 'Proyecto: $25k USD'}</div>
              </div>
              <div className="p-8 flex-grow">
                <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">{t('tech_services_page.cases.tirrty_title')}</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  {t('tech_services_page.cases.tirrty_desc')}
                </p>
                <div className="bg-slate-50 p-4 rounded-2xl mb-6">
                  <p className="text-[10px] font-black text-samval-guinda uppercase tracking-widest mb-3">{t('tech_services_page.cases.tirrty_impact_tech')}</p>
                  <div className="grid grid-cols-1 gap-y-2">
                    {(t('tech_services_page.cases.tirrty_tech_list', { returnObjects: true }) as string[]).map((item, idx) => (
                      <div key={idx} className="flex items-center text-[10px] font-bold text-slate-500 uppercase leading-none"><CheckCircle size={14} className="mr-2 text-samval-guinda shrink-0" /> {item}</div>
                    ))}
                  </div>
                </div>
                <p className="text-[10px] italic text-slate-400 font-medium line-clamp-2">{t('tech_services_page.cases.tirrty_benefit')}</p>
              </div>
            </div>

            {/* Caso Ganadero */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 group transition-all duration-500 hover:-translate-y-2 flex flex-col">
              <div className="h-56 relative flex items-center justify-center overflow-hidden">
                <img src="https://i.ibb.co/MxW7wLg6/Dise-o-sin-t-tulo-3.jpg" alt="Agro-Tech Success Case" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-white uppercase tracking-tighter z-20 shadow-lg">{t('tech_services_page.cases.agro_tag') || 'Aliado Ganadero'}</div>
              </div>
              <div className="p-8 flex-grow">
                <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">{t('tech_services_page.cases.agro_title')}</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  {t('tech_services_page.cases.agro_desc')}
                </p>
                <div className="bg-slate-50 p-4 rounded-2xl mb-6">
                  <p className="text-[10px] font-black text-samval-guinda uppercase tracking-widest mb-3">{t('tech_services_page.cases.agro_impact_eng')}</p>
                  <div className="grid grid-cols-1 gap-y-2">
                    {(t('tech_services_page.cases.agro_tech_list', { returnObjects: true }) as string[]).map((item, idx) => (
                      <div key={idx} className="flex items-center text-[10px] font-bold text-slate-500 uppercase leading-none"><CheckCircle size={14} className="mr-2 text-samval-guinda shrink-0" /> {item}</div>
                    ))}
                  </div>
                </div>
                <p className="text-[10px] italic text-slate-400 font-medium line-clamp-2">{t('tech_services_page.cases.agro_impact')}</p>
              </div>
            </div>

            {/* Caso Robótica Barranquilla */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 group transition-all duration-500 hover:-translate-y-2 flex flex-col">
              <div className="h-56 relative flex items-center justify-center overflow-hidden">
                <img src="https://i.ibb.co/8DHKqmRP/Dise-o-sin-t-tulo-15.png" alt="Robótica en Comunidades Negras" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-samval-guinda px-4 py-1.5 rounded-full text-xs font-black text-white uppercase tracking-tighter shadow-lg z-20">{t('tech_services_page.cases.robotics_tag') || 'Distrito Barranquilla'}</div>
              </div>
              <div className="p-8 flex-grow">
                <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">{t('tech_services_page.cases.robotics_title')}</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  {t('tech_services_page.cases.robotics_desc')}
                </p>
                <div className="bg-slate-50 p-4 rounded-2xl mb-6">
                  <p className="text-[10px] font-black text-samval-guinda uppercase tracking-widest mb-3">{t('tech_services_page.cases.robotics_impact_social')}</p>
                  <div className="grid grid-cols-1 gap-y-2">
                    {(t('tech_services_page.cases.robotics_tech_list', { returnObjects: true }) as string[]).map((item, idx) => (
                      <div key={idx} className="flex items-center text-[10px] font-bold text-slate-500 uppercase leading-none"><CheckCircle size={14} className="mr-2 text-samval-guinda shrink-0" /> {item}</div>
                    ))}
                  </div>
                </div>
                <p className="text-[10px] italic text-slate-400 font-medium line-clamp-2">{t('tech_services_page.cases.robotics_goal')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Form */}
      <div className="py-20 bg-slate-900 text-white" id="cotizar">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl border border-slate-700">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('tech_services_page.form_title')}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{t('tech_services_page.form_labels.name')}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    placeholder={t('tech_services_page.form_labels.name_placeholder')}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{t('tech_services_page.form_labels.company')}</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    placeholder={t('tech_services_page.form_labels.company_placeholder')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{t('tech_services_page.form_labels.email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    placeholder={t('tech_services_page.form_labels.email_placeholder')}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{t('tech_services_page.form_labels.service_type')}</label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  >
                    <option value="web">{t('tech_services_page.form_labels.service_options.web')}</option>
                    <option value="mobile">{t('tech_services_page.form_labels.service_options.mobile')}</option>
                    <option value="ai">{t('tech_services_page.form_labels.service_options.ai')}</option>
                    <option value="custom">{t('tech_services_page.form_labels.service_options.custom')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t('tech_services_page.form_labels.project_desc')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  placeholder={t('tech_services_page.form_labels.project_desc_placeholder')}
                  required
                ></textarea>
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg transition-all shadow-lg transform w-full md:w-auto hover:from-blue-700 hover:to-blue-600 hover:-translate-y-1"
                >
                  {t('tech_services_page.form_labels.submit_btn')} <ArrowRight size={20} className="ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechServices;
