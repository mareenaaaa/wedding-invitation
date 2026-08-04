import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import styles from './People.module.css';

const People = () => {
  const sectionRef = useRef(null);

  const people = [
    {
      name: "Anandu Ajith",
      role: "The Groom",
      img: "https://images.unsplash.com/photo-1620612143003-85f0962b8146?auto=format&fit=crop&w=400&q=80",
      bio: "A kind-hearted soul looking forward to a lifetime of happiness."
    },
    {
      name: "Shyba K. V.",
      role: "The Bride",
      img: "https://images.unsplash.com/photo-1583939006935-e51c890f6c27?auto=format&fit=crop&w=400&q=80",
      bio: "A beautiful spirit ready to embark on this magical journey."
    }
  ];

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll('.person-card');
    
    gsap.fromTo(cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className={`section ${styles.container}`} id="people">
      <h2 className={styles.title}>The VIPs</h2>
      
      <div className={styles.grid}>
        {people.map((person, index) => (
          <div key={index} className={`person-card glass-panel ${styles.card}`}>
            <div className={styles.imageContainer}>
              <img src={person.img} alt={person.name} />
              <div className={styles.socials}>
                <a href="#"><FaInstagram size={20} /></a>
                <a href="#"><FaTwitter size={20} /></a>
                <a href="#"><FaLinkedin size={20} /></a>
              </div>
            </div>
            <div className={styles.info}>
              <h3>{person.name}</h3>
              <span className={styles.role}>{person.role}</span>
              <p>{person.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default People;
