import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import EnvelopeIntro from './components/EnvelopeIntro/EnvelopeIntro';
import Cover from './components/Cover/Cover';
import Invitation from './components/Invitation/Invitation';
import Countdown from './components/Countdown/Countdown';
import Reception from './components/Reception/Reception';
import Ceremony from './components/Ceremony/Ceremony';
import Closing from './components/Closing/Closing';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  useEffect(() => {
    // Only fade in the main content once the envelope has been opened
    if (isEnvelopeOpen) {
      gsap.to('.main-content', {
        opacity: 1,
        duration: 1.5,
        ease: 'power2.inOut'
      });
    }
  }, [isEnvelopeOpen]);

  return (
    <>
      {!isEnvelopeOpen && (
        <EnvelopeIntro onOpenComplete={() => setIsEnvelopeOpen(true)} />
      )}
      
      <main className="main-content" style={{ opacity: 0 }}>
        <Cover />
        <Invitation />
        <Countdown />
        <Reception />
        <Ceremony />
        <Closing />
      </main>
    </>
  );
}

export default App;
