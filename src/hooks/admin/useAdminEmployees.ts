import { useState } from 'react';
import { Employee } from '@/types/employees';

export const useAdminEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchEmployees = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees`);
    const data = await res.json();
    if (data.status === 'ok') {
      setEmployees(data.employees);
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

  const addEmployee = async (employeeData: Omit<Employee, 'id'>) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employeeData),
    });
    return await res.json();
  };

  return {
    employees,
    setEmployees,
    fetchEmployees,
    deleteEmployee,
    addEmployee,
  };
};
