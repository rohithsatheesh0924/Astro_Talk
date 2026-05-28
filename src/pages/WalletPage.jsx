import React, { useState } from 'react';
import { 
  Wallet, ChevronLeft, CreditCard, Building, QrCode, 
  Loader2, ArrowLeft, ShieldCheck, Lock 
} from 'lucide-react';

const RECHARGE_PACKS = [
  { id: 'pack-1', amount: 200, bonus: 0 },
  { id: 'pack-2', amount: 500, bonus: 50 },
  { id: 'pack-3', amount: 1000, bonus: 150 },
];

export default function WalletPage({ setActivePage, walletBalance = 150 }) {
  const [view, setView] = useState('selection');
  const [selectedPack, setSelectedPack] = useState(RECHARGE_PACKS[1]);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAuthorize = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Payment of ₹${selectedPack.amount} authorized successfully.`);
      setActivePage('chat');
    }, 2000);
  };

  return (
    <div className="bg-amber-50/30 text-slate-900 min-h-screen pb-20 animate-fadeIn">
      {/* Header */}
      <section className="bg-gradient-to-b from-amber-100 to-white pt-12 pb-10 px-6 border-b border-amber-100">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => setActivePage('home')} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-600 bg-white border border-amber-200 px-4 py-2 rounded-xl mb-4">
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <h1 className="text-4xl font-black text-slate-950">Astro<span className="text-orange-600">Nova Ledger</span></h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {view === 'selection' ? (
          <div className="bg-white p-8 rounded-3xl border border-amber-200 shadow-sm animate-fadeIn">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Select Recharge Pack</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {RECHARGE_PACKS.map(pack => (
                <button key={pack.id} onClick={() => setSelectedPack(pack)} className={`p-6 rounded-2xl border-2 transition-all ${selectedPack.id === pack.id ? 'border-orange-500 bg-amber-50' : 'border-amber-100'}`}>
                  <span className="text-2xl font-black block">₹{pack.amount}</span>
                  {pack.bonus > 0 && <span className="text-[10px] font-black text-emerald-600 uppercase">+{pack.bonus} Bonus</span>}
                </button>
              ))}
            </div>
            <button onClick={() => setView('payment')} className="w-full py-5 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all">
              Proceed to Payment
            </button>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-3xl border border-amber-200 shadow-sm animate-fadeIn">
            <button onClick={() => setView('selection')} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 mb-6">
              <ArrowLeft className="w-4 h-4" /> Back to Packs
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { id: 'upi', label: 'UPI ID', icon: QrCode },
                { id: 'card', label: 'Card Details', icon: CreditCard },
                { id: 'netbank', label: 'Net Banking', icon: Building }
              ].map(m => (
                <button key={m.id} onClick={() => setPaymentMethod(m.id)} className={`p-4 rounded-xl border-2 flex items-center justify-center gap-2 ${paymentMethod === m.id ? 'border-orange-500 bg-amber-50' : 'border-amber-100'}`}>
                  <m.icon className="w-5 h-5" /> <span className="text-xs font-black uppercase tracking-widest">{m.label}</span>
                </button>
              ))}
            </div>

            {/* Dynamic Payment Fields */}
            <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
              {paymentMethod === 'upi' && (
                <div>
                  <label className="text-[9px] font-black uppercase text-slate-400 block mb-2">Enter UPI ID</label>
                  <input className="w-full p-4 rounded-xl border border-slate-200 text-sm font-bold" placeholder="username@upi" />
                </div>
              )}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <input className="w-full p-4 rounded-xl border border-slate-200 text-sm font-bold" placeholder="Card Number (XXXX XXXX XXXX XXXX)" />
                  <div className="flex gap-4">
                    <input className="w-full p-4 rounded-xl border border-slate-200 text-sm font-bold" placeholder="MM/YY" />
                    <input className="w-full p-4 rounded-xl border border-slate-200 text-sm font-bold" placeholder="CVV" />
                  </div>
                </div>
              )}
              {paymentMethod === 'netbank' && (
                <select className="w-full p-4 rounded-xl border border-slate-200 text-sm font-bold bg-white">
                  <option>Select your bank</option>
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                </select>
              )}
            </div>

            <button onClick={handleAuthorize} disabled={isProcessing} className="w-full py-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3">
              {isProcessing ? <Loader2 className="animate-spin" /> : <><ShieldCheck /> Confirm ₹{selectedPack.amount}</>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}