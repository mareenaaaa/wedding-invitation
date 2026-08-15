import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './MeetTheCouple.module.css';

gsap.registerPlugin(ScrollTrigger);

const coupleImages = [
  { src: '/images/couple1.jpeg', alt: 'Proposal & Engagement', caption: 'Proposal & Engagement' },
  { src: '/images/couple2.jpeg', alt: 'Wedding & Elopement', caption: 'Wedding & Elopement' },
  { src: '/images/couple3.jpeg', alt: 'Editorial & Brand', caption: 'Editorial & Brand' }
];

export default function MeetTheCouple() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    let tl = gsap.timeline({ paused: true });

    tl.fromTo(titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    );

    elementsRef.current.forEach((el, index) => {
      const xOffset = index % 2 === 0 ? -150 : 150;
      tl.fromTo(el,
        { x: xOffset, opacity: 0 },
        { 
          x: 0, opacity: 1, duration: 1, ease: 'back.out(1.2)' 
        },
        '-=0.6'
      );
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          tl.play();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      tl.kill();
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.container}>
      <h2 ref={titleRef} className={styles.title}>Meet the Couple</h2>
      
      <div className={styles.gallery}>
        {coupleImages.map((image, index) => (
          <div 
            key={index} 
            className={`${styles.galleryItem} ${index === 1 ? styles.centerItem : ''}`}
            ref={el => elementsRef.current[index] = el}
          >
            <div className={styles.imgWrapper}>
              <img src={image.src} alt={image.alt} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
