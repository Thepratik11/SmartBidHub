import { Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface NavigationProps {
  onRoleChange: (role: 'buyer' | 'vendor') => void;
  currentRole: 'buyer' | 'vendor';
}

export default function Navigation({ onRoleChange, currentRole }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#fb6376]/10'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to='/'>
            <div className="flex items-center space-x-3">
            <div className="relative">
              <Shield className="w-8 h-8 text-[#fb6376]" strokeWidth={1.5} />
              <div className="absolute inset-0 bg-[#fb6376]/20 blur-xl"></div>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              Smart<span className="text-[#fb6376]">BidHub</span>
            </span>
          </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm text-[#ffdccc]/80 hover:text-white transition-colors">
              Features
            </a>
            <a href="#security" className="text-sm text-[#ffdccc]/80 hover:text-white transition-colors">
              Security
            </a>
            <a href="#partners" className="text-sm text-[#ffdccc]/80 hover:text-white transition-colors">
              Partners
            </a>
            <div className="h-6 w-px bg-[#fb6376]/20"></div>
            <div className="flex items-center bg-[#5d2a42]/30 rounded-full p-1 border border-[#fb6376]/20">
              <button
                onClick={() => onRoleChange('buyer')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${currentRole === 'buyer'
                    ? 'bg-[#fb6376] text-white'
                    : 'text-[#ffdccc]/60 hover:text-white'
                  }`}
              >
                Buyer
              </button>
              <button
                onClick={() => onRoleChange('vendor')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${currentRole === 'vendor'
                    ? 'bg-[#fb6376] text-white'
                    : 'text-[#ffdccc]/60 hover:text-white'
                  }`}
              >
                Vendor
              </button>
            </div>
          </div>

          <Link to="/login">
            <button className="relative px-6 py-2.5 bg-transparent border border-[#fb6376] text-[#fb6376] rounded-md text-sm font-medium hover:bg-[#fb6376]/10 transition-all group overflow-hidden">
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-[#fb6376]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 shadow-[0_0_15px_rgba(251,99,118,0)] group-hover:shadow-[0_0_15px_rgba(251,99,118,0.3)] transition-shadow"></div>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
