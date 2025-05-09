// src/app/admin/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './AdminSection.module.css';

export default function AdminSection() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Псевдопроверка (пока без сервера, из .env)
    const validUsername = process.env.NEXT_PUBLIC_ADMIN_LOGIN;
    const validPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (username === validUsername && password === validPassword) {
      localStorage.setItem('isAdmin', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <section className={styles.loginSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Вход</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className={styles.button}>ВОЙТИ</button>
        </form>
      </div>
    </section>
  );
}
