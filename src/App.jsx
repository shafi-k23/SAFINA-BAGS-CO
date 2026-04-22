import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeStats from './components/MarqueeStats';
import Carousel from './Carousel'; 
import WhyChoose from './components/WhyChoose';
import Manufacturing from './components/Manufacturing';
import ExtraSections from './components/ExtraSections';
import ContactFAQ from './components/ContactFAQ';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// Import framer-motion if needed here, but its primarily used in child components

function App() {
  return (
    <div className="bg-surface dark:bg-[#0a0f0c] text-on-surface dark:text-[#f0f5ee] font-body selection:bg-primary-container selection:text-on-primary-container transition-colors duration-300 min-h-screen">
      <Navbar />
      
      <main className="overflow-x-hidden">
        <Hero />
        <MarqueeStats />
        
        {/* We will embed the rest of the components incrementally so we don't break the build */}
        <div id="products" className="my-2 md:my-4">
          <Carousel />
        </div>

        <WhyChoose />
        <Manufacturing />
        <ExtraSections />
        <ContactFAQ />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;