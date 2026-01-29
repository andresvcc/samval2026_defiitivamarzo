import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Heart, BookOpen, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Niños Educados', value: 1200 },
  { name: 'Familias Apoyadas', value: 450 },
  { name: 'Proyectos TI', value: 35 },
  { name: 'Voluntarios', value: 120 },
];

const COLORS = ['#801b1b', '#a62d2d', '#5a1212', '#d4a373'];

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-slate-900 py-12">
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.ibb.co/YBg2xY2t/Gemini-Generated-Image-a9pe0pa9pe0pa9pe.png"
            alt="Paisaje Colombiano y Tecnología"
            className="w-full h-full object-cover"
          />
          {/* Degradado localizado: solo protege el texto, deja nítida la parte derecha de la foto */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <span className="inline-block py-1.5 px-4 rounded-full bg-samval-guinda/40 text-samval-accent text-xs sm:text-sm font-bold mb-6 border border-samval-guinda/50 uppercase tracking-widest backdrop-blur-sm drop-shadow-lg">
              Innovación que nace del territorio
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
              Código que <span className="text-transparent bg-clip-text bg-gradient-to-r from-samval-light to-samval-accent">transforma</span> comunidades.
            </h1>
            <p className="text-lg sm:text-xl text-slate-100 mb-10 leading-relaxed max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              En Fundación Samval, unimos la excelencia del desarrollo de software con el impacto social.
              <span className="block mt-4 font-bold text-white border-l-4 border-samval-guinda pl-4">
                El 100% de los beneficios de nuestros servicios tecnológicos financian programas educativos avanzados.
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/donar" className="inline-flex items-center justify-center px-10 py-4 bg-samval-guinda text-white font-black rounded-2xl hover:bg-samval-dark transition-all shadow-xl shadow-samval-guinda/20 text-lg">
                Invertir Socialmente
              </Link>
              <Link to="/servicios-tech" className="inline-flex items-center justify-center px-10 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-2xl hover:bg-white/20 transition-all border border-white/20 text-lg">
                Servicios TI
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Nuestra Esencia</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-samval-guinda to-samval-accent mx-auto rounded-full"></div>
            <p className="mt-6 text-slate-600 text-lg max-w-2xl mx-auto font-medium">
              Somos un puente entre la tecnología de vanguardia y las necesidades profundas de nuestras comunidades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-samval-guinda mb-8 group-hover:bg-samval-guinda group-hover:text-white transition-all">
                <BookOpen size={36} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Misión</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Empoderar a comunidades vulnerables a través de educación disruptiva, mientras proveemos soluciones tecnológicas de clase mundial.
              </p>
            </div>

            <div className="group bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-samval-guinda mb-8 group-hover:bg-samval-guinda group-hover:text-white transition-all">
                <Activity size={36} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Visión</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Ser el referente latinoamericano de empresa social, donde la tecnología es el motor principal del desarrollo territorial sostenible.
              </p>
            </div>

            <div className="group bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-samval-guinda mb-8 group-hover:bg-samval-guinda group-hover:text-white transition-all">
                <Heart size={36} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Valores</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Transparencia total, excelencia técnica, respeto por el territorio y compromiso inquebrantable con la equidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-samval-guinda rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-samval-accent rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Impacto <br /> <span className="text-samval-accent">Medible</span></h2>
              <p className="text-slate-400 text-xl mb-12 max-w-xl">
                Cada línea de código para nuestros clientes se traduce en becas y laboratorios para quienes más lo necesitan.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.map((item, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 hover:border-samval-accent/50 transition-colors">
                    <p className="text-4xl font-black text-white mb-2">{item.value}+</p>
                    <p className="text-slate-500 font-bold uppercase tracking-wider text-sm">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full h-[400px] bg-white/5 rounded-[3rem] p-8 border border-white/10 shadow-3xl">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px', color: '#fff' }}
                    itemStyle={{ color: '#d4a373' }}
                    cursor={{ fill: 'rgba(255,255,255,0.05)', radius: 10 }}
                  />
                  <Bar dataKey="value" radius={[10, 10, 10, 10]} barSize={40}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Services Teaser */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Tecnología con Propósito</h2>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto mb-16">
            Ofrecemos servicios de desarrollo de software que financian el cambio social real.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {['Desarrollo Web', 'Apps Móviles', 'Integración IA', 'Consultoría TI'].map((service, idx) => (
              <div key={idx} className="group p-8 bg-slate-50 rounded-[2rem] hover:bg-white hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:-translate-y-2">
                <div className="w-14 h-14 bg-red-50 text-samval-guinda rounded-2xl flex items-center justify-center mb-6 group-hover:bg-samval-guinda group-hover:text-white transition-colors duration-300">
                  <Code size={28} />
                </div>
                <h3 className="font-black text-xl text-slate-900 mb-4 tracking-tight">{service}</h3>
                <Link to="/servicios-tech" className="text-sm text-samval-guinda font-black uppercase tracking-widest hover:underline inline-flex items-center">
                  Ver detalles <ArrowRight size={14} className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-samval-guinda opacity-95"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight italic">¿Listo para el cambio?</h2>
          <p className="text-red-50 text-xl md:text-2xl mb-12 font-medium">
            Tú eres el motor del territorio. Únete hoy mismo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/donar" className="px-12 py-5 bg-white text-samval-guinda font-black rounded-2xl hover:scale-105 transition-all shadow-2xl text-lg uppercase tracking-widest">
              Donar Ahora
            </Link>
            <Link to="/voluntariado" className="px-12 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all border border-white/10 shadow-2xl text-lg uppercase tracking-widest">
              Ser Voluntario
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;