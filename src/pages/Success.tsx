import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, CheckCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const Success: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(7);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-24 px-4" style={{ background: '#e0d6cc' }}>
      <SEO 
        title="Gracias por tu aporte | SAMVAL" 
        description="Página de agradecimiento por donaciones y suscripciones en SAMVAL." 
      />
      
      <div className="max-w-xl w-full text-center">
        <div className="neu-raised-lg p-12 md:p-16 animate-neu-fade-in relative overflow-hidden" style={{ borderRadius: '36px' }}>
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-samval-guinda/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-samval-accent/10 rounded-full blur-[80px] -ml-32 -mb-32"></div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Icon Banner */}
            <div className="inline-flex p-6 neu-pressed mb-10 text-samval-guinda relative" style={{ borderRadius: '28px' }}>
              <div className="absolute -top-2 -right-2">
                <CheckCircle className="text-samval-accent bg-[#e0d6cc] rounded-full" size={24} />
              </div>
              <Heart size={56} strokeWidth={1.5} className="animate-pulse" />
            </div>

            {/* Titles */}
            <h1 className="text-4xl md:text-5xl font-black text-stone-800 mb-6 tracking-tighter leading-none">
              ¡Infinitas Gracias!
            </h1>
            <p className="text-lg md:text-xl text-stone-500 font-medium mb-10 leading-relaxed">
              Tu aporte ha sido procesado correctamente. Gracias a tu contribución, seguimos transformando vidas a través de la educación STEAM.
            </p>

            {/* Redirection Info */}
            <div className="w-full neu-pressed p-6 mb-10 flex flex-col items-center justify-center space-y-3" style={{ borderRadius: '24px' }}>
              <div className="text-sm font-bold text-stone-400 uppercase tracking-widest">
                Redirigiendo al inicio en
              </div>
              <div className="text-5xl font-black text-samval-guinda">
                {countdown}
              </div>
              <div className="text-xs text-stone-400 font-medium">segundos</div>
            </div>

            {/* Manual Button */}
            <button 
              onClick={() => navigate('/')}
              className="group inline-flex items-center justify-center space-x-3 w-full py-5 text-stone-600 font-black text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:text-stone-800 neu-raised"
              style={{ borderRadius: '20px' }}
            >
              <span>Volver ahora mismo</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
