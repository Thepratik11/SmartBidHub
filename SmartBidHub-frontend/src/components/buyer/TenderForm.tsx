import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Loader2, Calendar, IndianRupee, Info } from 'lucide-react';
import api from '../../services/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { toast } from 'sonner';

interface TenderFormData {
  title: string;
  description: string;
  categoryId: string;
  budgetMax: number;
  startDate: string;
  endDate: string;
}

interface Category {
  categoryId: number;
  name: string;
}

const TenderForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const buyerProfileId = localStorage.getItem('profileId');

  // Stable min date for today
  const todayMin = new Date().toISOString().slice(0, 16);

  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors } 
  } = useForm<TenderFormData>({
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      budgetMax: 0,
      startDate: "", // Empty to allow user choice
      endDate: ""    // Empty to allow user choice
    }
  });

  const watchStartDate = watch("startDate");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data);
      } catch (err) {
        toast.error("Could not load categories");
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data: TenderFormData) => {
    if (!buyerProfileId) return toast.error("Session expired. Please login.");
    
    setLoading(true);
    try {
      const payload = {
        ...data,
        buyerProfileId: parseInt(buyerProfileId),
        categoryId: parseInt(data.categoryId),
        budgetMax: Number(data.budgetMax),
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      };

      await api.post('/buyers/tenders', payload);
      toast.success("Tender published successfully!");
      navigate('/buyer/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create tender");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto text-white">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 gap-2 hover:bg-white/10">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Button>

      <div className="bg-muted/20 border border-border p-8 rounded-xl shadow-2xl relative">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary flex items-center gap-2">
            <Calendar className="w-8 h-8" /> Publish New Tender
          </h2>
          <p className="text-muted-foreground">Set your requirements and bidding window.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label>Tender Title</Label>
            <Input 
              {...register('title', { required: "Title is required" })} 
              placeholder="e.g., Laptops" 
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Detailed Description</Label>
            <Textarea 
              {...register('description', { required: "Description is required" })} 
              placeholder="Explain the work scope..." 
              className="h-32 bg-background/50" 
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Category</Label>
              <select 
                {...register('categoryId', { required: "Category is required" })}
                className="w-full bg-background border border-border rounded-md h-10 px-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none"
              >
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.categoryId} value={c.categoryId}>{c.name}</option>)}
              </select>
              {errors.categoryId && <p className="text-xs text-red-500">{errors.categoryId.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-1">Max Budget <IndianRupee className="w-3 h-3" /></Label>
              <Input 
                type="number" 
                {...register('budgetMax', { required: "Budget is required", min: 1 })} 
                placeholder="Enter amount" 
              />
            </div>
          </div>

          {/* Scheduling Block */}
          <div className="p-6 bg-primary/5 rounded-lg border border-primary/20 space-y-6">
            <div className="flex items-center gap-2 text-primary">
              <Info className="w-4 h-4" />
              <h4 className="text-sm font-semibold uppercase tracking-widest">Bidding Timeline</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Bidding Starts On</Label>
                <Input 
                  type="datetime-local" 
                  min={todayMin}
                  onClick={(e) => (e.target as any).showPicker?.()} // Forces picker to open on click
                  {...register('startDate', { required: "Select start date" })} 
                  className="bg-background block w-full appearance-none"
                />
                {errors.startDate && <p className="text-xs text-red-500">{errors.startDate.message}</p>}
              </div>
              
              <div className="space-y-2">
                <Label>Bidding Closes On</Label>
                <Input 
                  type="datetime-local" 
                  min={watchStartDate || todayMin}
                  onClick={(e) => (e.target as any).showPicker?.()} // Forces picker to open on click
                  {...register('endDate', { required: "Select closing date" })} 
                  className="bg-background block w-full appearance-none"
                />
                {errors.endDate && <p className="text-xs text-red-500">{errors.endDate.message}</p>}
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-lg font-bold shadow-lg" 
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Publish Tender"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TenderForm;