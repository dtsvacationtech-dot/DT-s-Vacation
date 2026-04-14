"use client";

export default function Contact() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-deep-navy mb-8">
          Let&apos;s Connect Intentionally
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-deep-navy">Inquiry Form</h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); console.log("Form mock submitted"); alert("Submitted! Check console."); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" className="w-full border border-gray-200 rounded-lg p-3" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full border border-gray-200 rounded-lg p-3" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Interest</label>
                <select className="w-full border border-gray-200 rounded-lg p-3">
                  <option>Plan a Wedding</option>
                  <option>Organize a Retreat</option>
                  <option>Start an Adventure</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-deep-navy text-white font-bold py-4 rounded-lg hover:bg-tropical-gold mt-4 shadow-navy">
                Send Inquiry
              </button>
            </form>
          </div>
          <div className="h-[500px] bg-gray-100 rounded-2xl overflow-hidden relative border border-gray-200">
            {/* Map Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center flex-col text-gray-400">
              <svg className="w-16 h-16 mb-4 text-tropical-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span className="font-heading font-medium">Custom Styled Google Map (Sprint 1 Mock)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
