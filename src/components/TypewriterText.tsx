import React, { useEffect, useState } from 'react';

type TypewriterTextProps = {
  text: string;
  delay?: number;
  charsPerSecond?: number;
  cursorClassName?: string;
};

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  delay = 0.35,
  charsPerSecond = 34,
  cursorClassName = 'text-samval-accent'
}) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setDisplayText(text);
      setShowCursor(false);
      return;
    }

    let cancelled = false;
    let tween: { kill: () => void } | undefined;

    setDisplayText('');
    setShowCursor(true);

    import('gsap').then(({ gsap }) => {
      if (cancelled) return;

      const progress = { value: 0 };
      tween = gsap.to(progress, {
        value: text.length,
        delay,
        duration: Math.max(text.length / charsPerSecond, 0.6),
        ease: `steps(${Math.max(text.length, 1)})`,
        onUpdate: () => {
          if (!cancelled) {
            setDisplayText(text.slice(0, Math.round(progress.value)));
          }
        },
        onComplete: () => {
          if (!cancelled) {
            setDisplayText(text);
            setShowCursor(false);
          }
        }
      });
    });

    return () => {
      cancelled = true;
      tween?.kill();
    };
  }, [charsPerSecond, delay, text]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {displayText}
        {showCursor && (
          <span className={`ml-1 inline-block animate-pulse ${cursorClassName}`}>|</span>
        )}
      </span>
    </>
  );
};

export default TypewriterText;
