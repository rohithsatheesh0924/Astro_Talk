import React, { useEffect, useRef, useState } from 'react';

export default function UniqueAnimatedSection({ children, animationType = 'fade-up' }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  const styles = {
    'fade-up': `transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`,
    'scale-up': `transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`,
  };

  return (
    <div ref={elementRef} className={styles[animationType]}>
      {children}
    </div>
  );
}