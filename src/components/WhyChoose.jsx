import React from 'react';
import { motion } from 'framer-motion';

export default function WhyChoose() {
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

  const features = [
    {
      icon: "factory",
      title: "30+ Years Manufacturing",
      desc: "Three decades of expertise in bag production and material engineering."
    },
    {
      icon: "palette",
      title: "Custom Branding & Printing",
      desc: "Your logo, colors, and design — screen printing, embroidery, sublimation."
    },
    {
      icon: "inventory_2",
      title: "MOQ-Friendly",
      desc: "Flexible minimum orders starting from 50 pieces for most lines."
    },
    {
      icon: "bolt",
      title: "Fast Turnaround",
      desc: "Production cycles as short as 2-3 weeks for standard orders."
    },
    {
      icon: "verified",
      title: "Multi-Point Quality Checks",
      desc: "Every batch inspected — stitching, zippers, and load stress tests."
    },
    {
      icon: "local_shipping",
      title: "Pan-India Delivery",
      desc: "Reliable logistics to any corporate location or warehouse across India."
    }
  ];

  return (
    <section className="max-w-screen-2xl mx-auto pt-4 md:pt-6 pb-12 md:pb-16 px-6 md:px-12 bg-surface-container-lowest dark:bg-[#0a0f0c]" id="why-choose">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 md:mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-headline text-[#1a2a22] dark:text-white mb-6">Why Choose Safina</h2>
        <p className="max-w-2xl mx-auto text-base md:text-lg font-body text-[#454e47] dark:text-[#8a9589] leading-relaxed">
          We eliminate the friction in bulk manufacturing. Consistent quality, fast timelines, and competitive pricing for your B2B needs.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature, idx) => (
          <motion.div 
            key={idx}
            variants={itemVariants}
            className="p-8 bg-surface-container-low dark:bg-[#111916] rounded-2xl flex gap-4 transition-transform hover:-translate-y-1 hover:shadow-lg border border-transparent dark:border-white/5"
          >
            <div className="material-symbols-outlined text-[40px] text-primary dark:text-[#c5d5bf] opacity-80 leading-none">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-xl font-headline font-bold text-[#1a2a22] dark:text-white mb-2">{feature.title}</h3>
              <p className="text-sm font-body text-[#454e47] dark:text-[#8a9589] leading-relaxed">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
