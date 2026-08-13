import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Gavel, User, Calendar, Hash, FileText, CheckCircle2, ShieldAlert, Loader2 } from 'lucide-react';
import api from '../../services/api';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

interface Bid {
  bidId: number;
  vendorCompanyName: string;
  tenderTitle: string;
  bidAmount: number;
  status: 'SUBMITTED' | 'WON' | 'LOST' | 'WITHDRAWN';
  submittedAt: string;
}

const TenderBids = () => {
  const { tenderId } = useParams();
  const navigate = useNavigate();
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);

  const fetchBids = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/bids/tender/${tenderId}`);
      setBids(response.data);
    } catch (error: any) {
      // Handle the "Sealed Bids" 400 error from backend
      if (error.response?.status === 400) {
        setBids([]);
      } else {
        toast.error("Failed to fetch bids for this tender");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBids();
  }, [tenderId]);

  const handleAcceptBid = async (bidId: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to accept this bid? This will officially award the tender to this vendor and mark all other bids as 'LOST'."
    );

    if (!isConfirmed) return;

    setProcessingId(bidId);
    try {
      // Ensure your backend has this @PatchMapping("/{bidId}/accept") endpoint
      await api.patch(`/bids/${bidId}/accept`);
      toast.success("Tender Awarded!", {
        description: "The selected vendor has been notified and the tender is now closed.",
      });
      // Refresh data to show updated WON/LOST statuses
      fetchBids();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to finalize tender");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6 text-white">
      <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 mb-4 hover:bg-white/10">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Button>

      <div className="flex items-center justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 text-primary">
            <Gavel className="w-8 h-8" /> Received Bids
          </h1>
          <p className="text-muted-foreground mt-1">
            {bids.length > 0 
              ? `Reviewing proposals for: ${bids[0].tenderTitle}` 
              : `Reviewing proposals for Tender #${tenderId}`}
          </p>
        </div>
        <div className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-lg">
          <span className="text-sm font-medium text-primary">{bids.length} Total Bids</span>
        </div>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="flex flex-col items-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-muted-foreground">Fetching latest submissions...</p>
          </div>
        ) : bids.length === 0 ? (
          <div className="text-center py-20 bg-muted/10 rounded-xl border border-dashed border-border">
            <ShieldAlert className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground font-medium text-lg">Bids are currently sealed</p>
            <p className="text-sm text-muted-foreground/60">You can only view submissions after the tender closing date.</p>
          </div>
        ) : (
          bids.map((bid) => (
            <div 
              key={bid.bidId} 
              className={`bg-muted/20 border p-6 rounded-xl transition-all group ${
                bid.status === 'WON' ? 'border-green-500/50 bg-green-500/5' : 'border-border hover:border-primary/40'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      bid.status === 'WON' ? 'bg-green-500/20' : 'bg-primary/20'
                    }`}>
                      {bid.status === 'WON' ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <User className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">{bid.vendorCompanyName}</h3>
                        <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground font-mono">
                          <Hash className="w-2.5 h-2.5 inline mr-0.5" />{bid.bidId}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> 
                        Submitted {new Date(bid.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      bid.status === 'WON' ? 'bg-green-500/20 text-green-500' :
                      bid.status === 'LOST' ? 'bg-red-500/20 text-red-500' :
                      'bg-blue-500/20 text-blue-500'
                    }`}>
                      {bid.status}
                    </span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                       <FileText className="w-3 h-3" /> Proposal Viewable
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Offer Price</p>
                    <p className={`text-2xl font-black ${bid.status === 'WON' ? 'text-green-500' : 'text-white'}`}>
                      ₹{bid.bidAmount.toLocaleString()}
                    </p>
                  </div>

                  {/* Hide Accept button if another bid is already won, or if this bid is lost */}
                  {bid.status !== 'LOST' && (
                    <Button 
                      onClick={() => handleAcceptBid(bid.bidId)}
                      className={`font-bold px-8 h-12 rounded-lg transition-all ${
                        bid.status === 'WON' 
                        ? 'bg-green-600 text-white cursor-default' 
                        : 'bg-primary text-white hover:bg-primary/90'
                      }`}
                      disabled={bid.status === 'WON' || processingId !== null || bids.some(b => b.status === 'WON')}
                    >
                      {processingId === bid.bidId ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : bid.status === 'WON' ? (
                        'Accepted Winner'
                      ) : (
                        'Accept Bid'
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TenderBids;