'use client';

import React from "react";
import Header from "../../../components/Header/Header";
import EmployeesAdmin from "../../../components/admin/employees/EmployeesAdmin/EmployeesAdmin";
import Footer from "../../../components/Footer/Footer";
import styles from "./page.module.css";

export default function EmployeesPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        <EmployeesAdmin />
        <Footer />
      </main>
    </div>
  );
}