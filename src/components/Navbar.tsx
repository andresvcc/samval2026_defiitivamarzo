
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Code, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) =>
    location.pathname === path
      ? 'text-samval-guinda font-bold'
      : 'text-stone-500 hover:text-samval-guinda';

  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        background: '#e0d6cc',
        boxShadow: '0 4px 12px #c4b8ac, 0 -2px 8px #f0e8e0'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="neu-icon w-12 h-12 p-2">
              <img
                src="https://i.ibb.co/DDs8DDfy/SAMVALLOGO.png"
                alt="SAMVAL Logo"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#801b1b] leading-none">{t('navbar.title')}</span>
              <span className="text-[10px] sm:text-xs text-stone-400 font-medium tracking-tight">{t('navbar.tagline')}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {[
              { path: '/', label: t('navbar.home') },
              { path: '/nosotros', label: t('navbar.about') },
              { path: '/impacto', label: t('navbar.impact') },
              { path: '/recursos', label: t('navbar.resources') },
              { path: '/proyectos', label: t('navbar.projects') },
              { path: '/servicios-tech', label: t('navbar.services') },
              { path: '/contacto', label: t('navbar.contact') },
            ].map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-samval-guinda neu-pressed-sm'
                    : 'text-stone-500 hover:text-samval-guinda hover:bg-stone-200/30'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            {/* CTAs */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                to="/servicios-tech"
                className="flex items-center space-x-1.5 px-5 py-2.5 text-sm font-bold text-samval-guinda rounded-xl transition-all duration-200 neu-flat hover:shadow-none"
                style={{ fontSize: '13px' }}
              >
                <Code size={15} />
                <span>{t('navbar.request_software')}</span>
              </Link>
              <Link
                to="/donar"
                className="neu-btn-primary flex items-center space-x-1.5 !py-2.5 !px-5 !text-sm !rounded-xl"
              >
                <Heart size={15} className="fill-current" />
                <span>{t('navbar.donate')}</span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={toggleMenu}
              className="neu-icon w-10 h-10 text-stone-500 hover:text-stone-700 transition-all"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full animate-neu-fade-in"
          style={{
            background: '#e0d6cc',
            boxShadow: '0 12px 24px #c4b8ac'
          }}
        >
          <div className="px-4 pt-4 pb-8 space-y-2">
            {[
              { path: '/', label: t('navbar.home') },
              { path: '/nosotros', label: t('navbar.about') },
              { path: '/impacto', label: t('navbar.impact') },
              { path: '/recursos', label: t('navbar.resources') },
              { path: '/proyectos', label: t('navbar.projects') },
              { path: '/servicios-tech', label: t('navbar.services') },
              { path: '/contacto', label: t('navbar.contact') },
            ].map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={toggleMenu}
                className={`block px-5 py-3.5 rounded-xl text-base font-bold transition-all ${
                  location.pathname === link.path
                    ? 'neu-pressed-sm text-samval-guinda'
                    : 'text-stone-600 hover:bg-stone-200/30'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-6 space-y-3">
              <Link
                to="/servicios-tech"
                onClick={toggleMenu}
                className="flex items-center justify-center w-full px-6 py-4 neu-raised-sm text-samval-guinda font-bold text-sm"
              >
                <Code size={18} className="mr-2" />
                {t('navbar.request_software').toUpperCase()}
              </Link>
              <Link
                to="/donar"
                onClick={toggleMenu}
                className="flex items-center justify-center w-full px-6 py-4 neu-btn-primary !rounded-xl !text-base"
              >
                <Heart size={18} className="mr-2 fill-current" />
                {t('navbar.donate').toUpperCase()}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;