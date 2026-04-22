import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#f2f4f4] dark:bg-[#111318] pt-24 pb-10">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col col-span-1 md:col-span-1"
        >
          <h2 className="text-3xl font-headline mb-8 text-[#2f3331] dark:text-[#f1f3f5]">Safina Bags Co.</h2>
          <p className="font-body text-[11px] tracking-widest text-[#5c5f5b] dark:text-[#a1a5a2] uppercase leading-loose max-w-sm mb-12">
            B2B backpack manufacturing. Dedicated to scalable production, enterprise quality, and reliable delivery from Bengaluru.
          </p>
          <div className="flex items-center space-x-4">
            <a href="https://safinabagsco.me" target="_blank" rel="noopener noreferrer" aria-label="Website" className="w-10 h-10 rounded-full border border-[#5c5f5b] dark:border-[#a1a5a2]/20 flex items-center justify-center hover:bg-[#5c5f5b] hover:text-white transition-all text-[#5c5f5b] dark:text-[#a1a5a2]">
              <span className="material-symbols-outlined text-lg">language</span>
            </a>
            <a href="mailto:safinabagsco@gmail.com" aria-label="Email" className="w-10 h-10 rounded-full border border-[#5c5f5b] dark:border-[#a1a5a2]/20 flex items-center justify-center hover:bg-[#5c5f5b] hover:text-white transition-all text-[#5c5f5b] dark:text-[#a1a5a2]">
              <span className="material-symbols-outlined text-lg">mail</span>
            </a>
            <a href="https://share.google/k6xJ6YLK5NvMb8xbe" target="_blank" rel="noopener noreferrer" aria-label="Location" className="w-10 h-10 rounded-full border border-[#5c5f5b] dark:border-[#a1a5a2]/20 flex items-center justify-center hover:bg-[#5c5f5b] hover:text-white transition-all text-[#5c5f5b] dark:text-[#a1a5a2]">
              <span className="material-symbols-outlined text-lg">location_on</span>
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col md:pl-12 pt-2"
        >
          <span className="font-body text-[10px] uppercase font-bold tracking-[0.2em] text-[#2f3331] dark:text-[#f1f3f5] mb-8">Capabilities</span>
          <ul className="font-body text-[10px] uppercase tracking-widest text-[#5c5f5b] dark:text-[#a1a5a2] space-y-5">
            <li><a href="#products" className="hover:text-[#2f3331] dark:text-[#f1f3f5] transition-colors">Corporate Backpacks</a></li>
            <li><a href="#products" className="hover:text-[#2f3331] dark:text-[#f1f3f5] transition-colors">Travel & Field Gear</a></li>
            <li><a href="#products" className="hover:text-[#2f3331] dark:text-[#f1f3f5] transition-colors">Custom Branding</a></li>
            <li><a href="#contact" className="hover:text-[#2f3331] dark:text-[#f1f3f5] transition-colors">Request Sample</a></li>
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col pt-2"
        >
          <span className="font-body text-[10px] uppercase font-bold tracking-[0.2em] text-[#2f3331] dark:text-[#f1f3f5] mb-8">Contact Info</span>
          <ul className="font-body text-[10px] uppercase tracking-widest text-[#5c5f5b] dark:text-[#a1a5a2] space-y-5">
            <li><span className="text-[#2f3331] dark:text-[#f1f3f5] block mb-1">Phone:</span> <a href="tel:+919353336030" className="hover:text-[#2f3331] dark:text-[#f1f3f5] transition-colors">+91 9353336030</a></li>
            <li><span className="text-[#2f3331] dark:text-[#f1f3f5] block mb-1">Email:</span> <a href="mailto:safinabagsco@gmail.com" className="hover:text-[#2f3331] dark:text-[#f1f3f5] transition-colors lowercase">safinabagsco@gmail.com</a></li>
            <li><span className="text-[#2f3331] dark:text-[#f1f3f5] block mb-1">GSTIN:</span> 29GILPR8626C1ZO</li>
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col pt-2"
        >
          <span className="font-body text-[10px] uppercase font-bold tracking-[0.2em] text-[#2f3331] dark:text-[#f1f3f5] mb-8">Manufacturing Unit</span>
          <p className="font-body text-[10px] uppercase tracking-widest text-[#5c5f5b] dark:text-[#a1a5a2] leading-loose mb-6">
            First Floor, No. 28, Shop No. 001<br/>
            Modi Road, Arabic College Post<br/>
            Devarajeevanahalli<br/>
            Bengaluru, 560045
          </p>
          <a href="https://share.google/k6xJ6YLK5NvMb8xbe" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 text-[10px] font-bold tracking-[0.2em] uppercase text-[#2f3331] dark:text-[#f1f3f5] hover:text-[#5c5f5b] dark:text-[#a1a5a2] transition-colors border-b border-[#2f3331] dark:border-[#f1f3f5] pb-0.5 self-start">
            <span>View on Map</span>
          </a>
        </motion.div>
      </div>

      <div className="px-6 md:px-12 text-center pb-8 pt-4 border-t border-[#5c5f5b] dark:border-[#a1a5a2]/10 max-w-screen-xl mx-auto w-full">
        <p className="font-body text-[8px] tracking-[0.2em] font-medium uppercase text-[#5c5f5b] dark:text-[#a1a5a2]/40">
          &copy; {currentYear} Safina Bags Co. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
