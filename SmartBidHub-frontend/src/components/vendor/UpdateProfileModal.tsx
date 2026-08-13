import { useState, useEffect } from 'react';
import { X, Loader2, User, Building, Landmark, MapPin, Mail } from 'lucide-react';
import api from '../../services/api';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

interface UpdateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendorId: string | null;
}

const UpdateProfileModal = ({ isOpen, onClose, vendorId }: UpdateProfileModalProps) => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    gstNumber: '',
    address: ''
  });

  // Prefill data from the flat DTO
  useEffect(() => {
    if (isOpen && vendorId) {
      setFetching(true);
      api.get(`/vendors/${vendorId}`)
        .then((res) => {
          // Mapping directly from the flat DTO structure
          setFormData({
            name: res.data.name || '',
            email: res.data.email || '',
            companyName: res.data.companyName || '',
            gstNumber: res.data.gstNumber || '',
            address: res.data.address || ''
          });
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          toast.error("Failed to load profile data");
        })
        .finally(() => setFetching(false));
    }
  }, [isOpen, vendorId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/vendors/${vendorId}/profile`, formData);
      toast.success("Profile updated successfully!");
      onClose();
    } catch (error: any) {
      // Handle validation errors from backend (@Valid)
      const serverMessage = error.response?.data?.message;
      const validationErrors = error.response?.data;
      
      if (typeof validationErrors === 'object' && !serverMessage) {
        // If backend returns a map of field errors
        const firstError = Object.values(validationErrors)[0] as string;
        toast.error(firstError || "Update failed");
      } else {
        toast.error(serverMessage || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-[#121212] border border-white/10 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div>
            <h2 className="text-xl font-bold text-white">Vendor Profile</h2>
            <p className="text-xs text-muted-foreground">Update your business and contact information</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-white">
            <X className="w-5 h-5"/>
          </button>
        </div>

        {fetching ? (
          <div className="p-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground text-center">Fetching your details...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                  <User className="w-3 h-3"/> Full Name
                </label>
                <input 
                  className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all text-sm"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                  <Mail className="w-3 h-3"/> Email Address
                </label>
                <input 
                  type="email"
                  className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all text-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Company Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                <Building className="w-3 h-3"/> Company Name
              </label>
              <input 
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white focus:border-primary outline-none text-sm"
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                required
              />
            </div>

            {/* GST Number */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                <Landmark className="w-3 h-3"/> GST Number
              </label>
              <input 
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white focus:border-primary outline-none font-mono text-sm"
                value={formData.gstNumber}
                onChange={(e) => setFormData({...formData, gstNumber: e.target.value})}
                placeholder="e.g. 22AAAAA0000A1Z5"
              />
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                <MapPin className="w-3 h-3"/> Business Address
              </label>
              <textarea 
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white focus:border-primary outline-none resize-none h-24 text-sm"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="Enter complete office address..."
              />
            </div>

            <div className="pt-4 flex gap-3">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={onClose} 
                className="flex-1 hover:bg-white/5 border border-transparent hover:border-white/10"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading} 
                className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20"
              >
                {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2"/> : null}
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateProfileModal;