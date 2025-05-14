import { useState } from 'react';
import { Employee } from '@/types/employees';

const initialForm = {
  name: '',
  position: '',
  photo_url: '',
  description: '',
  link: '',
};

type Props = {
  addEmployee: (data: any) => Promise<boolean>;
  deleteEmployee: (id: number) => Promise<void>;
};

export function useEmployeeForm({ addEmployee, deleteEmployee }: Props) {
  const [formData, setFormData] = useState(initialForm);
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    const success = await addEmployee(formData);
    if (success) {
      setFormData(initialForm);
      setShowForm(false);
    } else {
      alert('Ошибка при добавлении сотрудника');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить сотрудника?')) return;
    await deleteEmployee(id);
  };

  return {
    formData,
    showForm,
    setShowForm,
    handleInputChange,
    handleAdd,
    handleDelete,
  };
}
