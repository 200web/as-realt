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
  is_published: number;
};

export default function ReviewsAdmin() {
  const [reviews, setReviews] = useState<Review[]>([]);
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
      method: 'PATCH',
    });
    const data = await res.json();
    if (data.status === 'ok') {
      fetchReviews(); // обновим список после изменения
    }
  };

  return (
    <div className={styles.reviews}>
      <div className={styles.container}>
        <button className={styles.back} onClick={() => router.push('/admin/dashboard')}>
          &lt; Назад
        </button>
        <h1 className={styles.title}>Отзывы</h1>
        <div className={styles.table}>
          <div className={`${styles.row} ${styles.header}`}>
            <div>Имя</div>
            <div>Телефон</div>
            <div>Текст</div>
            <div>Дата</div>
            <div>Публикация</div>
          </div>
          {reviews.map((review) => (
            <div key={review.id} className={styles.row}>
              <div>{review.name}</div>
              <div>{review.phone}</div>
              <div>{review.review}</div>
              <div>{review.date}</div>
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
