'use client';
import { useEffect, useState } from 'react';
import { getCookie, setCookie } from '@/utils/cookies';
import styles from './CookieBanner.module.css';
import CookieSettingsModal from './CookieSettingsModal';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const consent = getCookie('cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie('cookie_consent', 'true', { expires: 365 });
    setShowBanner(false);
  };

  const handleDecline = () => {
    setCookie('cookie_consent', 'false', { expires: 365 });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      <div className={styles.banner}>
        <p className={styles.text}>
        Для обеспечения удобства пользователей ASrealt.by, улучшения сервисов и предоставления персонализированных рекомендаций используются файлы cookies.
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
