import React, { useEffect, useRef, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
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

// --- PRODUCT CARD ---
const ProductCard = ({ product }) => {
  return (
    <div
      className="relative flex flex-col h-full w-full rounded-[24px] bg-surface-container-lowest dark:bg-[#111916] border border-outline-variant/30 dark:border-white/10 shadow-sm carousel-card"
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

// ============================================================
// MOBILE CAROUSEL — Native CSS scroll-snap (hardware-accelerated)
// ============================================================
const MobileCarousel = () => {
  return (
    <div className="mobile-carousel-viewport">
      <div className="mobile-carousel-track">
        {products.map((product) => (
          <div key={product.id} className="mobile-carousel-slide">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// DESKTOP CAROUSEL — Embla (opacity effects + wheel/trackpad)
// ============================================================
const DesktopCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    dragFree: false,
    containScroll: false,
    skipSnaps: false,
    duration: 30,
    slidesToScroll: 1,
    watchDrag: true,
  });

  const wheelDeltaRef = useRef(0);
  const wheelTimeoutRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rafRef = useRef(null);
  const slideRefs = useRef([]);

  // Apply per-slide opacity via direct DOM updates (no React re-renders)
  const updateSlideStyles = useCallback(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();

    emblaApi.scrollSnapList().forEach((snapPoint, index) => {
      const el = slideRefs.current[index];
      if (!el) return;

      let diffToTarget = snapPoint - scrollProgress;
      const slidesCount = emblaApi.scrollSnapList().length;
      if (engine.options.loop) {
        while (diffToTarget > 0.5) diffToTarget -= 1;
        while (diffToTarget < -0.5) diffToTarget += 1;
      }

      const distance = Math.abs(diffToTarget);
      const normalizedDist = distance * slidesCount;
      let opacity, blur;
      if (normalizedDist < 0.5) {
        opacity = 1;
        blur = 0;
      } else if (normalizedDist < 1.5) {
        opacity = 0.6;
        blur = 0;
      } else {
        opacity = 0.2;
        blur = 1.5;
      }

      el.style.opacity = opacity;
      el.style.filter = blur > 0 ? `blur(${blur}px)` : "none";
    });
  }, [emblaApi]);

  // rAF loop for smooth style updates during scroll
  useEffect(() => {
    if (!emblaApi) return;

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateSlideStyles);
    };

    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", onScroll);
    updateSlideStyles();

    return () => {
      emblaApi.off("scroll", onScroll);
      emblaApi.off("reInit", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [emblaApi, updateSlideStyles]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    const onPointerDown = () => setIsDragging(true);
    const onPointerUp = () => setIsDragging(false);

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("pointerUp", onPointerUp);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("pointerUp", onPointerUp);
    };
  }, [emblaApi]);

  // Horizontal wheel/trackpad scrolling
  useEffect(() => {
    if (!emblaApi) return;
    const viewportNode = emblaApi.rootNode();
    if (!viewportNode) return;

    const onWheel = (event) => {
      if (Math.abs(event.deltaX) < 1) return;
      event.preventDefault();
      wheelDeltaRef.current += event.deltaX;
      clearTimeout(wheelTimeoutRef.current);
      wheelTimeoutRef.current = setTimeout(() => {
        wheelDeltaRef.current = 0;
      }, 80);
      const THRESHOLD = 50;
      if (Math.abs(wheelDeltaRef.current) >= THRESHOLD) {
        if (wheelDeltaRef.current > 0) emblaApi.scrollNext();
        else emblaApi.scrollPrev();
        wheelDeltaRef.current = 0;
      }
    };

    viewportNode.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      viewportNode.removeEventListener("wheel", onWheel);
      clearTimeout(wheelTimeoutRef.current);
    };
  }, [emblaApi]);

  return (
    <div
      ref={emblaRef}
      className={cn(
        "relative overflow-hidden select-none py-12 -my-6 carousel-viewport",
        isDragging ? "cursor-grabbing carousel-dragging" : "cursor-grab"
      )}
      style={{ touchAction: "pan-y pinch-zoom" }}
    >
      <div className="carousel-container -ml-5 flex items-stretch">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="carousel-slide pl-5 min-w-0 flex-[0_0_30%] xl:flex-[0_0_28%]"
          >
            <div
              ref={(el) => (slideRefs.current[index] = el)}
              className="carousel-slide-inner"
            >
              <ProductCard product={product} />
            </div>
          </div>
        ))}
      </div>

      <div className="sr-only" aria-live="polite">
        {products[activeIndex]?.title}
      </div>
    </div>
  );
};

// ============================================================
// MAIN CAROUSEL — switches between mobile/desktop
// ============================================================
export default function Carousel() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023px)");
    const check = () => setIsMobile(mql.matches);
    check();
    setMounted(true);
    mql.addEventListener("change", check);
    return () => mql.removeEventListener("change", check);
  }, []);

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

      {/* Carousel Container */}
      <div className="w-full relative pb-4 md:pb-6 overflow-hidden mx-auto max-w-[1600px]">
        {mounted && (isMobile ? <MobileCarousel /> : <DesktopCarousel />)}
      </div>

    </section>
  );
}