import { ArrowRight, Shield, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroProps {
  role: 'buyer' | 'vendor';
}

export default function Hero({ role }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#1a0d14] to-[#0a0a0a]">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#5d2a42]/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#fb6376]/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-[#5d2a42]/20 border border-[#fb6376]/30 rounded-full px-4 py-2">
              <Shield className="w-4 h-4 text-[#fb6376]" />
              <span className="text-xs text-[#ffdccc] tracking-wide">SECURE PROCUREMENT PLATFORM</span>
            </div>

            <h1 className="font-serif text-6xl lg:text-7xl font-bold leading-[0.95] text-white">
              The Future of{' '}
              <span className="block mt-2 bg-gradient-to-r from-[#fb6376] to-[#fcb1a6] bg-clip-text text-transparent">
                Ethical
              </span>{' '}
              Procurement
            </h1>

            <Link to='/login'>
            <p className="text-xl text-[#ffdccc]/70 leading-relaxed max-w-lg">
              {role === 'buyer'
                ? 'Launch secure tenders. Sealed bids, verified vendors, transparent outcomes.'
                : 'Discover verified opportunities. Submit sealed bids with confidence. Build your reputation.'}
            </p>
            </Link>

            <div className="flex items-center space-x-4 pt-4">
              <button className="group relative px-8 py-4 bg-[#fb6376] text-white rounded-md font-medium hover:bg-[#fb6376]/90 transition-all flex items-center space-x-2">
                <span>{role === 'buyer' ? 'Launch a Tender' : 'Discover Opportunities'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-transparent border border-[#ffdccc]/20 text-[#ffdccc] rounded-md font-medium hover:border-[#ffdccc]/40 hover:bg-[#ffdccc]/5 transition-all">
                Learn More
              </button>
            </div>

            {/* <div className="flex items-center space-x-8 pt-8 border-t border-[#fb6376]/10">
              <div>
                <div className="text-3xl font-bold text-white">₹2,400Cr+</div>
                <div className="text-sm text-[#ffdccc]/60">Tenders Processed</div>
              </div>
              <div className="h-12 w-px bg-[#fb6376]/20"></div>
              <div>
                <div className="text-3xl font-bold text-white">15,000+</div>
                <div className="text-sm text-[#ffdccc]/60">Verified Vendors</div>
              </div>
              <div className="h-12 w-px bg-[#fb6376]/20"></div>
              <div>
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm text-[#ffdccc]/60">Sealed Security</div>
              </div>
            </div> */}
          </div>

          <div className="relative lg:block hidden">
            <div className="relative">
              <svg
                viewBox="0 0 500 500"
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fb6376" />
                    <stop offset="100%" stopColor="#fcb1a6" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <path
                  d="M 50 250 Q 250 100 450 250"
                  stroke="url(#bridgeGradient)"
                  strokeWidth="3"
                  fill="none"
                  filter="url(#glow)"
                  className="animate-pulse"
                  style={{ animationDuration: '3s' }}
                />

                <line
                  x1="50"
                  y1="250"
                  x2="50"
                  y2="350"
                  stroke="#fb6376"
                  strokeWidth="2"
                  opacity="0.6"
                />
                <line
                  x1="450"
                  y1="250"
                  x2="450"
                  y2="350"
                  stroke="#fb6376"
                  strokeWidth="2"
                  opacity="0.6"
                />

                <circle cx="50" cy="250" r="8" fill="#fb6376" filter="url(#glow)" />
                <circle cx="450" cy="250" r="8" fill="#fb6376" filter="url(#glow)" />

                <g transform="translate(120, 140)">
                  <rect
                    x="0"
                    y="0"
                    width="80"
                    height="60"
                    rx="4"
                    fill="#5d2a42"
                    opacity="0.3"
                    stroke="#fb6376"
                    strokeWidth="1"
                  />
                  <Lock className="text-[#fb6376]" x="30" y="20" width="20" height="20" />
                </g>

                <g transform="translate(300, 140)">
                  <rect
                    x="0"
                    y="0"
                    width="80"
                    height="60"
                    rx="4"
                    fill="#5d2a42"
                    opacity="0.3"
                    stroke="#fb6376"
                    strokeWidth="1"
                  />
                  <Shield className="text-[#fb6376]" x="30" y="20" width="20" height="20" />
                </g>

                <path
                  d="M 100 280 L 400 280"
                  stroke="#ffdccc"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  opacity="0.3"
                />

                <text x="250" y="320" textAnchor="middle" fill="#ffdccc" fontSize="12" opacity="0.6">
                  Secure Bridge Protocol
                </text>
              </svg>

              <div className="absolute top-1/4 -right-12 bg-[#5d2a42]/40 backdrop-blur-md border border-[#fb6376]/30 rounded-lg p-4 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-[#fb6376] rounded-full animate-pulse"></div>
                  <span className="text-xs text-[#ffdccc]/80">Active Bid</span>
                </div>
                <div className="text-sm font-medium">₹45.2L</div>
                <div className="text-xs text-[#ffdccc]/60">Networking Cables</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#fb6376]/50 to-transparent"></div>
    </section>
  );
}
