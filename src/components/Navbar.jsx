import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
    setIsDark(!isDark);
  };

  const scrollTo = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="fixed top-0 z-50 flex items-center justify-between w-full px-4 sm:px-6 md:px-12 py-3 md:py-4 backdrop-blur-md bg-[#faf8f4]/90 dark:bg-[#0a0f0c]/90 transition-colors duration-500"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            aria-label="Menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#1a2a22] dark:text-[#eaf0e7] hover:text-primary transition-colors flex items-center justify-center p-1"
          >
            <span className="material-symbols-outlined text-[24px] sm:text-[28px] leading-none">menu</span>
          </button>
          <a
            href="#"
            aria-label="Home"
            className="flex items-center gap-1.5 sm:gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src="/images/logo.png"
              alt="Safina Bags Co. Logo"
              className="h-6 sm:h-8 md:h-10 w-auto dark:invert transition-all"
              width="120"
              height="40"
            />
            <span className="text-[17px] sm:text-lg md:text-xl tracking-tighter font-serif font-headline text-[#1a2a22] dark:text-[#faf8f4] whitespace-nowrap">
              Safina Bags Co.
            </span>
          </a>
        </div>

        <div className="items-center hidden space-x-12 md:flex">
          {['Products', 'Manufacturing', 'FAQ', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-[#2c3e2d] dark:text-[#8a9589]/70 font-sans font-body text-sm hover:text-[#1a2a22] dark:hover:text-[#ffffff] transition-colors duration-500 capitalize"
            >
              {item === 'products' ? 'Catalog' : item}
            </button>
          ))}
        </div>

        <div className="hidden space-x-4 md:flex items-center">
          <button
            type="button"
            onClick={toggleTheme}
            className="text-[#1a2a22] dark:text-[#ffffff] hover:text-primary transition-colors pr-2 flex items-center justify-center"
            aria-label="Toggle Dark Mode"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <button
            className="px-8 py-3 text-sm tracking-widest uppercase transition-opacity bg-primary text-on-primary font-label hover:opacity-90 rounded-md"
            onClick={() => scrollTo('contact')}
          >
            Request Quote
          </button>
        </div>

        {/* Mobile Extra Controls */}
        <div className="flex md:hidden items-center gap-1.5 sm:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="text-[#1a2a22] dark:text-[#eaf0e7] flex items-center justify-center p-1 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            <span className="material-symbols-outlined text-[20px] sm:text-[24px] leading-none">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <button
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs tracking-widest uppercase transition-opacity bg-primary text-on-primary font-label hover:opacity-90 rounded bg-[#2c3e2d] dark:bg-[#c5d5bf] dark:text-[#1a2a22] text-[#f0f5ee] whitespace-nowrap"
            onClick={() => scrollTo('contact')}
          >
            Quote
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 bg-[#faf8f4] pt-24 px-6 dark:bg-[#0a0f0c]"
        >
          <div className="flex flex-col space-y-6">
            {['Products', 'Manufacturing', 'FAQ', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-left text-[#2c3e2d] dark:text-[#8a9589] text-xl font-headline transition-colors capitalize"
              >
                {item === 'products' ? 'Catalog' : item}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}
