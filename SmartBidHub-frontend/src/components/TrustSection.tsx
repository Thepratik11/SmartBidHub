import { Building2, GraduationCap, Landmark, Factory } from 'lucide-react';

export default function TrustSection() {
  const partners = [
    { name: 'Ministry of Finance', icon: Landmark },
    { name: 'State Education Board', icon: GraduationCap },
    { name: 'Municipal Corporation', icon: Building2 },
    { name: 'IT Industry', icon: Factory },
    { name: 'Health Services', icon: Building2 },
    { name: 'Transport Authority', icon: Factory },
  ];

  return (
    <section id="partners" className="py-24 bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm text-[#fb6376] tracking-wide uppercase font-medium">
            Trusted Partners
          </span>
          <h2 className="font-serif text-4xl font-bold text-white mt-4 mb-4">
            Powering Procurement for Leading Organizations
          </h2>
          <p className="text-[#ffdccc]/70 max-w-2xl mx-auto">
            Government agencies and enterprises trust BidBridge for transparent, compliant procurement
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-[#5d2a42]/10 to-transparent border border-[#fb6376]/20 rounded-lg p-6 hover:border-[#fb6376]/40 hover:shadow-[0_0_20px_rgba(251,99,118,0.1)] transition-all flex flex-col items-center justify-center text-center h-32"
            >
              <partner.icon className="w-8 h-8 text-[#fb6376]/60 group-hover:text-[#fb6376] transition-colors mb-3" strokeWidth={1.5} />
              <span className="text-xs text-[#ffdccc]/60 group-hover:text-[#ffdccc] transition-colors">
                {partner.name}
              </span>
            </div>
          ))}
        </div>

        {/* <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">98%</div>
            <div className="text-sm text-[#ffdccc]/60">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">₹5,000Cr+</div>
            <div className="text-sm text-[#ffdccc]/60">Annual Procurement Value</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">Zero</div>
            <div className="text-sm text-[#ffdccc]/60">Security Breaches</div>
          </div>
        </div> */}

        {/* <div className="mt-16 bg-gradient-to-br from-[#5d2a42]/20 to-transparent border border-[#fb6376]/30 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">ISO 27001 Certified</h3>
              <p className="text-[#ffdccc]/70">
                Independently audited information security management system
              </p>
            </div>
            <div className="flex space-x-4">
              <div className="bg-[#5d2a42]/50 border border-[#fb6376]/30 rounded-lg px-6 py-3">
                <div className="text-xs text-[#ffdccc]/60 mb-1">Compliance</div>
                <div className="text-sm font-bold text-white">GFR 2017</div>
              </div>
              <div className="bg-[#5d2a42]/50 border border-[#fb6376]/30 rounded-lg px-6 py-3">
                <div className="text-xs text-[#ffdccc]/60 mb-1">Security</div>
                <div className="text-sm font-bold text-white">SOC 2 Type II</div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
