"use client";
import { useState } from "react";
import styles from "./CookieSettingsModal.module.css";
import { setCookie } from "@/utils/cookies";

interface Props {
  onClose: () => void;
}

export default function CookieSettingsModal({ onClose }: Props) {
  const [technical, setTechnical] = useState(true); // обязательные
  const [analytics, setAnalytics] = useState(false); // пользовательские
  const [advertising, setAdvertising] = useState(false); // рекламные

  const handleSave = () => {
    const consent = {
      technical,
      analytics,
      advertising,
    };
    setCookie("cookie_consent", JSON.stringify(consent), { expires: 365 });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Настройки файлов cookie</h2>

        <div className={styles.option}>
          <input type="checkbox" checked={technical} disabled />
          <label>Технические файлы (обязательны)</label>
          <p>
            Эти cookies необходимы для правильного функционирования сайта и не
            могут быть отключены в нашей системе.
          </p>
        </div>

        <div className={styles.option}>
          <input
            type="checkbox"
            checked={analytics}
            onChange={(e) => setAnalytics(e.target.checked)}
          />
          <label>Аналитические файлы</label>
          <p>
            Эти файлы позволяют собирать обезличенные статистические данные о
            характеристиках пользовательских устройств, подсчитывать количество
            и длительность посещений сайта, анализировать использование
            пользователем сайта, определять наиболее и(или) наименее популярные
            страницы сайта.
          </p>
        </div>

        <div className={styles.option}>
          <input
            type="checkbox"
            checked={advertising}
            onChange={(e) => setAdvertising(e.target.checked)}
          />
          <label>Рекламные файлы</label>
          <p>
            Эти cookies используются для улучшения качества рекламы,
            предоставления персонализированной рекламы с использованием сервисов
            от google и yandex. Отключение обработки рекламных файлов cookies не
            влияет на количество показываемой рекламы.
          </p>
        </div>
        <div className={styles.info}>
          <p>
            Нажимая на кнопку "Сохранить настройки", вы даете согласие на
            обработку файлов cookies в соответствии с{" "}
            <a href="/privacy-policy" className={styles.highlight}>
              Политикой в отношении обработки файлов cookies
            </a>
            .
          </p>
        </div>

        <div className={styles.actions}>
          <button className={styles.save} onClick={handleSave}>
            Сохранить настройки
          </button>
          <button className={styles.cancel} onClick={onClose}>
            Назад
          </button>
        </div>
      </div>
    </div>
  );
}
