import { Shield, FileCheck, Lock, CheckCircle2, Fingerprint, FileText } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Fingerprint,
      title: 'Identity Verification',
      description: 'GST-based authentication and role verification ensure only legitimate entities participate.',
      details: ['Government ID validation', 'GST number verification'],
    },
    {
      icon: Lock,
      title: 'Sealed-Bid Integrity',
      description: 'Cryptographic sealing ensures bids remain confidential until the designated opening time.',
      details: ['AES-256 encryption', 'Tamper-proof storage', 'Time-locked reveals'],
    },
    // {
    //   icon: FileCheck,
    //   title: 'Automated Compliance',
    //   description: 'Real-time validation against procurement regulations and organizational policies.',
    //   details: ['GFR compliance', 'Policy automation', 'Audit trail generation'],
    // },
    {
      icon: CheckCircle2,
      title: 'Transparent Evaluation',
      description: 'Objective scoring mechanisms with complete audit trails for every decision.',
      details: ['Weighted evaluation', 'Dispute resolution'],
    },
    // {
    //   icon: Shield,
    //   title: 'Bank-Grade Security',
    //   description: 'Enterprise security infrastructure protecting sensitive procurement data.',
    //   details: ['ISO 27001 certified', 'Regular penetration tests', '99.99% uptime SLA'],
    // },
    // {
    //   icon: FileText,
    //   title: 'Digital Documentation',
    //   description: 'Complete paperless workflow with legally valid electronic records.',
    //   details: ['E-stamping support', 'Document versioning', 'Cloud archival'],
    // },
  ];

  return (
    <section id="features" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#fb6376]/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm text-[#fb6376] tracking-wide uppercase font-medium">
            Platform Capabilities
          </span>
          <h2 className="font-serif text-5xl font-bold text-white mt-4 mb-6">
            Built for <span className="text-[#fb6376]">Trust</span> & Compliance
          </h2>
          <p className="text-lg text-[#ffdccc]/70 max-w-2xl mx-auto">
            Enterprise-grade procurement infrastructure designed for government and private sector excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-[#5d2a42]/10 to-transparent border border-[#fb6376]/20 rounded-lg p-8 hover:border-[#fb6376]/40 hover:shadow-[0_0_30px_rgba(251,99,118,0.1)] transition-all"
            >
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-[#fb6376]/20 blur-xl group-hover:bg-[#fb6376]/30 transition-all"></div>
                <feature.icon className="w-10 h-10 text-[#fb6376] relative z-10" strokeWidth={1.5} />
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#fb6376] transition-colors">
                {feature.title}
              </h3>
              <p className="text-[#ffdccc]/70 mb-6 leading-relaxed">{feature.description}</p>

              <ul className="space-y-2">
                {feature.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm text-[#ffdccc]/60">
                    <div className="w-1 h-1 bg-[#fb6376] rounded-full mt-2 flex-shrink-0"></div>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#fb6376]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
