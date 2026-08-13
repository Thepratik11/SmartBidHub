import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-burgundy via-background to-background" />
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-3">
            {/* <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center"> */}
              {/* <Shield className="w-6 h-6 text-primary" /> */}
            {/* </div> */}
            <span className="text-2xl font-bold text-primary"></span>
          </Link>
          
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              The Future of <span className="text-primary">Ethical</span> Procurement
            </h1>
            <p className="text-muted-foreground text-lg">
              Secure, transparent, and compliant tender management for government and enterprise.
            </p>
            
            <div className="mt-8 grid grid-cols-3 gap-6">
                {/* <div>
                  <div className="text-2xl font-bold text-primary">₹2,400Cr+</div>
                  <div className="text-sm text-muted-foreground">Tenders Processed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">15,000+</div>
                  <div className="text-sm text-muted-foreground">Verified Vendors</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Sealed Security</div>
                </div> */}
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
          </div>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl font-bold text-primary">SmartBidHub</span>
          </Link>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">{title}</h2>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
