import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import SealedVault from './components/SealedVault';
import TrustSection from './components/TrustSection';
import CallToAction from './components/CallToAction';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import BuyerDashboard from './components/buyer/BuyerDashboard';
import VendorDashboard from './components/vendor/VendorDashboard';
import BrowseTenders from './components/vendor/BrowseTenders';
import AdminDashboard from './components/admin/AdminDashboard';
import TenderForm from './components/buyer/TenderForm';
import TenderBids from './components/buyer/TenderBids';
import { Toaster } from 'sonner';

// Component for the Landing Page 
// Scoped Navigation here so it doesn't appear on Dashboards or Auth pages
const LandingPage = ({ 
  role, 
  onRoleChange 
}: { 
  role: 'buyer' | 'vendor', 
  onRoleChange: (role: 'buyer' | 'vendor') => void 
}) => (
  <>
    <Navigation onRoleChange={onRoleChange} currentRole={role} />
    <Hero role={role} />
    <Features />
    <SealedVault />
    <TrustSection />
    <CallToAction />
  </>
);

function App() {
  const [role, setRole] = useState<'buyer' | 'vendor'>('buyer');

  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
        {/* Navigation removed from here to prevent global visibility */}
        <Toaster position="top-right" richColors />
        <Routes>
          
          {/* Public Routes */}
          <Route 
            path="/" 
            element={<LandingPage role={role} onRoleChange={setRole} />} 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Buyer Specific Routes */}
          <Route element={<ProtectedRoute allowedRoles={['ROLE_BUYER']} />}>
            <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
            <Route path="/buyer/dashboard/tenderform" element={<TenderForm />} />
            <Route path="/buyer/tender/:tenderId/bids" element={<TenderBids />} />
          </Route>

          {/* Vendor Specific Routes */}
          <Route element={<ProtectedRoute allowedRoles={['ROLE_VENDOR']} />}>
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="/vendor/tenders" element={<BrowseTenders />} />
          </Route>

          {/* Admin Specific Routes */}
          <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          {/* Fallback for 404 */}
          <Route path="*" element={<div className="text-white p-20 text-center">Page Not Found</div>} />
        </Routes>

        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;