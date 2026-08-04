import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import styles from './IntroAnimation.module.css';

// A programmatic envelope matching the green aesthetic
const Envelope = ({ isOpened }) => {
  const group = useRef();
  const flapRef = useRef();
  const cardRef = useRef();

  useEffect(() => {
    if (isOpened) {
      // Animate flap opening
      gsap.to(flapRef.current.rotation, {
        x: Math.PI,
        duration: 1.5,
        ease: "power2.inOut"
      });
      // Animate card sliding out
      gsap.to(cardRef.current.position, {
        y: 2.5,
        z: 0.1,
        duration: 2,
        delay: 1,
        ease: "power3.out"
      });
    }
  }, [isOpened]);

  const paperColor = "#fcfaf2"; // Cream
  const sealColor = "#5a2a27"; // Maroon

  return (
    <group ref={group}>
      {/* Back of Envelope */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[4, 2.5, 0.02]} />
        <meshStandardMaterial color={paperColor} roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Front Bottom of Envelope */}
      <mesh position={[0, -0.4, 0.05]}>
        <boxGeometry args={[4, 1.7, 0.02]} />
        <meshStandardMaterial color={paperColor} roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Flap */}
      <group position={[0, 1.25, 0.06]} ref={flapRef}>
        {/* Triangle Flap */}
        <mesh position={[0, -0.625, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[2, 2, 1.5, 3]} />
          <meshStandardMaterial color={paperColor} roughness={0.9} metalness={0.1} />
        </mesh>
        
        {/* Wax Seal */}
        {!isOpened && (
          <group position={[0, -1.25, 0.02]}>
            {/* Outer Seal Ring */}
            <mesh>
              <cylinderGeometry args={[0.35, 0.35, 0.05, 32]} />
              <meshStandardMaterial color={sealColor} roughness={0.4} metalness={0.6} />
            </mesh>
            {/* Inner Floral detail (Placeholder using small cylinders) */}
            <mesh position={[0, 0, 0.03]} rotation={[0, 0, Math.PI/4]}>
              <boxGeometry args={[0.3, 0.1, 0.02]} />
              <meshStandardMaterial color="#c6aa64" roughness={0.3} metalness={0.8} />
            </mesh>
            <mesh position={[0, 0, 0.03]} rotation={[0, 0, -Math.PI/4]}>
              <boxGeometry args={[0.3, 0.1, 0.02]} />
              <meshStandardMaterial color="#c6aa64" roughness={0.3} metalness={0.8} />
            </mesh>
          </group>
        )}
      </group>

      {/* Invitation Card */}
      <group ref={cardRef} position={[0, 0, 0]}>
        <mesh>
          <boxGeometry args={[3.6, 2.2, 0.01]} />
          <meshStandardMaterial color="#fdfbf7" roughness={1} metalness={0} />
        </mesh>
        {/* Gold border on card */}
        <mesh position={[0, 0, 0.006]}>
          <planeGeometry args={[3.4, 2.0]} />
          <meshBasicMaterial color="#d4af37" wireframe={true} />
        </mesh>
      </group>
    </group>
  );
};

const IntroScene = ({ onComplete }) => {
  const [isOpened, setIsOpened] = useState(false);
  const cameraGroup = useRef();

  useEffect(() => {
    // Start sequence
    const timer1 = setTimeout(() => setIsOpened(true), 1500);
    const timer2 = setTimeout(() => {
      // Zoom into the card
      gsap.to(cameraGroup.current.position, {
        z: -2,
        duration: 2,
        ease: "power2.inOut",
        onComplete: onComplete
      });
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <group ref={cameraGroup}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <Envelope isOpened={isOpened} />
      </Float>
      <Sparkles count={50} scale={10} size={1} color="#f3e5ab" opacity={0.2} speed={0.5} />
      <Environment preset="apartment" />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
    </group>
  );
};

const IntroAnimation = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleComplete = () => {
    gsap.to('.intro-container', {
      opacity: 0,
      duration: 1.5,
      onComplete: () => {
        setIsVisible(false);
        if (onFinish) onFinish();
      }
    });
  };

  if (!isVisible) return null;

  return (
    <div className={`intro-container ${styles.container}`}>
      <div className={styles.overlayText}>
        <h1 className="animate-fade" style={{ color: 'var(--color-maroon)' }}>You're Invited</h1>
      </div>
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <Suspense fallback={null}>
          <IntroScene onComplete={handleComplete} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default IntroAnimation;
