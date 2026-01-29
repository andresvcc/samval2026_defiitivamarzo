import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    subject: 'Información General',
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
    const mailtoLink = `mailto:info@fundacionsamval.org?subject=${encodeURIComponent(formData.subject)} - de ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-12">Contáctanos</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Info Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm h-full">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Información General</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0 mr-4">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Ubicación Principal</h3>
                  <p className="text-slate-600">Proyectos en Territorio Nacional<br />Barranquilla - Santa Marta, Colombia</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0 mr-4">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Teléfonos</h3>
                  <p className="text-slate-600">+57 323 320 7532 (WhatsApp)</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 shrink-0 mr-4">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Correo Electrónico</h3>
                  <p className="text-slate-600">info@fundacionsamval.org<br />proyectos@fundacionsamval.org</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm h-full">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Envíanos un mensaje</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Asunto</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option>Información General</option>
                  <option>Alianzas Corporativas</option>
                  <option>Prensa</option>
                  <option>Voluntariado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
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
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
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
                <label className="block text-sm font-medium text-slate-700 mb-1">Mensaje</label>
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
                Enviar Mensaje <Send size={18} className="ml-2" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;