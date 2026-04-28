import React from 'react';
import { motion } from 'framer-motion';

export default function Manufacturing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  const steps = [
    {
      num: "1",
      title: "Requirement Discussion",
      desc: "Share specs, quantity, and branding needs. We recommend optimal materials."
    },
    {
      num: "2",
      title: "Sampling & Approval",
      desc: "We produce a physical prototype reflecting your exact colors and logo for sign-off."
    },
    {
      num: "3",
      title: "Bulk Production",
      desc: "Scaled manufacturing begins with strictly monitored timeline tracking."
    },
    {
      num: "4",
      title: "Quality Check & Delivery",
      desc: "Multi-point inspection before dispatching via reliable logistics to your location."
    }
  ];

  return (
    <section className="max-w-screen-2xl mx-auto pt-6 md:pt-16 pb-12 md:pb-16 px-6 md:px-12 bg-surface dark:bg-[#080e0b]" id="manufacturing">
      <div className="grid items-center grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="w-full aspect-square md:aspect-auto h-full min-h-[500px] overflow-hidden bg-[#131b16] rounded-2xl flex items-center justify-center"
        >
          <img 
            src="images/image-2.webp" 
            srcSet="images/image-2-640.webp 640w, images/image-2-960.webp 960w, images/image-2-1280.webp 1280w"
            sizes="(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 100vw"
            alt="Backpack Manufacturing Process and Quality Control" 
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-[10s]" 
            loading="lazy" 
            decoding="async"
            fetchpriority="low"
          />
        </motion.div>

        <motion.div
           variants={containerVariants}
           initial="hidden"
           whileInView="show"
           viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 variants={itemVariants} className="mb-6 text-4xl md:text-5xl font-headline text-[#1a2a22] dark:text-white leading-tight">
            Our Backpack Manufacturing Process
          </motion.h2>
          <motion.p variants={itemVariants} className="text-sm md:text-base font-body text-[#454e47] dark:text-[#8a9589] mb-8 leading-relaxed">
            Founded by Mohammed Raji Alam, Safina operates under 30+ years of quality-first execution. Our scalable network ensures controlled timelines.
          </motion.p>
          
          <div className="flex flex-col space-y-6 md:space-y-8">
            {steps.map((step, idx) => (
              <motion.div key={idx} variants={itemVariants} className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary dark:bg-[#8a9589]/20 dark:text-[#c5d5bf] font-bold text-sm shrink-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-bold tracking-widest uppercase font-body">{step.title}</h3>
                  <p className="text-sm font-body text-[#454e47] dark:text-[#8a9589] leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
