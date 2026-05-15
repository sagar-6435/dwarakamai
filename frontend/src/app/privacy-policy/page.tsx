import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Dwaraka Mai Digital Studio",
  description: "Privacy Policy for Dwaraka Mai Digital Studio — how we collect, use, and protect your personal information.",
};

const sections = [
  {
    title: "Information We Collect",
    content: [
      "Personal information you provide when placing orders (name, phone number, email address, delivery address).",
      "Payment details processed securely through our payment partners — we do not store card information.",
      "Photos and media files you share with us for custom printing, gifting, or event purposes.",
      "Inquiry and booking details submitted through our contact form or WhatsApp.",
      "Device and usage data collected automatically when you visit our website (browser type, pages visited, time spent).",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "To process and fulfill your orders, custom print requests, and event bookings.",
      "To communicate with you about your orders, inquiries, and bookings.",
      "To send promotional offers, new arrivals, and seasonal deals — only with your consent.",
      "To improve our website, services, and product offerings based on feedback and usage patterns.",
      "To comply with legal obligations and resolve any disputes.",
    ],
  },
  {
    title: "Sharing of Information",
    content: [
      "We do not sell, trade, or rent your personal information to third parties.",
      "We may share information with delivery partners solely to fulfill your order.",
      "Payment processors receive only the information required to complete transactions.",
      "We may disclose information when required by law or to protect our rights.",
    ],
  },
  {
    title: "Data Security",
    content: [
      "We use industry-standard security measures to protect your data.",
      "All sensitive data is encrypted during transmission using SSL/TLS.",
      "Access to personal information is restricted to authorized personnel only.",
      "We regularly review and update our security practices.",
    ],
  },
  {
    title: "Cookies",
    content: [
      "We use cookies to enhance your browsing experience and remember your preferences.",
      "You can disable cookies through your browser settings, though some features may be affected.",
      "We use analytics cookies to understand how visitors use our website.",
    ],
  },
  {
    title: "Your Rights",
    content: [
      "You have the right to access, correct, or delete your personal information.",
      "You may opt out of marketing communications at any time.",
      "You can request a copy of the data we hold about you.",
      "To exercise any of these rights, contact us at hello@dwarakamaistudio.com.",
    ],
  },
  {
    title: "Changes to This Policy",
    content: [
      "We may update this Privacy Policy periodically to reflect changes in our practices.",
      "We will notify you of significant changes via email or a notice on our website.",
      "Continued use of our services after changes constitutes acceptance of the updated policy.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-brand-white flex flex-col">
      {/* Header */}
      <div className="relative py-16 md:py-24 border-b border-brand-gray-light">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-gray/40 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-brand-orange uppercase tracking-[0.2em] text-xs font-semibold mb-4 block">
            Legal
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
            Privacy <span className="text-brand-orange">Policy</span>
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Your privacy is important to us. This policy explains how Dwaraka Mai Digital Studio collects, uses, and protects your personal information.
          </p>
          <p className="text-gray-500 text-sm mt-4">Last updated: May 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full">
        <div className="space-y-10">
          {sections.map((section, i) => (
            <div key={i} className="glass p-6 md:p-8 rounded-xl border border-brand-gray">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-black mb-5 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange text-sm font-bold flex-shrink-0">
                  {i + 1}
                </span>
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.content.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="bg-brand-gray rounded-xl p-6 md:p-8 border border-brand-orange/20">
            <h2 className="font-heading text-xl font-bold text-black mb-3">Contact Us</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              If you have any questions about this Privacy Policy or how we handle your data, please contact us:
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <p className="text-gray-700">📧 <span className="text-brand-orange">hello@dwarakamaistudio.com</span></p>
              <p className="text-gray-700">📱 <span className="text-brand-orange">+91 88975 36435</span></p>
              <p className="text-gray-700">📍 <span className="text-gray-600">Hyderabad, Telangana, India</span></p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
