import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    empresa: '',
    correo: '',
    nombre: '',
    apellidos: '',
    movil: '',
    pais: '',
    estado: '',
    ciudad: '',
    mensaje: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.correo || !formData.nombre || !formData.apellidos || !formData.movil || !formData.pais || !formData.estado || !formData.ciudad || !formData.mensaje) {
      setErrorMessage('Por favor completa todos los campos obligatorios (*).');
      setStatus('error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      setErrorMessage('El correo electrónico no tiene un formato válido.');
      setStatus('error');
      return;
    }

    setStatus('loading');

    const portalId = '51241676';
    const formId = '29e4165e-7246-465c-809e-93a666df2c80';
    const apiUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

    const payload = {
      fields: [
        { name: 'company', value: formData.empresa },
        { name: 'email', value: formData.correo },
        { name: 'firstname', value: formData.nombre },
        { name: 'lastname', value: formData.apellidos },
        { name: 'mobilephone', value: formData.movil },
        { name: 'country', value: formData.pais },
        { name: 'state', value: formData.estado },
        { name: 'city', value: formData.ciudad },
        { name: 'message', value: formData.mensaje }
      ],
      context: {
        pageUri: window.location.href,
        pageName: 'Formulario de Contacto — SAMVAL'
      },
      legalConsentOptions: {
        legitimateInterest: {
          value: true,
          subscriptionTypeId: 999,
          legalBasis: 'LEAD',
          text: 'SAMVAL necesita la información de contacto que nos proporcionas para ponernos en contacto contigo acerca de nuestros productos y servicios.'
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
      } else {
        const err = await response.json().catch(() => ({}));
        setErrorMessage(err.message || 'Intenta de nuevo en unos momentos.');
        setStatus('error');
      }
    } catch (error) {
      setErrorMessage('Error de conexión. Verifica tu red e intenta de nuevo.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen py-16" style={{ background: '#e0d6cc' }}>
      <SEO page="contact" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-stone-800 mb-14">{t('contact_page.title')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12 items-start">
          {/* Info Card */}
          <div className="neu-raised-lg p-10 h-full">
            <h2 className="text-2xl font-bold text-stone-800 mb-8">{t('contact_page.info_title')}</h2>
            <div className="space-y-7">
              <div className="flex items-start">
                <div className="neu-icon w-12 h-12 text-samval-guinda shrink-0 mr-5">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 mb-1">{t('contact_page.location_title')}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    <Trans i18nKey="contact_page.location_desc" components={{ br: <br /> }} />
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="neu-icon w-12 h-12 text-samval-guinda shrink-0 mr-5">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 mb-1">{t('contact_page.phone_title')}</h3>
                  <p className="text-stone-500 text-sm">+57 323 320 7532 (WhatsApp)</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="neu-icon w-12 h-12 text-samval-guinda shrink-0 mr-5">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 mb-1">{t('contact_page.email_title')}</h3>
                  <p className="text-stone-500 text-sm">info@samval.org<br />proyectos@samval.org</p>
                </div>
              </div>
            </div>
          </div>

          {/* New Custom Contact Form */}
          <div className="relative font-sans rounded-2xl p-8 sm:p-10 w-full overflow-hidden" style={{ background: '#701610', fontFamily: '"DM Sans", sans-serif' }}>
            <div className="absolute top-[-60px] right-[-60px] w-[200px] h-[200px] rounded-full pointer-events-none" style={{ background: 'rgba(193, 139, 138, 0.12)' }}></div>
            
            <div className="text-[11px] tracking-[2px] uppercase font-medium mb-2" style={{ color: '#C18B8A' }}>Fundación SAMVAL</div>
            <div className="text-[26px] font-bold text-white mb-8 leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
              Ponte en <span style={{ color: '#C18B8A' }}>Contacto</span>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10" style={{ opacity: status === 'success' ? 0.4 : 1, pointerEvents: status === 'success' ? 'none' : 'auto' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Nombre de la empresa */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[11px] font-medium tracking-[1px] uppercase" style={{ color: 'rgba(255, 255, 255, 0.55)' }}>Nombre de la empresa</label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    placeholder="Nombre de su empresa u organización..."
                    autoComplete="organization"
                    className="w-full bg-white/5 border border-white/15 rounded-[10px] px-4 py-3 text-[14px] text-white outline-none transition-all duration-200 focus:border-[#C18B8A] focus:bg-[#c18b8a]/10 placeholder:text-white/30"
                  />
                </div>

                {/* Correo */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[11px] font-medium tracking-[1px] uppercase" style={{ color: 'rgba(255, 255, 255, 0.55)' }}>Correo <span className="text-[#C18B8A]">*</span></label>
                  <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    placeholder="correo@empresa.com"
                    autoComplete="email"
                    className="w-full bg-white/5 border border-white/15 rounded-[10px] px-4 py-3 text-[14px] text-white outline-none transition-all duration-200 focus:border-[#C18B8A] focus:bg-[#c18b8a]/10 placeholder:text-white/30"
                  />
                </div>

                {/* Nombre y Apellidos */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium tracking-[1px] uppercase" style={{ color: 'rgba(255, 255, 255, 0.55)' }}>Nombre <span className="text-[#C18B8A]">*</span></label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Su nombre..."
                    autoComplete="given-name"
                    className="w-full bg-white/5 border border-white/15 rounded-[10px] px-4 py-3 text-[14px] text-white outline-none transition-all duration-200 focus:border-[#C18B8A] focus:bg-[#c18b8a]/10 placeholder:text-white/30"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium tracking-[1px] uppercase" style={{ color: 'rgba(255, 255, 255, 0.55)' }}>Apellidos <span className="text-[#C18B8A]">*</span></label>
                  <input
                    type="text"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    placeholder="Sus apellidos..."
                    autoComplete="family-name"
                    className="w-full bg-white/5 border border-white/15 rounded-[10px] px-4 py-3 text-[14px] text-white outline-none transition-all duration-200 focus:border-[#C18B8A] focus:bg-[#c18b8a]/10 placeholder:text-white/30"
                  />
                </div>

                {/* Móvil y País */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium tracking-[1px] uppercase" style={{ color: 'rgba(255, 255, 255, 0.55)' }}>Número de móvil <span className="text-[#C18B8A]">*</span></label>
                  <input
                    type="tel"
                    name="movil"
                    value={formData.movil}
                    onChange={handleChange}
                    placeholder="+57 300 000 0000"
                    autoComplete="tel"
                    className="w-full bg-white/5 border border-white/15 rounded-[10px] px-4 py-3 text-[14px] text-white outline-none transition-all duration-200 focus:border-[#C18B8A] focus:bg-[#c18b8a]/10 placeholder:text-white/30"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium tracking-[1px] uppercase" style={{ color: 'rgba(255, 255, 255, 0.55)' }}>País / Región <span className="text-[#C18B8A]">*</span></label>
                  <input
                    type="text"
                    name="pais"
                    value={formData.pais}
                    onChange={handleChange}
                    placeholder="Colombia"
                    autoComplete="country-name"
                    className="w-full bg-white/5 border border-white/15 rounded-[10px] px-4 py-3 text-[14px] text-white outline-none transition-all duration-200 focus:border-[#C18B8A] focus:bg-[#c18b8a]/10 placeholder:text-white/30"
                  />
                </div>

                {/* Estado y Ciudad */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium tracking-[1px] uppercase" style={{ color: 'rgba(255, 255, 255, 0.55)' }}>Estado o región <span className="text-[#C18B8A]">*</span></label>
                  <input
                    type="text"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    placeholder="Magdalena"
                    autoComplete="address-level1"
                    className="w-full bg-white/5 border border-white/15 rounded-[10px] px-4 py-3 text-[14px] text-white outline-none transition-all duration-200 focus:border-[#C18B8A] focus:bg-[#c18b8a]/10 placeholder:text-white/30"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium tracking-[1px] uppercase" style={{ color: 'rgba(255, 255, 255, 0.55)' }}>Ciudad <span className="text-[#C18B8A]">*</span></label>
                  <input
                    type="text"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                    placeholder="Santa Marta"
                    autoComplete="address-level2"
                    className="w-full bg-white/5 border border-white/15 rounded-[10px] px-4 py-3 text-[14px] text-white outline-none transition-all duration-200 focus:border-[#C18B8A] focus:bg-[#c18b8a]/10 placeholder:text-white/30"
                  />
                </div>

                {/* Mensaje */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[11px] font-medium tracking-[1px] uppercase" style={{ color: 'rgba(255, 255, 255, 0.55)' }}>Mensaje <span className="text-[#C18B8A]">*</span></label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Dinos qué necesitas..."
                    className="w-full bg-white/5 border border-white/15 rounded-[10px] px-4 py-3 text-[14px] text-white outline-none transition-all duration-200 focus:border-[#C18B8A] focus:bg-[#c18b8a]/10 placeholder:text-white/30 resize-y min-h-[96px] leading-[1.5]"
                  ></textarea>
                </div>

                {/* GDPR Text */}
                <p className="sm:col-span-2 text-[12px] leading-[1.7] p-[1rem_1.25rem] rounded-[10px] bg-black/20 border border-white/5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  SAMVAL necesita la información de contacto que nos proporcionas para ponernos en contacto contigo
                  acerca de nuestros productos y servicios. Puedes darte de baja de estas comunicaciones en cualquier
                  momento. Para obtener más información sobre cómo darte de baja, así como nuestras prácticas de
                  privacidad y el compromiso de proteger tu privacidad, consulta nuestra <a href="/privacidad" className="text-[#C18B8A] hover:underline">Política de privacidad</a>.
                </p>
              </div>
            </form>

            <div className="relative z-10">
              {status !== 'success' && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={status === 'loading'}
                  className="w-full mt-5 p-[14px] bg-white text-[14px] font-semibold border-none rounded-[10px] cursor-pointer tracking-[0.5px] transition-all duration-200 hover:bg-[#f6f6f6] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                  style={{ color: '#701610' }}
                >
                  {status === 'loading' ? (
                    <><span className="inline-block w-3 h-3 border-2 border-t-[#C18B8A] rounded-full animate-spin mr-2" style={{ borderColor: 'rgba(193, 139, 138, 0.4)', borderTopColor: '#C18B8A' }}></span>Enviando...</>
                  ) : 'Enviar'}
                </button>
              )}

              {status === 'success' && (
                <div className="mt-4 p-3 rounded-[10px] text-[13px] leading-[1.5] border" style={{ background: 'rgba(112, 22, 16, 0.6)', borderColor: 'rgba(193, 139, 138, 0.5)', color: '#f0d0cf' }}>
                  ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
                </div>
              )}

              {status === 'error' && (
                <div className="mt-4 p-3 rounded-[10px] text-[13px] leading-[1.5] border" style={{ background: 'rgba(80, 0, 0, 0.4)', borderColor: 'rgba(255, 100, 50, 0.4)', color: '#ffaa80' }}>
                  {errorMessage}
                </div>
              )}

              <div className="mt-5 text-[11px] text-center" style={{ color: 'rgba(255, 255, 255, 0.25)' }}>
                Protegido por HubSpot reCAPTCHA · <a href="/privacidad" className="hover:underline" style={{ color: 'rgba(193, 139, 138, 0.7)' }}>Política de privacidad</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
