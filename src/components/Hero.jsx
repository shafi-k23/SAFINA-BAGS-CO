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
      transition: { type: 'spring', stiffness: 100, damping: 20 },
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
      className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-0 items-start px-6 md:px-12 relative mb-16 md:mb-20 text-left pt-32"
    >
      <div className="flex flex-col justify-center col-span-1 md:col-span-12 z-10 lg:col-span-6 order-2 md:order-1 items-start mt-1 md:mt-0">
        <motion.p
          variants={itemVariants}
          className="mb-3 md:mb-6 text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase font-body text-on-surface-variant dark:text-[#8a9589] font-bold"
        >
          BENGALURU'S TRUSTED MANUFACTURER · SINCE 1995
        </motion.p>
        
        <motion.h1
          variants={itemVariants}
          className="max-w-2xl mb-5 md:mb-10 text-[2.75rem] leading-[1.05] md:text-7xl md:leading-tight tracking-tighter lg:text-8xl font-headline text-on-surface dark:text-[#f0f5ee]"
        >
          Bulk Backpacks.<br />
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
          className="flex flex-col md:flex-row items-stretch md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto px-0"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full md:w-auto px-8 py-4 md:py-3 text-[12px] md:text-sm tracking-widest uppercase bg-gradient-to-b from-[#2c3e2d] to-[#243528] text-[#f6f9f3] font-bold md:font-medium font-body hover:opacity-90 transition-all duration-300 rounded-md shadow-lg shadow-[#2c3e2d]/20 hover:shadow-xl hover:shadow-[#2c3e2d]/40 text-center"
            onClick={() => scrollTo('contact')}
          >
            Request Bulk Quote
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group w-full md:w-auto px-8 py-4 md:py-3 text-[12px] md:text-sm tracking-widest uppercase border border-outline/30 dark:border-white/20 hover:border-primary dark:hover:border-primary text-on-surface dark:text-[#f0f5ee] font-bold md:font-medium font-body hover:bg-surface-container/50 dark:hover:bg-[#131b16] transition-all duration-300 rounded-md flex items-center justify-center gap-2"
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

      <div className="relative flex items-center justify-center md:justify-end h-full col-span-1 md:col-span-12 lg:col-span-6 order-1 md:order-2 mb-0 mt-0 md:mt-0">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.2, duration: 1.5 }}
          className="w-full md:w-4/5 overflow-hidden aspect-[4/5] bg-surface-container dark:bg-[#131b16] flex flex-col items-center justify-center rounded-2xl shadow-xl md:shadow-none shadow-[#1a2a22]/10"
        >
          <img
            src="images/image-1.jpg"
            alt="Lifestyle / Factory Photo of Safina Bags"
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-1000"
            width="800"
            height="1000"
            fetchpriority="high"
          />
        </motion.div>

        {/* Floating Badge */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: [0, -10, 0], opacity: 1 }}
          transition={{
            y: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
            opacity: { delay: 0.6, duration: 0.5 },
          }}
          className="absolute -left-4 -bottom-6 md:left-12 md:-bottom-8 lg:left-16 lg:-bottom-10 w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#1a2a22] dark:bg-[#c5d5bf] flex flex-col items-center justify-center text-white dark:text-[#1a2a22] shadow-2xl p-4 scale-95 md:scale-100 z-20 border-4 border-surface dark:border-[#0a0f0c]"
        >
          <span className="material-symbols-outlined text-[18px] md:text-[22px] mb-1 opacity-90 text-[#faf8f4] dark:text-[#1a2a22]">
            domain_verification
          </span>
          <div className="flex items-baseline leading-none">
            <span className="font-bold text-xl md:text-2xl font-headline">500</span>
            <span className="font-bold text-xl md:text-2xl font-headline ml-0.5 text-primary dark:text-[#1a2a22]">
              +
            </span>
          </div>
          <span className="text-[6px] md:text-[7px] tracking-widest uppercase text-center mt-1 font-bold leading-tight">
            Clients Served
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
}