import React from 'react';
import { motion } from 'framer-motion';

export default function ContactFAQ() {
  const qas = [
    {
      q: "What is the minimum order quantity (MOQ)?",
      a: "Our minimum order quantity starts from 50 units for most standard bag models. For fully customized designs requiring specific material sourcing or new dye molds, the MOQ typically begins at 200 units."
    },
    {
      q: "Do you offer sampling before bulk orders?",
      a: "Yes. Once the digital mockups and pricing are approved, we create a physical prototype with your exact branding for final sign-off. This sample process takes approximately 5-7 business days."
    },
    {
      q: "Can you accommodate custom designs and specific brand colors?",
      a: "Absolutely. We manage custom branding requests including specific Pantone color matching, 3D rubber logo tags, custom zipper pullers, and full-color sublimation printing. Our design team ensures your precise brand guidelines are met."
    },
    {
      q: "What are your manufacturing timelines?",
      a: "Standard production cycles range from 2 to 3 weeks depending on order volume and the complexity of the design. We also provide expedited manufacturing schedules for urgent corporate events or onboarding launch deadlines."
    },
    {
      q: "Do you supply outside of Bengaluru?",
      a: "Yes, while our manufacturing unit is rooted in Bengaluru, we secure pan-India delivery through trusted logistics partners, ensuring safe and timely deployment directly to your corporate offices or regional distribution centers."
    }
  ];

  return (
    <>
      <section className="max-w-screen-xl mx-auto py-12 md:py-16 px-6 md:px-12 bg-surface dark:bg-[#0a0f0c]" id="faq">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="block text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase font-body text-on-surface-variant dark:text-[#8a9589] mb-4">Clear the Details</span>
          <h2 className="text-4xl md:text-5xl font-headline text-[#1a2a22] dark:text-white mb-6">Frequently Asked Questions</h2>
          <p className="text-base font-body text-[#454e47] dark:text-[#8a9589]">Clear answers on pricing, quality, production, and delivery.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          {qas.map((item, idx) => (
            <details key={idx} className="group bg-surface-container-lowest dark:bg-[#111916] rounded-xl border border-outline-variant/20 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none px-6 py-5 text-[#1a2a22] dark:text-white font-headline text-lg group-open:text-primary dark:group-open:text-[#c5d5bf] group-open:border-b group-open:border-outline-variant/10 dark:group-open:border-white/5 transition-colors">
                <h2>{item.q}</h2>
                <span className="transition group-open:rotate-180 text-primary dark:text-[#c5d5bf] material-symbols-outlined ml-4">expand_more</span>
              </summary>
              <div className="text-[#454e47] dark:text-[#8a9589] font-body text-sm px-6 py-5 leading-relaxed bg-[#faf8f4]/50 dark:bg-[#0a0f0c]/20 rounded-b-xl max-h-0 overflow-hidden group-open:max-h-96 transition-all duration-300 ease-in-out">
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <a href="#contact" className="inline-flex items-center space-x-2 text-sm font-bold tracking-widest uppercase text-primary dark:text-[#c5d5bf] hover:text-[#1a2a22] dark:hover:text-white transition-colors group p-2">
            <span>Still have questions? Talk to our team</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1.5 transition-transform duration-300">east</span>
          </a>
        </motion.div>
      </section>

      <section className="max-w-screen-2xl mx-auto py-10 md:py-12 px-6 md:px-12 bg-[#1a2a22] text-white dark:bg-[#172019] text-center" id="cta-strip">
        <h2 className="text-3xl md:text-5xl font-headline mb-4">Ready to Start Your Next Order?</h2>
        <p className="max-w-2xl mx-auto text-base text-[#8a9589] font-body mb-8">
            Get a custom quote tailored to your quantity, timeline, and branding needs.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <a href="#contact" className="w-full md:w-auto px-8 py-4 bg-white text-[#1a2a22] text-[13px] font-bold tracking-widest uppercase rounded flex items-center justify-center hover:bg-[#c5d5bf] transition-colors">Request Bulk Quote</a>
            <a href="https://wa.me/919353336030?text=Hi%20Safina%20Bags%2C%20I%20am%20interested%20in%20bulk%20bags." target="_blank" rel="noreferrer" className="w-full md:w-auto px-8 py-4 bg-[#25D366] text-white text-[13px] font-bold tracking-widest uppercase rounded flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.327.101.144.447.712.923 1.162.616.582 1.168.761 1.312.833.144.072.23.058.318-.014.086-.072.375-.434.476-.584.101-.152.202-.123.332-.072.13.05.823.388.967.462.144.072.241.116.275.18.034.065.034.376-.11.781zm-3.39-12.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 21.938c-5.485 0-9.938-4.453-9.938-9.938 0-5.485 4.453-9.938 9.938-9.938s9.938 4.453 9.938 9.938-4.453 9.938-9.938 9.938z"/></svg> 
                WhatsApp Us
            </a>
        </div>
      </section>

      <section className="px-6 md:px-12 pt-16 md:pt-24 pb-10 md:pb-12 bg-surface-container-low dark:bg-[#111916] border-t border-outline-variant/10 dark:border-white/5" id="contact">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center h-full lg:py-6"
            >
              <div>
                <span className="block text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase font-body text-on-surface-variant dark:text-[#8a9589] mb-4">Inquiries</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline text-[#1a2a22] dark:text-white leading-tight mb-6 md:mb-8">
                  Let's Build Your<br/> <span className="italic text-primary dark:text-[#c5d5bf] font-headline">Next Order.</span>
                </h2>
                <p className="text-base md:text-lg font-body text-[#454e47] dark:text-[#8a9589] mb-8 md:mb-12 max-w-md leading-relaxed">
                  No commitment required. Tell us what you need, from product categories to custom branding. Our team will immediately define exact pricing structures, material options, and manufacturing timelines for your precise B2B criteria.
                  <br/><br/>
                  <span className="font-bold text-[#1a2a22] dark:text-white flex flex-col gap-3">
                    <span className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[18px] text-primary dark:text-[#c5d5bf]">check_circle</span> 
                      Direct Pricing: Manufacturer rates with no hidden margins.
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[18px] text-primary dark:text-[#c5d5bf]">check_circle</span> 
                      Dedicated Support: An account manager exclusively for your order.
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[18px] text-primary dark:text-[#c5d5bf]">check_circle</span> 
                      Free Mockups: Digital prototypes with corporate branding.
                    </span>
                  </span>
                  <br/>
                  <span className="font-bold text-primary dark:text-white flex items-center gap-2 border-l-2 border-primary dark:border-[#c5d5bf] pl-4 mt-2">
                    We typically respond within 4 business hours
                  </span>
                </p>
              </div>
            </motion.div>

            {/* Web3Forms Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form id="contactForm" action="https://api.web3forms.com/submit" method="POST" className="bg-surface-container-lowest dark:bg-[#172019] p-8 md:p-12 rounded-2xl shadow-sm border border-outline-variant/20 dark:border-white/10 relative">
                <input type="hidden" name="access_key" value="a539b4fa-79d2-406b-a019-96b5d74496b1" />
                <input type="hidden" name="subject" value="New B2B Website Inquiry" />
                <input type="hidden" name="from_name" value="Safina Web Portal" />
                <input type="checkbox" name="botcheck" className="hidden" style={{display: 'none'}} />

                <div className="grid grid-cols-1 gap-6 mb-8">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-[10px] md:text-xs tracking-[0.2em] uppercase font-body text-on-surface-variant dark:text-[#b8c4b3] font-bold">Full Name *</label>
                    <input type="text" id="name" name="name" required className="w-full px-4 py-3 bg-[#faf8f4] dark:bg-[#0e1410] border border-outline-variant/40 dark:border-white/15 rounded-lg focus:outline-none focus:border-[#2c3e2d] dark:focus:border-[#c5d5bf] font-body text-sm text-[#1a2a22] dark:text-white transition-colors placeholder-[#8a9589] dark:placeholder-[#6b756b]" placeholder="Jane Doe" />
                  </div>

                  <div>
                    <label htmlFor="company" className="block mb-2 text-[10px] md:text-xs tracking-[0.2em] uppercase font-body text-on-surface-variant dark:text-[#b8c4b3] font-bold">Company / Organization *</label>
                    <input type="text" id="company" name="company" required className="w-full px-4 py-3 bg-[#faf8f4] dark:bg-[#0e1410] border border-outline-variant/40 dark:border-white/15 rounded-lg focus:outline-none focus:border-[#2c3e2d] dark:focus:border-[#c5d5bf] font-body text-sm text-[#1a2a22] dark:text-white transition-colors placeholder-[#8a9589] dark:placeholder-[#6b756b]" placeholder="TechCorp Ltd" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block mb-2 text-[10px] md:text-xs tracking-[0.2em] uppercase font-body text-on-surface-variant dark:text-[#b8c4b3] font-bold">Email Address *</label>
                      <input type="email" id="email" name="email" required className="w-full px-4 py-3 bg-[#faf8f4] dark:bg-[#0e1410] border border-outline-variant/40 dark:border-white/15 rounded-lg focus:outline-none focus:border-[#2c3e2d] dark:focus:border-[#c5d5bf] font-body text-sm text-[#1a2a22] dark:text-white transition-colors placeholder-[#8a9589] dark:placeholder-[#6b756b]" placeholder="jane@company.com" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block mb-2 text-[10px] md:text-xs tracking-[0.2em] uppercase font-body text-on-surface-variant dark:text-[#b8c4b3] font-bold">Phone / WhatsApp *</label>
                      <input type="tel" id="phone" name="phone" required className="w-full px-4 py-3 bg-[#faf8f4] dark:bg-[#0e1410] border border-outline-variant/40 dark:border-white/15 rounded-lg focus:outline-none focus:border-[#2c3e2d] dark:focus:border-[#c5d5bf] font-body text-sm text-[#1a2a22] dark:text-white transition-colors placeholder-[#8a9589] dark:placeholder-[#6b756b]" placeholder="+91 90000 00000" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="quantity" className="block mb-2 text-[10px] md:text-xs tracking-[0.2em] uppercase font-body text-on-surface-variant dark:text-[#b8c4b3] font-bold">Estimated Quantity</label>
                    <select id="quantity" name="quantity" defaultValue="" className="w-full px-4 py-3 bg-[#faf8f4] dark:bg-[#0e1410] border border-outline-variant/40 dark:border-white/15 rounded-lg focus:outline-none focus:border-[#2c3e2d] dark:focus:border-[#c5d5bf] font-body text-sm text-[#1a2a22] dark:text-white transition-colors">
                      <option value="" disabled>Select quantity range</option>
                      <option value="50-100">50 - 100 units</option>
                      <option value="100-500">100 - 500 units</option>
                      <option value="500-1000">500 - 1,000 units</option>
                      <option value="1000+">1,000+ units</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 text-[10px] md:text-xs tracking-[0.2em] uppercase font-body text-on-surface-variant dark:text-[#b8c4b3] font-bold">Message / Requirements</label>
                    <textarea id="message" name="message" rows="4" className="w-full px-4 py-3 bg-[#faf8f4] dark:bg-[#0e1410] border border-outline-variant/40 dark:border-white/15 rounded-lg focus:outline-none focus:border-[#2c3e2d] dark:focus:border-[#c5d5bf] font-body text-sm resize-none text-[#1a2a22] dark:text-white transition-colors placeholder-[#8a9589] dark:placeholder-[#6b756b]" placeholder="Looking for corporate laptop bags with our company logo embroidered..."></textarea>
                  </div>
                </div>

                <button type="submit" className="w-full px-8 py-4 text-[13px] font-bold tracking-[0.15em] uppercase text-white bg-[#1a2a22] dark:bg-[#c5d5bf] dark:text-[#172019] rounded-lg hover:bg-[#172019] dark:hover:bg-white transition-all duration-300 flex items-center justify-center space-x-3 group shadow-sm">
                  <span>Submit Inquiry</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">east</span>
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}