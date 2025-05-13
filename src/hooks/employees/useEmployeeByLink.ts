// hooks/employees/useEmployeeByLink.ts
import { useEffect, useState } from 'react';

import { Employee } from '@/types/employees';

export const useEmployeeByLink = (link: string) => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/${link}`);
      const data = await res.json();
      if (data.status === 'ok') {
        setEmployee(data.employee);
      }
      setLoading(false);
    };

    fetchEmployee();
  }, [link]);

  return { employee, loading };
};
