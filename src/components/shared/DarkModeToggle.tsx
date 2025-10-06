import { useState, useEffect } from 'react';

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        }
    }, []);

    const toggleDarkMode = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        setIsDarkMode(!isDarkMode);
    };

    return (
        <button
            onClick={toggleDarkMode}
            className={`relative w-20 h-10 rounded-full transition-colors duration-500 focus:outline-none shadow-inner ${isDarkMode
                    ? 'bg-gradient-to-r from-purple-700 via-pink-600 to-red-500'
                    : 'bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-200'
                }`}
            aria-label="Toggle Dark Mode"
            role="switch"
        >
            {/* Circle */}
            <span
                className={`absolute top-1 left-1 w-8 h-8 rounded-full shadow-lg transform transition-transform duration-500 flex items-center justify-center text-xl ${isDarkMode ? 'translate-x-10 bg-white text-yellow-400' : 'translate-x-0 bg-gray-50 text-gray-800'
                    }`}
            >
                {isDarkMode ? '☀️' : '🌙'}
            </span>

            {/* Subtle glow effect */}
            <span
                className={`absolute w-8 h-8 rounded-full top-1 left-1 pointer-events-none blur-md transition-all duration-500 ${isDarkMode ? 'bg-yellow-300 opacity-40 translate-x-10' : 'bg-gray-400 opacity-20 translate-x-0'
                    }`}
            ></span>
        </button>
    );
};

export default DarkModeToggle;
