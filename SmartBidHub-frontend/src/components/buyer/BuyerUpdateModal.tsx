import { useState, useEffect } from 'react';
import { X, Loader2, User, Building, Phone, Mail, Briefcase, Search } from 'lucide-react';
import api from '../../services/api';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

interface BuyerUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  buyerId: string | null;
}

const BuyerUpdateModal = ({ isOpen, onClose, buyerId }: BuyerUpdateModalProps) => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organizationName: '',
    department: '',
    organizationType: '',
    contactPhone: ''
  });

  useEffect(() => {
    if (isOpen && buyerId) {
      setFetching(true);
      api.get(`/buyers/${buyerId}`)
        .then((res) => {
          setFormData({
            name: res.data.name || '',
            email: res.data.email || '',
            organizationName: res.data.organizationName || '',
            department: res.data.department || '',
            organizationType: res.data.organizationType || '',
            contactPhone: res.data.contactPhone || ''
          });
        })
        .finally(() => setFetching(false));
    }
  }, [isOpen, buyerId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/buyers/${buyerId}/profile`, formData);
      toast.success("Profile updated successfully");
      onClose();
    } catch (error: any) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-[110] p-4">
      <div className="bg-[#0f0f0f] border border-white/10 w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" /> Profile Settings
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-white"><X className="w-5 h-5"/></button>
        </div>

        {fetching ? (
          <div className="p-20 flex justify-center items-center"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Name</label>
                <input className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-primary/50 text-sm" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Email</label>
                <input className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-primary/50 text-sm" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Organization</label>
              <input className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-primary/50 text-sm" value={formData.organizationName} onChange={(e) => setFormData({...formData, organizationName: e.target.value})} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Department</label>
                <input className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-primary/50 text-sm" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase text-primary">Type</label>
                <select className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-primary/50 text-sm" value={formData.organizationType} onChange={(e) => setFormData({...formData, organizationType: e.target.value})} required>
                  <option value="PRIVATE">Private</option>
                  <option value="GOVERNMENT">Government</option>
                  <option value="NON_PROFIT">Non-Profit</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Phone</label>
              <input className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-primary/50 text-sm font-mono" value={formData.contactPhone} onChange={(e) => setFormData({...formData, contactPhone: e.target.value})} />
            </div>
            <div className="pt-4 flex gap-4">
              <Button type="button" variant="ghost" onClick={onClose} className="flex-1">Cancel</Button>
              <Button type="submit" disabled={loading} className="flex-1 bg-primary text-white font-bold">{loading ? "Saving..." : "Update Profile"}</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BuyerUpdateModal;