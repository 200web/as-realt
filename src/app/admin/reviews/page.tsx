'use client';

import React from "react";
import Header from "../../../components/Header/Header";
import ReviewsAdmin from "../../../components/ReviewsAdmin/ReviewsAdmin";
import Footer from "../../../components/Footer/Footer";
import styles from "./page.module.css";

export default function ReviewsPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        <ReviewsAdmin />
        <Footer />
      </main>
    </div>
  );
}