import { useEffect, useState } from 'react';

export function useEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          setEmployees(data.employees);
        }
        setLoading(false);
      });
  }, []);

  return { employees, loading };
}
