import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img
                src="https://i.ibb.co/DDs8DDfy/SAMVALLOGO.png"
                alt="SAMVAL Logo"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white leading-none">FUNDACIÓN SAMVAL</span>
                <span className="text-[10px] text-slate-400 font-medium">Tecnología que respeta el territorio</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-6 font-medium italic">
              Educación, ciencia e innovación para la paz con enfoque territorial.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Fundación</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/nosotros" className="hover:text-samval-light transition-colors">Nosotros</Link></li>
              <li><Link to="/proyectos" className="hover:text-samval-light transition-colors">Programas Sociales</Link></li>
              <li><Link to="/impacto" className="hover:text-samval-light transition-colors">Impacto</Link></li>
              <li><Link to="/voluntariado" className="hover:text-samval-light transition-colors">Sé Voluntario</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Servicios Tech</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/servicios-tech#web" className="hover:text-samval-accent transition-colors">Desarrollo Web & Apps</Link></li>
              <li><Link to="/servicios-tech#ai" className="hover:text-samval-accent transition-colors">Integración de IA</Link></li>
              <li><Link to="/servicios-tech#cloud" className="hover:text-samval-accent transition-colors">Consultoría TI</Link></li>
              <li><Link to="/servicios-tech#cases" className="hover:text-samval-accent transition-colors">Casos de Éxito</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-samval-light mt-0.5 shrink-0" />
                <span>Calle 104 #51B-154 Ofi 17 <br /> Castellana Campestre <br /> Barranquilla, Colombia</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-samval-light shrink-0" />
                <span>+57 323 320 7532</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-samval-light shrink-0" />
                <span>contact@samval.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Fundación Samval. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacidad" className="hover:text-slate-300">Política de Privacidad</Link>
            <Link to="/terminos" className="hover:text-slate-300">Términos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;