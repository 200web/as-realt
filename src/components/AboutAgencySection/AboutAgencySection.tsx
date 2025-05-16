"use client";

import React from "react";
import styles from "./AboutAgencySection.module.css";

export default function AboutAgencySection() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>О нашем агентстве </h2>
          <a href="/about-us" className={styles.learnMore}>
            УЗНАТЬ БОЛЬШЕ <span className={styles.arrow}>→</span>
          </a>
        </div>

        <div className={styles.content}>
          <div className={styles.description}>
            <p>
              Наше агентство недвижимости - это сочетание молодости и опыта.
              Несмотря на то, что мы новая компания, за нашими плечами более 15
              лет успешной работы в сфере недвижимости. Мы предлагаем
              индивидуальный подход к каждому клиенту и гарантируем высокое
              качество услуг. Доверьтесь нам, и мы поможем вам сделать
              правильный выбор!
            </p>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>15+</span>
              <span className={styles.statText}>лет опыта работы</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>2000+</span>
              <span className={styles.statText}>довольных клиентов</span>
            </div>
            <div className={`${styles.statItem} ${styles.hideOnMobile}`}>
              <span className={styles.statNumber}>250+</span>
              <span className={styles.statText}>обученных специалистов</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
