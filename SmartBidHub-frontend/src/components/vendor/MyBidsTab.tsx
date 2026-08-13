import { useEffect, useState } from 'react';
import { ClipboardList, ExternalLink, Clock, CheckCircle, XCircle } from 'lucide-react';
import api from '../../services/api';
import { toast } from 'sonner';

interface MyBid {
  bidId: number;
  tenderTitle: string;
  bidAmount: number;
  status: 'SUBMITTED' | 'WON' | 'LOST' | 'WITHDRAWN';
  submittedAt: string;
}

const MyBidsTab = () => {
  const [myBids, setMyBids] = useState<MyBid[]>([]);
  const [loading, setLoading] = useState(true);
  const vendorId = localStorage.getItem('profileId');

  useEffect(() => {
    const fetchMyBids = async () => {
      try {
        const res = await api.get(`/bids/vendor/${vendorId}`);
        setMyBids(res.data);
      } catch (error) {
        toast.error("Could not load your bids");
      } finally {
        setLoading(false);
      }
    };
    if (vendorId) fetchMyBids();
  }, [vendorId]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'WON': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'LOST': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'SUBMITTED': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (loading) return <div className="text-center py-10">Loading your submissions...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-muted/20 border border-border rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-muted/50 text-muted-foreground text-sm uppercase">
            <tr>
              <th className="p-4 font-medium">Tender Title</th>
              <th className="p-4 font-medium">My Bid Amount</th>
              <th className="p-4 font-medium">Date Submitted</th>
              <th className="p-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {myBids.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-10 text-center text-muted-foreground">
                  You haven't placed any bids yet.
                </td>
              </tr>
            ) : (
              myBids.map((bid) => (
                <tr key={bid.bidId} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-white">{bid.tenderTitle}</div>
                    <div className="text-xs text-muted-foreground italic">Bid ID: #{bid.bidId}</div>
                  </td>
                  <td className="p-4 font-semibold text-primary">₹{bid.bidAmount.toLocaleString()}</td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {new Date(bid.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(bid.status)}`}>
                      {bid.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBidsTab;