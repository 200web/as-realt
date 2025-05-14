// hooks/employees/useEmployees.ts
import { useEffect, useState } from 'react';
import { Employee } from '@/types/employees';

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);

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

  const deleteEmployee = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.status === 'ok') {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    }
  };

  const addEmployee = async (formData: any) => {
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
      await fetchEmployees(); // 👈 добавили тут обновление
      return true;
    } else {
      return false;
    }
  };

  return { employees, setEmployees, fetchEmployees, deleteEmployee, addEmployee };
}
