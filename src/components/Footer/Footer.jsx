import React from 'react';
import { Phone, Mail, Globe } from 'lucide-react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Anandu & Shyba</h2>
          <p className={styles.message}>We look forward to celebrating this joyous occasion with you.</p>
          
          <div className={styles.contactInfo}>
            <a href="tel:+15551234567" className={styles.contactItem}>
              <Phone size={18} /> +1 (555) 123-4567
            </a>
            <a href="mailto:rsvp@grandcelebration.com" className={styles.contactItem}>
              <Mail size={18} /> rsvp@grandcelebration.com
            </a>
            <a href="https://grandcelebration.com" target="_blank" rel="noreferrer" className={styles.contactItem}>
              <Globe size={18} /> grandcelebration.com
            </a>
          </div>
          
          <div className={styles.socials}>
            <a href="#" className={styles.socialIcon}><FaInstagram size={24} /></a>
            <a href="#" className={styles.socialIcon}><FaFacebook size={24} /></a>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; 2026 The Grand Celebration. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
