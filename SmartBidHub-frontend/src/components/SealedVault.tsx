import { Lock, Eye, EyeOff, Clock, Shield } from 'lucide-react';

export default function SealedVault() {
  return (
    <section id="security" className="py-24 bg-gradient-to-b from-[#1a0d14] to-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5d2a42]/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm text-[#fb6376] tracking-wide uppercase font-medium">
            Sealed Bid Technology
          </span>
          <h2 className="font-serif text-5xl font-bold text-white mt-4 mb-6">
            The <span className="text-[#fb6376]">Vault</span> Protocol
          </h2>
          <p className="text-lg text-[#ffdccc]/70 max-w-2xl mx-auto">
            Military-grade encryption ensures complete bid confidentiality until the exact moment of reveal
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-[#5d2a42]/20 backdrop-blur-md border border-[#fb6376]/30 rounded-lg p-6 hover:border-[#fb6376]/50 transition-all group">
              <div className="flex items-start space-x-4">
                <div className="bg-[#fb6376]/10 p-3 rounded-lg group-hover:bg-[#fb6376]/20 transition-all">
                  <Lock className="w-6 h-6 text-[#fb6376]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">Cryptographic Sealing</h3>
                  <p className="text-[#ffdccc]/70 text-sm leading-relaxed">
                    Each bid is encrypted with AES-256 and stored in isolated containers. Not even system
                    administrators can access sealed bids before the deadline.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#5d2a42]/20 backdrop-blur-md border border-[#fb6376]/30 rounded-lg p-6 hover:border-[#fb6376]/50 transition-all group">
              <div className="flex items-start space-x-4">
                <div className="bg-[#fb6376]/10 p-3 rounded-lg group-hover:bg-[#fb6376]/20 transition-all">
                  <Clock className="w-6 h-6 text-[#fb6376]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">Time-Locked Opening</h3>
                  <p className="text-[#ffdccc]/70 text-sm leading-relaxed">
                    Automated reveal mechanism triggered only at the specified deadline. Blockchain-verified
                    timestamps ensure no tampering.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#5d2a42]/20 backdrop-blur-md border border-[#fb6376]/30 rounded-lg p-6 hover:border-[#fb6376]/50 transition-all group">
              <div className="flex items-start space-x-4">
                <div className="bg-[#fb6376]/10 p-3 rounded-lg group-hover:bg-[#fb6376]/20 transition-all">
                  <Shield className="w-6 h-6 text-[#fb6376]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">Immutable Audit Trail</h3>
                  <p className="text-[#ffdccc]/70 text-sm leading-relaxed">
                    Every action is logged with cryptographic proof. Complete transparency for regulators,
                    complete confidentiality for bidders.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-[#5d2a42]/30 to-transparent backdrop-blur-xl border border-[#fb6376]/40 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#fb6376]/5 to-transparent"></div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-[#fb6376] rounded-full animate-pulse"></div>
                    <span className="text-sm text-[#ffdccc]/80">Sealed Bids: 24</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-[#ffdccc]/60">
                    <Clock className="w-4 h-4" />
                    <span>Opens in 2d 14h</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="bg-[#0a0a0a]/60 border border-[#fb6376]/20 rounded-lg p-4 flex items-center justify-between hover:border-[#fb6376]/40 transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-[#5d2a42]/50 p-2 rounded">
                          <EyeOff className="w-4 h-4 text-[#fb6376]" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">Bid #{i.toString().padStart(3, '0')}</div>
                          <div className="text-xs text-[#ffdccc]/50">Encrypted</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Lock className="w-4 h-4 text-[#fb6376]/60" />
                        <span className="text-xs text-[#ffdccc]/40 font-mono">
                          {Array(8)
                            .fill(0)
                            .map(() => '•')
                            .join('')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-[#fb6376]/10 to-transparent border-l-2 border-[#fb6376] rounded p-4 mt-6">
                  <div className="flex items-start space-x-3">
                    <Eye className="w-5 h-5 text-[#fb6376] mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-white mb-1">Automated Reveal</div>
                      <div className="text-xs text-[#ffdccc]/70 leading-relaxed">
                        All bids will be automatically decrypted and revealed simultaneously at the deadline
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#fb6376]/10 rounded-full blur-2xl"></div>
            </div>

            <div className="absolute -top-6 -right-6 bg-[#5d2a42]/40 backdrop-blur-md border border-[#fb6376]/40 rounded-lg px-4 py-2">
              <div className="text-xs text-[#ffdccc]/60">AES-256 Encrypted</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
