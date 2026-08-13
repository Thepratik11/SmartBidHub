import { useState, useEffect } from 'react';
import { X, Loader2, Edit3, Calendar, Tag } from 'lucide-react';
import api from '../../services/api';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

interface UpdateTenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenderId: number | null;
  onSuccess: () => void;
}

const UpdateTenderModal = ({ isOpen, onClose, tenderId, onSuccess }: UpdateTenderModalProps) => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [categories, setCategories] = useState<{ categoryId: number; name: string }[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    endDate: '',
  });

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    if (isOpen && tenderId) {
      setFetching(true);
      api.get(`/buyers/tenders/${tenderId}`)
        .then((res) => {
          setFormData({
            title: res.data.title || '',
            categoryId: res.data.categoryId?.toString() || '',
            endDate: res.data.endDate ? res.data.endDate.split('.')[0] : '',
          });
        })
        .finally(() => setFetching(false));
    }
  }, [isOpen, tenderId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/buyers/tenders/${tenderId}`, formData);
      toast.success("Tender updated successfully!");
      onSuccess();
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
      <div className="bg-[#0f0f0f] border border-white/10 w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <h2 className="text-xl font-bold text-white flex items-center gap-2"><Edit3 className="w-5 h-5 text-primary" /> Edit Tender</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-white"><X className="w-5 h-5"/></button>
        </div>

        {fetching ? (
          <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Tender Title</label>
              <input className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-primary/50 text-sm" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-2"><Tag className="w-3 h-3 text-primary"/> Category</label>
              <select className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-primary/50 text-sm" value={formData.categoryId} onChange={(e) => setFormData({...formData, categoryId: e.target.value})} required>
                {categories.map(cat => <option key={cat.categoryId} value={cat.categoryId}>{cat.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-2"><Calendar className="w-3 h-3 text-primary"/> Deadline</label>
              <input type="datetime-local" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-primary/50 text-sm font-mono" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} required />
            </div>
            <div className="pt-4 flex gap-4">
              <Button type="button" variant="ghost" onClick={onClose} className="flex-1">Cancel</Button>
              <Button type="submit" disabled={loading} className="flex-1 bg-primary text-white font-bold">{loading ? "Updating..." : "Save Changes"}</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateTenderModal;