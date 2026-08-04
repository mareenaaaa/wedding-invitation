import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { X, ZoomIn } from 'lucide-react';
import styles from './Gallery.module.css';

const images = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=800&q=80"
];

const Gallery = () => {
  const [lightboxImg, setLightboxImg] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const items = sectionRef.current.querySelectorAll('.gallery-item');
    
    gsap.fromTo(items,
      { y: 50, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );
  }, []);

  const openLightbox = (img) => {
    setLightboxImg(img);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImg(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section ref={sectionRef} className={`section ${styles.container}`} id="gallery">
      <h2 className={styles.title}>Moments</h2>
      
      <div className={styles.masonry}>
        {images.map((src, index) => (
          <div 
            key={index} 
            className={`gallery-item ${styles.item}`}
            onClick={() => openLightbox(src)}
          >
            <img src={src} alt={`Gallery ${index}`} loading="lazy" />
            <div className={styles.overlay}>
              <ZoomIn className={styles.zoomIcon} size={32} />
            </div>
          </div>
        ))}
      </div>

      {lightboxImg && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.closeBtn} onClick={closeLightbox}>
            <X size={32} />
          </button>
          <img src={lightboxImg} alt="Enlarged" className={styles.lightboxImage} />
        </div>
      )}
    </section>
  );
};

export default Gallery;
