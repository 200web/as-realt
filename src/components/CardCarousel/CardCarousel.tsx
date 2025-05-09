'use client';

import React, { useState, ReactNode, useEffect } from 'react';
import styles from './CardCarousel.module.css';

interface CardCarouselProps {
  title: string;
  mobileTitle?: string; // Added mobile title prop
  children: ReactNode[];
  itemsPerView?: number;
  className?: string;
  showDots?: boolean;
}

const CardCarousel: React.FC<CardCarouselProps> = ({ 
  title, 
  mobileTitle, // Using the mobile title
  children,
  itemsPerView: defaultItemsPerView = 4,
  className = '',
  showDots = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(defaultItemsPerView);
  const [isMobile, setIsMobile] = useState(false);
  
  // Update items per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      if (window.innerWidth <= 768) {
        setItemsPerView(1);
      } else if (window.innerWidth <= 968) {
        setItemsPerView(2);
      } else if (window.innerWidth <= 1200) {
        setItemsPerView(3);
      } else {
        setItemsPerView(defaultItemsPerView);
      }
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [defaultItemsPerView]);
  
  // Calculate total slides based on children and items per view
  const totalItems = React.Children.count(children);
  const maxStartIndex = Math.max(0, totalItems - itemsPerView);
  
  // Handle navigation
  const prevSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex <= 0 ? maxStartIndex : prevIndex - 1
    );
  };
  
  const nextSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex >= maxStartIndex ? 0 : prevIndex + 1
    );
  };
  
  // Get visible items
  const visibleItems = React.Children.toArray(children).slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  // Calculate the number of dots needed
  const numberOfDots = totalItems - itemsPerView + 1;

  // Determine which title to show based on screen size
  const displayTitle = isMobile && mobileTitle ? mobileTitle : title;

  return (
    <section id="specialists" className={`${styles.carouselSection} ${className}`}>
      <div className={styles.container}>
        <h2 className={styles.title}>{displayTitle}</h2>
        
          <div className={styles.carouselContainer}>
          <button 
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={prevSlide}
            aria-label="Previous items"
          >
            ←
          </button>
          
          <div 
            className={styles.carousel}
            style={{ '--items-per-view': itemsPerView } as React.CSSProperties}
          >
            {visibleItems}
          </div>
          
          <button 
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={nextSlide}
            aria-label="Next items"
          >
            →
          </button>
        </div>
        
        {showDots && numberOfDots > 1 && (
          <div className={styles.dotsContainer}>
            {Array.from({ length: numberOfDots }).map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CardCarousel;