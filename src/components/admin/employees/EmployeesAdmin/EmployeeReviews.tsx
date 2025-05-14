import React from 'react';
import styles from './EmployeesAdmin.module.css';
import { Review } from '@/types/employees';

type Props = {
  reviews: Review[];
  employeeLink: string;
  toggleReviewPublish: (employeeLink: string, reviewId: number) => void;
};

const EmployeeReviews: React.FC<Props> = ({ reviews, employeeLink, toggleReviewPublish }) => {
  return (
    <div className={styles.reviewsContainer}>
      <h3 className={styles.reviewsTitle}>Отзывы о специалисте</h3>
      {reviews.length ? (
        reviews.map((rev) => (
          <div key={rev.id} className={styles.reviewRow}>
            <div>{rev.name}</div>
            <div>{rev.review}</div>
            <div>{rev.date}</div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={rev.is_published === 1}
                  onChange={() => toggleReviewPublish(employeeLink, rev.id)}
                />{' '}
                Опубликован
              </label>
            </div>
          </div>
        ))
      ) : (
        <div>Нет отзывов</div>
      )}
    </div>
  );
};

export default EmployeeReviews;
