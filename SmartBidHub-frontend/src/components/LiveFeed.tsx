import { TrendingUp, Clock, Users, Building2 } from 'lucide-react';

export default function LiveFeed() {
  const activeTenders = [
    {
      id: 1,
      title: 'Medical Equipment Supply',
      category: 'Healthcare',
      budget: '₹2.4Cr',
      bidders: 24,
      deadline: '3 days',
      progress: 65,
      organization: 'State Health Dept.',
    },
    {
      id: 2,
      title: 'Road Infrastructure Development',
      category: 'Construction',
      budget: '₹18.5Cr',
      bidders: 42,
      deadline: '7 days',
      progress: 40,
      organization: 'Municipal Corp.',
    },
    {
      id: 3,
      title: 'IT Hardware Procurement',
      category: 'Technology',
      budget: '₹95L',
      bidders: 18,
      deadline: '5 days',
      progress: 80,
      organization: 'Education Board',
    },
    {
      id: 4,
      title: 'Solar Panel Installation',
      category: 'Energy',
      budget: '₹5.2Cr',
      bidders: 31,
      deadline: '10 days',
      progress: 25,
      organization: 'Renewable Energy Corp.',
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Healthcare: 'bg-[#fb6376]/20 text-[#fb6376] border-[#fb6376]/30',
      Construction: 'bg-[#fcb1a6]/20 text-[#fcb1a6] border-[#fcb1a6]/30',
      Technology: 'bg-[#ffdccc]/20 text-[#ffdccc] border-[#ffdccc]/30',
      Energy: 'bg-[#5d2a42]/40 text-[#fb6376] border-[#5d2a42]/50',
    };
    return colors[category] || 'bg-[#fb6376]/20 text-[#fb6376] border-[#fb6376]/30';
  };

  return (
    <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#1a0d14] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-[#fb6376] rounded-full animate-pulse"></div>
              <span className="text-sm text-[#ffdccc]/60 tracking-wide uppercase">Live Feed</span>
            </div>
            <h2 className="font-serif text-5xl font-bold text-white">
              Active <span className="text-[#fb6376]">Tenders</span>
            </h2>
          </div>
          <div className="flex items-center space-x-6 text-sm text-[#ffdccc]/60">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-[#fb6376]" />
              <span>247 Active Today</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeTenders.map((tender, index) => (
            <div
              key={tender.id}
              className={`group relative bg-gradient-to-br from-[#5d2a42]/10 to-transparent border border-[#fb6376]/20 rounded-lg p-6 hover:border-[#fb6376]/40 transition-all ${
                index === 0 ? 'md:col-span-2' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(
                        tender.category
                      )}`}
                    >
                      {tender.category}
                    </span>
                    <div className="h-1 w-1 bg-[#ffdccc]/30 rounded-full"></div>
                    <span className="text-xs text-[#ffdccc]/50">{tender.organization}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#fb6376] transition-colors">
                    {tender.title}
                  </h3>
                  <div className="text-2xl font-bold text-[#fb6376] mb-4">{tender.budget}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#ffdccc]/60">Bid Progress</span>
                  <span className="text-white font-medium">{tender.progress}%</span>
                </div>
                <div className="relative h-1.5 bg-[#5d2a42]/30 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#fb6376] to-[#fcb1a6] rounded-full transition-all"
                    style={{ width: `${tender.progress}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#fb6376]/10">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-[#fb6376]/60" />
                    <div>
                      <div className="text-xs text-[#ffdccc]/50">Bidders</div>
                      <div className="text-sm font-medium text-white">{tender.bidders}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-[#fb6376]/60" />
                    <div>
                      <div className="text-xs text-[#ffdccc]/50">Deadline</div>
                      <div className="text-sm font-medium text-white">{tender.deadline}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-4 right-4">
                <Building2 className="w-5 h-5 text-[#fb6376]/30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
