'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './EmployeesAdmin.module.css';

type Employee = {
  id: number;
  name: string;
  position: string;
  photo_url: string;
  description: string;
  link: string;
};

type Review = {
  id: number;
  name: string;
  review: string;
  date: string;
  is_published: number;
};

// Для хранения состояния отзывов по сотруднику: видны ли и их список
type EmployeeReviews = {
  show: boolean;
  reviews: Review[];
};

export default function EmployeesAdmin() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    photo_url: '',
    description: '',
    link: '',
  });
  // объект, где ключ – employee.link, значение содержит { show, reviews }
  const [employeeReviews, setEmployeeReviews] = useState<Record<string, EmployeeReviews>>({});

  const router = useRouter();

  // Загружаем список сотрудников
  const fetchEmployees = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees`);
    const data = await res.json();
    if (data.status === 'ok') {
      setEmployees(data.employees);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить сотрудника?')) return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.status === 'ok') {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    const preparedData = {
      ...formData,
      description: formData.description.trim() === '' ? 'null' : formData.description,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preparedData),
    });
    const data = await res.json();
    if (data.status === 'ok') {
      setFormData({ name: '', position: '', photo_url: '', description: '', link: '' });
      setShowForm(false);
      fetchEmployees();
    } else {
      alert('Ошибка при добавлении сотрудника');
    }
  };

  // Функция для переключения показа отзывов по сотруднику
  const toggleReviews = async (employeeLink: string) => {
    setEmployeeReviews((prev) => {
      const current = prev[employeeLink] || { show: false, reviews: [] };
      return { 
        ...prev, 
        [employeeLink]: { ...current, show: !current.show } 
      };
    });

    // Если отзывы ещё не загружены для этого сотрудника, или если они скрывались и повторно показываются —
    // делаем запрос
    if (!employeeReviews[employeeLink]?.reviews || !employeeReviews[employeeLink]?.show) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee-reviews/${employeeLink}`);
      const data = await res.json();
      if (data.status === 'ok') {
        setEmployeeReviews((prev) => ({
          ...prev,
          [employeeLink]: { 
            show: true, 
            reviews: data.reviews 
          },
        }));
      }
    }
  };

  // Функция для переключения галочки у отзыва
  const toggleReviewPublish = async (employeeLink: string, reviewId: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee-reviews/${reviewId}/toggle`, {
      method: 'PATCH',
    });
    const data = await res.json();
    if (data.status === 'ok') {
      // После успешного переключения перезапросим отзывы для сотрудника, чтобы обновить данные
      const fetchRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee-reviews/${employeeLink}`);
      const fetchData = await fetchRes.json();
      if (fetchData.status === 'ok') {
        setEmployeeReviews((prev) => ({
          ...prev,
          [employeeLink]: { show: true, reviews: fetchData.reviews },
        }));
      }
    }
  };

  return (
    <div className={styles.employees}>
      <div className={styles.container}>
        <button className={styles.back} onClick={() => router.push('/admin/dashboard')}>
          &lt; Назад
        </button>
        <h1 className={styles.title}>Сотрудники</h1>

        <div className={styles.table}>
          <div className={`${styles.row} ${styles.header}`}>
            <div>Имя</div>
            <div>Должность</div>
            <div>Описание</div>
            <div>Действие</div>
          </div>
          {employees.map((emp) => (
            <div key={emp.id}>
              <div className={styles.row}>
                <div>{emp.name}</div>
                <div>{emp.position}</div>
                <div>{emp.description}</div>
                <div>
                <button onClick={() => toggleReviews(emp.link)} style={{ marginRight: '10px', padding: '0px 2px' }}>
                    {employeeReviews[emp.link]?.show ? 'Скрыть' : 'Отзывы'}
                  </button>

                <button onClick={() => handleDelete(emp.id)}>Удалить</button>
               
               
                </div>
              </div>
              {/* Отображаем отзывы, если они открыты */}
              {employeeReviews[emp.link]?.show && (
                <div className={styles.reviewsContainer}>
                      <h3 className={styles.reviewsTitle}>Отзывы о специалисте</h3>
                  {employeeReviews[emp.link].reviews.length ? (
                    employeeReviews[emp.link].reviews.map((rev) => (
                      <div key={rev.id} className={styles.reviewRow}>
                      <div>{rev.name}</div>
                      <div>{rev.review}</div>
                      <div>{rev.date}</div>
                      <div>
                        <input
                          type="checkbox"
                          checked={rev.is_published === 1}
                          onChange={() => toggleReviewPublish(emp.link, rev.id)}
                        />
                      </div>
                    </div>
                    
                    ))
                  ) : (
                    <div>Нет отзывов</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.centered}>
          <button className={styles.addButton} onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Скрыть форму' : 'Добавить сотрудника'}
          </button>
        </div>

        {showForm && (
          <div className={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Имя"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="position"
              placeholder="Должность"
              value={formData.position}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="photo_url"
              placeholder="Ссылка на фото"
              value={formData.photo_url}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Описание"
              value={formData.description}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="link"
              placeholder="Ссылка (на профиль)"
              value={formData.link}
              onChange={handleInputChange}
            />
            <button className={styles.submitButton} onClick={handleAdd}>
              Добавить сотрудника
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
