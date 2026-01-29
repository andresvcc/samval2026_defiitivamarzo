import React, { useState } from 'react';
import { Heart, Hand, ShieldCheck, TrendingUp, Info, CheckCircle, Smartphone, Users2, Sparkles, GraduationCap } from 'lucide-react';

const GetInvolved: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'donate' | 'volunteer'>('donate');

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Intro Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-slate-200 text-slate-700 px-4 py-1.5 rounded-full mb-6 border border-slate-300">
            <ShieldCheck size={16} className="text-samval-guinda" />
            <span className="text-xs font-bold uppercase tracking-widest">Régimen Tributario Especial (ESAL)</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Inversión y Apoyo Social</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Como entidad de <strong>Régimen Especial</strong>, certificamos tu aporte para que obtengas beneficios tributarios de ley mientras transformamos el territorio.
          </p>
        </div>

        {/* Toggle Custom */}
        <div className="flex justify-center mb-16">
          <div className="bg-white p-1.5 rounded-2xl shadow-md inline-flex border border-slate-200">
            <button
              onClick={() => setActiveTab('donate')}
              className={`px-10 py-4 rounded-xl text-sm md:text-md font-black transition-all duration-300 ${activeTab === 'donate'
                ? 'bg-samval-guinda text-white shadow-xl scale-105'
                : 'text-slate-500 hover:text-samval-guinda'
                }`}
            >
              Empresas y Personas
            </button>
            <button
              onClick={() => setActiveTab('volunteer')}
              className={`px-10 py-4 rounded-xl text-sm md:text-md font-black transition-all duration-300 ${activeTab === 'volunteer'
                ? 'bg-slate-900 text-white shadow-xl scale-105'
                : 'text-slate-500 hover:text-slate-900'
                }`}
            >
              Ser Voluntario
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'donate' ? (
            <div className="space-y-16 animate-fade-in">

              {/* SECTION 1: EMPRESAS (Sierra Nevada - Propuesta Air-e) */}
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8 lg:p-12">
                    <div className="inline-flex items-center space-x-2 bg-red-50 text-samval-guinda px-4 py-2 rounded-full mb-6">
                      <TrendingUp size={18} />
                      <span className="text-sm font-bold uppercase tracking-wider">Inversión con Propósito 2026</span>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-6 font-primary">Proyecto de Formación STEAM: Comunidad Arhuaca</h2>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                      Un programa integral de <strong>12 semanas</strong> diseñado para fortalecer competencias en Ciencia, Tecnología, Ingeniería, Artes y Matemáticas en 30 niños y niñas de la Sierra Nevada (Vereda Don Diego).
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="text-samval-guinda mt-1 shrink-0" size={18} />
                        <span className="text-sm text-slate-700"><strong>Dotación:</strong> 30 robots Thymio Wireless.</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="text-samval-guinda mt-1 shrink-0" size={18} />
                        <span className="text-sm text-slate-700"><strong>Capacidad:</strong> 3 docentes locales entrenados.</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="text-samval-guinda mt-1 shrink-0" size={18} />
                        <span className="text-sm text-slate-700"><strong>Sostenibilidad:</strong> Equipamiento permanente.</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="text-samval-guinda mt-1 shrink-0" size={18} />
                        <span className="text-sm text-slate-700"><strong>Impacto:</strong> 3 escuelas públicas beneficiadas.</span>
                      </div>
                    </div>

                    <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">¿Por qué invertir en este proyecto?</h4>
                      <ul className="text-sm text-slate-600 space-y-2">
                        <li className="flex items-center justify-between">
                          <span>Retorno Reputacional (RSE)</span>
                          <span className="w-1.5 h-1.5 bg-samval-guinda rounded-full" />
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Alineación con ODS (Calidad Educativa)</span>
                          <span className="w-1.5 h-1.5 bg-samval-guinda rounded-full" />
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Viabilidad Operativa y Transparencia</span>
                          <span className="w-1.5 h-1.5 bg-samval-guinda rounded-full" />
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-8 lg:p-12 text-white flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-samval-guinda/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="relative z-10 bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl">
                      <div className="flex items-center justify-between mb-6">
                        <p className="text-sm font-bold text-samval-accent uppercase tracking-widest">Inversión Total</p>
                        <ShieldCheck className="text-samval-accent" size={24} />
                      </div>
                      <p className="text-5xl font-black mb-2">$240M</p>
                      <p className="text-slate-400 text-sm mb-8">Presupuesto consolidado que cubre tecnología, talento humano especializado y logística.</p>

                      <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-end border-b border-white/10 pb-2">
                          <div>
                            <p className="text-xs text-slate-500 uppercase">Ahorro Tributario (Art. 257 ET)</p>
                            <p className="text-xl font-bold text-samval-accent">-$60.000.000</p>
                          </div>
                          <span className="text-xs bg-samval-guinda px-2 py-1 rounded text-white font-bold">25% DTO.</span>
                        </div>
                        <div className="flex justify-between items-end pt-2">
                          <div>
                            <p className="text-xs text-slate-500 uppercase">Costo Económico Neto</p>
                            <p className="text-3xl font-black">$180M</p>
                          </div>
                        </div>
                      </div>

                      <a href="https://wa.me/573233207532" target="_blank" rel="noopener noreferrer" className="w-full py-4 bg-samval-guinda text-white font-black rounded-xl hover:bg-samval-light transition-all shadow-xl flex items-center justify-center">
                        Solicitar Propuesta Técnica
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Breakdown detail from PDF */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-3 text-center">Tecnología ($63M)</p>
                  <p className="text-sm text-slate-600">30 robots Thymio, kits de expansión y materiales de construcción permanente.</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-3 text-center">Talento ($105M)</p>
                  <p className="text-sm text-slate-600">Especialistas STEAM, formación de 3 docentes locales y gestión académica.</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-3 text-center">Logística ($25M)</p>
                  <p className="text-sm text-slate-600">Acondicionamiento de espacios, transporte y alimentación 12 semanas.</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-3 text-center">Evaluación ($7M)</p>
                  <p className="text-sm text-slate-600">Monitoreo con indicadores de éxito y seguimiento post-proyecto a 12 meses.</p>
                </div>
              </div>

              {/* SECTION 2: PERSONAS NATURALES (Educación Avanzada) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-samval-guinda p-10 rounded-[3rem] text-white flex flex-col justify-between">
                  <div>
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                      <Users2 size={32} className="text-samval-accent" />
                    </div>
                    <h3 className="text-3xl font-bold mb-6">Aportes Personales</h3>
                    <p className="text-lg text-red-50/80 mb-8 leading-relaxed">
                      Tú también puedes ser parte. Invitamos a personas naturales a financiar la <strong>educación avanzada en IA y tecnología</strong> para grupos que el mundo ha dejado atrás.
                    </p>
                    <div className="grid grid-cols-1 gap-4 text-sm font-medium">
                      <div className="flex items-center space-x-3 bg-black/10 p-3 rounded-xl border border-white/5">
                        <Sparkles size={16} className="text-samval-accent" />
                        <span>Comunidades Afros y Raizales</span>
                      </div>
                      <div className="flex items-center space-x-3 bg-black/10 p-3 rounded-xl border border-white/5">
                        <Sparkles size={16} className="text-samval-accent" />
                        <span>Madres Cabeza de Hogar</span>
                      </div>
                      <div className="flex items-center space-x-3 bg-black/10 p-3 rounded-xl border border-white/5">
                        <Sparkles size={16} className="text-samval-accent" />
                        <span>Colectivos LGBTQ+</span>
                      </div>
                      <div className="flex items-center space-x-3 bg-black/10 p-3 rounded-xl border border-white/5">
                        <Sparkles size={16} className="text-samval-accent" />
                        <span>Adultos Mayores (Nuevas Skills en IA)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 flex flex-col gap-4">
                    <button className="w-full py-4 bg-white text-samval-guinda font-black rounded-2xl hover:scale-105 transition-all shadow-xl">
                      Quiero Donar Mensualmente
                    </button>
                    <p className="text-center text-xs text-red-100/50 italic">Tu aporte mensual beca a un talento local.</p>
                  </div>
                </div>

                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
                      <GraduationCap size={32} className="text-samval-guinda" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-6">Impacto por Colección</h3>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                      Financiamos laboratorios de IA y bootcamps intensivos de alto nivel. Los aportes globales se destinan a la compra de servidores y licencias para aprendizaje offline.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-center space-x-3 py-3 border-b border-slate-100">
                        <div className="w-2 h-2 bg-samval-guinda rounded-full" />
                        <span className="text-slate-700 font-medium">Capacitación en LLMs e IA Generativa</span>
                      </li>
                      <li className="flex items-center space-x-3 py-3 border-b border-slate-100">
                        <div className="w-2 h-2 bg-samval-guinda rounded-full" />
                        <span className="text-slate-700 font-medium">Certificación en Desarrollo Web</span>
                      </li>
                      <li className="flex items-center space-x-3 py-3 border-b border-slate-100">
                        <div className="w-2 h-2 bg-samval-guinda rounded-full" />
                        <span className="text-slate-700 font-medium">Kits de Robótica para Jóvenes</span>
                      </li>
                    </ul>
                  </div>

                  <button className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl mt-12">
                    Hacer Aporte Global
                  </button>
                </div>
              </div>

              {/* Final Footer Info */}
              <div className="bg-white overflow-hidden rounded-3xl p-8 border border-slate-200 text-center flex flex-col md:flex-row items-center justify-center gap-6">
                <ShieldCheck size={40} className="text-samval-guinda" />
                <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
                  <strong>Nota Legal:</strong> La Fundación Samval es una entidad sin ánimo de lucro calificada en el <strong>Régimen Tributario Especial</strong>. Todos los donantes reciben el respectivo certificado de donación válido ante la DIAN para el aprovechamiento de los beneficios de ley (Art. 125 y 257 E.T.).
                </p>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in border border-slate-100">
              <div className="text-center mb-10">
                <Hand size={48} className="mx-auto mb-4 text-samval-guinda" />
                <h2 className="text-3xl font-bold text-slate-900 mb-2 font-primary">Talento en el Territorio</h2>
                <p className="text-slate-600">No solo dinero, tu conocimiento también transforma.</p>
              </div>

              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider font-primary">Área de Experticia</label>
                    <select className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-samval-guinda font-medium">
                      <option>Ingeniería / Robótica / IA</option>
                      <option>Educación / Pedagogía</option>
                      <option>Antropología / Sociología</option>
                      <option>Salud (Misión Médica)</option>
                      <option>Comunicación / Diseño</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider font-primary">Nombre Completo</label>
                    <input type="text" className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-samval-guinda font-medium" placeholder="Juan Pérez" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider font-primary">WhatsApp / Link al Perfil</label>
                    <div className="relative">
                      <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input type="text" className="w-full pl-12 pr-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-samval-guinda font-medium" placeholder="+57 3..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider font-primary">Disponibilidad</label>
                    <input type="text" className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-samval-guinda font-medium" placeholder="Ej: Fines de semana, 2h/semana" />
                  </div>
                </div>

                <div className="pt-6">
                  <button className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl text-lg uppercase tracking-widest font-primary">
                    Postular mi Talento
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default GetInvolved;