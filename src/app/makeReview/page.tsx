"use client";

import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./page.module.css";
import MakeReviewSection from "../../components/MakeReviewSection/MakeReviewSection";

export default function MakeReviewPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        <MakeReviewSection />
        <Footer />
      </main>
    </div>
  );
}
