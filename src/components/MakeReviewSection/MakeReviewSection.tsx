'use client';

import React, { useEffect, useState } from 'react';
import styles from './MakeReviewSection.module.css';
import { ReviewCard } from '../ReviewCard/ReviewCard';

export default function MakeReviewSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    review: '',
    agreementChecked: false
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    phone: false,
    review: false,
    agreement: false
  });

  const [reviews, setReviews] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/published`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok') {
          setReviews(data.reviews);
        }
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      name: formData.name.trim() === '',
      phone: formData.phone.trim() === '',
      review: formData.review.trim() === '',
      source: formData.review.trim() === '',
      agreement: !formData.agreementChecked
    };

    setFormErrors(errors);

    if (!Object.values(errors).some(Boolean)) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          review: formData.review,
          source: 'Наш сайт',
          date: new Date().toLocaleDateString('ru-RU')
        })
      });

      const data = await res.json();
      if (data.status === 'ok') {
        setFormData({
          name: '',
          phone: '',
          review: '',
          agreementChecked: false
        });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
      }
    }
  };

  return (
    <section className={styles.loginSection}>
      <div className={styles.container}>
        <div className={styles.reviewsBlock}>
          <div className={styles.header}>
            <span>Оставьте свой отзыв</span>
          </div>
          <form className={styles.reviewForm} onSubmit={handleSubmit}>
            <textarea
              name="review"
              className={styles.textArea}
              placeholder="Напишите свой отзыв"
              value={formData.review}
              onChange={handleChange}
            />
            <div className={styles.namePhoneRow}>
              <input
                name="name"
                placeholder="Ваше имя"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                name="phone"
                placeholder="Ваш телефон"
                type="text"
                value={formData.phone}
                onChange={handleChange}
              />
              <button type="submit" className={styles.button} disabled={submitted}>
                {submitted ? 'Спасибо за отзыв!' : 'Отправить отзыв'}
              </button>
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
                  Я соглашаюсь с&nbsp;
  <a
    href="/personal-data-policy/"
    className={styles.link}
  >
    политикой обработки персональных данных
  </a>
                </span>
              </label>
            </div>
          </form>

          {reviews.map((r: any) => (
            <ReviewCard
              key={r.id}
              author={r.name}
              source={r.source} 
              date={r.date}
              text={r.review}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
