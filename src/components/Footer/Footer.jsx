import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        <div className={styles.teamSection}>
          <h3 className={styles.teamTitle}>Meet the Team</h3>
          <a 
            href="https://www.instagram.com/bevate_digital?utm_source=qr&igsh=MW9vcWFoMjRmdXVxOA==&igsi=MW9vcWFoMjRmdXVxOA==" 
            target="_blank" 
            rel="noreferrer"
            className={styles.logoLink}
          >
            <img src="/images/bevate_logo_v2.jpeg" alt="Bevate Events" className={styles.teamLogo} />
            <div className={styles.instagramWrapper}>
              <FaInstagram size={20} />
              <span>@bevate_digital</span>
            </div>
          </a>
        </div>

        <div className={styles.bottom}>
          <p>&copy; 2026 The Grand Celebration. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
