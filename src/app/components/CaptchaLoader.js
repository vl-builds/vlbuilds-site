'use client';
import { useEffect } from 'react';

export default function CaptchaLoader() {
  useEffect(() => {
    const section = document.getElementById('contato');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const s = document.createElement('script');
        s.src = 'https://web3forms.com/client/script.js';
        s.async = true;
        document.head.appendChild(s);
      },
      { rootMargin: '300px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return null;
}
