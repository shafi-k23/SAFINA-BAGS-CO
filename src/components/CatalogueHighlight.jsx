import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CatalogueHighlight() {
  const cataloguePath = '/Catlouge.pdf';
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    if (!activeButton) return undefined;

    const timer = setTimeout(() => {
      setActiveButton(null);
    }, 420);

    return () => clearTimeout(timer);
  }, [activeButton]);

  return (
    <section
      id="catalogue-download"
      className="relative overflow-hidden bg-surface dark:bg-[#0a0f0c] px-6 md:px-12 pb-14 md:pb-20"
    >
      <div className="max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.65 }}
          className="relative isolate overflow-hidden rounded-[28px] md:rounded-[34px] border border-outline-variant/30 dark:border-[#a6b0a3]/20 bg-gradient-to-br from-[#f5f2e8] via-[#e9efe4] to-[#d8e4d2] dark:from-[#141c17] dark:via-[#1b271f] dark:to-[#101812] p-7 md:p-12 shadow-[0_14px_40px_-28px_rgba(26,42,34,0.45)] dark:shadow-[0_16px_46px_-30px_rgba(0,0,0,0.75)]"
        >
          <div className="pointer-events-none absolute -top-20 -left-20 h-48 w-48 rounded-full bg-[#c5d5bf]/50 blur-3xl dark:bg-[#8a9589]/20" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-[#a6b0a3]/45 blur-3xl dark:bg-[#c5d5bf]/20" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.15fr_auto] gap-8 lg:gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#1a2a22]/15 dark:border-white/15 bg-white/55 dark:bg-white/5 px-3.5 py-1.5 text-[10px] md:text-xs tracking-[0.24em] uppercase text-[#1a2a22] dark:text-[#d9e3d5] font-bold">
                <span className="material-symbols-outlined !text-sm">menu_book</span>
                Catalogue Ready
              </span>

              <h3 className="mt-5 text-3xl md:text-5xl leading-tight font-headline text-[#132019] dark:text-[#f3f8f0]">
                Download Our Complete
                <span className="block md:inline md:ml-3 text-[#2c3e2d] dark:text-[#c5d5bf]">Product Catalogue</span>
              </h3>

              <p className="mt-5 max-w-2xl text-sm md:text-lg leading-relaxed text-[#2a372e] dark:text-[#9ead9f] font-body">
                Explore all bag categories, materials, branding options, and bulk-order details in one file. Tap below to
                download.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-3 md:gap-4 w-full lg:w-auto">
              <motion.a
                href={cataloguePath}
                download
                onClick={() => setActiveButton('download')}
                whileHover={{ y: -3, scale: 1.02, rotate: -0.4 }}
                whileTap={{ scale: 0.965 }}
                className="group relative inline-flex min-h-[56px] md:min-h-[60px] items-center justify-center gap-2.5 rounded-2xl bg-[#1a2a22] dark:bg-[#dbe7d8] px-6 md:px-8 text-sm md:text-base font-bold text-white dark:text-[#132019] transition-all duration-300 shadow-[0_12px_28px_-16px_rgba(26,42,34,0.9)] dark:shadow-[0_12px_28px_-16px_rgba(219,231,216,0.85)] overflow-hidden"
              >
                <motion.span
                  aria-hidden
                  initial={false}
                  animate={activeButton === 'download' ? { scale: [0.2, 1.6], opacity: [0.42, 0] } : { scale: 0.2, opacity: 0 }}
                  transition={{ duration: 0.42, ease: 'easeOut' }}
                  className="pointer-events-none absolute inset-0 m-auto h-16 w-16 rounded-full bg-white/35"
                />
                <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full" />
                <motion.span
                  className="material-symbols-outlined !text-[20px]"
                  animate={activeButton === 'download' ? { y: [0, 2, -1, 0], rotate: [0, 5, -4, 0] } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.34, ease: 'easeInOut' }}
                >
                  download
                </motion.span>
                Download Catalogue
              </motion.a>

              <motion.a
                href={cataloguePath}
                target="_blank"
                rel="noreferrer"
                onClick={() => setActiveButton('preview')}
                whileHover={{ y: -3, scale: 1.015 }}
                whileTap={{ scale: 0.975 }}
                className="inline-flex min-h-[48px] md:min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-[#1a2a22]/25 dark:border-[#dbe7d8]/30 bg-white/70 dark:bg-[#0f1712]/70 px-5 md:px-6 text-sm md:text-[15px] font-semibold text-[#1d2b22] dark:text-[#dbe7d8] backdrop-blur-sm transition-colors duration-300 hover:bg-white dark:hover:bg-[#162119]"
              >
                <motion.span
                  className="material-symbols-outlined !text-[19px]"
                  animate={activeButton === 'preview' ? { x: [0, 3, 0], y: [0, -2, 0] } : { x: 0, y: 0 }}
                  transition={{ duration: 0.32, ease: 'easeInOut' }}
                >
                  open_in_new
                </motion.span>
                Preview First
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
