'use client';

import React, { useState } from 'react';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    topic: '',
    agreementChecked: false
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    phone: false,
    topic: false,
    agreement: false
  });

  const [open, setOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: e.target.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const errors = {
  //     name: formData.name.trim() === '',
  //     phone: formData.phone.trim() === '',
  //     topic: formData.topic.trim() === '',
  //     agreement: !formData.agreementChecked
  //   };

  //   setFormErrors(errors);

  //   if (!errors.name && !errors.phone && !errors.topic && !errors.agreement) {
  //     console.log('Form submitted:', formData);
  //     alert('Заявка отправлена успешно!');

  //     setFormData({
  //       name: '',
  //       phone: '',
  //       topic: '',
  //       agreementChecked: false
  //     });
  //   }
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const errors = {
      name: formData.name.trim() === '',
      phone: formData.phone.trim() === '',
      topic: formData.topic.trim() === '',
      agreement: !formData.agreementChecked
    };
  
    setFormErrors(errors);
  
    if (!errors.name && !errors.phone && !errors.topic && !errors.agreement) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          message: formData.topic
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Ответ от сервера:', data);
          alert('Заявка отправлена успешно!');
          setFormData({
            name: '',
            phone: '',
            topic: '',
            agreementChecked: false
          });
        })
        .catch((err) => {
          console.error('Ошибка при отправке формы:', err);
        });
    }
  };
  

  const topics = [
    'Первичная консультация',
    'Продажа квартиры',
    'Аренда недвижимости',
    'Загородный дом'
  ];

  return (
    <section id="form" className={styles.contactFormSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Оставьте заявку</h2>
        <p className={styles.subtitle}>
          Мы ответим на все интересующие вопросы и поможем<br />
          в любых даже самых сложных случаях
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <div className={styles.inputRow}>
              <div className={styles.inputItem}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ваше имя"
                  className={`${styles.input} ${formErrors.name ? styles.inputError : ''}`}
                />
                <div className={`${styles.inputLine} ${formErrors.name ? styles.inputLineError : ''}`}></div>
              </div>

              <div className={styles.inputItem}>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Ваш телефон"
                  className={`${styles.input} ${formErrors.phone ? styles.inputError : ''}`}
                />
                <div className={`${styles.inputLine} ${formErrors.phone ? styles.inputLineError : ''}`}></div>
              </div>

              <div className={styles.inputItem}>
                <div className={styles.customSelectWrapper}>
                  <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className={`${styles.customSelectTrigger} ${formErrors.topic ? styles.inputError : ''}`}
                  >
                    {formData.topic || 'Выбрать тему'}
                  </button>
                  {open && (
                    <ul className={styles.customSelectList}>
                      {topics.map(topic => (
                        <li
                          key={topic}
                          onClick={() => {
                            setFormData(prev => ({ ...prev, topic }));
                            setFormErrors(prev => ({ ...prev, topic: false }));
                            setOpen(false);
                          }}
                          className={styles.customSelectOption}
                        >
                          {topic}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.agreementCheckbox}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="agreementChecked"
                  checked={formData.agreementChecked}
                  onChange={handleChange}
                  className={styles.checkboxInput}
                />
                <span className={`${styles.customCheckbox} ${formErrors.agreement ? styles.checkboxError : ''}`}></span>
                <span className={styles.checkboxText}>
                  Я соглашаюсь с обработкой персональных данных
                </span>
              </label>
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            Отправить заявку
          </button>
        </form>
      </div>
    </section>
  );
}
