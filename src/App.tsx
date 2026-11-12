import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsentBanner from './components/CookieConsentBanner';
import Home from './pages/Home';
import About from './pages/About';
import SocialPrograms from './pages/SocialPrograms';
import TechServices from './pages/TechServices';
import GetInvolved from './pages/GetInvolved';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import Impact from './pages/Impact';
import Resources from './pages/Resources';
import Success from './pages/Success';
import { useGsapPageAnimations } from './hooks/useGsapPageAnimations';
import { trackPageView } from './utils/analytics';

// ScrollToTop component to reset scroll on route change
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there is no hash, scroll to top
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      // If there is a hash, wait a bit for rendering then scroll to element
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [pathname, hash]);

  return null;
}

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <AnalyticsRouteTracker />
      <PageAnimations />
      <div className="flex flex-col min-h-screen font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/proyectos" element={<SocialPrograms />} />
            <Route path="/servicios-tech" element={<TechServices />} />
            <Route path="/donar" element={<GetInvolved />} />
            <Route path="/voluntariado" element={<GetInvolved />} /> {/* Shared page with toggle */}
            <Route path="/contacto" element={<Contact />} />
            <Route path="/impacto" element={<Impact />} />
            <Route path="/recursos" element={<Resources />} />
            <Route path="/privacidad" element={<PrivacyPolicy />} />
            <Route path="/terminos" element={<TermsOfUse />} />
            <Route path="/gracias" element={<Success />} />

          </Routes>
        </main>
        <Footer />
      </div>
      <CookieConsentBanner />
    </Router>
  );
};

const AnalyticsRouteTracker = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    trackPageView(`${pathname}${search}${hash}`);
  }, [pathname, search, hash]);

  return null;
};

const PageAnimations = () => {
  useGsapPageAnimations();
  return null;
};

export default App;
