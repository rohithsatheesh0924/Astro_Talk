import React, { useState } from 'react';
import { 
  Compass, 
  Wallet, 
  Bell, 
  Menu, 
  X, 
  LogIn
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage, walletBalance = 150 }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationLinks = [
    { id: 'home', label: 'Home' },
    { id: 'horoscope', label: 'Horoscope' },
    { id: 'chat', label: 'Live Advisory' },
    { id: 'store', label: 'Astro Store' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FCFAF6]/90 backdrop-blur-md border-b border-amber-200 px-4 sm:px-8 py-3.5 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none group" 
          onClick={() => setActivePage('home')}
        >
          <div className="p-2 bg-gradient-to-tr from-orange-500 via-orange-500 to-amber-500 text-white rounded-xl shadow-md shadow-orange-500/10 transition-transform duration-500 group-hover:rotate-180">
            <Compass className="w-4 h-4 stroke-[2]" />
          </div>
          <div>
            <span className="text-base font-serif font-normal tracking-wide text-slate-950 block leading-tight">
              Astro<span className="font-sans font-black text-orange-600">Nova</span>
            </span>
            <span className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">Institutional Council</span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 bg-amber-50/40 p-1 rounded-xl border border-amber-200/50">
          {navigationLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={`text-[11px] font-black px-4 py-2 rounded-lg tracking-widest uppercase transition-all duration-200 ${
                activePage === link.id
                  ? 'bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/10'
                  : 'text-slate-600 hover:text-orange-600 hover:bg-amber-100/40'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button 
            onClick={() => setActivePage('notifications')}
            className="p-2 text-orange-600 hover:text-orange-700 rounded-xl bg-amber-50/50 border border-amber-200/60 relative transition-colors focus:outline-none"
          >
            <Bell className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-orange-600 rounded-full animate-pulse" />
          </button>

          <button 
            onClick={() => setActivePage('wallet')}
            className="bg-white hover:bg-amber-50/30 active:scale-[0.98] border-2 border-amber-200 px-3 py-1 rounded-xl flex items-center gap-2.5 shadow-sm transition-all text-left focus:outline-none"
          >
            <Wallet className="w-3.5 h-3.5 text-orange-500 stroke-[2.5]" />
            <div>
              <span className="text-[8px] block font-bold text-slate-400 uppercase tracking-wider leading-none">Wallet balance</span>
              <span className="text-xs font-black text-slate-900 block mt-1">₹{walletBalance}</span>
            </div>
          </button>

          <div className="h-6 w-[1px] bg-amber-200/60 mx-1" />

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActivePage('signin')}
              className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-700 hover:text-orange-600 rounded-xl transition-all border border-amber-200 hover:border-orange-300 bg-white flex items-center gap-1.5"
            >
              <LogIn className="w-3 h-3 text-orange-500 stroke-[2.5]" /> Sign In
            </button>
            <button 
              onClick={() => setActivePage('signup')}
              className="px-3 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-md shadow-orange-500/10 border border-transparent"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 lg:hidden text-orange-600 bg-amber-50 border border-amber-200 rounded-xl focus:outline-none"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4 stroke-[2.5]" /> : <Menu className="w-4 h-4 stroke-[2.5]" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-3 p-2 bg-white border border-amber-200 rounded-xl shadow-xl animate-fadeIn">
          <div className="flex flex-col gap-1">
            {navigationLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { setActivePage(link.id); setIsMobileMenuOpen(false); }}
                className={`w-full text-left text-[11px] font-bold px-4 py-2.5 rounded-lg uppercase tracking-widest transition-all ${
                  activePage === link.id ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' : 'text-slate-600 hover:bg-amber-50/40 hover:text-orange-600'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            <div onClick={() => { setActivePage('wallet'); setIsMobileMenuOpen(false); }} className="mt-2 pt-2.5 border-t border-amber-100 flex items-center justify-between px-3 pb-1 cursor-pointer hover:bg-amber-50/40 rounded-lg">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5"><Wallet className="w-3.5 h-3.5 text-orange-500" /> Balance: ₹{walletBalance}</span>
              <button className="text-[10px] font-black uppercase text-orange-600 tracking-widest">View Ledger</button>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-amber-100">
              <button onClick={() => { setActivePage('signin'); setIsMobileMenuOpen(false); }} className="w-full text-center text-[10px] font-black uppercase tracking-widest py-2.5 border border-amber-200 text-slate-700 bg-[#FCFAF6] rounded-xl">Sign In</button>
              <button onClick={() => { setActivePage('signup'); setIsMobileMenuOpen(false); }} className="w-full text-center text-[10px] font-black uppercase tracking-widest py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl shadow-sm">Sign Up</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}