"use client";

import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./page.module.css";
import ReviewsSection from "../../components/ReviewsSection/ReviewsSection";

export default function ReviewsPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        <ReviewsSection />
        <Footer />
      </main>
    </div>
  );
}
