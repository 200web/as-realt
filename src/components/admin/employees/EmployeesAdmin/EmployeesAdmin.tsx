'use client';

import { useRouter } from 'next/navigation';
import styles from './EmployeesAdmin.module.css';

import { useEmployees } from '@/hooks/employees/useEmployees';
import { useEmployeeReviews } from '@/hooks/employees/useEmployeeReviews';
import { useEmployeeForm } from '@/hooks/employees/useEmployeeForm';

import EmployeeForm from './EmployeeForm';
import EmployeeRow from './EmployeeRow';

export default function EmployeesAdmin() {
  const router = useRouter();

  const { employees, addEmployee, deleteEmployee } = useEmployees();
  const { employeeReviews, toggleReviews, toggleReviewPublish } = useEmployeeReviews();

  const {
    formData,
    showForm,
    setShowForm,
    handleInputChange,
    handleAdd,
    handleDelete,
  } = useEmployeeForm({ addEmployee, deleteEmployee });

  return (
    <div className={styles.employees}>
      <div className={styles.container}>
        
        <button className={styles.back} onClick={() => router.push('/admin/dashboard')}>
          &lt; Назад
        </button>

        <div className={styles.headerRow}>
          <h1 className={styles.title}>Сотрудники</h1>
          <button className={styles.addButton} onClick={() => setShowForm((prev) => !prev)}>
            {showForm ? 'Скрыть форму' : 'Добавить сотрудника'}
          </button>
        </div>

        {showForm && (
          <EmployeeForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleAdd={handleAdd}
          />
        )}

        <div className={styles.table}>
          <div className={`${styles.row} ${styles.header}`}>
            <div>Имя</div>
            <div>Должность</div>
            <div>Описание</div>
            <div>Действие</div>
          </div>
          {employees.map((emp) => (
            <EmployeeRow
              key={emp.id}
              employee={emp}
              onDelete={handleDelete}
              onToggleReviews={toggleReviews}
              reviewsData={employeeReviews[emp.link]}
              onTogglePublish={toggleReviewPublish}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
