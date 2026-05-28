import React, { useState } from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  HelpCircle, 
  ChevronLeft,
  CreditCard,
  Building,
  QrCode
} from 'lucide-react';

// Institutional Mock Transaction Logs Matrix
const TRANSACTION_LEDGER = [
  { id: 'TXN-99823', description: 'Recharge Pack: Premium Astral Node', amount: 500, type: 'credit', date: '28 May 2026', status: 'Success' },
  { id: 'TXN-99711', description: 'Consultation: Roshni Noom (11 mins)', amount: -495, type: 'debit', date: '27 May 2026', status: 'Success' },
  { id: 'TXN-99504', description: 'Consultation: Ratna Ramn (5 mins)', amount: -300, type: 'debit', date: '24 May 2026', status: 'Success' },
  { id: 'TXN-99120', description: 'Recharge Pack: Starter Balance Pack', amount: 445, type: 'credit', date: '19 May 2026', status: 'Success' },
];

const RECHARGE_PACKS = [
  { id: 'pack-1', amount: 200, bonus: 0, tag: null },
  { id: 'pack-2', amount: 500, bonus: 50, tag: 'Most Popular' },
  { id: 'pack-3', amount: 1000, bonus: 150, tag: 'Best Value' },
  { id: 'pack-4', amount: 2000, bonus: 400, tag: 'Premium Executive' },
];

export default function WalletPage({ setActivePage, walletBalance = 150 }) {
  const [selectedPack, setSelectedPack] = useState(RECHARGE_PACKS[1]);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [customAmount, setCustomAmount] = useState('');

  const currentRechargeAmount = customAmount ? parseFloat(customAmount) : selectedPack.amount;
  const gstAmount = parseFloat((currentRechargeAmount * 0.18).toFixed(2));
  const totalPayable = parseFloat((currentRechargeAmount + gstAmount).toFixed(2));

  return (
    <div className="bg-amber-50/30 text-slate-900 min-h-screen pb-20 overflow-x-hidden animate-fadeIn">
      
      {/* HEADER NAVIGATION SEGMENT */}
      <section className="relative bg-gradient-to-b from-amber-100 via-amber-50 to-white pt-12 pb-10 px-6 border-b border-amber-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <button 
              onClick={() => setActivePage('home')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 bg-white border border-amber-200 px-4 py-2 rounded-xl hover:bg-amber-50/50 transition-all mb-4 shadow-sm"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" /> Back to Dashboard
            </button>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Astro<span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">Nova Ledger</span>
            </h1>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
              Manage Secure Transaction Nodes & Advisory Credits
            </p>
          </div>
        </div>
      </section>

      {/* MAIN DASHBOARD BLOCK */}
      <section className="py-12 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: BALANCE STATS & RECHARGE TOOL PRESETS */}
        <div className="lg:col-span-7 space-y-6 w-full">
          
          {/* Liquidity Capital Summary Tile */}
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center justify-between relative z-10 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white/10 rounded-xl border border-white/10 text-orange-400">
                  <Wallet className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <span className="text-[10px] block font-black uppercase tracking-widest text-slate-400 leading-none">Available Balance</span>
                  <span className="text-3xl sm:text-4xl font-black block mt-2 font-sans text-white">₹{walletBalance}</span>
                </div>
              </div>
              <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Active Node
              </span>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <span>Account Type: Premium User</span>
              <span className="text-amber-400">Vedic Advisor Credits Ready</span>
            </div>
          </div>

          {/* Recharge Preset Pack Selection Form Workspace */}
          <div className="bg-white border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
              Select Top-Up Credit Amount
            </h3>
            
            {/* Presets Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {RECHARGE_PACKS.map((pack) => {
                const isSelected = selectedPack.id === pack.id && !customAmount;
                return (
                  <div
                    key={pack.id}
                    onClick={() => {
                      setSelectedPack(pack);
                      setCustomAmount('');
                    }}
                    className={`p-4 rounded-2xl border text-center cursor-pointer transition-all relative select-none ${
                      isSelected 
                        ? 'border-orange-500 bg-amber-50/10 ring-4 ring-orange-500/5 -translate-y-1' 
                        : 'border-amber-100 hover:border-orange-300 bg-[#FCFAF6]/40'
                    }`}
                  >
                    {pack.tag && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase tracking-wider bg-orange-600 text-white px-2 py-0.5 rounded-full whitespace-nowrap">
                        {pack.tag}
                      </span>
                    )}
                    <span className="text-xl font-black block text-slate-900 font-sans">₹{pack.amount}</span>
                    {pack.bonus > 0 ? (
                      <span className="text-[9px] font-bold text-emerald-600 uppercase block mt-1">
                        + ₹{pack.bonus} Free
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold text-slate-400 uppercase block mt-1">
                        Base Pack
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Manual Variable Field Alternative */}
            <div className="mt-6">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                Or Enter Custom Capital Amount (₹)
              </label>
              <input 
                type="number"
                placeholder="Example: 250"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                }}
                className="w-full bg-[#FCFAF6] border border-amber-200 p-3.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider outline-none text-slate-800 placeholder-slate-400 focus:border-orange-500 bg-white transition-colors"
              />
            </div>
          </div>

          {/* FIXED: Institutional Payment Gateway Option Framework Selection */}
          <div className="bg-white border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
              Select Gateway Infrastructure
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Card Gateway Node Option */}
              <button 
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex items-center gap-3.5 p-4 rounded-xl border text-left text-xs font-black uppercase tracking-widest transition-all focus:outline-none ${
                  paymentMethod === 'card' 
                    ? 'border-orange-500 bg-amber-50/20 ring-4 ring-orange-500/5 text-orange-600' 
                    : 'border-amber-100 bg-[#FCFAF6]/40 text-slate-600 hover:border-orange-300'
                }`}
              >
                <div className={`p-1.5 rounded-lg border ${paymentMethod === 'card' ? 'bg-orange-500 text-white border-transparent' : 'bg-white border-amber-200 text-slate-400'}`}>
                  <CreditCard className="w-4 h-4 stroke-[2]" />
                </div>
                <span>Credit / Debit Card</span>
              </button>

              {/* UPI Gateway Node Option */}
              <button 
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`flex items-center gap-3.5 p-4 rounded-xl border text-left text-xs font-black uppercase tracking-widest transition-all focus:outline-none ${
                  paymentMethod === 'upi' 
                    ? 'border-orange-500 bg-amber-50/20 ring-4 ring-orange-500/5 text-orange-600' 
                    : 'border-amber-100 bg-[#FCFAF6]/40 text-slate-600 hover:border-orange-300'
                }`}
              >
                <div className={`p-1.5 rounded-lg border ${paymentMethod === 'upi' ? 'bg-orange-500 text-white border-transparent' : 'bg-white border-amber-200 text-slate-400'}`}>
                  <QrCode className="w-4 h-4 stroke-[2]" />
                </div>
                <span>UPI Instant Nodes</span>
              </button>

              {/* Net Banking Gateway Node Option */}
              <button 
                type="button"
                onClick={() => setPaymentMethod('netbank')}
                className={`flex items-center gap-3.5 p-4 rounded-xl border text-left text-xs font-black uppercase tracking-widest transition-all focus:outline-none ${
                  paymentMethod === 'netbank' 
                    ? 'border-orange-500 bg-amber-50/20 ring-4 ring-orange-500/5 text-orange-600' 
                    : 'border-amber-100 bg-[#FCFAF6]/40 text-slate-600 hover:border-orange-300'
                }`}
              >
                <div className={`p-1.5 rounded-lg border ${paymentMethod === 'netbank' ? 'bg-orange-500 text-white border-transparent' : 'bg-white border-amber-200 text-slate-400'}`}>
                  <Building className="w-4 h-4 stroke-[2]" />
                </div>
                <span>Net Banking Hub</span>
              </button>

            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: RECHARGE STATEMENT SUMMARY & INVOICE BREAKDOWN */}
        <div className="lg:col-span-5 space-y-6 w-full">
          
          {/* Order Invoice Fee Breakdown */}
          <div className="bg-white border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="pb-4 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider">
                  Summary Receipt Invoice
                </h3>
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-widest mt-1">
                  Tax Compliance Accounting Node
                </span>
              </div>

              <div className="py-4 space-y-3.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Credit Token Pack Allocation</span>
                  <span className="text-slate-900 font-black">₹{currentRechargeAmount || 0}</span>
                </div>
                {selectedPack.bonus > 0 && !customAmount && (
                  <div className="flex justify-between text-emerald-600">
                    <span className="font-bold">System Complementary Bonus</span>
                    <span className="font-black">₹{selectedPack.bonus}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Institutional Central GST (18%)</span>
                  <span className="text-slate-900 font-black">₹{gstAmount || 0}</span>
                </div>
                <div className="pt-4 border-t border-dashed border-slate-100 flex justify-between text-sm text-slate-950 font-black">
                  <span>Total Payable Gross Capital</span>
                  <span className="text-orange-600 text-base">₹{totalPayable || 0}</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={() => {
                  alert(`Handshake initialized with secure ${paymentMethod.toUpperCase()} node. Gross amount: ₹${totalPayable}`);
                  setActivePage('chat');
                }}
                className="w-full py-4 bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md shadow-orange-500/10 flex items-center justify-center gap-2 focus:outline-none"
              >
                <ShieldCheck className="w-4 h-4 stroke-[2]" /> Authorize Secure Payment Node
              </button>
              
              <div className="flex items-center justify-center gap-1.5 mt-4 text-[9px] text-slate-400 font-bold uppercase tracking-widest text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> PCI-DSS Vetted Encrypted Gateways Only
              </div>
            </div>
          </div>

          {/* Live Transaction Vault Ledger Logs List */}
          <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h4 className="text-xs font-black text-slate-950 uppercase tracking-widest">
                Recent Movements Log
              </h4>
              <Clock className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1 no-scrollbar-engine">
              {TRANSACTION_LEDGER.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between text-xs p-3 bg-[#FCFAF6]/60 rounded-xl border border-amber-100/30 font-bold">
                  <div>
                    <span className="text-slate-900 block font-black text-[11px] truncate max-w-[200px]">{txn.description}</span>
                    <span className="text-[9px] block text-slate-400 font-semibold mt-0.5">{txn.date} • {txn.id}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-xs font-black font-sans block ${txn.type === 'credit' ? 'text-emerald-600' : 'text-slate-800'}`}>
                      {txn.type === 'credit' ? '+' : '-'} ₹{Math.abs(txn.amount)}
                    </span>
                    <span className="text-[8px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full uppercase tracking-wider block mt-0.5 border border-emerald-100/40">
                      {txn.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}