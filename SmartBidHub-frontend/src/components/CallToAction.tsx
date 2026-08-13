import { ArrowRight, Rocket, Search, Mail } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0a0a0a] via-[#1a0d14] to-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#5d2a42]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#fb6376]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Transform Your{' '}
            <span className="bg-gradient-to-r from-[#fb6376] to-[#fcb1a6] bg-clip-text text-transparent">
              Procurement?
            </span>
          </h2>
          <p className="text-lg text-[#ffdccc]/70 max-w-2xl mx-auto">
            Join thousands of organizations using BidBridge for secure, transparent bidding
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          <div className="group relative bg-gradient-to-br from-[#5d2a42]/20 to-transparent border border-[#fb6376]/30 rounded-2xl p-8 hover:border-[#fb6376]/50 hover:shadow-[0_0_40px_rgba(251,99,118,0.2)] transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#fb6376]/10 to-transparent rounded-bl-full"></div>

            <div className="relative z-10">
              <div className="bg-[#fb6376]/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#fb6376]/20 transition-all">
                <Rocket className="w-8 h-8 text-[#fb6376]" />
              </div>

              <h3 className="font-serif text-3xl font-bold text-white mb-3">For Buyers</h3>
              <p className="text-[#ffdccc]/70 mb-6 leading-relaxed">
                Launch secure tenders in minutes. Automate compliance, ensure fairness, and save time.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-2 text-sm text-[#ffdccc]/80">
                  <div className="w-1.5 h-1.5 bg-[#fb6376] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Create tenders with pre-built templates</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-[#ffdccc]/80">
                  <div className="w-1.5 h-1.5 bg-[#fb6376] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Automated vendor verification & scoring</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-[#ffdccc]/80">
                  <div className="w-1.5 h-1.5 bg-[#fb6376] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Complete audit trail for compliance</span>
                </li>
              </ul>

              <button className="group/btn w-full bg-[#fb6376] text-white px-6 py-4 rounded-lg font-medium hover:bg-[#fb6376]/90 transition-all flex items-center justify-center space-x-2">
                <span>Launch a Tender</span>
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-[#5d2a42]/20 to-transparent border border-[#fb6376]/30 rounded-2xl p-8 hover:border-[#fb6376]/50 hover:shadow-[0_0_40px_rgba(251,99,118,0.2)] transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#fcb1a6]/10 to-transparent rounded-bl-full"></div>

            <div className="relative z-10">
              <div className="bg-[#fcb1a6]/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#fcb1a6]/20 transition-all">
                <Search className="w-8 h-8 text-[#fcb1a6]" />
              </div>

              <h3 className="font-serif text-3xl font-bold text-white mb-3">For Vendors</h3>
              <p className="text-[#ffdccc]/70 mb-6 leading-relaxed">
                Access verified opportunities. Submit confidential bids. Grow your business with transparency.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-2 text-sm text-[#ffdccc]/80">
                  <div className="w-1.5 h-1.5 bg-[#fcb1a6] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Browse government & enterprise tenders</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-[#ffdccc]/80">
                  <div className="w-1.5 h-1.5 bg-[#fcb1a6] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Sealed bid protection & privacy</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-[#ffdccc]/80">
                  <div className="w-1.5 h-1.5 bg-[#fcb1a6] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Build verified vendor profile</span>
                </li>
              </ul>

              <button className="group/btn w-full bg-gradient-to-r from-[#fcb1a6] to-[#fb6376] text-white px-6 py-4 rounded-lg font-medium hover:opacity-90 transition-all flex items-center justify-center space-x-2">
                <span>Discover Opportunities</span>
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* <div className="bg-gradient-to-br from-[#5d2a42]/30 to-transparent backdrop-blur-sm border border-[#fb6376]/30 rounded-2xl p-8 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start space-x-4">
              <div className="bg-[#fb6376]/10 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-[#fb6376]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Need Enterprise Solutions?</h3>
                <p className="text-[#ffdccc]/70 text-sm">
                  Custom integrations, dedicated support, and white-label options available
                </p>
              </div>
            </div>
            <button className="px-8 py-3 bg-transparent border border-[#fb6376] text-[#fb6376] rounded-lg font-medium hover:bg-[#fb6376]/10 transition-all whitespace-nowrap">
              Contact Sales
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
}
