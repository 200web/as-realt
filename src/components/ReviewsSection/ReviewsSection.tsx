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
  source: string;
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
    // Получаем сотрудника по ссылке
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/link/${link}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setEmployee(data.employee);
        }
      });

    // Получаем отзывы только для этого сотрудника
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee-reviews/${link}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
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
      <div className={styles.container}>
        <div className={styles.topRow}>
          <a href="https://www.asrealt.by/#specialists" className={styles.backArrow}>
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
       <div className={styles.headerWithButton}>
  <span className={styles.title}>Отзывы о специалисте</span>
  <a href="/makeReview" className={styles.leaveButton}>Оставить отзыв</a>
</div>

          {reviews.map((r) => (
            <ReviewCard
              key={r.id}
              author={r.name}
              source={r.source || "Yandex.ru"}
              date={r.date}
              text={r.review}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
