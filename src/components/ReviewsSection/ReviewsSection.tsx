"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./ReviewsSection.module.css";
import mailIcon from "../../../public/mail.webp";
import { ReviewCard } from "../ReviewCard/ReviewCard";

interface Review {
  id: number;
  name: string;
  date: string;
  review: string;
}

interface Employee {
  name: string;
  position: string;
  photo_url: string;
  description: string;
  phone?: string;
  email?: string;
}

export default function ReviewsSection() {
  const { link } = useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/link/${link}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setEmployee(data.employee);
        }
      });

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/published`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "ok") {
          console.log('Отзывы с бэка:', data.reviews);
          setReviews(data.reviews);
        }
      });

  }, [link]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!employee) return null;

  return (
    <section className={styles.loginSection}>
         {/* <a href="http://localhost:3000/#specialists" className={styles.backArrow}>
  &lt; Назад
</a> */}
    <div className={styles.container}>
 
    <div className={styles.topRow}>
    <a href="http://localhost:3000/#specialists" className={styles.backArrow}>
      &lt; Назад
    </a>
  </div>
      <div className={styles.infBlock}>
        
        <div className={styles.photo}>
          <img src={employee.photo_url} alt="portrait" />
        </div>
        <div className={styles.mainInfo}>
          <div className={styles.namePos}>
            <span className={styles.name}>{employee.name}</span>
            <span className={styles.pos}>{employee.position}</span>
          </div>
          <div className={styles.phoneEmail}>
            {/* Удалён телефон */}
            <div className={styles.email}>
              <img src={mailIcon.src} alt="mail" height={42} width={42} />
              <span>asrealt@mail.ru</span>
            </div>
          </div>
          {!isMobile && employee.description && employee.description.toLowerCase() !== "null" && (
            <div className={styles.descr}>
              <span>{employee.description}</span>
            </div>
          )}
        </div>
        {isMobile && employee.description && employee.description.toLowerCase() !== "null" && (
          <div className={styles.descr}>
            <span>{employee.description}</span>
          </div>
        )}
      </div>

      <div className={styles.reviewsBlock}>
        <div className={styles.header}>
          <span>Отзывы о специалисте</span>
        </div>
        {reviews.map((r) => (
          <ReviewCard
            key={r.id}
            author={r.name}
            date={r.date}
            text={r.review}
          />
        ))}
      </div>
    </div>
  </section>
  );
}
