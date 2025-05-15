'use client';
import { useState } from 'react';
import styles from './CookieBanner.module.css';
import CookieSettingsModal from './CookieSettingsModal';
import { useCookieBanner } from '@/context/CookieBannerContext';
import { setCookie } from '@/utils/cookies';

export default function CookieBanner() {
  const [showSettings, setShowSettings] = useState(false);
  const { visible, hide } = useCookieBanner();

  if (!visible) return null;

  const handleAccept = () => {
    setCookie('cookie_consent', 'true', { expires: 365 });
    hide();
  };

  const handleDecline = () => {
    setCookie('cookie_consent', 'false', { expires: 365 });
    hide();
  };

  return (
    <>
      <div className={styles.banner}>
        <p className={styles.text}>
          Для обеспечения удобства пользователей ASrealt.by, улучшения сервисов и предоставления персонализированных рекомендаций используются файлы{' '}
          <a href="/privacy-policy" className={styles.highlight}>cookies</a>.
        </p>
        <div className={styles.buttons}>
          <button className={styles.settingsButton} onClick={() => setShowSettings(true)}>Настроить</button>
          <button className={styles.button} onClick={handleAccept}>Принять</button>
          <button className={styles.declineButton} onClick={handleDecline}>Отклонить</button>
        </div>
      </div>
      {showSettings && <CookieSettingsModal onClose={() => setShowSettings(false)} />}
    </>
  );
}
