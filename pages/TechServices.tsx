import React, { useState } from 'react';
import { Code, Smartphone, Cpu, Cloud, CheckCircle, ArrowRight, BarChart3, ShieldCheck, Zap } from 'lucide-react';

const TechServices: React.FC = () => {
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
    alert('Gracias por su interés. Nuestro equipo técnico se pondrá en contacto pronto.');
  };

  const services = [
    {
      id: "web",
      icon: Code,
      title: "Desarrollo Web Full Stack",
      description: "Creamos plataformas web robustas, escalables y seguras utilizando las últimas tecnologías (React, Node.js, Python).",
      features: ["E-commerce & Marketplaces", "Sistemas de Gestión (ERP/CRM)", "Portales Corporativos", "Dashboards Analíticos"]
    },
    {
      id: "mobile",
      icon: Smartphone,
      title: "Aplicaciones Móviles",
      description: "Desarrollo nativo y multiplataforma (React Native, Flutter) para iOS y Android, enfocados en UX/UI superior.",
      features: ["Apps de Consumo", "Apps Empresariales", "Integración de Hardware", "Mantenimiento & Soporte"]
    },
    {
      id: "ai",
      icon: Cpu,
      title: "Inteligencia Artificial & Datos",
      description: "Implementamos soluciones de IA generativa y análisis de datos para optimizar sus procesos de negocio.",
      features: ["Chatbots & Asistentes Virtuales", "Modelos Predictivos", "Procesamiento de Lenguaje Natural", "Automatización Inteligente"]
    },
    {
      id: "cloud",
      icon: Cloud,
      title: "Consultoría TI & Cloud",
      description: "Modernización de infraestructura y migración a la nube para garantizar disponibilidad y eficiencia.",
      features: ["Arquitectura AWS/Azure/GCP", "CI/CD Pipelines", "Docker & Kubernetes", "Seguridad en la Nube"]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Servicios de Desarrollo de Software</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Calidad empresarial, impacto social. Contrate nuestros servicios y transforme su negocio mientras transforma Colombia.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">¿Por qué elegir Samval Tech?</h2>
              <div className="space-y-4">
                {[
                  "Equipo Senior: Ingenieros con experiencia en startups y corporaciones globales.",
                  "Impacto Social Directo: 100% de las utilidades se reinvierten en educación.",
                  "Metodologías Ágiles: Scrum y Kanban para entregas rápidas y transparentes.",
                  "Beneficios Tributarios: Certificado de donación por una parte del servicio."
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
                <p className="text-white font-medium">"La excelencia técnica es nuestra forma de servir a la comunidad."</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800">Nuestras Soluciones</h2>
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
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Trayectoria</span>
            <h2 className="text-3xl font-bold text-slate-800 mt-2">Casos de Éxito</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              Hemos ayudado a empresas de diversos sectores a escalar su tecnología.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Caso Tirrty */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 group transition-all duration-500 hover:-translate-y-2 flex flex-col">
              <div className="h-56 relative flex items-center justify-center overflow-hidden">
                <img src="https://i.ibb.co/S4Qd27Vs/Dise-o-sin-t-tulo-2.jpg" alt="Tirrty.com Success Case" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-samval-guinda px-4 py-1.5 rounded-full text-xs font-black text-white uppercase tracking-tighter shadow-lg z-10">Proyecto: $25k USD</div>
              </div>
              <div className="p-8 flex-grow">
                <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">Tirrty.com: Expansión Global</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Lideramos la entrada táctica al mercado e-commerce de USA. Integramos tecnología de India (Dukaan) para un despliegue ágil y soporte legal.
                </p>
                <div className="bg-slate-50 p-4 rounded-2xl mb-6">
                  <p className="text-[10px] font-black text-samval-guinda uppercase tracking-widest mb-3">Impacto Técnico</p>
                  <div className="grid grid-cols-1 gap-y-2">
                    <div className="flex items-center text-[10px] font-bold text-slate-500 uppercase leading-none"><CheckCircle size={14} className="mr-2 text-samval-guinda shrink-0" /> D. Web & Apps</div>
                    <div className="flex items-center text-[10px] font-bold text-slate-500 uppercase leading-none"><CheckCircle size={14} className="mr-2 text-samval-guinda shrink-0" /> LLC Delaware</div>
                  </div>
                </div>
                <p className="text-[10px] italic text-slate-400 font-medium line-clamp-2">Beneficios: Becas STEAM rurales.</p>
              </div>
            </div>

            {/* Caso Ganadero */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 group transition-all duration-500 hover:-translate-y-2 flex flex-col">
              <div className="h-56 relative flex items-center justify-center overflow-hidden">
                <img src="https://i.ibb.co/MxW7wLg6/Dise-o-sin-t-tulo-3.jpg" alt="Agro-Tech Success Case" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-white uppercase tracking-tighter z-20 shadow-lg">Aliado Ganadero</div>
              </div>
              <div className="p-8 flex-grow">
                <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">Ecosistema Bovino: MVP Subastas</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Desarrollamos el MVP de la plataforma nacional de subastas en vivo para Magdalena, integrando biometría y trazabilidad blockchain.
                </p>
                <div className="bg-slate-50 p-4 rounded-2xl mb-6">
                  <p className="text-[10px] font-black text-samval-guinda uppercase tracking-widest mb-3">Componentes de Ingeniería</p>
                  <div className="grid grid-cols-1 gap-y-2">
                    <div className="flex items-center text-[10px] font-bold text-slate-500 uppercase leading-none"><CheckCircle size={14} className="mr-2 text-samval-guinda shrink-0" /> Subastas LIVE</div>
                    <div className="flex items-center text-[10px] font-bold text-slate-500 uppercase leading-none"><CheckCircle size={14} className="mr-2 text-samval-guinda shrink-0" /> Blockchain</div>
                  </div>
                </div>
                <p className="text-[10px] italic text-slate-400 font-medium line-clamp-2">Impacto: Salud preventiva comunitaria.</p>
              </div>
            </div>

            {/* Caso Robótica Barranquilla */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 group transition-all duration-500 hover:-translate-y-2 flex flex-col">
              <div className="h-56 relative flex items-center justify-center overflow-hidden">
                <img src="https://i.ibb.co/8DHKqmRP/Dise-o-sin-t-tulo-15.png" alt="Robótica en Comunidades Negras" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-samval-guinda px-4 py-1.5 rounded-full text-xs font-black text-white uppercase tracking-tighter shadow-lg z-20">Distrito Barranquilla</div>
              </div>
              <div className="p-8 flex-grow">
                <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">Robótica en Comunidades Negras</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Implementación de robótica educativa para elevar la calidad educativa y fomentar habilidades tecnológicas en comunidades negras del Atlántico.
                </p>
                <div className="bg-slate-50 p-4 rounded-2xl mb-6">
                  <p className="text-[10px] font-black text-samval-guinda uppercase tracking-widest mb-3">Impacto Social & TI</p>
                  <div className="grid grid-cols-1 gap-y-2">
                    <div className="flex items-center text-[10px] font-bold text-slate-500 uppercase leading-none"><CheckCircle size={14} className="mr-2 text-samval-guinda shrink-0" /> Inclusión Digital</div>
                    <div className="flex items-center text-[10px] font-bold text-slate-500 uppercase leading-none"><CheckCircle size={14} className="mr-2 text-samval-guinda shrink-0" /> Calidad Educativa</div>
                  </div>
                </div>
                <p className="text-[10px] italic text-slate-400 font-medium line-clamp-2">Meta: Incentivar el conocimiento tecnológico desde la base.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Form */}
      <div className="py-20 bg-slate-900 text-white" id="cotizar">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl border border-slate-700">
            <h2 className="text-3xl font-bold mb-8 text-center">Solicita una Cotización</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Nombre Completo</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    placeholder="Juan Pérez"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Empresa / Organización</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    placeholder="Empresa SAS"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Corporativo</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    placeholder="juan@empresa.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Tipo de Servicio</label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  >
                    <option value="web">Desarrollo Web</option>
                    <option value="mobile">App Móvil</option>
                    <option value="ai">Inteligencia Artificial</option>
                    <option value="custom">Desarrollo a Medida</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Descripción del Proyecto</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  placeholder="Cuéntanos brevemente sobre tus necesidades..."
                  required
                ></textarea>
              </div>

              <div className="text-center pt-4">
                <button type="submit" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg transform hover:-translate-y-1 w-full md:w-auto">
                  Enviar Solicitud <ArrowRight size={20} className="ml-2" />
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