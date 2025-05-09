'use client';

import React from "react";
import Header from "../../components/Header/Header";
import AdminSection from "../../components/AdminSection/AdminSection";
import Footer from "../../components/Footer/Footer";
import styles from "./page.module.css";

export default function AdminPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        <AdminSection />
        <Footer />
      </main>
    </div>
  );
}