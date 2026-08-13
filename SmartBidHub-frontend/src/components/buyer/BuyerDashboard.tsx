import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LayoutDashboard, Trash2, LogOut, UserCircle, Settings, Search, X } from 'lucide-react';
import api from '../../services/api'; 
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import BuyerUpdateModal from './BuyerUpdateModal';
import UpdateTenderModal from './UpdateTenderModal'; // Import the new tender update modal

interface Tender {
  tenderId: number;
  title: string;
  categoryName: string;
  buyerOrganization: string; 
  status: string;
  endDate: string;
}

const BuyerDashboard = () => {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // Profile Modal State
  const [isEditTenderModalOpen, setIsEditTenderModalOpen] = useState(false); // Tender Modal State
  const [selectedTenderId, setSelectedTenderId] = useState<number | null>(null); // Selected Tender for Edit
  const [searchTerm, setSearchTerm] = useState(''); // Search State
  
  const navigate = useNavigate();
  const buyerId = localStorage.getItem('profileId');

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate('/login');
  };

  const fetchTenders = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/buyers/${buyerId}/tenders`);
      setTenders(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load tenders.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTender = async (tenderId: number) => {
    if (!window.confirm("Are you sure you want to delete this tender? All associated bids will be lost.")) {
      return;
    }

    try {
      await api.delete(`/buyers/tenders/${tenderId}`);
      toast.success("Tender deleted successfully");
      setTenders(prev => prev.filter(t => t.tenderId !== tenderId));
    } catch (error) {
      toast.error("Failed to delete tender");
    }
  };

  const handleEditTender = (tenderId: number) => {
    setSelectedTenderId(tenderId);
    setIsEditTenderModalOpen(true);
  };

  // Logic: Derived state to filter tenders based on search input
  const filteredTenders = tenders.filter((tender) => {
    const term = searchTerm.toLowerCase();
    return (
      tender.title.toLowerCase().includes(term) ||
      tender.categoryName.toLowerCase().includes(term)
    );
  });

  useEffect(() => {
    if (!buyerId) {
      navigate('/login');
      return;
    }
    fetchTenders();
  }, [buyerId, navigate]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 text-white min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8" /> Buyer Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Manage your published tenders and track bids.</p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => setIsUpdateModalOpen(true)}
            className="border-primary/40 text-primary hover:bg-primary hover:text-white flex gap-2 transition-all"
          >
            <UserCircle className="w-4 h-4" /> Profile Settings
          </Button>

          <Button onClick={() => navigate('/buyer/dashboard/tenderform')} className="gap-2">
            <Plus className="w-4 h-4" /> Add New Tender
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white flex gap-2"
          >
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </div>

      {/* Stats and Search Section */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-end">
        <div className="bg-muted/30 p-6 rounded-xl border border-border w-full md:w-64">
          <div className="text-muted-foreground text-xs uppercase font-bold tracking-widest">Active Tenders</div>
          <div className="text-4xl font-bold mt-2 text-primary">
            {tenders.filter(t => t.status === 'OPEN').length}
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search by tender name or category..."
            className="block w-full pl-10 pr-10 py-2.5 bg-[#1a1a1a] border border-border rounded-xl text-sm placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Tenders Table */}
      <div className="bg-[#121212] border border-border rounded-xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-muted/50 text-muted-foreground text-[10px] uppercase tracking-widest">
            <tr>
              <th className="p-4 font-bold">ID</th>
              <th className="p-4 font-bold">Title</th>
              <th className="p-4 font-bold">Category</th>
              <th className="p-4 font-bold">Organization</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold">Closing Date</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {loading ? (
              <tr><td colSpan={7} className="p-20 text-center text-muted-foreground">Loading tenders...</td></tr>
            ) : filteredTenders.length === 0 ? (
              <tr><td colSpan={7} className="p-20 text-center text-muted-foreground">No tenders found matching your search.</td></tr>
            ) : (
              filteredTenders.map((tender) => (
                <tr key={tender.tenderId} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4 text-xs text-primary font-mono">#{tender.tenderId}</td>
                  <td className="p-4 font-medium">{tender.title}</td>
                  <td className="p-4 text-sm text-muted-foreground">{tender.categoryName}</td>
                  <td className="p-4 text-sm text-muted-foreground">{tender.buyerOrganization}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-tighter ${
                      tender.status === 'OPEN' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {tender.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {new Date(tender.endDate).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right space-x-1">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-xs font-bold"
                      onClick={() => navigate(`/buyer/tender/${tender.tenderId}/bids`)}
                    >
                      View Bids
                    </Button>
                    
                    {/* Tender Edit Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:bg-primary/10"
                      onClick={() => handleEditTender(tender.tenderId)}
                    >
                      <Settings className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteTender(tender.tenderId)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Buyer Profile Update Modal */}
      <BuyerUpdateModal 
        isOpen={isUpdateModalOpen} 
        onClose={() => setIsUpdateModalOpen(false)} 
        buyerId={buyerId} 
      />

      {/* Tender Update Modal */}
      <UpdateTenderModal 
        isOpen={isEditTenderModalOpen}
        onClose={() => setIsEditTenderModalOpen(false)}
        tenderId={selectedTenderId}
        onSuccess={fetchTenders} // Refetch list after update
      />
    </div>
  );
};

export default BuyerDashboard;