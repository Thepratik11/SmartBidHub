import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Gavel, FileText, LayoutDashboard, LogOut, 
  ShieldCheck, Search, X, Activity, CheckCircle2,
  Clock
} from 'lucide-react';
import api from '../../services/api'; 
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

// --- Interfaces ---
interface UserData {
  userId: number;
  name: string;
  email: string;
  role: string;
}

interface AdminTender {
  tenderId: number;
  title: string;
  categoryName?: string;
  buyerOrganization?: string;
  status: string;
  endDate: string;
}

interface AdminBid {
  bidId: number;
  bidAmount: number;
  status: string;
  submittedAt: string;
  tender?: { title: string };
  vendorProfile?: { 
    companyName: string; 
    user?: { name: string } 
  };
}

interface PendingVendor {
  vendorProfileId: number;
  companyName: string;
  gstNumber: string;
  address: string;
  approvalStatus: string;
  user: {
    name: string;
    email: string;
  };
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] =
  useState<'users' | 'tenders' | 'bids' | 'vendors'>('users');
  const [users, setUsers] = useState<UserData[]>([]);
  const [tenders, setTenders] = useState<AdminTender[]>([]);
  const [bids, setBids] = useState<AdminBid[]>([]);
  const [pendingVendors, setPendingVendors] = useState<PendingVendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Admin logged out");
    navigate('/login');
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'users') {
        const res = await api.get('/admin/users');
        setUsers(res.data);
      } else if (activeTab === 'tenders') {
        const res = await api.get('/admin/tenders');
        setTenders(res.data);
      } else if (activeTab === 'vendors') {

        const res = await api.get('/admin/vendors/pending');

        setPendingVendors(res.data);
      }else {
        const res = await api.get('/admin/bids');
        setBids(res.data);
      }
    } catch (error) {
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // --- Force Date Manipulation Logic for Demo ---
  const handleManipulateDate = async (tenderId: number) => {
    if (!window.confirm("Demo Mode: Change end date to 2026-01-01 for testing?")) return;
    try {
      // Points to the new endpoint that only changes the date
      await api.patch(`/admin/tenders/${tenderId}/manipulate-date`);
      toast.success("Date updated to Jan 1, 2026! Check the Buyer Dashboard.");
      fetchData(); 
    } catch (error) {
      toast.error("Failed to manipulate tender date");
    }
  };

  const handleApproveVendor = async (vendorId: number) => {

  try {

    await api.put(`/admin/vendors/${vendorId}/approve`);

    toast.success("Vendor Approved Successfully");

    fetchData();

  } catch (error) {

    toast.error("Failed to approve vendor");

  }

};

const handleRejectVendor = async (vendorId: number) => {

  try {

    await api.put(`/admin/vendors/${vendorId}/reject`);

    toast.success("Vendor Rejected");

    fetchData();

  } catch (error) {

    toast.error("Failed to reject vendor");

  }

};

  // --- Safe Filtering Logic ---
  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTenders = tenders.filter(t => 
    t.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.buyerOrganization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBids = bids.filter(b => {
    const term = searchTerm.toLowerCase();
    const tenderTitle = b.tender?.title?.toLowerCase() || "";
    const vendor = b.vendorProfile?.companyName?.toLowerCase() || b.vendorProfile?.user?.name?.toLowerCase() || "";
    return tenderTitle.includes(term) || vendor.includes(term);
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 text-white min-h-screen">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-[#1a1a1a] p-6 rounded-[2rem] border border-white/5 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-3 rounded-2xl text-primary">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground text-xs uppercase font-bold tracking-widest">Platform Moderator</p>
          </div>
        </div>
        <Button variant="ghost" onClick={handleLogout} className="text-red-400 hover:bg-red-500/10 gap-2">
          <LogOut className="w-4 h-4" /> Logout
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
          <Activity className="text-primary w-5 h-5 mb-2" />
          <p className="text-muted-foreground text-[10px] uppercase font-bold">Total Tenders</p>
          <p className="text-3xl font-black">{tenders.length}</p>
        </div>
        <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
          <Users className="text-blue-400 w-5 h-5 mb-2" />
          <p className="text-muted-foreground text-[10px] uppercase font-bold">System Users</p>
          <p className="text-3xl font-black">{users.length}</p>
        </div>
        <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
          <CheckCircle2 className="text-green-400 w-5 h-5 mb-2" />
          <p className="text-muted-foreground text-[10px] uppercase font-bold">Global Bids</p>
          <p className="text-3xl font-black">{bids.length}</p>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/10 pb-4">
        <div className="flex gap-2">
          {[
            { id: 'users', label: 'Users', icon: Users },
            { id: 'tenders', label: 'Tenders', icon: FileText },
            { id: 'bids', label: 'Bids', icon: Gavel },
            { id: 'vendors', label: 'Pending Vendors', icon: Clock },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setSearchTerm(''); }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === tab.id ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            className="w-full bg-[#1a1a1a] border border-white/10 pl-10 pr-4 py-2.5 rounded-2xl text-sm outline-none focus:border-primary/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[#121212] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/5 text-muted-foreground text-[10px] uppercase font-bold tracking-widest">
            {activeTab === 'users' && (
              <tr>
                <th className="p-5">UID</th>
                <th className="p-5">Name</th>
                <th className="p-5">Email</th>
                <th className="p-5 text-right">Role</th>
              </tr>
            )}
            {activeTab === 'tenders' && (
              <tr>
                <th className="p-5">ID</th>
                <th className="p-5">Title</th>
                <th className="p-5">Buyer Organization</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-right">Demo Action</th>
              </tr>
            )}
            {activeTab === 'bids' && (
              <tr>
                <th className="p-5">BID ID</th>
                <th className="p-5">Tender Title</th>
                <th className="p-5">Vendor</th>
                <th className="p-5">Amount</th>
                <th className="p-5 text-right">Status</th>
              </tr>
            )}
            {activeTab === 'vendors' && (
              <tr>
                <th className="p-5">ID</th>
                <th className="p-5">Company</th>
                <th className="p-5">Owner</th>
                <th className="p-5">Email</th>
                <th className="p-5 text-right">Action</th>
              </tr>
            )}
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan={5} className="p-20 text-center text-muted-foreground animate-pulse">Fetching system data...</td></tr>
            ) : (
              <>
                {activeTab === 'users' && filteredUsers.map(user => (
                  <tr key={user.userId} className="hover:bg-white/5 transition-colors">
                    <td className="p-5 font-mono text-xs text-primary">#{user.userId}</td>
                    <td className="p-5 font-bold text-sm">{user.name}</td>
                    <td className="p-5 text-sm text-muted-foreground">{user.email}</td>
                    <td className="p-5 text-right">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))}

                {activeTab === 'tenders' && filteredTenders.map(tender => (
                  <tr key={tender.tenderId} className="hover:bg-white/5 transition-colors">
                    <td className="p-5 font-mono text-xs text-primary">#{tender.tenderId}</td>
                    <td className="p-5 font-bold text-sm">{tender.title}</td>
                    <td className="p-5 text-sm text-muted-foreground">{tender.buyerOrganization || "N/A"}</td>
                    <td className="p-5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black ${tender.status === 'OPEN' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {tender.status}
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <Button 
                        onClick={() => handleManipulateDate(tender.tenderId)}
                        className="bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white text-[10px] h-7 px-3 border border-amber-500/20 gap-1"
                      >
                        <Clock className="w-3 h-3" /> Force Date to Pre-Start
                      </Button>
                    </td>
                  </tr>
                ))}

                {activeTab === 'bids' && filteredBids.map(bid => (
                  <tr key={bid.bidId} className="hover:bg-white/5 transition-colors">
                    <td className="p-5 font-mono text-xs text-primary">#{bid.bidId}</td>
                    <td className="p-5 font-bold text-sm">{bid.tender?.title || "N/A"}</td>
                    <td className="p-5 text-sm text-muted-foreground">
                      {bid.vendorProfile?.companyName || bid.vendorProfile?.user?.name || "N/A"}
                    </td>
                    <td className="p-5 font-bold text-sm text-primary">₹{bid.bidAmount?.toLocaleString()}</td>
                    <td className="p-5 text-right">
                      <span className="text-[10px] font-black bg-white/5 px-2 py-1 rounded border border-white/10">
                        {bid.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {activeTab === 'vendors' && pendingVendors.map((vendor) => (
                  <tr
                    key={vendor.vendorProfileId}
                    className="hover:bg-white/5 transition-colors"
                  >
                <td className="p-5 font-mono text-xs text-primary">
                  #{vendor.vendorProfileId}
                </td>

                <td className="p-5 font-bold text-sm">
                  {vendor.companyName}
                </td>

                <td className="p-5">
                  {vendor.user.name}
                </td>

                <td className="p-5 text-muted-foreground">
                  {vendor.user.email}
                </td>

                <td className="p-5 text-right">

                  <div className="flex justify-end gap-2">

                    <Button
                      onClick={() => handleApproveVendor(vendor.vendorProfileId)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Approve
                    </Button>

                    <Button
                      onClick={() => handleRejectVendor(vendor.vendorProfileId)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Reject
                    </Button>

                  </div>

                </td>

                </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;