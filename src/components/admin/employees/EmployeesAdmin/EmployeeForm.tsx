import React from 'react';
import styles from './EmployeesAdmin.module.css';

type Props = {
  formData: {
    name: string;
    position: string;
    photo_url: string;
    description: string;
    link: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleAdd: () => void;
};

const EmployeeForm: React.FC<Props> = ({ formData, handleInputChange, handleAdd }) => {
  return (
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
  );
};

export default EmployeeForm;
