import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 60, damping: 25 },
    },
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="show"
      id="hero-section"
      className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-0 items-start px-6 md:px-12 relative mb-10 md:mb-20 text-left pt-20 md:pt-32"
    >
      <div className="flex flex-col justify-center col-span-1 md:col-span-12 z-10 lg:col-span-6 order-2 md:order-1 items-start mt-1 md:mt-0">
        <motion.p
          variants={itemVariants}
          className="mb-3 md:mb-6 text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase font-body text-on-surface-variant dark:text-[#8a9589] font-bold"
        >
          BENGALURU'S TRUSTED BACKPACK MANUFACTURER · SINCE 1995
        </motion.p>
        
        <motion.h1
          variants={itemVariants}
          className="max-w-2xl mb-5 md:mb-10 text-4xl sm:text-[2.75rem] leading-[1.1] md:text-7xl md:leading-tight tracking-tighter lg:text-8xl font-headline text-on-surface dark:text-[#f0f5ee]"
        >
          Premium Backpack Manufacturers.<br />
          <span className="italic text-primary font-headline">Built to Your Brand.</span>
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="max-w-lg mb-8 md:mb-12 text-sm md:text-lg leading-relaxed font-body text-on-surface-variant dark:text-[#8a9589] px-0"
        >
          We manufacture premium bags for corporates, institutions, and distributors — with custom branding, reliable timelines, and MOQ-friendly pricing.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row items-stretch md:items-center space-y-4 md:space-y-0 w-full md:w-auto px-0"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group w-full md:w-auto px-10 py-5 md:py-4 text-[14px] md:text-base tracking-widest uppercase bg-gradient-to-b from-[#2c3e2d] to-[#243528] text-[#f6f9f3] font-bold md:font-medium font-body hover:opacity-90 transition-all duration-300 rounded-md shadow-lg shadow-[#2c3e2d]/20 hover:shadow-xl hover:shadow-[#2c3e2d]/40 flex items-center justify-center gap-2"
            onClick={() => scrollTo('products')}
          >
            View Product Lines
            <span className="material-symbols-outlined text-[14px] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300">
              arrow_forward
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col md:flex-row gap-2 md:gap-4 text-[10px] md:text-xs font-bold tracking-widest uppercase text-on-surface-variant dark:text-[#8a9589]"
        >
          <span>✓ 500+ Companies Served</span>
          <span className="hidden md:inline">·</span>
          <span>✓ Custom Logo Printing</span>
          <span className="hidden md:inline">·</span>
          <span>✓ Pan-India Delivery</span>
        </motion.div>
      </div>

      <div className="relative flex items-center justify-center md:justify-end h-full col-span-1 md:col-span-12 lg:col-span-6 order-1 md:order-2 mb-12 md:mb-0 mt-0 md:mt-0">
        
        {/* Wrapper to align circle exactly to the image's bottom-left corner */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.2, duration: 1.2, stiffness: 60, damping: 25 }}
          className="relative w-full md:w-4/5 aspect-[4/5]"
        >
          {/* Actual image container with overflow-hidden */}
          <div className="w-full h-full overflow-hidden bg-surface-container dark:bg-[#131b16] rounded-2xl shadow-xl md:shadow-none shadow-[#1a2a22]/10 will-change-transform">
            <img
              src="images/image-1.jpg"
              alt="Premium Backpack Manufacturing at Safina Bags"
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-1000"
              width="800"
              height="1000"
              fetchpriority="high"
            />
          </div>

          {/* Floating Badge Positioning Wrapper */}
          <div className="absolute left-0 bottom-0 -translate-x-4 translate-y-4 md:-translate-x-1/2 md:translate-y-1/2 z-20">
            <style>{`
              @keyframes floatBadgeHardware {
                0%, 100% { transform: translate3d(0, 0, 0); }
                50% { transform: translate3d(0, -10px, 0); }
              }
              .animate-float-hardware {
                animation: floatBadgeHardware 4s ease-in-out infinite;
                will-change: transform;
              }
            `}</style>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                y: { type: 'spring', stiffness: 50, damping: 20, delay: 0.4 },
                opacity: { delay: 0.4, duration: 0.5 },
              }}
            >
              <div className="animate-float-hardware w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-[#1a2a22] dark:bg-[#c5d5bf] flex flex-col items-center justify-center text-white dark:text-[#1a2a22] shadow-2xl p-2 sm:p-4 border-4 border-surface dark:border-[#0a0f0c]">
                <span className="material-symbols-outlined text-[16px] sm:text-[18px] md:text-[22px] mb-0.5 sm:mb-1 opacity-90 text-[#faf8f4] dark:text-[#1a2a22]">
                  domain_verification
                </span>
                <div className="flex items-baseline leading-none">
                  <span className="font-bold text-lg sm:text-xl md:text-2xl font-headline">500</span>
                  <span className="font-bold text-lg sm:text-xl md:text-2xl font-headline ml-0.5 text-primary dark:text-[#1a2a22]">
                    +
                  </span>
                </div>
                <span className="text-[5px] sm:text-[6px] md:text-[7px] tracking-widest uppercase text-center mt-0.5 sm:mt-1 font-bold leading-tight">
                  Clients Served
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}