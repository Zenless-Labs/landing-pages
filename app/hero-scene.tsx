'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** A short camera drift on native scroll; the complete scene works without JS. */
export default function HeroScene({ children }: { children: ReactNode }) {
  const scene = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = scene.current;
    if (!element) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 800px)');
    let frame = 0;
    let visible = true;
    const update = () => {
      frame = 0;
      if (reducedMotion.matches || mobile.matches) {
        element.style.setProperty('--scene-progress', '0');
        return;
      }
      const rect = element.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      element.style.setProperty('--scene-progress', progress.toFixed(4));
    };
    const schedule = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
    });
    observer.observe(element);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reducedMotion.addEventListener('change', update);
    mobile.addEventListener('change', update);
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reducedMotion.removeEventListener('change', update);
      mobile.removeEventListener('change', update);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <section ref={scene} className="scene-hero" aria-labelledby="hero-title">
      {children}
    </section>
  );
}
