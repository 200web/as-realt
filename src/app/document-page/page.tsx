'use client';

import React from "react";
import Header from "../../components/Header/Header";
import CookiesPolicy from "../../components/DocumentsPages/CookiesPolicy";
import Footer from "../../components/Footer/Footer";
import styles from "./page.module.css";

export default function DocumentPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        <CookiesPolicy />
        <Footer />
      </main>
    </div>
  );
}