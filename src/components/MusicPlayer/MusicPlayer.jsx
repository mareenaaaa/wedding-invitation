import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './MusicPlayer.module.css';

const MusicPlayer = ({ isEnvelopeOpen }) => {
  // Read initial mute state from localStorage, default to false
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('wedding_music_muted');
    return saved === 'true';
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Handle envelope open event to start music
  useEffect(() => {
    if (isEnvelopeOpen && !isMuted && audioRef.current) {
      audioRef.current.volume = 0;
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
          // Fade in reliably
          const volObj = { v: 0 };
          gsap.to(volObj, { 
            v: 0.4, 
            duration: 4, 
            ease: "power2.inOut",
            onUpdate: () => {
              if (audioRef.current) audioRef.current.volume = volObj.v;
            }
          });
        }).catch(err => {
          console.log("Autoplay prevented:", err);
          setIsPlaying(false);
        });
      }
    }
  }, [isEnvelopeOpen]);

  // Persist mute state
  useEffect(() => {
    localStorage.setItem('wedding_music_muted', isMuted);
  }, [isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      // Fade out and pause
      const volObj = { v: audioRef.current.volume };
      gsap.to(volObj, {
        v: 0,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (audioRef.current) audioRef.current.volume = volObj.v;
        },
        onComplete: () => {
          if (audioRef.current) audioRef.current.pause();
          setIsPlaying(false);
          setIsMuted(true);
        }
      });
    } else {
      // Play and fade in
      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
        const volObj = { v: 0 };
        gsap.to(volObj, { 
          v: 0.4, 
          duration: 2, 
          ease: "power2.inOut",
          onUpdate: () => {
            if (audioRef.current) audioRef.current.volume = volObj.v;
          }
        });
      }).catch(err => console.log("Play failed:", err));
    }
  };

  return (
    <div className={`${styles.musicPlayer} ${isEnvelopeOpen ? styles.visible : ''}`}>
      <audio
        ref={audioRef}
        src="/bg-music.mp3?v=3"
        preload="metadata"
        loop
      />
      
      <button 
        className={`${styles.controlButton} ${isPlaying ? styles.playing : ''}`}
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 9V15M14 9V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.7519 11.1679L10.552 8.36805C9.88572 7.92389 9 8.40186 9 9.20015V14.7998C9 15.5981 9.88572 16.0761 10.552 15.6319L14.7519 12.8321C15.334 12.4439 15.334 11.5561 14.7519 11.1679Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default MusicPlayer;
