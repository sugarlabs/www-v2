import { useEffect, useState } from 'react';

type Direction = 'up' | 'down';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [direction, setDirection] = useState<Direction>('up');
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const isAtBottom = scrollY > docHeight - 60;

      setAtBottom(isAtBottom);

      setVisible(scrollY > 300);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) =>
      setDirection(e.deltaY > 0 ? 'down' : 'up');

    const onKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', 'End', ' '].includes(e.key))
        setDirection('down');
      if (['ArrowUp', 'PageUp', 'Home'].includes(e.key)) setDirection('up');
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const dy = touchStartY - e.touches[0].clientY;
      if (Math.abs(dy) > 10) setDirection(dy > 0 ? 'down' : 'up');
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  const handleClick = () => {
    if (atBottom || direction === 'up') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  const effectiveDirection: Direction = atBottom ? 'up' : direction;
  const isDown = effectiveDirection === 'down';

  if (!visible) return null;

  return (
    <button
      aria-label={isDown ? 'Scroll to bottom' : 'Scroll to top'}
      onClick={handleClick}
      style={{ zIndex: 9999 }}
      className="
        fixed right-5 bottom-6
        w-12 h-12 sm:w-14 sm:h-14 rounded-lg
        bg-emerald-500 text-white border-2 border-emerald-600
        dark:bg-slate-800 dark:text-white dark:border-transparent
        shadow-xl shadow-emerald-300/40 dark:shadow-black/30
        cursor-pointer flex items-center justify-center
        hover:opacity-100 hover:-translate-y-[3px] hover:scale-105
        transform transition-transform duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-emerald-300/60 dark:focus:ring-blue-300/30 focus:ring-offset-2
        overflow-hidden
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        width="35"
        height="35"
        fill="currentColor"
        viewBox="0 0 640 640"
        aria-hidden="true"
        style={{
          transform: isDown ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <path d="M342.6 81.4C330.1 68.9 309.8 68.9 297.3 81.4L137.3 241.4C124.8 253.9 124.8 274.2 137.3 286.7C149.8 299.2 170.1 299.2 182.6 286.7L288 181.3L288 552C288 569.7 302.3 584 320 584C337.7 584 352 569.7 352 552L352 181.3L457.4 286.7C469.9 299.2 490.2 299.2 502.7 286.7C515.2 274.2 515.2 253.9 502.7 241.4L342.7 81.4z" />
      </svg>
    </button>
  );
}
