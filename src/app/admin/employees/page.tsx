'use client';

import React from "react";
import Header from "../../../components/Header/Header";
import DashboardSection from "../../../components/DashboardSection/DashboardSection";
import Footer from "../../../components/Footer/Footer";
import styles from "./page.module.css";

export default function EmployeesPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        <DashboardSection />
        <Footer />
      </main>
    </div>
  );
}