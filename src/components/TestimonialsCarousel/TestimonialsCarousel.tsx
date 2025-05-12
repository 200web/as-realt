'use client';

import React, { useState, useEffect } from 'react';
import styles from './TestimonialsCarousel.module.css';

interface Testimonial {
  id: number;
  name: string;
  date: string;
  review: string;
}

export default function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonialsPerSlide, setTestimonialsPerSlide] = useState(3);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/published`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          setTestimonials(data.reviews);
        }
      })
      .catch(err => {
        console.error('Ошибка загрузки отзывов:', err);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 820) setTestimonialsPerSlide(1);
      else if (window.innerWidth <= 1240) setTestimonialsPerSlide(2);
      else setTestimonialsPerSlide(3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / testimonialsPerSlide);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev <= 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev >= totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className={styles.testimonialsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Отзывы клиентов</h2>
          <div className={styles.navigation}>
            <button className={styles.navButton} onClick={prevSlide}>←</button>
            <button className={styles.navButton} onClick={nextSlide}>→</button>
          </div>
        </div>

        <div className={styles.carouselContainer}>
          <div
            className={styles.carouselTrack}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              width: `${totalSlides * 100}%`
            }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => {
              const slideTestimonials = testimonials.slice(
                slideIndex * testimonialsPerSlide,
                (slideIndex + 1) * testimonialsPerSlide
              );

              return (
                <div key={slideIndex} className={styles.carouselSlide}>
                  <div className={styles.testimonialGroup}>
                    {slideTestimonials.map((t) => (
                      <div key={t.id} className={styles.testimonialCard}>
                        <div className={styles.testimonialHeader}>
                          <h3 className={styles.testimonialAuthor}>{t.name}</h3>
                          <span className={styles.testimonialDate}>{t.date}</span>
                        </div>
                        <p className={styles.testimonialContent}>{t.review}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.dotsContainer}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        <div className={styles.leaveCommentContainer}>
          <a href="/makeReview" className={styles.leaveCommentButton}>
            Оставить отзыв
          </a>
        </div>
      </div>
    </section>
  );
}
