'use client';

import React from "react";
import Header from "../../components/Header/Header";
import PersonalDataPolicy from "../../components/PolicyPages/PersonalDataPolicy";
import Footer from "../../components/Footer/Footer";
import styles from "./page.module.css";

export default function DocumentPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        <PersonalDataPolicy />
        <Footer />
      </main>
    </div>
  );
}