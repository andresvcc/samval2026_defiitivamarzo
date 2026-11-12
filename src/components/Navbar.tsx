import {changeSiteLanguage} from '../i18n';
import { Link } from './Link';
import { media } from '../generated/media';

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X, Heart, Code, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((open) => !open);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const navLinks = [
    { path: '/', label: t('navbar.home') },
    { path: '/nosotros', label: t('navbar.about') },
    { path: '/impacto', label: t('navbar.impact') },
    { path: '/recursos', label: t('navbar.resources') },
    { path: '/proyectos', label: t('navbar.projects') },
    { path: '/servicios-tech', label: t('navbar.services') },
    { path: '/contacto', label: t('navbar.contact') },
  ];

  const languages = [
    { code: 'es', label: 'ES' },
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'de', label: 'DE' },
  ];

  return (
    <>
    <nav className={`sticky top-0 w-full transition-all duration-300 ${isOpen ? 'z-[120]' : 'z-50'}`}
      style={{
        background: 'rgba(224, 214, 204, 0.96)',
        backdropFilter: 'blur(18px)',
        boxShadow: '0 10px 28px rgba(92, 71, 56, 0.16)'
      }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-10">
        <div className="flex justify-between items-center h-16 lg:h-[74px] 2xl:h-20 gap-3">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3 min-w-0 shrink-0 rounded-2xl pr-2 transition-all duration-200 hover:opacity-90"
          >
            <div className="w-11 h-11 lg:w-12 lg:h-12 p-2 shrink-0 rounded-2xl flex items-center justify-center bg-[#e0d6cc]"
              style={{
                boxShadow: '5px 5px 11px #c4b8ac, -5px -5px 11px #f0e8e0'
              }}
            >
              <img
                src={media.logo}
                  width="84" height="102" decoding="async"
                alt="SAMVAL Logo"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-base sm:text-lg xl:text-xl font-black text-[#801b1b] leading-none truncate">{t('navbar.title')}</span>
              <span className="hidden sm:block max-w-[220px] lg:max-w-none text-[10px] xl:text-xs text-stone-500 font-semibold truncate">{t('navbar.tagline')}</span>
            </div>
          </Link>

          {/* Wide Desktop Navigation */}
          <div className="hidden 2xl:flex items-center justify-center flex-1 min-w-0 px-4">
            <div className="flex max-w-full items-center justify-center gap-1 overflow-x-auto px-2 py-2">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`shrink-0 px-3 py-2 rounded-xl text-[13px] font-bold transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'text-samval-guinda neu-pressed-sm'
                      : 'text-stone-600 hover:text-samval-guinda hover:bg-[#eadfd4]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            {/* Language Switcher */}
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>

            {/* CTAs */}
            <div className="hidden lg:flex items-center gap-2">
              <Link
                to="/servicios-tech"
                className="flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-black text-samval-guinda rounded-xl transition-all duration-200 bg-[#e0d6cc] hover:text-samval-dark whitespace-nowrap"
                style={{
                  boxShadow: '4px 4px 9px #c4b8ac, -4px -4px 9px #f0e8e0'
                }}
              >
                <Code size={15} />
                <span>{t('navbar.request_software')}</span>
              </Link>
              <Link
                to="/donar"
                className="neu-btn-primary flex items-center gap-1.5 !py-2.5 !px-5 !text-sm !rounded-xl whitespace-nowrap"
              >
                <Heart size={15} className="fill-current" />
                <span>{t('navbar.donate')}</span>
              </Link>
            </div>

            {/* Compact Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={toggleMenu}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all bg-[#e0d6cc] ${
                  isOpen ? 'text-samval-guinda' : 'text-stone-500 hover:text-samval-guinda'
                }`}
                style={{
                  boxShadow: isOpen
                    ? 'inset 3px 3px 7px #c4b8ac, inset -3px -3px 7px #f0e8e0'
                    : '4px 4px 9px #c4b8ac, -4px -4px 9px #f0e8e0'
                }}
                aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isOpen}
              >
                <span className="flex items-center justify-center">
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Medium Desktop Navigation */}
        <div className="hidden lg:flex 2xl:hidden items-center justify-center pb-3">
          <div className="flex max-w-full items-center justify-center gap-1 xl:gap-1.5 overflow-x-auto px-2 py-2">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`shrink-0 px-3 xl:px-4 py-2 rounded-xl text-[13px] xl:text-sm font-bold transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-samval-guinda neu-pressed-sm'
                    : 'text-stone-600 hover:text-samval-guinda hover:bg-[#eadfd4]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </nav>

    {/* Mobile Menu Dialog */}
    {isOpen && (
      <div
        className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-[90] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal"
        style={{
          background: 'rgba(224, 214, 204, 0.99)',
          backdropFilter: 'blur(18px)'
        }}
      >
        <div className="min-h-full px-4 pt-5 pb-8">
          <div className="mb-5 h-px w-full bg-stone-900/10 shadow-[0_1px_0_rgba(255,255,255,0.45)]" />
          <div
            data-mobile-menu-item
            className="mb-5 flex items-center justify-between gap-2 rounded-2xl px-3 py-2"
            style={{
              boxShadow: 'inset 4px 4px 9px #c4b8ac, inset -4px -4px 9px #f0e8e0'
            }}
          >
            <Globe size={18} className="shrink-0 text-stone-500" />
            <div className="flex items-center gap-1.5">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => changeSiteLanguage(lang.code)}
                  className={`min-w-10 rounded-lg px-3 py-2 text-xs font-black transition-all ${
                    i18n.language.startsWith(lang.code)
                      ? 'bg-samval-guinda text-white'
                      : 'text-stone-500 hover:text-samval-guinda'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                data-mobile-menu-item
                className={`block rounded-2xl px-5 py-4 text-lg font-black transition-all ${
                  location.pathname === link.path
                    ? 'neu-pressed-sm text-samval-guinda'
                    : 'text-stone-700 hover:bg-[#eadfd4] hover:text-samval-guinda'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            <Link
              to="/servicios-tech"
              onClick={closeMenu}
              data-mobile-menu-item
              className="flex w-full items-center justify-center rounded-2xl bg-[#e0d6cc] px-6 py-4 text-sm font-black text-samval-guinda"
              style={{
                boxShadow: '5px 5px 10px #c4b8ac, -5px -5px 10px #f0e8e0'
              }}
            >
              <Code size={18} className="mr-2" />
              {t('navbar.request_software').toUpperCase()}
            </Link>
            <Link
              to="/donar"
              onClick={closeMenu}
              data-mobile-menu-item
              className="neu-btn-primary flex w-full items-center justify-center !rounded-2xl !px-6 !py-4 !text-base"
            >
              <Heart size={18} className="mr-2 fill-current" />
              {t('navbar.donate').toUpperCase()}
            </Link>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default Navbar;
