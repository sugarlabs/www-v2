import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface InaugurationRevealProps {
  onComplete?: () => void;
  mainColor?: string;
  accentColor?: string;
  messageTitle?: string;
  messageSubtitle?: string;
  backgroundImage?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  enableAccessibilityMode?: boolean;
}

const InaugurationReveal: React.FC<InaugurationRevealProps> = ({
  onComplete,
  mainColor = '#8a1538',
  accentColor = '#ffcc00',
  messageTitle = 'Welcome to Our Sugar Web 2.0!',
  messageSubtitle = 'We are excited launch our Revamped Sugar Web 2.0.',
  backgroundImage,
  buttonText,
  onButtonClick,
  enableAccessibilityMode = false,
}) => {
  const [stage, setStage] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [curtainsReady, setCurtainsReady] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState<boolean>(false);

  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);

  // Generate color variations
  const getColorVariations = (color: string) => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return {
      darker: `rgba(${Math.max(0, r - 50)}, ${Math.max(0, g - 50)}, ${Math.max(0, b - 50)}, 1)`,
      lighter: `rgba(${Math.min(255, r + 25)}, ${Math.min(255, g + 25)}, ${Math.min(255, b + 25)}, 1)`,
      transparent: `rgba(${r}, ${g}, ${b}, 0.85)`,
      shadow: `rgba(${Math.max(0, r - 75)}, ${Math.max(0, g - 75)}, ${Math.max(0, b - 75)}, 0.7)`,
      highlight: `rgba(${Math.min(255, r + 70)}, ${Math.min(255, g + 70)}, ${Math.min(255, b + 70)}, 0.9)`,
      semiTransparent: `rgba(${r}, ${g}, ${b}, 0.6)`,
      ultraLight: `rgba(${Math.min(255, r + 50)}, ${Math.min(255, g + 50)}, ${Math.min(255, b + 50)}, 1)`,
      veryDark: `rgba(${Math.max(0, r - 90)}, ${Math.max(0, g - 90)}, ${Math.max(0, b - 90)}, 1)`,
      shimmer: `rgba(${Math.min(255, r + 100)}, ${Math.min(255, g + 100)}, ${Math.min(255, b + 100)}, 0.95)`,
    };
  };

  const mainColorVars = getColorVariations(mainColor);
  const accentColorVars = getColorVariations(accentColor);
  const goldColor = '#d4af37';
  const goldColorVars = getColorVariations(goldColor);
  const silverColor = '#C0C0C0';
  const silverColorVars = getColorVariations(silverColor);

  const durationMultiplier = prefersReducedMotion ? 0.5 : 1;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () =>
      setPrefersReducedMotion(mediaQuery.matches || enableAccessibilityMode);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, [enableAccessibilityMode]);

  useEffect(() => {
    if (stage === 2) {
      const t = setTimeout(() => {
        setCurtainsReady(true);
        setStage(3);
      }, 800 * durationMultiplier);
      return () => clearTimeout(t);
    }
    if (stage < 2 || stage > 3) {
      setCurtainsReady(false);
    }
  }, [stage, durationMultiplier]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setStage(3);
      setCurtainsReady(true);
      const t = setTimeout(() => {
        onComplete?.();
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(t);
    }

    const sequence = [
      { stage: 1, delay: 600 },
      { stage: 2, delay: 2000 },
      { stage: 3, delay: 5200 },
      { stage: 4, delay: 1400 },
      { stage: 5, delay: 1400 },
    ].map((item) => ({ ...item, delay: item.delay * durationMultiplier }));

    let elapsed = 0;
    const timers: NodeJS.Timeout[] = [];

    sequence.forEach((s, i) => {
      const t = setTimeout(() => {
        setStage(s.stage);
        if (i === sequence.length - 1) {
          setTimeout(() => {
            onComplete?.();
            setIsVisible(false);
          }, s.delay - 200);
        }
      }, elapsed);
      timers.push(t);
      elapsed += s.delay;
    });

    return () => timers.forEach(clearTimeout);
  }, [onComplete, durationMultiplier, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !curtainsReady) return;
    const shimmer = () => {
      document.querySelectorAll('.curtain-shimmer').forEach((el) => {
        const html = el as HTMLElement;
        html.style.opacity = '0';
        html.style.transition = 'none';
        setTimeout(() => {
          html.style.top = `${Math.random() * 100}%`;
          html.style.left = `${Math.random() * 100}%`;
          html.style.transition = 'opacity 2s ease-in-out';
          html.style.opacity = '1';
          setTimeout(() => {
            html.style.transition = 'opacity 2s ease-in-out';
            html.style.opacity = '0';
          }, 500);
        }, 50);
      });
    };
    shimmer();
    const interval = setInterval(shimmer, 4000);
    return () => clearInterval(interval);
  }, [curtainsReady, prefersReducedMotion]);

  const launchConfetti = () => {
    if (!confettiCanvasRef.current || prefersReducedMotion) return;
    const myConfetti = confetti.create(confettiCanvasRef.current, {
      resize: true,
      useWorker: true,
    });
    const rnd = (min: number, max: number) => Math.random() * (max - min) + min;
    const shapes: confetti.Shape[] = ['circle', 'square', 'star'];
    const colors = [
      mainColor,
      mainColorVars.lighter,
      mainColorVars.darker,
      accentColor,
      accentColorVars.lighter,
      goldColor,
      goldColorVars.lighter,
      goldColorVars.shimmer,
      silverColor,
      silverColorVars.lighter,
      '#ffffff',
      mainColorVars.semiTransparent,
      accentColorVars.semiTransparent,
    ];

    myConfetti({
      particleCount: 140,
      spread: 90,
      startVelocity: 45,
      decay: 0.92,
      origin: { x: 0.5, y: 0.6 },
      shapes,
      colors,
      scalar: rnd(0.9, 1.4),
    });

    setTimeout(
      () =>
        myConfetti({
          particleCount: 80,
          angle: 60,
          spread: 60,
          origin: { x: 0.05, y: 0.55 },
          shapes,
          colors,
          scalar: rnd(0.9, 1.3),
        }),
      500,
    );
    setTimeout(
      () =>
        myConfetti({
          particleCount: 80,
          angle: 120,
          spread: 60,
          origin: { x: 0.95, y: 0.55 },
          shapes,
          colors,
          scalar: rnd(0.9, 1.3),
        }),
      750,
    );
    const fall = setInterval(() => {
      if (!confettiCanvasRef.current) return clearInterval(fall);
      myConfetti({
        particleCount: 4,
        angle: 90,
        spread: 120,
        origin: { x: rnd(0.2, 0.8), y: -0.1 },
        gravity: 0.6,
        drift: rnd(-0.5, 0.5),
        shapes,
        colors,
        scalar: rnd(0.8, 1.1),
      });
    }, 250);
    setTimeout(() => clearInterval(fall), 6000);
    setTimeout(
      () =>
        myConfetti({
          particleCount: 110,
          spread: 110,
          origin: { x: 0.5, y: 0.65 },
          gravity: 0.8,
          shapes,
          colors: [mainColor, accentColor, goldColor, silverColor, '#ffffff'],
        }),
      1600,
    );
  };

  useEffect(() => {
    if (stage === 3 && curtainsReady && !prefersReducedMotion) {
      launchConfetti();
    }
  });

  if (!isVisible) return null;

  const curtainTexture = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpattern id='pattern' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M10,1.5 L5,9.5 L15,9.5 Z' fill='%23ffffff20'/%3E%3Cpath d='M10,18.5 L5,10.5 L15,10.5 Z' fill='%23ffffff15'/%3E%3C/pattern%3E%3Crect width='100%25' height='100%25' fill='url(%23pattern)'/%3E%3C/svg%3E")`;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reveal-title"
      aria-describedby="reveal-description"
    >
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          perspective: '1200px',
          background: backgroundImage
            ? `url(${backgroundImage}) center/cover no-repeat`
            : undefined,
        }}
      >
        <motion.div
          className="absolute inset-0 bg-black z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: stage === 0 ? 0 : stage === 5 ? 0 : 0.85 }}
          transition={{ duration: 1.2 * durationMultiplier, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 overflow-hidden z-30">
          {/* Curtain valance */}
          <div
            className="absolute top-0 left-0 right-0 z-40"
            style={{
              background: `linear-gradient(to bottom, ${goldColor}, ${mainColorVars.darker})`,
              height: '30px',
              boxShadow: `0 2px 10px rgba(0,0,0,0.4), inset 0 -2px 0 ${goldColorVars.darker}`,
              borderBottom: `2px solid ${goldColorVars.lighter}`,
            }}
          >
            <div className="absolute left-0 right-0 bottom-0 flex justify-center">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="mx-4"
                  style={{
                    width: '12px',
                    height: '12px',
                    background: goldColorVars.lighter,
                    borderRadius: '50%',
                    boxShadow: `0 0 5px ${goldColorVars.highlight}`,
                    transform: 'translateY(50%)',
                  }}
                />
              ))}
            </div>
          </div>
          {/* Left curtain */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full overflow-hidden"
            initial={{ x: 0 }}
            animate={{ x: stage < 2 ? 0 : stage < 4 ? '-65%' : '-100%' }}
            transition={{ duration: 2 * durationMultiplier, ease: 'easeInOut' }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to right, ${mainColorVars.darker} 0%, ${mainColor} 50%, ${mainColorVars.lighter} 100%)`,
                boxShadow: `inset -10px 0 20px ${mainColorVars.shadow}`,
              }}
            >
              <div
                className="absolute inset-0 opacity-40"
                style={{ backgroundImage: curtainTexture }}
              />
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 h-full opacity-60"
                  style={{
                    left: `${i * 12}%`,
                    width: '2px',
                    background: `linear-gradient(to bottom, transparent, ${mainColorVars.shadow}, transparent)`,
                  }}
                />
              ))}
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bottom-0"
                  style={{
                    left: `${(i + 1) * 14 - 5}%`,
                    width: '10px',
                    height: '120px',
                    background: `linear-gradient(to bottom, ${goldColor}, transparent)`,
                    transformOrigin: 'top center',
                    transform: `rotate(${Math.sin(i) * 5}deg)`,
                    zIndex: 5,
                    opacity: 0.9,
                  }}
                >
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                    style={{
                      width: '14px',
                      height: '14px',
                      background: goldColorVars.lighter,
                      borderRadius: '50%',
                      boxShadow: `0 0 5px ${goldColorVars.highlight}`,
                    }}
                  />
                </div>
              ))}
              <div
                className="absolute top-0 bottom-0 right-0"
                style={{
                  width: '20px',
                  background: `linear-gradient(to left, transparent, ${goldColorVars.transparent}, transparent)`,
                  zIndex: 4,
                }}
              >
                {[...Array(40)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      top: `${i * 2.5}%`,
                      right: '5px',
                      width: '10px',
                      height: '10px',
                      background:
                        i % 2 === 0 ? goldColorVars.lighter : goldColor,
                      transform: 'rotate(45deg)',
                      opacity: 0.9,
                    }}
                  />
                ))}
              </div>
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="curtain-shimmer absolute"
                  style={{
                    width: i === 0 ? '50px' : '30px',
                    height: i === 0 ? '50px' : '30px',
                    background: `radial-gradient(circle, ${goldColorVars.highlight}, transparent)`,
                    borderRadius: '50%',
                    opacity: 0,
                    zIndex: 5,
                    pointerEvents: 'none',
                  }}
                />
              ))}
              <div
                className="absolute inset-0"
                style={{
                  background: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 40px,
                  ${goldColorVars.transparent} 40px,
                  ${goldColorVars.transparent} 42px
                )`,
                  opacity: 0.4,
                  zIndex: 3,
                }}
              />
            </div>
          </motion.div>
          {/* Right curtain */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full overflow-hidden"
            initial={{ x: 0 }}
            animate={{ x: stage < 2 ? 0 : stage < 4 ? '65%' : '100%' }}
            transition={{ duration: 2 * durationMultiplier, ease: 'easeInOut' }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to left, ${mainColorVars.darker} 0%, ${mainColor} 50%, ${mainColorVars.lighter} 100%)`,
                boxShadow: `inset 10px 0 20px ${mainColorVars.shadow}`,
              }}
            >
              <div
                className="absolute inset-0 opacity-40"
                style={{ backgroundImage: curtainTexture }}
              />
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 h-full opacity-60"
                  style={{
                    right: `${i * 12}%`,
                    width: '2px',
                    background: `linear-gradient(to bottom, transparent, ${mainColorVars.shadow}, transparent)`,
                  }}
                />
              ))}
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bottom-0"
                  style={{
                    right: `${(i + 1) * 14 - 5}%`,
                    width: '10px',
                    height: '120px',
                    background: `linear-gradient(to bottom, ${goldColor}, transparent)`,
                    transformOrigin: 'top center',
                    transform: `rotate(${Math.sin(i) * -5}deg)`,
                    zIndex: 5,
                    opacity: 0.9,
                  }}
                >
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                    style={{
                      width: '14px',
                      height: '14px',
                      background: goldColorVars.lighter,
                      borderRadius: '50%',
                      boxShadow: `0 0 5px ${goldColorVars.highlight}`,
                    }}
                  />
                </div>
              ))}
              <div
                className="absolute top-0 bottom-0 left-0"
                style={{
                  width: '20px',
                  background: `linear-gradient(to right, transparent, ${goldColorVars.transparent}, transparent)`,
                  zIndex: 4,
                }}
              >
                {[...Array(40)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      top: `${i * 2.5}%`,
                      left: '5px',
                      width: '10px',
                      height: '10px',
                      background:
                        i % 2 === 0 ? goldColorVars.lighter : goldColor,
                      transform: 'rotate(45deg)',
                      opacity: 0.9,
                    }}
                  />
                ))}
              </div>
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="curtain-shimmer absolute"
                  style={{
                    width: i === 0 ? '50px' : '30px',
                    height: i === 0 ? '50px' : '30px',
                    background: `radial-gradient(circle, ${goldColorVars.highlight}, transparent)`,
                    borderRadius: '50%',
                    opacity: 0,
                    zIndex: 5,
                    pointerEvents: 'none',
                  }}
                />
              ))}
              <div
                className="absolute inset-0"
                style={{
                  background: `repeating-linear-gradient(
                  135deg,
                  transparent,
                  transparent 40px,
                  ${goldColorVars.transparent} 40px,
                  ${goldColorVars.transparent} 42px
                )`,
                  opacity: 0.4,
                  zIndex: 3,
                }}
              />
            </div>
          </motion.div>
        </div>
        {/* Reveal content */}
        <AnimatePresence mode="wait">
          {curtainsReady && stage === 3 && (
            <motion.div
              className="relative z-40 max-w-lg mx-auto w-90%"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <div
                className="bg-white rounded-lg shadow-2xl px-6 py-8 md:px-16 md:py-12 text-center"
                style={{
                  boxShadow: `0 5px 30px rgba(0,0,0,0.3), 0 0 50px ${accentColorVars.transparent}, 0 0 80px ${goldColorVars.transparent}`,
                  background: 'white',
                  border: `2px solid ${goldColor}`,
                }}
              >
                <div
                  style={{
                    height: '4px',
                    width: '80%',
                    margin: '-4px auto 12px',
                    background: `linear-gradient(to right, transparent, ${goldColor}, transparent)`,
                    borderRadius: '2px',
                  }}
                />
                <h1
                  id="reveal-title"
                  className="text-3xl md:text-5xl font-bold mb-4"
                  style={{ color: mainColor, fontFamily: 'serif' }}
                >
                  {messageTitle}
                </h1>
                <p
                  id="reveal-description"
                  className="text-xl md:text-2xl text-gray-700"
                  style={{ fontFamily: 'serif' }}
                >
                  {messageSubtitle}
                </p>
                {buttonText && onButtonClick && (
                  <motion.button
                    className="mt-8 px-6 py-3 rounded-lg text-white font-medium"
                    style={{
                      backgroundColor: accentColor,
                      boxShadow: `0 4px 10px ${accentColorVars.shadow}`,
                      border: `1px solid ${goldColor}`,
                    }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
                    onClick={onButtonClick}
                  >
                    {buttonText}
                  </motion.button>
                )}
                <div
                  className="absolute bottom-0 left-0 w-full h-1"
                  style={{
                    background: `linear-gradient(to right, ${goldColor}, ${accentColor}, ${goldColor})`,
                  }}
                />
                {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(
                  (pos) => {
                    const [v, h] = pos.split('-');
                    const borderStyles = {
                      'top-left': {
                        borderTop: '2px solid',
                        borderLeft: '2px solid',
                      },
                      'top-right': {
                        borderTop: '2px solid',
                        borderRight: '2px solid',
                      },
                      'bottom-left': {
                        borderBottom: '2px solid',
                        borderLeft: '2px solid',
                      },
                      'bottom-right': {
                        borderBottom: '2px solid',
                        borderRight: '2px solid',
                      },
                    } as Record<string, React.CSSProperties>;
                    return (
                      <div
                        key={pos}
                        className={`absolute ${v}-2 ${h}-2 w-10 h-10`}
                        style={{ ...borderStyles[pos], borderColor: goldColor }}
                      />
                    );
                  },
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Confetti canvas */}
        <canvas
          ref={confettiCanvasRef}
          className="pointer-events-none fixed inset-0 z-50"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default InaugurationReveal;
