import React, { useCallback, useEffect, useMemo, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const buildSrcSet = (base, widths) => widths.map((width) => `${base}-${width}.webp ${width}w`).join(", ");
const carouselSizes = "(min-width: 1280px) 28vw, (min-width: 1024px) 30vw, (min-width: 640px) 50vw, 80vw";

const products = [
  {
    id: 1,
    title: "Corporate Laptop Bags",
    subtitle: "TECH-READY • MINIMALIST",
    desc: "For tech companies, startups, and onboarding kits. Structured compartments and secure organization.",
    image: "images/image-3.webp",
    srcSet: buildSrcSet("images/image-3", [480, 768, 1024]),
    sizes: carouselSizes,
  },
  {
    id: 2,
    title: "Travel & Field Gear",
    subtitle: "RUGGED",
    desc: "For logistics teams, field workers, and travel brands. High-capacity builds with weather-resistant materials.",
    image: "images/image-4.webp",
    srcSet: buildSrcSet("images/image-4", [480, 768, 1024]),
    sizes: carouselSizes,
  },
  {
    id: 3,
    title: "Executive & Gifting",
    subtitle: "PREMIUM • GIFTING",
    desc: "Premium branded bags for corporate gifting and VIP clients with subtle, elegant customization.",
    image: "images/image-5.webp",
    srcSet: buildSrcSet("images/image-5", [480, 768, 1024]),
    sizes: carouselSizes,
  },
  {
    id: 4,
    title: "Daily Casual Backpacks",
    subtitle: "EVERYDAY • LIGHTWEIGHT",
    desc: "Perfect for daily commuters and casual use. Lightweight, durable, and stylish designs.",
    image: "images/image-6.webp",
    srcSet: buildSrcSet("images/image-6", [480, 768, 1024]),
    sizes: carouselSizes,
  },
  {
    id: 5,
    title: "School & College Bags",
    subtitle: "INSTITUTIONAL • ERGONOMIC",
    desc: "Institutional bulk orders for education. Built for daily wear and tear with ergonomic support.",
    image: "images/image-7.webp",
    srcSet: buildSrcSet("images/image-7", [480, 768, 1024]),
    sizes: carouselSizes,
  },
  {
    id: 6,
    title: "Laptop Backpacks",
    subtitle: "TECH • SECURE",
    desc: "Dedicated padded compartments for electronics. Ideal for students, tech workers, and professionals.",
    image: "images/image-8.webp",
    srcSet: buildSrcSet("images/image-8", [480, 768, 1024]),
    sizes: carouselSizes,
  }
];

// --- PRODUCT CARD (NO MOUSE 3D ROTATION) ---
const ProductCard = ({ product }) => {
  return (
    <div
      className="relative flex flex-col h-full w-full rounded-[24px] bg-[#f2f0ea] dark:bg-[#111916] border border-outline-variant/30 dark:border-white/10 shadow-sm carousel-card transition-colors duration-300"
    >
      <div className="flex flex-col h-full rounded-[24px] overflow-hidden pointer-events-none">

        {/* Top Image Box */}
        <div className="relative w-full aspect-[4/5] flex items-center justify-center overflow-hidden select-none">
          {product.image ?
            <img
              src={product.image}
              srcSet={product.srcSet}
              sizes={product.sizes}
              alt={product.title}
              draggable="false"
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              className="object-cover object-center w-full h-full pointer-events-none mix-blend-darken dark:mix-blend-normal"
            />
            : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[#454e47] dark:text-[#8a9589] font-body text-sm tracking-widest uppercase">
                  Image Pending
                </span>
              </div>
            )}
        </div>

        {/* Bottom Text Box */}
        <div className="p-6 md:p-8 flex flex-col flex-grow">
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
  const emblaOptions = useMemo(
    () => ({
      // Mobile defaults: keep infinite loop with one centered card.
      loop: true,
      align: "center",
      dragFree: false,
      containScroll: false,
      skipSnaps: false,
      duration: 28,
      slidesToScroll: 1,
      watchDrag: true,
      // Mobile browsers trigger frequent viewport resizes (URL bar show/hide), which can
      // cause subtle snap jitter if Embla re-inits during/after swipes.
      watchResize: false,
      watchSlides: false,
      breakpoints: {
        // Preserve existing desktop/tablet behavior exactly as before.
        "(min-width: 768px)": {
          loop: true,
          align: "center",
          containScroll: false,
          skipSnaps: false,
          duration: 30,
          watchResize: true,
          watchSlides: true,
        },
      },
    }),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const wheelDeltaRef = useRef(0);
  const wheelTimeoutRef = useRef(null);
  const viewportRef = useRef(null);
  const srTextRef = useRef(null);

  const setRefs = React.useCallback(
    (node) => {
      viewportRef.current = node;
      emblaRef(node);
    },
    [emblaRef]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      // Batch layout reads in a rAF to avoid forced reflow
      requestAnimationFrame(() => {
        const idx = emblaApi.selectedScrollSnap();
        if (srTextRef.current && products[idx]) {
          srTextRef.current.textContent = products[idx].title;
        }
      });
    };

    const onPointerDown = () => {
      if (viewportRef.current) {
        viewportRef.current.classList.add('cursor-grabbing', 'carousel-dragging');
        viewportRef.current.classList.remove('cursor-grab');
      }
    };

    const onPointerUp = () => {
      if (viewportRef.current) {
        viewportRef.current.classList.remove('cursor-grabbing', 'carousel-dragging');
        viewportRef.current.classList.add('cursor-grab');
      }
    };

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

  // Horizontal wheel/trackpad scrolling — gesture-driven, no time cooldown
  useEffect(() => {
    if (!emblaApi) return;

    if (window.matchMedia("(max-width: 767px)").matches) return;

    const viewportNode = emblaApi.rootNode();
    if (!viewportNode) return;

    const onWheel = (event) => {
      // Only act on horizontal gestures
      if (Math.abs(event.deltaX) < 1) return;
      event.preventDefault();

      // Accumulate delta from the trackpad gesture
      wheelDeltaRef.current += event.deltaX;

      // Reset accumulator when gesture stops (no new events for 80ms)
      clearTimeout(wheelTimeoutRef.current);
      wheelTimeoutRef.current = setTimeout(() => {
        wheelDeltaRef.current = 0;
      }, 80);

      // Scroll when enough delta has accumulated
      const THRESHOLD = 50;
      if (Math.abs(wheelDeltaRef.current) >= THRESHOLD) {
        if (wheelDeltaRef.current > 0) {
          emblaApi.scrollNext();
        } else {
          emblaApi.scrollPrev();
        }
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
    <section className="relative w-full overflow-hidden bg-surface dark:bg-[#0a0f0c] select-none pt-8 md:pt-24 pb-4 transition-colors duration-300">

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

        {/* Prev / Next Arrow Buttons — desktop only */}
        <button
          onClick={scrollPrev}
          aria-label="Previous slide"
          className="hidden md:flex items-center justify-center absolute left-3 lg:left-6 top-[40%] -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-outline-variant/40 dark:border-white/10 bg-surface/80 dark:bg-[#111916]/80 backdrop-blur-sm text-on-surface-variant dark:text-[#8a9589] hover:bg-primary-container/60 dark:hover:bg-white/10 hover:text-on-surface dark:hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button
          onClick={scrollNext}
          aria-label="Next slide"
          className="hidden md:flex items-center justify-center absolute right-3 lg:right-6 top-[40%] -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-outline-variant/40 dark:border-white/10 bg-surface/80 dark:bg-[#111916]/80 backdrop-blur-sm text-on-surface-variant dark:text-[#8a9589] hover:bg-primary-container/60 dark:hover:bg-white/10 hover:text-on-surface dark:hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
        </button>

        <div
          ref={setRefs}
          className="relative overflow-hidden select-none carousel-viewport cursor-grab"
          style={{ touchAction: "pan-y" }}
        >
          <div className="carousel-container flex items-stretch [transform:translate3d(0,0,0)]">
            {products.map((product) => {
              return (
                <div
                  key={product.id}
                  className={cn(
                    "carousel-slide min-w-0 px-[6px] md:px-[10px]",
                    // Mobile: 82% leaves ~9% peek on each side
                    "flex-[0_0_82%]",
                    // Tablet
                    "sm:flex-[0_0_50%]",
                    // Desktop: ~30% so 3 cards fit nicely in view
                    "lg:flex-[0_0_30%]",
                    "xl:flex-[0_0_28%]"
                  )}
                >
                  <div className="carousel-slide-inner">
                    <ProductCard product={product} />
                  </div>
                </div>
              );
            })}
          </div>

          <div ref={srTextRef} className="sr-only" aria-live="polite">
            {products[0]?.title}
          </div>
        </div>


      </div>

    </section>
  );
}