'use client';

import React from "react";
import Header from "../../../components/Header/Header";
import Leads from "../../../components/Leads/Leads";
import Footer from "../../../components/Footer/Footer";
import styles from "./page.module.css";

export default function LeadsPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        <Leads />
        <Footer />
      </main>
    </div>
  );
}