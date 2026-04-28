import React, { Suspense, lazy, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// ── Lazy-loaded below-the-fold components ──
// These are split into separate chunks and only downloaded
// after the critical Hero section has rendered.
const MarqueeStats = lazy(() => import('./components/MarqueeStats'));
const Carousel = lazy(() => import('./Carousel'));
const CatalogueHighlight = lazy(() => import('./components/CatalogueHighlight'));
const WhyChoose = lazy(() => import('./components/WhyChoose'));
const Manufacturing = lazy(() => import('./components/Manufacturing'));
const ExtraSections = lazy(() => import('./components/ExtraSections'));
const ContactFAQ = lazy(() => import('./components/ContactFAQ'));
const Footer = lazy(() => import('./components/Footer'));
const FloatingWhatsApp = lazy(() => import('./components/FloatingWhatsApp'));

// ── Prefetch all lazy chunks eagerly after initial paint ──
// This prevents jittery scroll: chunks download in background
// immediately, so they're ready before the user scrolls down.
function usePrefetchChunks() {
  useEffect(() => {
    // Wait for the hero to paint, then prefetch everything
    requestAnimationFrame(() => {
      import('./components/MarqueeStats');
      import('./Carousel');
      import('./components/CatalogueHighlight');
      import('./components/WhyChoose');
      import('./components/Manufacturing');
      import('./components/ExtraSections');
      import('./components/ContactFAQ');
      import('./components/Footer');
      import('./components/FloatingWhatsApp');
    });
  }, []);
}

function App() {
  usePrefetchChunks();

  return (
    <div className="bg-surface dark:bg-[#0a0f0c] text-on-surface dark:text-[#f0f5ee] font-body selection:bg-primary-container selection:text-on-primary-container transition-colors duration-300 min-h-screen">
      <Navbar />
      
      <main className="overflow-x-hidden">
        <Hero />
        <Suspense fallback={null}>
          <MarqueeStats />
        
          {/* We will embed the rest of the components incrementally so we don't break the build */}
          <div id="products" className="my-2 md:my-4">
            <Carousel />
          </div>
          <CatalogueHighlight />

          <WhyChoose />
          <Manufacturing />
          <ExtraSections />
          <ContactFAQ />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
        <FloatingWhatsApp />
      </Suspense>
    </div>
  );
}

export default App;