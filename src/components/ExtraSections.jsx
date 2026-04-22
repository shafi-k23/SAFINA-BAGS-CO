import React from 'react';
import { motion } from 'framer-motion';

export default function ExtraSections() {
  const factoryItems = [
    { icon: 'videocam', label: 'Video / Image Pending' },
    { icon: 'factory', label: 'Factory Floor Image Pending' },
    { icon: 'precision_manufacturing', label: 'Machinery Image Pending' },
  ];

  const brandingOptions = [
    { icon: 'format_paint', title: 'Screen Printing', desc: 'High-contrast solid colors perfect for clear logos, text, and repeated pattern prints.' },
    { icon: 'gesture', title: 'Embroidery', desc: 'Premium thread-work providing a high-end, tactile, and durable corporate identity.' },
    { icon: 'wallpaper', title: 'Sublimation', desc: 'Full-color, photo-quality transfers integrating edge-to-edge designs into the fabric.' },
    { icon: 'label', title: 'Custom Labels', desc: 'Bespoke zippers, woven tags, and inner lining prints for comprehensive branding.' },
  ];

  const industries = [
    { icon: 'computer', title: 'IT & Startups', desc: 'Onboarding Kits' },
    { icon: 'school', title: 'Education', desc: 'Institutions' },
    { icon: 'redeem', title: 'Gifting', desc: 'Corporate Events' },
    { icon: 'flight_takeoff', title: 'Travel Tourism', desc: 'Retail Brands' },
    { icon: 'local_shipping', title: 'Distributors', desc: 'Wholesale Partners' },
    { icon: 'account_balance', title: 'Govt & PSU', desc: 'Tender Manufacturing' },
  ];

  return (
    <>
      <section className="max-w-screen-2xl mx-auto py-12 md:py-16 px-6 md:px-12 bg-surface-container-low dark:bg-[#111916]" id="factory-tour">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="block text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase font-body text-on-surface-variant dark:text-[#8a9589] mb-4">Behind the Seams</span>
          <h2 className="text-4xl md:text-5xl font-headline text-[#1a2a22] dark:text-white mb-6">Inside Our Factory</h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg font-body text-[#454e47] dark:text-[#8a9589] leading-relaxed">
            Take a look at our production capacity, advanced machinery, and the skilled artisans behind every stitch.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {factoryItems.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative w-full aspect-video md:aspect-square overflow-hidden bg-[#c5d5bf] dark:bg-[#1c2620] rounded-2xl flex flex-col items-center justify-center shadow-sm border border-outline-variant/20 dark:border-white/5 transition-transform duration-500 md:hover:-translate-y-2 md:hover:shadow-xl"
            >
              <span className="material-symbols-outlined text-[32px] text-[#454e47] dark:text-[#8a9589] mb-2 opacity-50 transition-transform group-hover:scale-110 duration-300">{item.icon}</span>
              <span className="text-[#454e47] dark:text-[#8a9589] font-body text-[10px] md:text-xs tracking-widest uppercase opacity-70 px-4 text-center">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-screen-2xl mx-auto py-12 md:py-16 px-6 md:px-12 bg-[#0a0f0c] text-[#f0f5ee]" id="custom-branding">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="block text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#8a9589] mb-4">Value Addition</span>
          <h2 className="text-4xl md:text-5xl font-headline mb-6">Custom Branding Options</h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg font-body text-[#8a9589] leading-relaxed">
            Elevate your corporate identity. We provide premium application methods to ensure your brand stands out with durability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brandingOptions.map((option, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#111916] border border-[#8a9589]/20 rounded-2xl p-8 transition-all shadow-sm md:hover:-translate-y-2 md:hover:shadow-xl"
            >
              <span className="material-symbols-outlined text-3xl mb-4 text-[#c5d5bf]">{option.icon}</span>
              <h3 className="text-xl font-headline font-bold mb-3">{option.title}</h3>
              <p className="text-sm font-body text-[#8a9589] leading-relaxed">{option.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-screen-2xl mx-auto py-12 md:py-16 px-6 md:px-12 bg-surface-container-lowest dark:bg-[#111916]" id="industries">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-10 md:mb-12"
        >
          <span className="block text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase font-body text-on-surface-variant dark:text-[#8a9589] mb-4">Client Segments</span>
          <h2 className="text-4xl md:text-5xl font-headline text-[#1a2a22] dark:text-white leading-tight mb-6">Industries We Serve</h2>
          <p className="text-base md:text-lg font-body text-[#454e47] dark:text-[#8a9589] leading-relaxed">
            Whether you need staff laptop bags or private-label retail collections, we have the specific capability.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {industries.map((ind, idx) => (
             <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 bg-surface-container-low dark:bg-[#172019] rounded-xl border border-outline-variant/30 dark:border-white/10 flex flex-col items-center text-center"
            >
              <span className="material-symbols-outlined text-3xl text-primary dark:text-[#c5d5bf] mb-3">{ind.icon}</span>
              <span className="text-sm font-bold font-body text-[#1a2a22] dark:text-white">{ind.title}</span>
              <span className="text-[10px] text-[#454e47] dark:text-[#8a9589] mt-2">{ind.desc}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
