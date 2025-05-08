"use client";

import React, { useEffect, useState } from "react";
import styles from "./MakeReviewSection.module.css";
import { ReviewCard } from "../ReviewCard/ReviewCard";

export interface Review {
  id: string;
  author: string;
  source: string;
  date: string;
  text: string;
}

export const reviews: Review[] = [
  {
    id: "1",
    author: "Юлия Агапитова",
    source: "Yandex.ru",
    date: "15.02.2025",
    text: `Хочу выразить огромную благодарность Алексею за грамотный подход к работе. У нас была непростая сделка в плане юридического оформления и расчетов. Алексей разобрался во всех нюансах, подробно рассказал историю приобретаемой квартиры. Сопровождал на всех этапах сделки, всегда был на связи. Все было максимально вежливо и профессионально. От работы с Алексеем остались только положительные эмоции`,
  },
  {
    id: "2",
    author: "Юлия Агапитова",
    source: "Yandex.ru",
    date: "15.02.2025",
    text: `Хочу выразить огромную благодарность Алексею за грамотный подход к работе. У нас была непростая сделка в плане юридического оформления и расчетов. Алексей разобрался во всех нюансах, подробно рассказал историю приобретаемой квартиры. Сопровождал на всех этапах сделки, всегда был на связи. Все было максимально вежливо и профессионально. От работы с Алексеем остались только положительные эмоции`,
  },
  {
    id: "3",
    author: "Юлия Агапитова",
    source: "Yandex.ru",
    date: "15.02.2025",
    text: `Хочу выразить огромную благодарность Алексею за грамотный подход к работе. У нас была непростая сделка в плане юридического оформления и расчетов. Алексей разобрался во всех нюансах, подробно рассказал историю приобретаемой квартиры. Сопровождал на всех этапах сделки, всегда был на связи. Все было максимально вежливо и профессионально. От работы с Алексеем остались только положительные эмоции`,
  },
];

export default function MakeReviewSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className={styles.loginSection}>
      <div className={styles.container}>
        <div className={styles.reviewsBlock}>
          <div className={styles.header}>
            <span>Оставьте свой отзыв </span>
          </div>
          <form className={styles.reviewForm}>
            <textarea
              className={styles.textArea}
              placeholder="Напишите свой отзыв"
            />
            <div className={styles.namePhoneRow}>
              <input placeholder="Ваше имя" type="text" />
              <input placeholder="Ваш телефон" type="text" />
              <button type="submit" className={styles.button}>
                Отправить отзыв
              </button>
            </div>
          </form>
          {reviews.map((r) => (
            <ReviewCard
              key={r.id}
              author={r.author}
              source={r.source}
              date={r.date}
              text={r.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
