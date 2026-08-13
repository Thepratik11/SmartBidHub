import { Shield, Twitter, Linkedin, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#fb6376]/10 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-8 h-8 text-[#fb6376]" strokeWidth={1.5} />
              <span className="text-2xl font-bold text-white">
                Bid<span className="text-[#fb6376]">Bridge</span>
              </span>
            </div>
            <p className="text-[#ffdccc]/60 text-sm leading-relaxed mb-6">
              Secure procurement bidding platform for government and private enterprises.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="bg-[#5d2a42]/30 p-2 rounded-lg border border-[#fb6376]/20 hover:border-[#fb6376]/40 hover:bg-[#5d2a42]/50 transition-all"
              >
                <Twitter className="w-4 h-4 text-[#ffdccc]/60" />
              </a>
              <a
                href="#"
                className="bg-[#5d2a42]/30 p-2 rounded-lg border border-[#fb6376]/20 hover:border-[#fb6376]/40 hover:bg-[#5d2a42]/50 transition-all"
              >
                <Linkedin className="w-4 h-4 text-[#ffdccc]/60" />
              </a>
              <a
                href="#"
                className="bg-[#5d2a42]/30 p-2 rounded-lg border border-[#fb6376]/20 hover:border-[#fb6376]/40 hover:bg-[#5d2a42]/50 transition-all"
              >
                <Github className="w-4 h-4 text-[#ffdccc]/60" />
              </a>
              <a
                href="#"
                className="bg-[#5d2a42]/30 p-2 rounded-lg border border-[#fb6376]/20 hover:border-[#fb6376]/40 hover:bg-[#5d2a42]/50 transition-all"
              >
                <Mail className="w-4 h-4 text-[#ffdccc]/60" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[#ffdccc]/60 hover:text-[#fb6376] text-sm transition-colors">
                  For Buyers
                </a>
              </li>
              <li>
                <a href="#" className="text-[#ffdccc]/60 hover:text-[#fb6376] text-sm transition-colors">
                  For Vendors
                </a>
              </li>
              <li>
                <a href="#" className="text-[#ffdccc]/60 hover:text-[#fb6376] text-sm transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-[#ffdccc]/60 hover:text-[#fb6376] text-sm transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[#ffdccc]/60 hover:text-[#fb6376] text-sm transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-[#ffdccc]/60 hover:text-[#fb6376] text-sm transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-[#ffdccc]/60 hover:text-[#fb6376] text-sm transition-colors">
                  Compliance Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-[#ffdccc]/60 hover:text-[#fb6376] text-sm transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[#ffdccc]/60 hover:text-[#fb6376] text-sm transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-[#ffdccc]/60 hover:text-[#fb6376] text-sm transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-[#ffdccc]/60 hover:text-[#fb6376] text-sm transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-[#ffdccc]/60 hover:text-[#fb6376] text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#fb6376]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#ffdccc]/50 text-sm">
            © 2024 BidBridge. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-[#ffdccc]/50 hover:text-[#fb6376] text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-[#ffdccc]/50 hover:text-[#fb6376] text-sm transition-colors">
              Privacy
            </a>
            <a href="#" className="text-[#ffdccc]/50 hover:text-[#fb6376] text-sm transition-colors">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
