import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const products = [
  {
    id: 1,
    title: "Corporate Laptop Bags",
    subtitle: "TECH-READY • MINIMALIST",
    desc: "For tech companies, startups, and onboarding kits. Structured compartments and secure organization.",
    image: "images/image-3.jpg",
  },
  {
    id: 2,
    title: "Travel & Field Gear",
    subtitle: "RUGGED",
    desc: "For logistics teams, field workers, and travel brands. High-capacity builds with weather-resistant materials.",
    image: "images/image-4.jpg",
  },
  {
    id: 3,
    title: "Executive & Gifting",
    subtitle: "PREMIUM • GIFTING",
    desc: "Premium branded bags for corporate gifting and VIP clients with subtle, elegant customization.",
    image: "images/image-5.jpg",
  },
  {
    id: 4,
    title: "Daily Casual Backpacks",
    subtitle: "EVERYDAY • LIGHTWEIGHT",
    desc: "Perfect for daily commuters and casual use. Lightweight, durable, and stylish designs.",
    image: "images/image-6.jpg",
  },
  {
    id: 5,
    title: "School & College Bags",
    subtitle: "INSTITUTIONAL • ERGONOMIC",
    desc: "Institutional bulk orders for education. Built for daily wear and tear with ergonomic support.",
    image: "images/image-7.jpg",
  },
  {
    id: 6,
    title: "Laptop Backpacks",
    subtitle: "TECH • SECURE",
    desc: "Dedicated padded compartments for electronics. Ideal for students, tech workers, and professionals.",
    image: "images/image-8.jpg",
  }
];

// Duplicate for vast left/right scrolling (10 sets for buffer)
const infiniteProducts = Array(10).fill(products).flat();

// --- PRODUCT CARD (NO MOUSE 3D ROTATION) ---
const ProductCard = ({ product }) => {
  return (
    <div
      className="relative flex flex-col flex-shrink-0 h-full w-[82vw] sm:w-[260px] lg:w-[280px] xl:w-[300px] mx-3 md:mx-5 rounded-[24px] bg-surface-container-lowest dark:bg-[#111916] border border-outline-variant/30 dark:border-white/10 shadow-sm transition-all duration-500"
    >
      <div className="flex flex-col h-full rounded-[24px] overflow-hidden pointer-events-none">
        
        {/* Top Image Box */}
        <div className="relative w-full aspect-[4/5] bg-[#f2f0ea] dark:bg-[#131b16] flex items-center justify-center border-b border-outline-variant/10 dark:border-white/5 overflow-hidden select-none">
          {product.image ?
            <img 
              src={product.image} 
              alt={product.title} 
              draggable="false"
              className="object-cover object-center w-full h-full pointer-events-none"
            />
          : (
            <div className="absolute inset-0 bg-[#c5d5bf] dark:bg-[#1c2620] flex items-center justify-center">
              <span className="text-[#454e47] dark:text-[#8a9589] font-body text-sm tracking-widest uppercase">
                Image Pending
              </span>
            </div>
          )}
        </div>

        {/* Bottom Text Box */}
        <div className="p-6 md:p-8 flex flex-col flex-grow bg-white dark:bg-[#111916]">
          <div className="flex flex-wrap gap-2 mb-4">
            {product.subtitle.split('•').map((sub, i) => (
              <span key={i} className="px-3 py-1 text-[9px] font-bold tracking-[0.2em] uppercase border border-outline-variant/40 dark:border-[#8a9589]/30 rounded-full text-[#454e47] dark:text-[#8a9589]">
                {sub.trim()}
              </span>
            ))}
          </div>
          <h3 className="text-xl md:text-2xl font-headline text-[#1a2a22] dark:text-white leading-tight pointer-events-auto pb-4">
            {product.title}
          </h3>
        </div>

      </div>
    </div>
  );
};

export default function Carousel() {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const scrollTimeoutRef = useRef(null);

  const productSetCount = 10; // Increased to provide a massive buffer so users rarely even trigger the reset
  
  // True seamless loop: wait for scroll momentum to completely stop before repositioning
  const handleScroll = () => {
    if (!containerRef.current || isDragging) return; 
    
    // Clear any pending scroll timeouts
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Set a debounce timeout to only jump the scroll position when the user has stopped swiping
    scrollTimeoutRef.current = setTimeout(() => {
      const track = containerRef.current;
      if (!track) return;
      
      const singleSetWidth = track.scrollWidth / productSetCount;
      
      // If we got too close to the left edge
      if (track.scrollLeft < singleSetWidth * 2) {
        track.style.scrollBehavior = 'auto'; // Prevent animation glitch
        track.scrollLeft += singleSetWidth * 4; 
      } 
      // If we got too close to the right edge
      else if (track.scrollLeft > track.scrollWidth - (singleSetWidth * 3)) {
        track.style.scrollBehavior = 'auto'; // Prevent animation glitch
        track.scrollLeft -= singleSetWidth * 4;
      }
    }, 150); // Wait 150ms after the last scroll event (when momentum dies/ends)
  };

  useEffect(() => {
    if (containerRef.current) {
        const track = containerRef.current;
        const middleOffset = (track.scrollWidth / productSetCount) * 4; 
        track.style.scrollBehavior = 'auto'; 
        track.scrollLeft = middleOffset;
    }
    
    // Cleanup timeout on unmount
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeftPos(containerRef.current.scrollLeft);
    containerRef.current.style.scrollBehavior = 'auto'; // Remove smooth scroll when dragging
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; 
    containerRef.current.scrollLeft = scrollLeftPos - walk;
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = 'smooth';
      const cardWidth = window.innerWidth < 1024 ? window.innerWidth * 0.82 : (window.innerWidth >= 1280 ? 340 : 320);
      containerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = 'smooth';
      const cardWidth = window.innerWidth < 1024 ? window.innerWidth * 0.82 : (window.innerWidth >= 1280 ? 340 : 320);
      containerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-surface dark:bg-[#0a0f0c] select-none pt-16 md:pt-24 pb-4 transition-colors duration-300">
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 reveal-up">
        <div className="max-w-2xl reveal-up">
            <span className="block text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase font-body text-on-surface-variant dark:text-[#8a9589] mb-4">Our Catalog</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline text-[#1a2a22] dark:text-white leading-tight">Our Product Lines</h2>
            <p className="mt-6 text-base md:text-lg font-body text-[#454e47] dark:text-[#8a9589] leading-relaxed">
                Purpose-built collections engineered for distinct operational requirements. From executive gifting to field deployments.
            </p>
        </div>
      </div>

      {/* Swipeable Tracking Grid */}
      <div className="w-full relative pb-4 md:pb-6 overflow-hidden mx-auto max-w-[1600px]">
        {/* Desktop Controls */}
        <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 md:left-6 md:right-6 hidden lg:flex justify-between pointer-events-none z-10">
          <button onClick={scrollLeft} className="w-12 h-12 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur border border-outline-variant/30 hover:scale-110 transition-transform pointer-events-auto flex items-center justify-center text-[#1a2a22] dark:text-white shadow-lg">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={scrollRight} className="w-12 h-12 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur border border-outline-variant/30 hover:scale-110 transition-transform pointer-events-auto flex items-center justify-center text-[#1a2a22] dark:text-white shadow-lg">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onScroll={handleScroll}
          className={cn(
            "flex flex-row items-stretch overflow-x-auto overflow-y-hidden px-[calc(50vw-41vw)] sm:px-[calc(50vw-130px)] lg:px-[calc(50vw-140px)] xl:px-[calc(50vw-150px)] py-12 -my-6 transition-all",
            isDragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"
          )}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {infiniteProducts.map((product, idx) => (
            <motion.div 
              key={`${product.id}-${idx}`} 
              className="snap-center pointer-events-auto flex-shrink-0 flex items-stretch h-auto"
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.3 }}
            >
                <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}