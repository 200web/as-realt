"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import { useNavigation } from "../../hooks/useNavigation";
import { useCookieBanner } from "@/context/CookieBannerContext";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  const { handleAnchorNavigation } = useNavigation();

  const { show } = useCookieBanner();

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Left side - Logo and agency info */}
          <div className={styles.leftSection}>
            <div className={styles.logoContainer}>
              <img
                src="/LOGO_1.webp"
                alt="Логотип агентства"
                className={styles.logo}
              />
            </div>
            <div className={styles.agencyInfo}>
              <p className={styles.agencyName}>АГЕНТСТВО</p>
              <p className={styles.agencyName}>недвижимости</p>
              <p className={styles.agencySlogan}>Агентство AS недвижимости</p>
              <p className={styles.agencySlogan}>Вместе мы сможем больше!</p>
              {isMobile && (
                <a href="tel:+375445630206" className={styles.agencyPhone}>
                  +375 (44) 563-02-06
                </a>
              )}
            </div>
          </div>

          {/* Right side - Navigation links */}
          <nav className={styles.footerNav}>
            {isMobile ? (
              <>
                <div className={styles.navColumn}>
                  {/* About Us Page Link */}
                  <Link href="/about-us" className={styles.navLink}>
                    Об агентстве
                  </Link>

                  {/* Anchor links with navigation handler */}
                  <a
                    href="#properties"
                    className={styles.navLink}
                    onClick={(e) => handleAnchorNavigation(e, "properties")}
                  >
                    Наши объекты
                  </a>

                  <a
                    href="#advantages"
                    className={styles.navLink}
                    onClick={(e) => handleAnchorNavigation(e, "advantages")}
                  >
                    Преимущества
                  </a>

                  <a
                    href="#specialists"
                    className={styles.navLink}
                    onClick={(e) => handleAnchorNavigation(e, "specialists")}
                  >
                    Специалисты
                  </a>
                  <a
                    href="#stages"
                    className={styles.navLink}
                    onClick={(e) => handleAnchorNavigation(e, "stages")}
                  >
                    Этапы работы
                  </a>

                  <a
                    href="#form"
                    className={styles.navLink}
                    onClick={(e) => handleAnchorNavigation(e, "form")}
                  >
                    Форма заявки
                  </a>

                  <a
                    href="#contacts"
                    className={styles.navLink}
                    onClick={(e) => handleAnchorNavigation(e, "contacts")}
                  >
                    Контакты
                  </a>
                </div>
                <div className={styles.navColumn}>
                  <a
                    href="#testimonials"
                    className={styles.navLink}
                    onClick={(e) => handleAnchorNavigation(e, "testimonials")}
                  >
                    Отзывы
                  </a>

                  <a
                    href="#documents"
                    className={styles.navLink}
                    onClick={(e) => handleAnchorNavigation(e, "docs")}
                  >
                    Документы агентства
                  </a>

                  <a href="/privacy-policy" className={styles.navLink}>
                    Политика в отношении обработки cookies
                  </a>
                  <a href="/personal-data-policy" className={styles.navLink}>
                    Политика в отношении обработки персональных данных
                  </a>
                  <a className={styles.navLink} onClick={show}>
                    Выбор настроек cookies
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className={styles.navColumn}>
                  {/* About Us Page Link */}
                  <Link href="/about-us" className={styles.navLink}>
                    Об агентстве
                  </Link>

                  {/* Anchor links with navigation handler */}
                  <a
                    href="#properties"
                    className={styles.navLink}
                    onClick={(e) => handleAnchorNavigation(e, "properties")}
                  >
                    Наши объекты
                  </a>

                  <a
                    href="#advantages"
                    className={styles.navLink}
                    onClick={(e) => handleAnchorNavigation(e, "advantages")}
                  >
                    Преимущества
                  </a>

                  <a
                    href="#specialists"
                    className={styles.navLink}
                    onClick={(e) => handleAnchorNavigation(e, "specialists")}
                  >
                    Специалисты
                  </a>
                </div>
                <div className={styles.navColumn}>
                  <a
                    href="#stages"
                    className={styles.navLink}
                    onClick={(e) => handleAnchorNavigation(e, "stages")}
                  >
                    Этапы работы
                  </a>

                  <a
                    href="#form"
                    className={styles.navLink}
                    onClick={(e) => handleAnchorNavigation(e, "form")}
                  >
                    Форма заявки
                  </a>

                  <a
                    href="#contacts"
                    className={styles.navLink}
                    onClick={(e) => handleAnchorNavigation(e, "contacts")}
                  >
                    Контакты
                  </a>

                  <a
                    href="#testimonials"
                    className={styles.navLink}
                    onClick={(e) => handleAnchorNavigation(e, "testimonials")}
                  >
                    Отзывы
                  </a>
                </div>
                <div className={styles.navColumn}>
                  <a
                    href="#documents"
                    className={styles.navLink}
                    onClick={(e) => handleAnchorNavigation(e, "docs")}
                  >
                    Документы агентства
                  </a>

                  <a href="/privacy-policy" className={styles.navLink}>
                    Политика в отношении обработки cookies
                  </a>

                  <a href="/personal-data-policy" className={styles.navLink}>
                    Политика в отношении обработки персональных данных
                  </a>

                  <a className={styles.navLink} onClick={show}>
                    Выбор настроек cookies
                  </a>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
}
