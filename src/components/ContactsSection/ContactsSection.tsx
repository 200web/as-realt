'use client';

import React from 'react';
import styles from './ContactsSection.module.css';

export default function ContactsSection() {
  return (
    <section id="contacts" className={styles.contactsSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Контакты</h2>
        
        <div className={styles.contactsContent}>
          <div className={styles.mapContainer}>
            {/* Map placeholder - replace with actual Google Maps embed code or component */}
            <div className={styles.mapContainer}>
                <iframe 
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3A8cd1e497becbfca1d205df8a729aa4332cafa1cb133d168b071f0eb1ceb4dfc3&amp;source=constructor"
                    width="100%" 
                    height="400" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy"
                    title="Карта"
                    className={styles.googleMap}
                ></iframe>
                </div>
          </div>
          
          <div className={styles.contactInfo}>
            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>АДРЕС:</h3>
              <p className={styles.infoText}>
                г.Минск, ул.Немига, д.40, этаж 5,<br />
                пом.16, офис 511
              </p>
            </div>
            
            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>ТЕЛЕФОН:</h3>
              <p className={styles.infoText}>
                Ресепшен: <a href="tel:+375445630206" className={styles.infoLink}>+375 (44) 563-02-06</a>
              </p>
            </div>
            
            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>НАША ПОЧТА:</h3>
              <p className={styles.infoText}>
                <a href="mailto:asrealt@mail.ru" className={styles.infoLink}>asrealt@mail.ru</a>
              </p>
            </div>
            
            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>ИНСТАГРАМ:</h3>
              <p className={styles.infoText}>
                <a href="https://instagram.com/asrealt" className={styles.infoLink} target="_blank" rel="noopener noreferrer" >@asrealt</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}