import React from "react";
import styles from "./ReviewCard.module.css";

interface ReviewCardProps {
  author: string;
  // source: string;
  date: string;
  text: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  author,
  date,
  text,
}) => (
  <div className={styles.revCardLayout}>
    <div className={styles.cardHeader}>
      <div className={styles.nameEmail}>
        <span className={styles.name}>{author}</span>
        {/* <span className={styles.email}>{source}</span> */}
      </div>
      <div className={styles.date}>{date}</div>
    </div>
    <div className={styles.cardDescr}>
      <span>{text}</span>
    </div>
  </div>
);
