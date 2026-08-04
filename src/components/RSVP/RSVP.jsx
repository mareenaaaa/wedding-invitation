import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Send, CheckCircle } from 'lucide-react';
import styles from './RSVP.module.css';

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '1',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const successRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(sectionRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Animate form out and success in
      gsap.to(formRef.current, { opacity: 0, y: -20, duration: 0.5, display: 'none' });
      gsap.fromTo(successRef.current, 
        { opacity: 0, y: 20, scale: 0.9, display: 'flex' },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: 0.5, ease: "back.out(1.7)" }
      );
    }, 1500);
  };

  return (
    <section ref={sectionRef} className={`section ${styles.container}`} id="rsvp">
      <div className={`glass-panel-gold ${styles.formContainer}`}>
        <h2 className={styles.title}>RSVP</h2>
        <p className={styles.subtitle}>Please respond by November 1st, 2026</p>

        <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input 
              type="text" 
              name="name" 
              placeholder="Full Name" 
              required 
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <input 
                type="email" 
                name="email" 
                placeholder="Email Address" 
                required 
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <input 
                type="tel" 
                name="phone" 
                placeholder="Phone Number" 
                value={formData.phone}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <select 
              name="guests" 
              value={formData.guests} 
              onChange={handleChange}
              className={styles.select}
            >
              <option value="1">Just Me (1)</option>
              <option value="2">Plus One (2)</option>
              <option value="3">Three Guests (3)</option>
              <option value="4">Four Guests (4)</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <textarea 
              name="message" 
              placeholder="Any dietary requirements or special messages?" 
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className={styles.textarea}
            ></textarea>
          </div>

          <button type="submit" className={`btn-gold ${styles.submitBtn}`} disabled={isSubmitting}>
            {isSubmitting ? (
              <span className={styles.loading}>Sending...</span>
            ) : (
              <>
                Confirm Attendance <Send size={18} style={{ marginLeft: '8px' }} />
              </>
            )}
          </button>
        </form>

        <div ref={successRef} className={styles.successMessage} style={{ display: 'none' }}>
          <CheckCircle size={64} className={styles.successIcon} />
          <h3>Thank You!</h3>
          <p>Your RSVP has been successfully received. We can't wait to celebrate with you!</p>
          <button className="btn-outline" onClick={() => {
            setIsSuccess(false);
            setFormData({ name: '', email: '', phone: '', guests: '1', message: '' });
            gsap.to(successRef.current, { opacity: 0, display: 'none', duration: 0.3 });
            gsap.fromTo(formRef.current, { opacity: 0, display: 'flex' }, { opacity: 1, duration: 0.5, delay: 0.3 });
          }}>Submit Another</button>
        </div>
      </div>
    </section>
  );
};

export default RSVP;
