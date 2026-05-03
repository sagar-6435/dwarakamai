import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | Dwaraka Mai Digital Studio",
  description: "Terms and conditions for using the services of Dwaraka Mai Digital Studio.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    content: [
      "By accessing our website or placing an order, you agree to be bound by these Terms of Service.",
      "If you do not agree with any part of these terms, please do not use our services.",
      "These terms apply to all visitors, customers, and users of Dwaraka Mai Digital Studio.",
    ],
  },
  {
    title: "Our Services",
    content: [
      "Dwaraka Mai Digital Studio offers photography, videography, event decor, personalized gifting, and printing services.",
      "All services are subject to availability and confirmation at the time of booking.",
      "We reserve the right to modify, suspend, or discontinue any service at any time with prior notice.",
      "Custom orders require advance confirmation and are non-refundable once production begins.",
    ],
  },
  {
    title: "Orders & Payments",
    content: [
      "All prices are listed in Indian Rupees (₹) and include applicable taxes unless stated otherwise.",
      "Orders are confirmed only upon receipt of full or agreed advance payment.",
      "We accept UPI, bank transfers, and major credit/debit cards through secure payment gateways.",
      "We reserve the right to cancel any order and issue a full refund in case of stock unavailability or pricing errors.",
    ],
  },
  {
    title: "Custom Orders & Personalized Products",
    content: [
      "For personalized gifts and custom prints, customers must provide high-resolution images or files.",
      "Dwaraka Mai Digital Studio is not responsible for print quality resulting from low-resolution images provided by the customer.",
      "Custom orders cannot be cancelled once the production process has begun.",
      "Any errors in personalization details provided by the customer are the customer's responsibility.",
    ],
  },
  {
    title: "Event Services",
    content: [
      "Event bookings require a minimum advance deposit (typically 50% of the total package cost).",
      "Cancellations made within 7 days of the event date will forfeit the advance deposit.",
      "Dwaraka Mai Digital Studio is not liable for delays or cancellations due to circumstances beyond our control (force majeure).",
      "Final deliverables (photos, videos, albums) will be provided within the agreed timeframe after the event.",
    ],
  },
  {
    title: "Refunds & Cancellations",
    content: [
      "Standard products can be returned within 3 days of delivery if they are defective or damaged.",
      "Custom and personalized products are non-refundable unless there is a manufacturing defect on our part.",
      "Refunds are processed within 7–10 business days to the original payment method.",
      "Shipping charges are non-refundable unless the return is due to our error.",
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      "All photographs, videos, and creative work produced by Dwaraka Mai Digital Studio remain our intellectual property unless otherwise agreed in writing.",
      "We may use event and product photographs for our portfolio and marketing unless the client requests otherwise in writing.",
      "Customers retain rights to personal use of delivered images; commercial use requires a separate licensing agreement.",
    ],
  },
  {
    title: "Limitation of Liability",
    content: [
      "Dwaraka Mai Digital Studio's liability is limited to the value of the service or product purchased.",
      "We are not liable for any indirect, incidental, or consequential damages arising from the use of our services.",
      "We make no guarantees regarding specific artistic outcomes of photography or decor services.",
    ],
  },
  {
    title: "Governing Law",
    content: [
      "These Terms of Service are governed by the laws of Telangana, India.",
      "Any disputes shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.",
      "We encourage resolving any disputes amicably before seeking legal remedies.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-brand-black flex flex-col pt-24">
      {/* Header */}
      <div className="relative py-16 md:py-24 border-b border-brand-charcoal-light">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/40 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-brand-gold uppercase tracking-[0.2em] text-xs font-semibold mb-4 block">
            Legal
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of <span className="text-brand-gold">Service</span>
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Please read these terms carefully before using our services. By using Dwaraka Mai Digital Studio, you agree to these terms.
          </p>
          <p className="text-gray-500 text-sm mt-4">Last updated: May 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full">
        <div className="space-y-8">
          {sections.map((section, i) => (
            <div key={i} className="glass p-6 md:p-8 rounded-xl border border-brand-charcoal">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-white mb-5 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold text-sm font-bold flex-shrink-0">
                  {i + 1}
                </span>
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.content.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="bg-brand-charcoal rounded-xl p-6 md:p-8 border border-brand-gold/20">
            <h2 className="font-heading text-xl font-bold text-white mb-3">Questions?</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              If you have any questions about these Terms of Service, please reach out to us before making a purchase or booking.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <p className="text-gray-300">📧 <span className="text-brand-gold">hello@dwarakamaistudio.com</span></p>
              <p className="text-gray-300">📱 <span className="text-brand-gold">+91 88975 36435</span></p>
              <p className="text-gray-300">📍 <span className="text-gray-400">Hyderabad, Telangana, India</span></p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
