import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsentBanner from './components/CookieConsentBanner';
import Home from './pages/Home';
import {routeLoaders} from './routes';
const About = lazy(routeLoaders['/nosotros']);
const SocialPrograms = lazy(routeLoaders['/proyectos']);
const TechServices = lazy(routeLoaders['/servicios-tech']);
const GetInvolved = lazy(routeLoaders['/donar']);
const Contact = lazy(routeLoaders['/contacto']);
const PrivacyPolicy = lazy(routeLoaders['/privacidad']);
const TermsOfUse = lazy(routeLoaders['/terminos']);
const Impact = lazy(routeLoaders['/impacto']);
const Resources = lazy(routeLoaders['/recursos']);
const Success = lazy(routeLoaders['/gracias']);
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
    <>
      <ScrollToTop />
      <AnalyticsRouteTracker />
      <div className="flex flex-col min-h-screen font-sans">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<div className="min-h-[50vh]" aria-busy="true" />}><Routes>
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

          </Routes></Suspense>
        </main>
        <Footer />
      </div>
      <CookieConsentBanner />
    </>
  );
};

const AnalyticsRouteTracker = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    trackPageView(`${pathname}${search}${hash}`);
  }, [pathname, search, hash]);

  return null;
};

export default App;
