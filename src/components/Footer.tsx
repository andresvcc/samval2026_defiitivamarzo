import { Link } from './Link';
import { media } from '../generated/media';
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

import { useTranslation } from 'react-i18next';
import { openCookiePreferences } from '../utils/analytics';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer
      className="text-stone-300"
      style={{
        background: '#1e1b18',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="neu-dark-flat w-12 h-12 flex items-center justify-center p-2">
                <img
                  src={media.logo}
                  width="84" height="102" decoding="async"
                  alt="SAMVAL Logo"
                  className="h-full w-auto object-contain brightness-0 invert"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white leading-none">{t('navbar.title')}</span>
                <span className="text-[10px] text-stone-500 font-medium">{t('footer.tagline')}</span>
              </div>
            </div>
            <p className="text-sm text-stone-400 mb-6 font-medium italic">
              {t('footer.mission')}
            </p>
            <div className="flex space-x-3">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: 'https://www.instagram.com/fundacionsamval/' },
                { icon: Linkedin, href: '#' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target={social.href !== '#' ? '_blank' : undefined}
                  rel={social.href !== '#' ? 'noopener noreferrer' : undefined}
                  className="neu-dark-flat w-10 h-10 flex items-center justify-center text-stone-400 hover:text-white transition-all duration-200 hover:scale-105"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">{t('footer.foundation_title')}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/nosotros" className="text-stone-400 hover:text-samval-accent transition-colors font-medium">{t('footer.links.about')}</Link></li>
              <li><Link to="/proyectos" className="text-stone-400 hover:text-samval-accent transition-colors font-medium">{t('footer.links.programs')}</Link></li>
              <li><Link to="/impacto" className="text-stone-400 hover:text-samval-accent transition-colors font-medium">{t('footer.links.impact')}</Link></li>
              <li><Link to="/voluntariado" className="text-stone-400 hover:text-samval-accent transition-colors font-medium">{t('footer.links.volunteer')}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">{t('footer.tech_title')}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/servicios-tech#web" className="text-stone-400 hover:text-samval-accent transition-colors font-medium">{t('footer.services.web')}</Link></li>
              <li><Link to="/servicios-tech#ai" className="text-stone-400 hover:text-samval-accent transition-colors font-medium">{t('footer.services.ai')}</Link></li>
              <li><Link to="/servicios-tech#cloud" className="text-stone-400 hover:text-samval-accent transition-colors font-medium">{t('footer.services.consulting')}</Link></li>
              <li><Link to="/servicios-tech#cases" className="text-stone-400 hover:text-samval-accent transition-colors font-medium">{t('footer.services.cases')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">{t('footer.contact_title')}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <div className="neu-dark-flat w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={14} className="text-samval-accent" />
                </div>
                <span className="text-stone-400">
                  Calle 104 #51B-154 Ofi 17 <br />
                  Castellana Campestre <br />
                  Barranquilla, Colombia <br />
                  <span className="font-bold text-white">NIT: 901.036.033-0</span>
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="neu-dark-flat w-8 h-8 flex items-center justify-center shrink-0">
                  <Phone size={14} className="text-samval-accent" />
                </div>
                <span className="text-stone-400">+57 323 320 7532</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="neu-dark-flat w-8 h-8 flex items-center justify-center shrink-0">
                  <Mail size={14} className="text-samval-accent" />
                </div>
                <span className="text-stone-400">info@samval.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500"
          style={{ borderTop: '1px solid #2a2622' }}
        >
          <p>&copy; {new Date().getFullYear()} {t('navbar.title')}. {t('footer.rights')}</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-4 md:mt-0">
            <Link to="/privacidad" className="hover:text-stone-300 transition-colors">{t('footer.privacy')}</Link>
            <Link to="/terminos" className="hover:text-stone-300 transition-colors">{t('footer.terms')}</Link>
            <button type="button" onClick={openCookiePreferences} className="hover:text-stone-300 transition-colors">
              {t('footer.cookie_settings')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
