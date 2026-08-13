import { useForm } from 'react-hook-form';
import api from '../../services/api';
import { toast } from 'sonner';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { X, AlertCircle, ShieldAlert } from 'lucide-react';

interface BidModalProps {
  tender: {
    tenderId: number;
    title: string;
    budgetMax: number;
  };
  isOpen: boolean;
  onClose: () => void;
}

interface BidFormData {
  bidAmount: number;
  proposalDocument: string;
}

const BidModal = ({ tender, isOpen, onClose }: BidModalProps) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<BidFormData>();

//   const onSubmit = async (data: BidFormData) => {
//     try {
//       const vendorId = localStorage.getItem('profileId');
      
//       const payload = {
//         tenderId: tender.tenderId,
//         vendorProfileId: parseInt(vendorId || '0'),
//         bidAmount: parseFloat(data.bidAmount.toString()),
//         proposalDocument: data.proposalDocument,
//         status: 'SUBMITTED'
//       };

//       await api.post('/bids', payload);
      
//       toast.success("Success!", {
//         description: "Your bid has been submitted successfully."
//       });
//       reset();
//       onClose();
//     } catch (error: any) {
//       // --- SERVER ERROR EXTRACTION ---
//       const serverErrorMessage = error.response?.data?.message;
//       const status = error.response?.status;

//       if (status === 400 && serverErrorMessage) {
//         // This specifically catches your "Tender is closed for bidding" message
//         toast.error("Bidding Denied", {
//           description: serverErrorMessage,
//           icon: <ShieldAlert className="w-5 h-5 text-red-500" />
//         });
//       } else if (status === 409) {
//         toast.error("Duplicate Submission", {
//           description: "You have already placed a bid for this tender."
//         });
//       } else {
//         toast.error("Submission Failed", {
//           description: serverErrorMessage || "An unexpected error occurred. Please try again."
//         });
//       }
//       console.error("Bid submission failed:", error);
//     }
//   };
const onSubmit = async (data: any) => {
  try {
    const vendorId = localStorage.getItem('profileId');
    const payload = {
      tenderId: tender.tenderId,
      vendorProfileId: parseInt(vendorId || '0'),
      bidAmount: parseFloat(data.bidAmount),
      proposalDocument: data.proposalDocument,
    };

    await api.post('/bids', payload);
    toast.success("Bid submitted successfully!");
    onClose();
  } catch (error: any) {
    // 1. Log the full error to console for your debugging
    console.error("Full Error Object:", error);

    // 2. Extract the specific message from the JSON you shared
    // path: error -> response -> data -> message
    const serverMessage = error.response?.data?.message;

    if (serverMessage) {
      // This will show "Tender is closed for bidding"
      toast.error(serverMessage); 
    } else {
      // Fallback if the server doesn't send a message
      toast.error("An unexpected error occurred while placing your bid.");
    }
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#1a1a1a] border border-border w-full max-w-lg p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        
        {/* Background visual flair */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>

        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Place Your Bid</h2>
            <p className="text-muted-foreground text-sm">
              Target Tender: <span className="text-primary font-medium">{tender.title}</span>
            </p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Amount Field */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="bidAmount">Bid Amount (₹)</Label>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Limit: ₹{tender.budgetMax.toLocaleString()}
              </span>
            </div>
            <Input 
              id="bidAmount"
              type="number" 
              step="0.01"
              {...register('bidAmount', { 
                required: "Amount is required", 
                min: { value: 1, message: "Amount must be greater than zero" },
                max: { value: tender.budgetMax, message: `Cannot exceed max budget` } 
              })} 
              placeholder="0.00"
              className={errors.bidAmount ? "border-red-500 focus:ring-red-500" : ""}
            />
            {errors.bidAmount && (
              <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" /> {errors.bidAmount.message}
              </p>
            )}
          </div>
          
          {/* Document/Proposal Field */}
          <div className="space-y-2">
            <Label htmlFor="proposalDocument">Proposal & Timeline</Label>
            <textarea 
              id="proposalDocument"
              {...register('proposalDocument', { required: "Please provide a proposal summary" })} 
              className={`w-full bg-background border rounded-md p-3 text-sm h-32 outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                errors.proposalDocument ? "border-red-500" : "border-border focus:border-primary"
              }`} 
              placeholder="Detail your plan, expertise, and expected completion time..."
            />
            {errors.proposalDocument && (
              <p className="text-red-500 text-xs flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.proposalDocument.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={onClose} 
              className="flex-1 border border-border hover:bg-white/5"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit Bid"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Simple loader helper if needed
const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
);

export default BidModal;