import React from "react";

export const metadata = {
  title: "Terms of Service | DT's Vacation & Travel Ltd.",
  description: "Terms of Service and booking policies for DT's Vacation & Travel Ltd.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#faf9f8] pt-32 pb-24 selection:bg-tropical-gold/30">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-16">
        
        {/* Header */}
        <div className="mb-16 animate-fade-in-up">
          <p className="text-[11px] font-bold text-tropical-gold tracking-[0.3em] uppercase mb-4">
            Legal & Compliance
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-deep-navy tracking-tight mb-6">
            Terms of Service
          </h1>
          <p className="text-gray-500 font-light text-lg">
            Last Updated: May 2026
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-glass border border-gray-100 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <div className="prose prose-lg prose-gray max-w-none">
            <p className="text-gray-600 font-light leading-relaxed mb-8">
              Welcome to <strong>DT&apos;s Vacation &amp; Travel Ltd.</strong> These Terms of Service (&quot;Terms&quot;) govern your use of our website and the personalized travel planning services we provide. By accessing our website or submitting an inquiry, you agree to be bound by these Terms.
            </p>

            <h2 className="text-2xl font-bold text-deep-navy mb-4 mt-12">1. Our Services</h2>
            <p className="text-gray-600 font-light leading-relaxed mb-8">
              DT&apos;s Vacation &amp; Travel Ltd. acts as a professional travel consultant and intermediary. We assist in researching, planning, and booking hotels, corporate retreats, destination weddings, cruises, and immersive tours. While we facilitate these arrangements, the actual provision of travel services is executed by third-party vendors (airlines, cruise lines, hotels, tour operators).
            </p>

            <h2 className="text-2xl font-bold text-deep-navy mb-4 mt-12">2. User Responsibilities &amp; Accuracy of Information</h2>
            <p className="text-gray-600 font-light leading-relaxed mb-4">
              When submitting an inquiry or finalizing a booking, you agree to provide accurate, current, and complete information. This includes, but is not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 font-light leading-relaxed mb-8 space-y-2">
              <li>Full legal names exactly as they appear on passports or government-issued IDs.</li>
              <li>Accurate contact information (Email, Phone/WhatsApp).</li>
              <li>Correct travel dates, destinations, and the exact number of travelers.</li>
            </ul>
            <p className="text-gray-600 font-light leading-relaxed mb-8">
              DT&apos;s Vacation &amp; Travel Ltd. is not liable for issues, cancellations, or additional fees arising from inaccuracies in the information you provide.
            </p>

            <h2 className="text-2xl font-bold text-deep-navy mb-4 mt-12">3. Third-Party Vendors and International Travel</h2>
            <p className="text-gray-600 font-light leading-relaxed mb-8">
              Bookings are subject to the terms, conditions, and policies of the respective third-party suppliers. We highly recommend reviewing the specific cancellation and refund policies of the airlines, hotels, or cruise lines prior to confirming your booking. Additionally, travelers are solely responsible for ensuring they meet all passport, visa, and health requirements for their specific destinations, including travel across <strong>South America</strong> and the Caribbean.
            </p>

            <h2 className="text-2xl font-bold text-deep-navy mb-4 mt-12">4. Payments, Cancellations, and Refunds</h2>
            <p className="text-gray-600 font-light leading-relaxed mb-8">
              Payment schedules, deposits, and cancellation penalties vary heavily depending on the supplier and the type of package booked. DT&apos;s Vacation &amp; Travel Ltd. will outline these specific policies during the consultation phase. Any professional service fees charged directly by DT&apos;s Vacation &amp; Travel Ltd. for itinerary planning are non-refundable unless otherwise stated in writing. We strongly recommend the purchase of comprehensive travel insurance to protect your investment.
            </p>

            <h2 className="text-2xl font-bold text-deep-navy mb-4 mt-12">5. Limitation of Liability</h2>
            <p className="text-gray-600 font-light leading-relaxed mb-8">
              DT&apos;s Vacation &amp; Travel Ltd. acts solely as a booking agent for travel suppliers. We are not liable for any personal injury, property damage, loss, delay, or inconvenience caused by the acts or omissions of any third-party supplier, or by force majeure events (e.g., severe weather, strikes, governmental actions, or global health emergencies).
            </p>

            <h2 className="text-2xl font-bold text-deep-navy mb-4 mt-12">6. Governing Law and Jurisdiction</h2>
            <p className="text-gray-600 font-light leading-relaxed mb-8">
              These Terms of Service are governed by and construed in accordance with the laws of <strong>Jamaica</strong>. Any disputes arising out of or in connection with these Terms or the services provided by DT&apos;s Vacation &amp; Travel Ltd. shall be subject to the exclusive jurisdiction of the courts of Jamaica. However, we strive to resolve any disagreements amicably and directly with our clients globally.
            </p>

            <h2 className="text-2xl font-bold text-deep-navy mb-4 mt-12">7. Contact Information</h2>
            <p className="text-gray-600 font-light leading-relaxed mb-8">
              For any questions regarding these Terms, please reach out to us:
            </p>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <p className="text-deep-navy font-bold mb-1">DT&apos;s Vacation &amp; Travel Ltd.</p>
              <p className="text-gray-600 font-light mb-1">Email: <a href="mailto:dtvacationandtravel@gmail.com" className="text-tropical-gold hover:underline">dtvacationandtravel@gmail.com</a></p>
              <p className="text-gray-600 font-light mb-1">Phone / WhatsApp: <a href="https://wa.me/18768569812" className="text-tropical-gold hover:underline">+1 (876) 856-9812</a></p>
              <p className="text-gray-600 font-light">Location: Jamaica</p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
