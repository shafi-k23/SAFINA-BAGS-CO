import React, { useEffect, useRef, useState } from "react";
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

// --- PRODUCT CARD (NO MOUSE 3D ROTATION) ---
const ProductCard = ({ product }) => {
  return (
    <div
      className="relative flex flex-col h-full w-full rounded-[24px] bg-surface-container-lowest dark:bg-[#111916] border border-outline-variant/30 dark:border-white/10 shadow-sm transition-all duration-500"
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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    dragFree: false,
    containScroll: false,
    skipSnaps: false,
    duration: 18,
    slidesToScroll: 1,
    watchDrag: true,
  });

  const wheelCooldownRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };

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

  // Horizontal wheel scrolling
  useEffect(() => {
    if (!emblaApi) return;

    const viewportNode = emblaApi.rootNode();
    if (!viewportNode) return;

    const onWheel = (event) => {
      const dominantDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : (event.shiftKey ? event.deltaY : 0);

      if (Math.abs(dominantDelta) < 8) return;

      const now = performance.now();
      if (now - wheelCooldownRef.current < 180) {
        event.preventDefault();
        return;
      }

      wheelCooldownRef.current = now;
      event.preventDefault();

      if (dominantDelta > 0) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollPrev();
      }
    };

    viewportNode.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      viewportNode.removeEventListener("wheel", onWheel);
    };
  }, [emblaApi]);

  const getDistanceFromCenter = (index) => {
    const total = products.length;
    let distance = Math.abs(index - activeIndex);
    if (distance > total / 2) {
      distance = total - distance;
    }
    return distance;
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

      {/* Carousel Container */}
      <div className="w-full relative pb-4 md:pb-6 overflow-hidden mx-auto max-w-[1600px]">
        <div
          ref={emblaRef}
          className={cn(
            "relative overflow-hidden select-none py-12 -my-6",
            isDragging ? "cursor-grabbing" : "cursor-grab"
          )}
        >
          <div className="-ml-3 md:-ml-5 flex items-stretch">
            {products.map((product, index) => {
              const distance = getDistanceFromCenter(index);
              
              return (
                <div
                  key={product.id}
                  className={cn(
                    "pl-3 md:pl-5 min-w-0",
                    // Mobile: single card takes ~85% width
                    "flex-[0_0_85%]",
                    // Tablet
                    "sm:flex-[0_0_50%]",
                    // Desktop: ~30% so 3 cards fit nicely in view
                    "lg:flex-[0_0_30%]",
                    "xl:flex-[0_0_28%]"
                  )}
                >
                  <div
                    className={cn(
                      "carousel-slide-inner",
                      // On mobile: fade non-center cards
                      distance === 0 && "mobile-active",
                      distance === 1 && "mobile-neighbor",
                      distance >= 2 && "mobile-far",
                    )}
                  >
                    <ProductCard product={product} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="sr-only" aria-live="polite">
            {products[activeIndex]?.title}
          </div>
        </div>


      </div>

    </section>
  );
}