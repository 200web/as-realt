"use client";

import React from "react";
import styles from "./page.module.css";
// Fix the import paths to match your file structure
import Header from "../components/Header/Header";
// Remove the bg image import since we're handling it in ClientBackground
// import bgImage from ".realty_app/bg1.jpg";
import HeroSection from "../components/HeroSection/HeroSection";
import AboutSection from "../components/AboutAgencySection/AboutAgencySection";
import PropertiesCarouselSection from "../components/PropertiesCarousel/PropertiesCarousel";
import AdvanegesSection from "../components/AdvantagesSection/AdvantagesSection";
import TeamSection from "../components/TeamSection/TeamSection";
import WorkStagesSection from "../components/WorkStagesSection/WorkStagesSection";
import TestimonialsCarousel from "../components/TestimonialsCarousel/TestimonialsCarousel";
import DocumentsSection from "../components/DocumentsSection/DocumentsSection";
import ContactForm from "../components/ContactForm/ContactForm";
import ContactsSection from "../components/ContactsSection/ContactsSection";
import Footer from "../components/Footer/Footer";

// Import your full-size image
import fullWidthImage from "./assets/Mask_group.png";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Remove the background div */}
      <main className={styles.main}>
        <Header />
        <HeroSection />
        <AboutSection />
        <PropertiesCarouselSection />
        <AdvanegesSection />
        <TeamSection />
        <WorkStagesSection />
        <section className={styles.fullWidthImageSection}>
          <div className={styles.imageContainer}>
            <img
              src={fullWidthImage.src}
              alt="Real Estate Development"
              className={styles.fullWidthImage}
            />
          </div>
        </section>
        <TestimonialsCarousel />
        <DocumentsSection />
        <ContactForm />
        <ContactsSection />
        <Footer />
      </main>
    </div>
  );
}
