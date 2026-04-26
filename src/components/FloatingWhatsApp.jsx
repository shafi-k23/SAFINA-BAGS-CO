import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Show WhatsApp button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        if (isOpen) setIsOpen(false); // Close chat if user scrolls back to top
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Prevent background scrolling when chat is open on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    const textToSend = message.trim() || 'Hi Safina Bags, I am interested in bulk bags.';
    // This will open WhatsApp Web or the app with the pre-filled message
    window.open(`https://wa.me/919353336030?text=${encodeURIComponent(textToSend)}`, '_blank', 'noopener,noreferrer');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex flex-col items-end">
          
          {/* Chat Window */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="mb-4 w-[320px] sm:w-[350px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 font-body origin-bottom-right"
              >
                {/* Header */}
                <div className="bg-[#0b9a6d] text-white p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1">
                        <img src="/images/logo.webp" alt="Safina Bags" className="w-full h-full object-contain" />
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-[15px] leading-tight">Safina Bags</h3>
                      <p className="text-xs opacity-90">Online</p>
                    </div>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 p-1 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>

                {/* Chat Body */}
                <div 
                  className="bg-[#e5ddd5] dark:bg-[#0a0f0c] p-4 h-[220px] overflow-y-auto flex flex-col relative"
                  style={{ 
                    backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', 
                    backgroundSize: 'contain', 
                    opacity: 0.95 
                  }}
                >
                  <div className="bg-white dark:bg-[#1a2a22] dark:text-[#f0f5ee] text-gray-800 p-3 rounded-tl-none rounded-xl text-[14px] shadow-sm max-w-[85%] float-left relative mt-2">
                    <p className="mb-1">We are Bags manufacturers.</p>
                    <p>How can I help you?</p>
                    <span className="text-[10px] text-gray-400 block text-right mt-1">Just now</span>
                  </div>
                </div>

                {/* Footer / Input */}
                <form onSubmit={handleSend} className="p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 flex items-center gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter Your Message..."
                    className="flex-1 px-4 py-2.5 text-base bg-white dark:bg-gray-800 border-none rounded-full focus:ring-1 focus:ring-[#0b9a6d] dark:text-white shadow-sm"
                  />
                  <button
                    type="submit"
                    className="bg-[#25D366] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#1EBE5D] transition-colors shrink-0 shadow-md"
                    disabled={!message.trim()}
                    aria-label="Send Message"
                    style={{ opacity: message.trim() ? 1 : 0.5 }}
                  >
                    <span className="material-symbols-outlined text-[20px] ml-1">send</span>
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center justify-center gap-3 p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#ffffff]/10 hover:shadow-[0_8px_40px_rgb(0,0,0,0.2)] transition-colors duration-300 ${
              isOpen ? 'bg-red-500 text-white' : 'bg-[#25D366] text-white'
            }`}
            aria-label="Toggle Contact"
          >
            <span className="material-symbols-outlined text-[24px]">
              {isOpen ? 'close' : 'chat'}
            </span>
            {!isOpen && (
              <span className="hidden sm:block text-[13px] font-bold tracking-widest uppercase font-body mt-0.5">
                Chat Now
              </span>
            )}
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
