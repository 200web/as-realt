'use client';

import React from 'react';
import styles from './DocumentsSection.module.css';

interface Document {
  id: number;
  title: string;
  fileFormat: string;
  fileSize: string;
  date: string;
  organization: string;
  downloadUrl: string;
}

export default function DocumentsSection() {
  const documents: Document[] = [
    {
      id: 1,
      title: 'Лицензия',
      fileFormat: 'PDF',
      fileSize: '82.0 KB',
      date: '08.01.2025 года',
      organization: 'Частное унитарное предприятие "Агентство АС недвижимости"',
      downloadUrl: '#'
    },
    {
      id: 2,
      title: 'Свидетельство о государственной регистрации',
      fileFormat: 'PDF',
      fileSize: '82.0 KB',
      date: '08.01.2025 года',
      organization: 'Частное унитарное предприятие "Агентство АС недвижимости"',
      downloadUrl: '#'
    },
    {
      id: 3,
      title: 'Страховой полис',
      fileFormat: 'PDF',
      fileSize: '630.35 KB',
      date: '09.01.2024 года',
      organization: 'Частное унитарное предприятие "Агентство АС недвижимости"',
      downloadUrl: '#'
    }
  ];

  return (
    <section id="docs" className={styles.documentsSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Наши документы</h2>
        
        <div className={styles.documentsList}>
          {documents.map(document => (
            <div key={document.id} className={styles.documentItem}>
              <div className={styles.documentInfo}>
                <a href={document.downloadUrl} className={styles.downloadLink}>
                  <div className={styles.downloadIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 16L12 8" stroke="#636363" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 13L12 16L15 13" stroke="#636363" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3 15V16C3 18.2091 4.79086 20 7 20H17C19.2091 20 21 18.2091 21 16V15" stroke="#636363" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </a>
                <div className={styles.documentDetails}>
                  <h3 className={styles.documentTitle}>{document.title}</h3>
                  <p className={styles.documentFormat}>
                    {document.fileFormat}, {document.fileSize}
                  </p>
                </div>
              </div>
              <div className={styles.documentMeta}>
                <p className={styles.documentDate}>{document.date}</p>
                <p className={styles.documentOrg}>{document.organization}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}