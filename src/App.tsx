import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
import AdminLayout from './components/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Photos from './pages/admin/Photos';
import Financials from './pages/admin/Financials';
import Partners from './pages/admin/Partners';
import Team from './pages/admin/Team';

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

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="photos" element={<Photos />} />
              <Route path="financials" element={<Financials />} />
              <Route path="partners" element={<Partners />} />
              <Route path="team" element={<Team />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;