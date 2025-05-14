import React from 'react';
import styles from './EmployeesAdmin.module.css';
import { Employee, EmployeeReviews as EmployeeReviewsType } from '@/types/employees';
import EmployeeReviews from './EmployeeReviews';

type Props = {
  employee: Employee;
  onDelete: (id: number) => void;
  onToggleReviews: (link: string) => void;
  reviewsData?: EmployeeReviewsType;
  onTogglePublish: (employeeLink: string, reviewId: number) => void;
};

const EmployeeRow: React.FC<Props> = ({
  employee,
  onDelete,
  onToggleReviews,
  reviewsData,
  onTogglePublish,
}) => {
  return (
    <div key={employee.id}>
      <div className={styles.row}>
        <div>{employee.name}</div>
        <div>{employee.position}</div>
        <div>{employee.description}</div>
        <div>
          <button
            onClick={() => onToggleReviews(employee.link)}
            style={{ marginRight: '10px', padding: '0px 2px' }}
          >
            {reviewsData?.show ? 'Скрыть' : 'Отзывы'}
          </button>
          <button onClick={() => onDelete(employee.id)}>Удалить</button>
        </div>
      </div>
      {reviewsData?.show && (
        <EmployeeReviews
          reviews={reviewsData.reviews}
          employeeLink={employee.link}
          toggleReviewPublish={onTogglePublish}
        />
      )}
    </div>
  );
};

export default EmployeeRow;
