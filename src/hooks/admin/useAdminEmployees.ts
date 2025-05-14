import { useState, useEffect } from 'react';
import { Employee } from '@/types/employees';

export const useAdminEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<Employee, 'id'>>({
    name: '',
    position: '',
    photo_url: '',
    description: '',
    link: '',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees`);
    const data = await res.json();
    if (data.status === 'ok') {
      setEmployees(data.employees);
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preparedData),
    });
    const data = await res.json();
    if (data.status === 'ok') {
      setFormData({
        name: '',
        position: '',
        photo_url: '',
        description: '',
        link: '',
      });
      setShowForm(false);
      fetchEmployees();
    } else {
      alert('Ошибка при добавлении сотрудника');
    }
  };

  const deleteEmployee = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.status === 'ok') {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    }
  };

  const toggleForm = () => setShowForm((prev) => !prev);

  return {
    employees,
    formData,
    showForm,
    handleInputChange,
    handleAdd,
    deleteEmployee,
    toggleForm,
  };
};
