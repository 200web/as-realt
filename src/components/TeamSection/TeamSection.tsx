'use client';

import React, { useEffect, useState } from 'react';
import styles from './TeamSection.module.css';
import CardCarousel from '../CardCarousel/CardCarousel';
import TeamMemberCard from '../TeamMemberCard/TeamMemberCard';

interface Employee {
  id: number;
  name: string;
  position: string;
  photo_url: string;
  description: string;
  link: string;
}

export default function TeamSection() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          // Обратный порядок (если вдруг API не сортирует)
          const reversed = [...data.employees].reverse();
          setEmployees(reversed);
        }
      })
      .catch(err => console.error('Ошибка при получении сотрудников:', err));
  }, []);

  return (
    <section className={styles.teamSection}>
      <div className={styles.container}>
        <CardCarousel 
          title="Наши специалисты" 
          mobileTitle="Специалисты"
          itemsPerView={4}
          showDots={false}
        >
          {employees.map(employee => (
            <TeamMemberCard
              key={employee.id}
              id={employee.id}
              image={employee.photo_url}
              name={employee.name}
              position={employee.position}
              reviewsLink={`/team/${employee.link}`}
            />
          ))}
        </CardCarousel>
      </div>
    </section>
  );
}
