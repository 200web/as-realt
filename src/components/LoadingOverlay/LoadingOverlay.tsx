'use client';

import React, { useEffect, useState } from 'react';
import styles from './LoadingOverlay.module.css';

const preloadImages = (sources: string[]): Promise<void> => {
  return Promise.allSettled(
    sources.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();
          img.onerror = () => resolve(); // считать ошибку тоже "загрузкой", чтобы не встать колом
        })
    )
  ).then(() => {});
};

const getPreloadImages = (): string[] => {
  if (typeof window === 'undefined') return [];

  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  const common = [
    '/LOGO_BLACK.png', // hero logo
    '/LOGO_1.webp',    // header logo
  ];

  const mobileOnly = ['/home-mob.webp'];
  const desktopOnly = ['/bg1.jpg', '/home.webp'];

  return isMobile ? [...common, ...mobileOnly] : [...common, ...desktopOnly];
};

const LoadingOverlay: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => setLogoVisible(true), 300);

    const images = getPreloadImages();

    preloadImages(images).then(() => {
      // Поддерживаем минимальное время показа прелоадера
      setTimeout(() => {
        setTimeout(() => {
          setVisible(false);
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              document.documentElement.classList.add('initial-load-complete');
            })
          );
        }, 800);
      }, 1000);
    });

    return () => clearTimeout(logoTimer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`${styles.overlay} ${!visible ? styles.fadeOut : ''}`}
      aria-hidden="true"
    >
      <div className={`${styles.logoContainer} ${logoVisible ? styles.logoVisible : ''}`}>
        <img src="/LOGO_1.webp" alt="Loading" className={styles.logo} />
        <div className={styles.loadingText}>Загрузка...</div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
