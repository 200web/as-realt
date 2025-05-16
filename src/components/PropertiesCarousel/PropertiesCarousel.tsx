"use client";

import React, { useState, useEffect } from "react";
import styles from "./PropertiesCarousel.module.css";
import OurProjects1 from "./assets/OurProjects1.png";
import OurProjects2 from "./assets/OurProjects2.png";
import OurProjects3 from "./assets/OurProjects3.png";
import OurProjects4 from "./assets/OurProjects1.jpg";
import OurProjects5 from "./assets/OurProjects2.jpg";
import OurProjects6 from "./assets/OurProjects4.jpg";
import OurProjects7 from "./assets/OurProjects5.jpg";
import OurProjects8 from "./assets/OurProjects6.jpg";

export default function PropertiesCarousel() {
  // Property data with image src paths
  const properties = [
    {
      id: 1,
      image: OurProjects1.src,
      title: "Квартиры",
      link: "https://realt.by/belarus/sale/flats/?agencyUuids=c6e5cb90-d314-11ef-a0d4-8fa3c3913ed1&seller=false",
    },
    {
      id: 2,
      image: OurProjects2.src,
      title: "Дома, коттеджи",
      link: "https://realt.by/belarus/sale/cottages/?agencyUuids=c6e5cb90-d314-11ef-a0d4-8fa3c3913ed1&seller=false",
    },
    {
      id: 3,
      image: OurProjects3.src,
      title: "Коммерческая недвижимость",
      link: "#",
    },
    {
      id: 4,
      image: OurProjects4.src,
      title: "Элитная недвижимость",
      link: "#",
    },
    {
      id: 5,
      image: OurProjects5.src,
      title: "Новостройки",
      link: "#",
    },
    {
      id: 6,
      image: OurProjects6.src,
      title: "Дачи",
      link: "https://realt.by/belarus/sale/dachi/?agencyUuids=c6e5cb90-d314-11ef-a0d4-8fa3c3913ed1&page=1&seller=false",
    },
    {
      id: 7,
      image: OurProjects7.src,
      title: "Участки",
      link: "#",
    },
    {
      id: 8,
      image: OurProjects8.src,
      title: "Апартаменты",
      link: "#",
    },
  ];

  // State to track the current slide index
  const [currentIndex, setCurrentIndex] = useState(0);
  // State to track items per view based on screen width
  const [itemsPerView, setItemsPerView] = useState(3);
  // для свайпа
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Update itemsPerView based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setItemsPerView(1);
      } else if (window.innerWidth <= 1200) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculate total number of possible starting indices
  const maxStartIndex = Math.max(0, properties.length - itemsPerView);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;

    const threshold = 50; // минимальный сдвиг для срабатывания
    if (deltaX > threshold) {
      // жест влево — вперёд
      nextSlide();
    } else if (deltaX < -threshold) {
      // жест вправо — назад
      prevSlide();
    }

    setTouchStartX(null);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= maxStartIndex ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? maxStartIndex : prevIndex - 1
    );
  };

  // Get visible properties for current view
  const visibleProperties = properties.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  return (
    <section id="properties" className={styles.propertiesSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Наши объекты</h2>
        <div
          className={styles.carouselContainer}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.carousel}>
            {visibleProperties.map((property) => (
              <div key={property.id} className={styles.propertyCard}>
                <div className={styles.imageContainer}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={property.image}
                      alt={property.title}
                      className={styles.propertyImage}
                    />
                  </div>
                </div>
                <h3 className={styles.propertyTitle}>{property.title}</h3>
                <a
                  href={property.link}
                  className={styles.propertyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ПОДРОБНЕЕ <span className={styles.arrow}>→</span>
                </a>
              </div>
            ))}
          </div>
          <div className={styles.controls}>
            <button
              className={`${styles.navButton} ${styles.prevButton}`}
              onClick={prevSlide}
            >
              ←
            </button>
            <button
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={nextSlide}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
