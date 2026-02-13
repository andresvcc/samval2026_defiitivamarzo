
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

  const isActive = (path: string) => location.pathname === path ? 'text-samval-guinda font-semibold underline decoration-2 underline-offset-4' : 'text-slate-600 hover:text-samval-guinda';

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://i.ibb.co/DDs8DDfy/SAMVALLOGO.png"
              alt="SAMVAL Logo"
              className="h-12 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#801b1b] leading-none">{t('navbar.title')}</span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium tracking-tight">{t('navbar.tagline')}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${isActive('/')} transition-colors`}>{t('navbar.home')}</Link>
            <Link to="/nosotros" className={`${isActive('/nosotros')} transition-colors`}>{t('navbar.about')}</Link>
            <Link to="/proyectos" className={`${isActive('/proyectos')} transition-colors`}>{t('navbar.projects')}</Link>
            <Link to="/servicios-tech" className={`${isActive('/servicios-tech')} transition-colors`}>{t('navbar.services')}</Link>
            <Link to="/contacto" className={`${isActive('/contacto')} transition-colors`}>{t('navbar.contact')}</Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            {/* CTAs */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                to="/servicios-tech"
                className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-samval-guinda bg-red-50 hover:bg-red-100 rounded-full transition-colors border border-samval-guinda/20"
              >
                <Code size={16} />
                <span>{t('navbar.request_software')}</span>
              </Link>
              <Link
                to="/donar"
                className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-white bg-samval-guinda hover:bg-samval-dark rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <Heart size={16} className="fill-current" />
                <span>{t('navbar.donate')}</span>
              </Link>
            </div>
          </div>


          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={toggleMenu}
              className="text-slate-500 hover:text-slate-700 focus:outline-none p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-2xl animate-fade-in">
          <div className="px-4 pt-4 pb-8 space-y-3">
            <Link to="/" onClick={toggleMenu} className={`block px-4 py-3 rounded-xl text-lg font-bold ${location.pathname === '/' ? 'bg-red-50 text-samval-guinda' : 'text-slate-700 hover:bg-slate-50'}`}>{t('navbar.home')}</Link>
            <Link to="/nosotros" onClick={toggleMenu} className={`block px-4 py-3 rounded-xl text-lg font-bold ${location.pathname === '/nosotros' ? 'bg-red-50 text-samval-guinda' : 'text-slate-700 hover:bg-slate-50'}`}>{t('navbar.about')}</Link>
            <Link to="/proyectos" onClick={toggleMenu} className={`block px-4 py-3 rounded-xl text-lg font-bold ${location.pathname === '/proyectos' ? 'bg-red-50 text-samval-guinda' : 'text-slate-700 hover:bg-slate-50'}`}>{t('navbar.projects')}</Link>
            <Link to="/servicios-tech" onClick={toggleMenu} className={`block px-4 py-3 rounded-xl text-lg font-bold ${location.pathname === '/servicios-tech' ? 'bg-red-50 text-samval-guinda' : 'text-slate-700 hover:bg-slate-50'}`}>{t('navbar.services')}</Link>
            <Link to="/contacto" onClick={toggleMenu} className={`block px-4 py-3 rounded-xl text-lg font-bold ${location.pathname === '/contacto' ? 'bg-red-50 text-samval-guinda' : 'text-slate-700 hover:bg-slate-50'}`}>{t('navbar.contact')}</Link>

            <div className="pt-6 border-t border-slate-100 space-y-4">
              <Link to="/servicios-tech" onClick={toggleMenu} className="flex items-center justify-center w-full px-6 py-4 bg-red-50 text-samval-guinda rounded-2xl font-black border border-samval-guinda/20 shadow-sm">
                <Code size={20} className="mr-3" />
                {t('navbar.request_software').toUpperCase()}
              </Link>
              <Link to="/donar" onClick={toggleMenu} className="flex items-center justify-center w-full px-6 py-4 bg-samval-guinda text-white rounded-2xl font-black shadow-lg shadow-samval-guinda/30">
                <Heart size={20} className="mr-3 fill-current" />
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