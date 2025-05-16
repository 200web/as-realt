"use client";

import React from "react";
import styles from "./LoginSection.module.css";

export default function LoginSection() {
  return (
    <section className={styles.loginSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Вход в личный кабинет</h2>
        <form className={styles.form}>
          <input type="Name" placeholder="Логин" className={styles.input} />
          <input
            type="password"
            placeholder="Пароль"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            ВОЙТИ
          </button>
        </form>
      </div>
    </section>
  );
}
