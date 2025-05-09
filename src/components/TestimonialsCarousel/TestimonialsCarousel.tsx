'use client';

import React, { useState, useEffect } from 'react';
import styles from './TestimonialsCarousel.module.css';

interface Testimonial {
  id: number;
  author: string;
  date: string;
  content: string;
}

export default function TestimonialsCarousel() {
  // Sample testimonial data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      author: 'Елена Арманская',
      date: '15.02.2025',
      content: 'Хочу выразить огромную благодарность руководителю агентства Алексею Симченко и его команде за максимально быстрое решение квартирного вопроса. Спасибо Вам за поддержку, профессионализм и внимательное отношение к клиентам. Успехов и процветания Вашему агентству.'
    },
    {
      id: 2,
      author: 'Елена Арманская',
      date: '15.02.2025',
      content: 'Хочу выразить огромную благодарность руководителю агентства Алексею Симченко и его команде за максимально быстрое решение квартирного вопроса. Спасибо Вам за поддержку, профессионализм и внимательное отношение к клиентам. Успехов и процветания Вашему агентству.'
    },
    {
      id: 3,
      author: 'Елена Арманская',
      date: '15.02.2025',
      content: 'Хочу выразить огромную благодарность руководителю агентства Алексею Симченко и его команде за максимально быстрое решение квартирного вопроса. Спасибо Вам за поддержку, профессионализм и внимательное отношение к клиентам. Успехов и процветания Вашему агентству.'
    },
    {
      id: 4,
      author: 'Елена Арманская',
      date: '15.02.2025',
      content: 'Хочу выразить огромную благодарность руководителю агентства Алексею Симченко и его команде за максимально быстрое решение квартирного вопроса. Спасибо Вам за поддержку, профессионализм и внимательное отношение к клиентам. Успехов и процветания Вашему агентству.'
    },
    {
      id: 5,
      author: 'Елена Арманская',
      date: '15.02.2025',
      content: 'Хочу выразить огромную благодарность руководителю агентства Алексею Симченко и его команде за максимально быстрое решение квартирного вопроса. Спасибо Вам за поддержку, профессионализм и внимательное отношение к клиентам. Успехов и процветания Вашему агентству.'
    },
    {
      id: 6,
      author: 'Елена Арманская',
      date: '15.02.2025',
      content: 'Хочу выразить огромную благодарность руководителю агентства Алексею Симченко и его команде за максимально быстрое решение квартирного вопроса. Спасибо Вам за поддержку, профессионализм и внимательное отношение к клиентам. Успехов и процветания Вашему агентству.'
    },
  ];

  // State for current slide
  const [currentSlide, setCurrentSlide] = useState(0);
  // State for testimonials per slide based on screen width
  const [testimonialsPerSlide, setTestimonialsPerSlide] = useState(3);
  
  // Update testimonialsPerSlide based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 820) {
        setTestimonialsPerSlide(1);
      } else if (window.innerWidth <= 1240) {
        setTestimonialsPerSlide(2);
      } else {
        setTestimonialsPerSlide(3);
      }
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Calculate total slides based on testimonialsPerSlide
  const totalSlides = Math.ceil(testimonials.length / testimonialsPerSlide);
  
  // Navigation handlers
  const prevSlide = () => {
    setCurrentSlide(prev => 
      prev <= 0 ? totalSlides - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide(prev => 
      prev >= totalSlides - 1 ? 0 : prev + 1
    );
  };

  return (
    <section id="testimonials" className={styles.testimonialsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Отзывы клиентов</h2>
          <div className={styles.navigation}>
            <button 
              className={styles.navButton}
              onClick={prevSlide}
              aria-label="Previous testimonials"
            >
              ←
            </button>
            <button 
              className={styles.navButton}
              onClick={nextSlide}
              aria-label="Next testimonials"
            >
              →
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Buttons */}
        <div className={styles.mobileNavigation}>
          <button 
            className={`${styles.mobileNavButton} ${styles.mobileNavPrev}`}
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            ←
          </button>
          <button 
            className={`${styles.mobileNavButton} ${styles.mobileNavNext}`}
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            →
          </button>
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
              // Get the testimonials for this slide
              const slideTestimonials = testimonials.slice(
                slideIndex * testimonialsPerSlide,
                (slideIndex + 1) * testimonialsPerSlide
              );
              
              return (
                <div key={slideIndex} className={styles.carouselSlide}>
                  <div className={styles.testimonialGroup}>
                    {slideTestimonials.map((testimonial) => (
                      <div key={testimonial.id} className={styles.testimonialCard}>
                        <div className={styles.testimonialHeader}>
                          <h3 className={styles.testimonialAuthor}>{testimonial.author}</h3>
                          <span className={styles.testimonialDate}>{testimonial.date}</span>
                        </div>
                        <p className={styles.testimonialContent}>{testimonial.content}</p>
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
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <div className={styles.leaveCommentContainer}>
        <a href="/makeReview" className={styles.leaveCommentButton}>
  Оставить комментарий
</a>
        </div>
      </div>
    </section>
  );
}