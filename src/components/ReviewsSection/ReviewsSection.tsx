"use client";

import React, { useEffect, useState } from "react";
import styles from "./ReviewsSection.module.css";
import phoneIcon from "../../../public/phone.webp";
import mailIcon from "../../../public/mail.webp";
import member1 from "../TeamSection/assets/member1.png";
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

export default function ReviewsSection() {
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
        <div className={styles.infBlock}>
          <div className={styles.photo}>
            <img src={member1.src} alt="portrait" />
          </div>
          <div className={styles.mainInfo}>
            <div className={styles.namePos}>
              <span className={styles.name}>Алексей Симченко</span>
              <span className={styles.pos}>
                Директор “Агентства AS недвижимости”
              </span>
            </div>
            <div className={styles.phoneEmail}>
              <div className={styles.phone}>
                <img src={phoneIcon.src} alt="phone" height={42} width={42} />
                <span>+375 (44) 563-02-06</span>
              </div>
              <div className={styles.email}>
                <img src={mailIcon.src} alt="mail" height={42} width={42} />
                <span>asrealt@mail.ru</span>
              </div>
            </div>
            {!isMobile && (
              <div className={styles.descr}>
                <span>
                  “Когда я говорю, что мне легко, то это означает, что мои труды
                  приносят результат. Окружающим - пользу, а мне -
                  удовлетворение и, разумеется, деньги. Вот как работает
                  призвание! Значит ли это, что наша команда никогда не
                  ошибается или целыми днями плюет в потолок? Пфф, разумеется
                  нет! Уж мы то знаем, что ключ к успеху - труд”
                </span>
              </div>
            )}
          </div>
          {isMobile && (
            <div className={styles.descr}>
              <span>
                “Когда я говорю, что мне легко, то это означает, что мои труды
                приносят результат. Окружающим - пользу, а мне - удовлетворение
                и, разумеется, деньги. Вот как работает призвание! Значит ли
                это, что наша команда никогда не ошибается или целыми днями
                плюет в потолок? Пфф, разумеется нет! Уж мы то знаем, что ключ к
                успеху - труд”
              </span>
            </div>
          )}
        </div>
        <div className={styles.reviewsBlock}>
          <div className={styles.header}>
            <span>Отзывы о специалисте </span>
          </div>
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
