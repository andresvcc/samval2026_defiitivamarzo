import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    subject: 'general',
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subjectLabel = t(`contact_page.subject_options.${formData.subject}`);
    const mailtoLink = `mailto:info@fundacionsamval.org?subject=${encodeURIComponent(subjectLabel)} - de ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <SEO page="contact" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-12">{t('contact_page.title')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Info Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm h-full">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">{t('contact_page.info_title')}</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0 mr-4">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{t('contact_page.location_title')}</h3>
                  <p className="text-slate-600">
                    <Trans i18nKey="contact_page.location_desc" components={{ br: <br /> }} />
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0 mr-4">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{t('contact_page.phone_title')}</h3>
                  <p className="text-slate-600">+57 323 320 7532 (WhatsApp)</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 shrink-0 mr-4">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{t('contact_page.email_title')}</h3>
                  <p className="text-slate-600">info@fundacionsamval.org<br />proyectos@fundacionsamval.org</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm h-full">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">{t('contact_page.form_title')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('contact_page.form_labels.subject')}</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="general">{t('contact_page.subject_options.general')}</option>
                  <option value="corporate">{t('contact_page.subject_options.corporate')}</option>
                  <option value="press">{t('contact_page.subject_options.press')}</option>
                  <option value="volunteer">{t('contact_page.subject_options.volunteer')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('contact_page.form_labels.name')}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('contact_page.form_labels.email')}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('contact_page.form_labels.message')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-slate-800 text-white font-bold py-3 rounded-lg hover:bg-slate-900 transition-colors flex items-center justify-center"
              >
                {t('contact_page.submit_btn')} <Send size={18} className="ml-2" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
