import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Show WhatsApp button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          href="https://wa.me/919353336030?text=Hi%20Safina%20Bags%2C%20I%20am%20interested%20in%20bulk%20bags."
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center justify-center gap-3 px-5 py-3.5 bg-[#1a2a22] text-[#f0f5ee] dark:bg-[#c5d5bf] dark:text-[#111916] rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#ffffff]/10 hover:shadow-[0_8px_40px_rgb(0,0,0,0.2)] hover:-translate-y-1 hover:scale-[1.02] active:scale-95 transition-all duration-300"
          aria-label="Contact Us"
        >
          <span className="material-symbols-outlined text-[24px]">forum</span>
          <span className="hidden sm:block text-[13px] font-bold tracking-widest uppercase font-body mt-0.5">Chat Now</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
