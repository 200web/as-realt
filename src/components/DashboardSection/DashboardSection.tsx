'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './DashboardSection.module.css'; // создадим этот CSS

export default function DashboardSection() {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      router.push('/admin');
    }
  }, [router]);

  return (
    <div className={styles.dashboardSection}>
      <div className={styles.container}>
      <h1 className={styles.title}>Панель администратора</h1>
      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={() => router.push('/admin/leads')}>
          Заявки
        </button>
        <button className={styles.button} onClick={() => router.push('/admin/employees')}>
          Сотрудники
        </button>
        <button className={styles.button} onClick={() => router.push('/admin/reviews')}>
          Отзывы
        </button>
      </div>
      </div>
    </div>
  );
}
