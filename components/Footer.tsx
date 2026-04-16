import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#faf9f8] text-deep-navy pt-20 pb-10 px-6 lg:px-16 border-t border-gray-200">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
        
        {/* Brand & Quote Section */}
        <div className="flex flex-col lg:col-span-2">
          <Link href="/" className="flex items-center mb-6">
            <span className="font-heading font-normal text-2xl tracking-[0.2em] text-deep-navy">
              DT&apos;S <span className="font-bold">VACATION</span>
            </span>
          </Link>
          <p className="text-gray-500 font-light leading-relaxed italic mb-8 max-w-md">
            &quot;DT&apos;s Vacation &amp; Travel Limited. Personalized and Professional Travel Service at its Best... You Ask, We Deliver!&quot;
          </p>

          <div className="flex flex-col gap-3 mb-8">
            <a href="tel:8768569812" className="flex items-center gap-3 text-gray-600 hover:text-tropical-gold transition-colors w-fit group">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-tropical-gold/10 transition-colors">
                <svg className="w-4 h-4 text-deep-navy group-hover:text-tropical-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="font-medium tracking-wide">(876) 856-9812</span>
            </a>
            
            <a href="mailto:dtvacationandtravel@gmail.com" className="flex items-center gap-3 text-gray-600 hover:text-tropical-gold transition-colors w-fit group">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-tropical-gold/10 transition-colors">
                <svg className="w-4 h-4 text-deep-navy group-hover:text-tropical-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-medium tracking-wide">dtvacationandtravel@gmail.com</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://www.instagram.com/dtvacationandtravel" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-deep-navy hover:bg-tropical-gold hover:text-white transition-colors duration-300 shadow-sm"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>

            <a 
              href="https://www.facebook.com/profile.php?id=61560585715323" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-deep-navy hover:bg-tropical-gold hover:text-white transition-colors duration-300 shadow-sm"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col lg:col-span-1">
          <h4 className="text-deep-navy font-bold tracking-wider mb-6">Quick Discoveries</h4>
          <ul className="space-y-4">
            <li><Link href="#hotels" className="text-gray-500 hover:text-tropical-gold transition-colors font-medium">Premium Hotels</Link></li>
            <li><Link href="#corporate" className="text-gray-500 hover:text-tropical-gold transition-colors font-medium">Corporate Retreats</Link></li>
            <li><Link href="#weddings" className="text-gray-500 hover:text-tropical-gold transition-colors font-medium">Destination Weddings</Link></li>
            <li><Link href="#cruises" className="text-gray-500 hover:text-tropical-gold transition-colors font-medium">Luxury Cruises</Link></li>
            <li><Link href="#tours" className="text-gray-500 hover:text-tropical-gold transition-colors font-medium">Immersive Tours</Link></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="flex flex-col lg:col-span-1">
          <h4 className="text-deep-navy font-bold tracking-wider mb-4">Stay Inspired</h4>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed font-light">
            Subscribe to our newsletter and be the first to receive exclusive travel offers, special promotions, and luxurious destination inspiration.
          </p>
          <form className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              required
              className="w-full bg-white border border-gray-200 rounded-full px-6 py-3.5 text-deep-navy placeholder-gray-400 focus:outline-none focus:border-tropical-gold focus:ring-1 focus:ring-tropical-gold transition-all shadow-sm"
            />
            <button 
              type="submit"
              className="w-full bg-deep-navy text-white font-bold px-8 py-3.5 rounded-full hover:bg-tropical-gold hover:shadow-lg transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      <div className="max-w-[1600px] mx-auto pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 font-medium tracking-wide">
        <p>© {new Date().getFullYear()} DT&apos;s Vacation &amp; Travel Limited. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="#" className="hover:text-deep-navy transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-deep-navy transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
