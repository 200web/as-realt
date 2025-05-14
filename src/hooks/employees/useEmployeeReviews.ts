import { useState } from 'react';
import { Review, EmployeeReviews } from '@/types/employees';

export function useEmployeeReviews() {
  const [employeeReviews, setEmployeeReviews] = useState<Record<string, EmployeeReviews>>({});

  const toggleReviews = async (employeeLink: string) => {
    const prevShow = employeeReviews[employeeLink]?.show ?? false;

    if (!prevShow) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee-reviews/${employeeLink}`);
      const data = await res.json();
      if (data.status === 'ok') {
        setEmployeeReviews((prev) => ({
          ...prev,
          [employeeLink]: {
            show: true,
            reviews: data.reviews,
          },
        }));
      }
    } else {
      setEmployeeReviews((prev) => ({
        ...prev,
        [employeeLink]: {
          ...prev[employeeLink],
          show: false,
        },
      }));
    }
  };

  const toggleReviewPublish = async (employeeLink: string, reviewId: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee-reviews/${reviewId}/toggle`, {
      method: 'PATCH',
    });
    const data = await res.json();
    if (data.status === 'ok') {
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

  return { employeeReviews, toggleReviews, toggleReviewPublish };
}
