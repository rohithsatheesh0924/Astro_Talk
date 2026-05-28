import React from 'react';
import { Bell, Sparkles, Wallet, ShieldCheck, ChevronLeft, Trash2, Clock } from 'lucide-react';

const NOTIFICATIONS = [
  { id: 1, type: 'horoscope', title: 'Daily Insight Ready', desc: 'Your personalized solar transit report is now available for review.', time: '5m ago' },
  { id: 2, type: 'wallet', title: 'Transaction Success', desc: 'Your recharge of ₹500 was successfully processed to your wallet.', time: '2h ago' },
  { id: 3, type: 'system', title: 'Security Alert', desc: 'New login detected from Coimbatore, TN via secure browser.', time: '1d ago' },
];

export default function NotificationsPage({ setActivePage }) {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 animate-fadeIn">
      
      {/* Navigation Anchor */}
      <button 
        onClick={() => setActivePage('home')}
        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-600 bg-white border border-amber-200 px-4 py-2 rounded-xl hover:bg-amber-50/50 transition-all mb-8 shadow-sm"
      >
        <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" /> Back to Dashboard
      </button>

      {/* Header Segment */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-amber-100">
        <h1 className="text-3xl font-black text-slate-950 uppercase tracking-tight">Notification Center</h1>
        <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-600 flex items-center gap-2 transition-colors">
          <Trash2 className="w-3.5 h-3.5" /> Clear All
        </button>
      </div>

      {/* Notification Stream */}
      <div className="space-y-4">
        {NOTIFICATIONS.map((n) => (
          <div 
            key={n.id} 
            className="group bg-white border border-amber-100 p-5 rounded-2xl flex items-start gap-4 shadow-sm hover:border-orange-300 hover:shadow-md transition-all duration-300"
          >
            {/* Category Indicator Node */}
            <div className={`p-3 rounded-xl border ${
              n.type === 'horoscope' ? 'bg-amber-50 text-orange-600 border-amber-100' : 
              n.type === 'wallet' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
              'bg-slate-50 text-slate-500 border-slate-100'
            }`}>
              {n.type === 'horoscope' && <Sparkles className="w-5 h-5 stroke-[2]" />}
              {n.type === 'wallet' && <Wallet className="w-5 h-5 stroke-[2]" />}
              {n.type === 'system' && <ShieldCheck className="w-5 h-5 stroke-[2]" />}
            </div>

            {/* Notification Text Body */}
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">{n.title}</h4>
                <div className="flex items-center gap-1 text-[9px] font-black uppercase text-slate-300">
                  <Clock className="w-3 h-3" /> {n.time}
                </div>
              </div>
              <p className="text-[11px] font-medium text-slate-500 mt-1.5 leading-relaxed">
                {n.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State / Footer Marker */}
      <div className="mt-12 text-center">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">
          All systems nominal. No further alerts pending.
        </p>
      </div>
    </div>
  );
}