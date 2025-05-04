'use client';
import { useState } from 'react';
import styles from './CookieSettingsModal.module.css';
import { setCookie } from '@/utils/cookies';

interface Props {
  onClose: () => void;
}

export default function CookieSettingsModal({ onClose }: Props) {
  const [technical, setTechnical] = useState(true); // обязательные
  const [analytics, setAnalytics] = useState(false); // пользовательские

  const handleSave = () => {
    const consent = {
      technical,
      analytics,
    };
    setCookie('cookie_consent', JSON.stringify(consent), { expires: 365 });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Настройки файлов cookie</h2>


            <div className={styles.option}>
    <input type="checkbox" checked={technical} disabled />
    <label>Технические cookie (обязательны)</label>
    <p>
        Эти cookies необходимы для правильного функционирования сайта и не могут быть отключены в нашей системе.
    </p>
    </div>

    <div className={styles.option}>
    <input
        type="checkbox"
        checked={analytics}
        onChange={(e) => setAnalytics(e.target.checked)}
    />
    <label>Аналитические cookie</label>
    <p>
        Эти файлы позволяют собирать обезличенные статистические данные о характеристиках пользовательских устройств, подсчитывать количество и длительность посещений сайта, анализировать использование пользователем сайта, определять наиболее и(или) наименее популярные страницы сайта.
    </p>
    </div>


        <div className={styles.actions}>
          <button className={styles.save} onClick={handleSave}>Сохранить</button>
          <button className={styles.cancel} onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
}
