import React from "react";

export const metadata = {
  title: "Privacy Policy | DT's Vacation & Travel Ltd.",
  description: "Privacy Policy and Data Protection guidelines for DT's Vacation & Travel Ltd.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#faf9f8] pt-32 pb-24 selection:bg-tropical-gold/30">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-16">
        
        {/* Header */}
        <div className="mb-16 animate-fade-in-up">
          <p className="text-[11px] font-bold text-tropical-gold tracking-[0.3em] uppercase mb-4">
            Legal & Compliance
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-deep-navy tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-500 font-light text-lg">
            Last Updated: May 2026
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-glass border border-gray-100 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <div className="prose prose-lg prose-gray max-w-none">
            <p className="text-gray-600 font-light leading-relaxed mb-8">
              At <strong>DT&apos;s Vacation &amp; Travel Ltd.</strong>, we are committed to protecting your personal data and respecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website or engage with our personalized travel services. Our data practices comply with the <strong>Jamaica Data Protection Act (JDPA)</strong> and adhere to international standards to ensure the protection of our clients globally, including those residing in <strong>South America</strong>.
            </p>

            <h2 className="text-2xl font-bold text-deep-navy mb-4 mt-12">1. Information We Collect</h2>
            <p className="text-gray-600 font-light leading-relaxed mb-4">
              To provide you with seamless, personalized travel experiences, we collect specific information when you submit inquiries or booking requests through our platform. The personal data we collect includes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 font-light leading-relaxed mb-8 space-y-2">
              <li><strong>Contact Details:</strong> Full Name, Email Address, and Phone Number (including WhatsApp).</li>
              <li><strong>Travel Preferences:</strong> Desired Destination(s).</li>
              <li><strong>Itinerary Information:</strong> Anticipated Travel Dates.</li>
              <li><strong>Party Details:</strong> Number of Travelers in your group.</li>
            </ul>

            <h2 className="text-2xl font-bold text-deep-navy mb-4 mt-12">2. How We Use Your Information</h2>
            <p className="text-gray-600 font-light leading-relaxed mb-4">
              The information we collect is strictly utilized to facilitate and enhance your travel experience. Specifically, we use your data to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 font-light leading-relaxed mb-8 space-y-2">
              <li>Process your travel inquiries and provide accurate quotations.</li>
              <li>Communicate with you regarding your bookings, itinerary updates, and customer support.</li>
              <li>Personalize our recommendations for hotels, corporate retreats, destination weddings, cruises, and tours based on your destination and party size.</li>
              <li>Improve our website&apos;s functionality and user experience.</li>
            </ul>

            <h2 className="text-2xl font-bold text-deep-navy mb-4 mt-12">3. Data Protection &amp; International Transfers</h2>
            <p className="text-gray-600 font-light leading-relaxed mb-8">
              DT&apos;s Vacation &amp; Travel Ltd. is based in Jamaica. We process and protect your data in accordance with the <strong>Jamaica Data Protection Act (JDPA)</strong>. We recognize that our clients travel from and reside in various regions, including <strong>South America</strong>. We are committed to processing personal data lawfully, fairly, and transparently, employing safeguards that align with global privacy frameworks (such as the LGPD) when transferring data across borders to international hospitality partners (e.g., airlines, hotels, cruise lines) necessary for fulfilling your travel arrangements.
            </p>

            <h2 className="text-2xl font-bold text-deep-navy mb-4 mt-12">4. Data Security</h2>
            <p className="text-gray-600 font-light leading-relaxed mb-8">
              We implement robust, industry-standard technical and organizational security measures to protect your personal information against unauthorized access, loss, alteration, or destruction. While no electronic transmission is entirely secure, we prioritize the confidentiality of your contact and itinerary details at every step.
            </p>

            <h2 className="text-2xl font-bold text-deep-navy mb-4 mt-12">5. Your Privacy Rights</h2>
            <p className="text-gray-600 font-light leading-relaxed mb-4">
              Under applicable data protection laws, including the JDPA, you possess the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 font-light leading-relaxed mb-8 space-y-2">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
              <li><strong>Erasure:</strong> Request the deletion of your personal data when it is no longer necessary for the purposes collected.</li>
              <li><strong>Withdraw Consent:</strong> Opt-out of marketing communications or withdraw consent for data processing at any time.</li>
            </ul>

            <h2 className="text-2xl font-bold text-deep-navy mb-4 mt-12">6. Changes to this Policy</h2>
            <p className="text-gray-600 font-light leading-relaxed mb-8">
              We may update this Privacy Policy periodically to reflect changes in our practices or legal obligations. The "Last Updated" date at the top of this page indicates when revisions were made. We encourage you to review this policy whenever you submit a new travel inquiry.
            </p>

            <h2 className="text-2xl font-bold text-deep-navy mb-4 mt-12">7. Contact Us</h2>
            <p className="text-gray-600 font-light leading-relaxed mb-8">
              If you have any questions, concerns, or requests regarding your privacy or this policy, please contact our Data Protection Officer:
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
