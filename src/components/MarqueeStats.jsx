import React from 'react';
import { motion } from 'framer-motion';

export default function MarqueeStats() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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

  return (
    <>
      <div className="w-full py-4 overflow-hidden bg-[#1a2a22] dark:bg-[#000000] relative flex flex-nowrap mb-0">
        <div className="animate-infinite-scroll flex shrink-0 whitespace-nowrap min-w-full gap-6">
          <span className="text-sm tracking-[0.2em] uppercase text-white font-body px-6">500+ COMPANIES TRUST OUR QUALITY</span> <span className="text-[#2c3e2d] dark:text-[#8a9589]">✦</span>
          <span className="text-sm tracking-[0.2em] uppercase text-white font-body px-6">10,000+ BAGS MANUFACTURED MONTHLY</span> <span className="text-[#2c3e2d] dark:text-[#8a9589]">✦</span>
          <span className="text-sm tracking-[0.2em] uppercase text-white font-body px-6">ISO-ALIGNED QUALITY PROCESSES</span> <span className="text-[#2c3e2d] dark:text-[#8a9589]">✦</span>
          <span className="text-sm tracking-[0.2em] uppercase text-white font-body px-6">CUSTOM BRANDING</span> <span className="text-[#2c3e2d] dark:text-[#8a9589]">✦</span>
        </div>
        <div className="animate-infinite-scroll flex shrink-0 whitespace-nowrap min-w-full gap-6" aria-hidden="true">
          <span className="text-sm tracking-[0.2em] uppercase text-white font-body px-6">500+ COMPANIES TRUST OUR QUALITY</span> <span className="text-[#2c3e2d] dark:text-[#8a9589]">✦</span>
          <span className="text-sm tracking-[0.2em] uppercase text-white font-body px-6">10,000+ BAGS MANUFACTURED MONTHLY</span> <span className="text-[#2c3e2d] dark:text-[#8a9589]">✦</span>
          <span className="text-sm tracking-[0.2em] uppercase text-white font-body px-6">ISO-ALIGNED QUALITY PROCESSES</span> <span className="text-[#2c3e2d] dark:text-[#8a9589]">✦</span>
          <span className="text-sm tracking-[0.2em] uppercase text-white font-body px-6">CUSTOM BRANDING</span> <span className="text-[#2c3e2d] dark:text-[#8a9589]">✦</span>
        </div>
      </div>
      
      <div className="bg-surface-container-low dark:bg-[#111916] py-8 md:py-12 px-6 md:px-12 border-b border-surface-variant dark:border-[#8a9589]/10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-baseline justify-center leading-none mb-2">
              <span className="font-bold text-4xl md:text-5xl font-headline text-primary dark:text-[#c5d5bf]">30</span>
              <span className="font-bold text-4xl md:text-5xl font-headline ml-1 text-primary dark:text-[#c5d5bf]">+</span>
            </div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-on-surface-variant dark:text-[#8a9589]">Years Experience</span>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex items-baseline justify-center leading-none mb-2">
              <span className="font-bold text-4xl md:text-5xl font-headline text-primary dark:text-[#c5d5bf]">500</span>
              <span className="font-bold text-4xl md:text-5xl font-headline ml-1 text-primary dark:text-[#c5d5bf]">+</span>
            </div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-on-surface-variant dark:text-[#8a9589]">Clients Served</span>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex items-baseline justify-center leading-none mb-2">
              <span className="font-bold text-4xl md:text-5xl font-headline text-primary dark:text-[#c5d5bf]">10K<span className="ml-1">+</span></span>
            </div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-on-surface-variant dark:text-[#8a9589]">Bags/Month Capacity</span>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex items-baseline justify-center leading-none mb-2">
              <span className="font-bold text-4xl md:text-5xl font-headline text-primary dark:text-[#c5d5bf]">15</span>
              <span className="font-bold text-4xl md:text-5xl font-headline ml-1 text-primary dark:text-[#c5d5bf]">+</span>
            </div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-on-surface-variant dark:text-[#8a9589]">Industries Served</span>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
