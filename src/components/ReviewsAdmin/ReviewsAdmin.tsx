'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ReviewsAdmin.module.css';

type Review = {
  id: number;
  name: string;
  phone: string;
  review: string;
  date: string;
  source: string;
  is_published: number;
};

export default function ReviewsAdmin() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    review: '',
    source: ''
  });
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const fetchReviews = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`);
    const data = await res.json();
    if (data.status === 'ok') {
      setReviews(data.reviews);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const togglePublish = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${id}/toggle`, {
      method: 'PATCH'
    });
    const data = await res.json();
    if (data.status === 'ok') {
      fetchReviews();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        review: formData.review,
        source: formData.source,
        date: new Date().toLocaleDateString('ru-RU')
      })
    });
    const data = await res.json();
    if (data.status === 'ok') {
      setFormData({ name: '', phone: '', review: '', source: '' });
      fetchReviews();
      setShowForm(false);
    }
  };

  return (
    <div className={styles.reviews}>
      <div className={styles.container}>
        <button className={styles.back} onClick={() => router.push('/admin/dashboard')}>
          &lt; Назад
        </button>

        <div className={styles.headerRow}>
          <h1 className={styles.title}>Отзывы</h1>
          <button className={styles.addButton} onClick={() => setShowForm((prev) => !prev)}>
            {showForm ? 'Скрыть форму' : 'Добавить отзыв'}
          </button>
        </div>

        {showForm && (
          <div className={styles.addReview}>
            <form className={styles.reviewForm} onSubmit={handleSubmit}>
              <textarea
                name="review"
                placeholder="Текст отзыва"
                value={formData.review}
                onChange={handleChange}
              />
              <div className={styles.namePhoneRow}>
                <input
                  name="name"
                  placeholder="Имя"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  name="phone"
                  placeholder="Телефон"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <input
                  name="source"
                  placeholder="Источник (например, Yandex.ru)"
                  type="text"
                  value={formData.source}
                  onChange={handleChange}
                />
                <button type="submit" className={styles.submitButton}>
                  Добавить
                </button>
              </div>
            </form>
          </div>
        )}

        <div className={styles.table}>
          <div className={`${styles.row} ${styles.header}`}>
            <div>Имя</div>
            <div>Телефон</div>
            <div>Текст</div>
            <div>Дата</div>
            <div>Источник</div>
            <div>Публикация</div>
          </div>
          {reviews.map((review) => (
            <div key={review.id} className={styles.row}>
              <div>{review.name}</div>
              <div>{review.phone}</div>
              <div>{review.review}</div>
              <div>{review.date}</div>
              <div>{review.source}</div>
              <div>
                <input
                  type="checkbox"
                  checked={review.is_published === 1}
                  onChange={() => togglePublish(review.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
