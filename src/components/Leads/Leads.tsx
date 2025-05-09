'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Leads.module.css'; // создадим этот CSS

export default function Leads() {
  const router = useRouter();

  return (
    <div className={styles.leads}>
      <div className={styles.container}>
      <h1 className={styles.title}>Заявки</h1>
      
      </div>
    </div>
  );
}
