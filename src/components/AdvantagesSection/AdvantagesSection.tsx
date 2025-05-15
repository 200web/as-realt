'use client';

import React from 'react';
import styles from './AdvantagesSection.module.css';

export default function AdvantagesSection() {
  const advantages = [
    {
      id: 1,
      number: '01',
      title: 'Уникальная система обучения',
      description: 'Мы разработали собственную программу подготовки, которая формирует высококлассных специалистов по недвижимости и риэлторов, обеспеченных профессионализм и компетентность.'
    },
    {
      id: 2,
      number: '02',
      title: 'Эффективная CRM система',
      description: 'Наша современная CRM система позволяет оптимизировать все процессы, связанные с покупкой и продажей недвижимости, обеспечивая оперативность и точность работы с клиентами.'
    },
    {
      id: 3,
      number: '03',
      title: 'Личный кабинет продавца',
      description: 'Мы предоставляем продавцам доступ к личному кабинету, где они могут в режиме реального времени отслеживать процесс продажи своей недвижимости, включая информацию о потенциальных покупателях и анализ рынка сделок БТИ.'
    },
    {
      id: 4,
      number: '04',
      title: 'Сочетание инноваций и практик',
      description: 'Мы гармонично сочетаем современные методики с проверенными практиками работы, что позволяет нам эффективно справляться с задачами любой сложности в сфере недвижимости.'
    },
    {
      id: 5,
      number: '05',
      title: 'Индивидуальный подход к клиентам',
      description: 'Мы уделяем внимание каждому клиенту, предлагая индивидуальные решения, которые максимально соответствуют его потребностям и ожиданиям.'
    },
    {
      id: 6,
      number: '06',
      title: 'Лояльные и гибкие договоры',
      description: 'Мы предлагаем нашим клиентам гибкие условия сотрудничества, адаптированные под их конкретные потребности, что делает процесс взаимодействия с нами максимально комфортным и прозрачным.'
    }
  ];

  return (
    <section id="advantages" className={styles.advantagesSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Преимущества</h2>
        
        <div className={styles.advantagesGrid}>
          {advantages.map((advantage) => (
            <div key={advantage.id} className={styles.advantageCard}>
              <div className={styles.hLine}></div>
              <div className={styles.vLine}></div>
              <div className={styles.cardNumber}>{advantage.number}</div>
              <h3 className={styles.cardTitle}>{advantage.title}</h3>
              <p className={styles.cardDescription}>{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
