'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Leads.module.css';

type Lead = {
  id: number;
  name: string;
  phone: string;
  purpose: string;
  created_at: string;
};

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok') {
          setLeads(data.leads);
        }
      });
  }, []);

  return (
    <div className={styles.leads}>
      <div className={styles.container}>
        <button className={styles.back} onClick={() => router.push('/admin/dashboard')}>
          &lt; Назад
        </button>
        <h1 className={styles.title}>Заявки</h1>
        <div className={styles.table}>
          <div className={`${styles.row} ${styles.header}`}>
            <div>Имя</div>
            <div>Телефон</div>
            <div>Цель</div>
            <div>Дата</div>
          </div>
          {leads.map((lead) => (
            <div key={lead.id} className={styles.row}>
              <div>{lead.name}</div>
              <div>{lead.phone}</div>
              <div>{lead.purpose}</div>
              <div>{new Date(lead.created_at).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
