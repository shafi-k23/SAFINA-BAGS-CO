import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ExtraSections() {
  const buildSrcSet = (base, widths) => widths.map((width) => `${base}-${width}.webp ${width}w`).join(", ");
  const factorySizes = "(min-width: 1024px) 30vw, (min-width: 768px) 33vw, 100vw";

  const HoverVideo = ({ src, className }) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);

    // 1. Preload on first user interaction (scroll, touch, mouse).
    //    Fires early so all videos are ready before the user reaches the factory section.
    useEffect(() => {
      const handleInteraction = () => {
        setIsLoaded(true);
        window.removeEventListener('scroll', handleInteraction);
        window.removeEventListener('touchstart', handleInteraction);
        window.removeEventListener('mousemove', handleInteraction);
      };

      window.addEventListener('scroll', handleInteraction, { passive: true });
      window.addEventListener('touchstart', handleInteraction, { passive: true });
      window.addEventListener('mousemove', handleInteraction, { passive: true });

      // Fallback: load after 5 seconds anyway if no interaction
      const fallbackTimer = setTimeout(handleInteraction, 5000);

      return () => {
        window.removeEventListener('scroll', handleInteraction);
        window.removeEventListener('touchstart', handleInteraction);
        window.removeEventListener('mousemove', handleInteraction);
        clearTimeout(fallbackTimer);
      };
    }, []);

    // 2. Play/Pause based on actual visibility
    useEffect(() => {
      const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 768);
      checkIsDesktop();
      window.addEventListener('resize', checkIsDesktop);

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // isLoaded dependency ensures videoRef.current exists here
            if (videoRef.current && window.innerWidth < 768) {
              // Defer play() to idle callback so it doesn't fight the scroll compositor
              const schedulePlay = typeof requestIdleCallback !== 'undefined'
                ? requestIdleCallback
                : (cb) => setTimeout(cb, 100);
              schedulePlay(() => {
                if (videoRef.current) videoRef.current.play().catch(() => {});
              });
            }
          } else {
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        },
        { rootMargin: "100px" }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => {
        window.removeEventListener('resize', checkIsDesktop);
        observer.disconnect();
      };
    }, [isLoaded]); // Re-run when isLoaded changes to catch the newly rendered videoRef

    const handleMouseEnter = () => {
      if (!isDesktop) return;
      if (!isLoaded) {
        setIsLoaded(true);
      }
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    };

    const handleMouseLeave = () => {
      if (isDesktop && videoRef.current) {
        videoRef.current.pause();
      }
    };

    return (
      <div 
        ref={containerRef} 
        className="absolute inset-0 w-full h-full"
        style={{ contain: "content" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isLoaded ? (
          <>
            <video 
              ref={videoRef}
              src={src} 
              className={className}
              loop 
              muted 
              playsInline 
              preload="metadata"
            />
            {isDesktop && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500 opacity-100 group-hover:opacity-0 bg-black/10">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-75">
                  <span className="material-symbols-outlined text-white text-2xl md:text-3xl drop-shadow-md font-light translate-x-0.5">play_arrow</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-[#1c2620]" />
        )}
      </div>
    );
  };

  const factoryColumns = [
    [
      { type: 'video', src: 'images/CuttinMachine.mp4', icon: 'precision_manufacturing', label: 'Cutting Machine', orientation: 'vertical' },
      { type: 'video', src: 'images/stitching-video1-horizontal.mp4', icon: 'videocam', label: 'Stitching Video 1', orientation: 'horizontal' }
    ],
    [
      { type: 'image', src: 'images/factory-layout-horizontal.webp', srcSet: buildSrcSet('images/factory-layout-horizontal', [480, 768, 1024]), sizes: factorySizes, icon: 'factory', label: 'Factory Layout Photo', orientation: 'horizontal' },
      { type: 'image', src: 'images/factory-layout-vertical.webp', srcSet: buildSrcSet('images/factory-layout-vertical', [480, 768, 1024]), sizes: factorySizes, icon: 'factory', label: 'Factory Machinery Photo', orientation: 'vertical' }
    ],
    [
      { type: 'image', src: 'images/quality%20check%20vertical.webp', srcSet: buildSrcSet('images/quality%20check%20vertical', [480, 768, 1024]), sizes: factorySizes, icon: 'verified', label: 'Quality Checking Photo', orientation: 'vertical' },
      { type: 'video', src: 'images/stitching%20video2-horizontal.mp4', icon: 'videocam', label: 'Stitching Video 2', orientation: 'horizontal' }
    ]
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {factoryColumns.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4 md:gap-6">
              {col.map((item, itemIdx) => (
                <motion.div 
                  key={itemIdx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (colIdx * 0.1) + (itemIdx * 0.1) }}
                  className={`group relative w-full overflow-hidden bg-[#c5d5bf] dark:bg-[#1c2620] rounded-2xl flex flex-col items-center justify-center shadow-sm border border-outline-variant/20 dark:border-white/5 transition-transform duration-500 md:hover:-translate-y-1 md:hover:shadow-xl ${item.orientation === 'vertical' ? 'aspect-[3/4]' : 'aspect-video'}`}
                >
                  {item.src ? (
                    item.type === 'video' ? (
                      <HoverVideo 
                        src={item.src} 
                        className="absolute inset-0 w-full h-full object-cover" 
                      />
                    ) : (
                      <img 
                        src={item.src} 
                        srcSet={item.srcSet}
                        sizes={item.sizes}
                        alt={item.label} 
                        className="absolute inset-0 w-full h-full object-cover" 
                        loading="lazy"
                        decoding="async"
                        fetchpriority="low"
                      />
                    )
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-2 z-10 relative">
                      <span className="material-symbols-outlined text-[32px] text-[#454e47] dark:text-[#8a9589] opacity-50 transition-transform group-hover:scale-110 duration-300">{item.icon}</span>
                      <span className="text-[#454e47] dark:text-[#8a9589] font-body text-[10px] md:text-xs tracking-widest uppercase opacity-70 px-4 text-center">{item.label}</span>
                      <span className="text-[9px] font-bold opacity-40 uppercase tracking-[0.2em] bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md mt-2">{item.orientation}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
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
