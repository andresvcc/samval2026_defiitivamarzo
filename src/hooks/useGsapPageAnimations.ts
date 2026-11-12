import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const revealSelector = [
  'main .neu-raised-lg',
  'main .neu-dark-raised',
  'main [data-gsap-reveal]'
].join(', ');

export const useGsapPageAnimations = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let cancelled = false;
    let frame = 0;
    let cleanup: (() => void) | undefined;

    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]).then(([gsapModule, scrollTriggerModule]) => {
      if (cancelled) return;

      const gsap = gsapModule.gsap;
      const { ScrollTrigger } = scrollTriggerModule;
      gsap.registerPlugin(ScrollTrigger);

      frame = window.requestAnimationFrame(() => {
        if (cancelled) return;

        const main = document.querySelector('main');
        const routeRoot = main?.firstElementChild as HTMLElement | null;

        const ctx = gsap.context(() => {
          if (routeRoot) {
            gsap.fromTo(
              routeRoot,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.42, ease: 'power2.out' }
            );
          }

          const revealItems = gsap.utils.toArray<HTMLElement>(revealSelector);
          revealItems.forEach((item, index) => {
            if (item === routeRoot) return;

            gsap.fromTo(
              item,
              { autoAlpha: 0 },
              {
                autoAlpha: 1,
                duration: 0.5,
                delay: Math.min(index * 0.035, 0.18),
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: item,
                  start: 'top 88%',
                  once: true
                }
              }
            );
          });
        });

        cleanup = () => ctx.revert();
      });
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      cleanup?.();
    };
  }, [pathname]);
};
