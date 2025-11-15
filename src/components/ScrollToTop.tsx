import { useEffect, useState } from 'react';

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 300);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    if (!visible) return null;

    return (
        <button
            aria-label="Scroll to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ zIndex: 9999 }}
            className="
        fixed right-5 bottom-6
        w-15 h-15 rounded-lg border-none
        bg-emerald-300 text-black shadow-lg
        cursor-pointer flex items-center justify-center
        opacity-95 hover:opacity-100 hover:-translate-y-[3px]
        transition-transform duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2
      "
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                width="35"
                height="35"
                fill="currentColor"
                viewBox="0 0 640 640"
            >
                <path d="M342.6 81.4C330.1 68.9 309.8 68.9 297.3 81.4L137.3 241.4C124.8 253.9 124.8 274.2 137.3 286.7C149.8 299.2 170.1 299.2 182.6 286.7L288 181.3L288 552C288 569.7 302.3 584 320 584C337.7 584 352 569.7 352 552L352 181.3L457.4 286.7C469.9 299.2 490.2 299.2 502.7 286.7C515.2 274.2 515.2 253.9 502.7 241.4L342.7 81.4z" />
            </svg>
        </button>
    );
}