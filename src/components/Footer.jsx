import React from 'react';
import { Compass, ShieldCheck, ShieldAlert, Award, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-amber-200 mt-24">
      
      {/* Structural Value Indicators Strip - Styled with soft warm accents */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-b border-amber-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left bg-[#FCFAF6]/50">
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center sm:justify-start">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span className="text-xs font-bold text-slate-700">100% Encrypted Audio/Chat Pipelines</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center sm:justify-start">
          <Award className="w-5 h-5 text-amber-500" />
          <span className="text-xs font-bold text-slate-700">Verified & Certified Elite Pandits</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center sm:justify-start">
          <ShieldAlert className="w-5 h-5 text-orange-500" />
          <span className="text-xs font-bold text-slate-700">Instant Refund Policy Guarantee</span>
        </div>
      </div>

      {/* Main Corporate Navigation Matrix Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-widest text-orange-600 mb-4">Daily Horoscope</h4>
          <ul className="space-y-2 text-xs font-bold text-slate-600">
            <li className="hover:text-orange-600 cursor-pointer flex items-center gap-0.5 group">
              Aries Horoscope <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-orange-500" />
            </li>
            <li className="hover:text-orange-600 cursor-pointer">Taurus Horoscope</li>
            <li className="hover:text-orange-600 cursor-pointer">Gemini Horoscope</li>
            <li className="hover:text-orange-600 cursor-pointer">Cancer Horoscope</li>
            <li className="hover:text-orange-700 cursor-pointer text-orange-600 font-black mt-1">View All Signs →</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-black uppercase tracking-widest text-orange-600 mb-4">Core Channels</h4>
          <ul className="space-y-2 text-xs font-bold text-slate-600">
            <li className="hover:text-orange-600 cursor-pointer">Talk to Astrologer</li>
            <li className="hover:text-orange-600 cursor-pointer">Chat Live Now</li>
            <li className="hover:text-orange-600 cursor-pointer">Kundli Matching</li>
            <li className="hover:text-orange-600 cursor-pointer">Vedic Puja Frameworks</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-black uppercase tracking-widest text-orange-600 mb-4">Corporate Info</h4>
          <ul className="space-y-2 text-xs font-bold text-slate-600">
            <li className="hover:text-orange-600 cursor-pointer">About Corporate Entity</li>
            <li className="hover:text-orange-600 cursor-pointer">Vetted Evaluation Process</li>
            <li className="hover:text-orange-600 cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-orange-600 cursor-pointer">Privacy Guidelines</li>
          </ul>
        </div>

        {/* Brand Overview & App Downloader Asset - Recolored to match theme perfectly */}
        <div className="col-span-2 md:col-span-1 bg-amber-50/40 p-5 rounded-2xl border border-amber-200">
          <div className="flex items-center gap-2 mb-3">
            <Compass className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-black tracking-tight text-slate-900">AstroNova Operations</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-500 font-medium mb-4">
            India's most secure decentralized consulting environment for ancient Indian cosmic analytics, Vedic charting, and modern tarot mapping.
          </p>
          <div className="flex gap-2">
            {/* Download app buttons converted into pure warm theme palettes */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl px-3 py-1.5 text-[9px] font-bold cursor-pointer hover:from-orange-600 hover:to-amber-600 transition-colors shadow-sm">
              Get App on <span className="block font-black text-[10px]">Google Play</span>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl px-3 py-1.5 text-[9px] font-bold cursor-pointer hover:from-orange-600 hover:to-amber-600 transition-colors shadow-sm">
              Download on <span className="block font-black text-[10px]">App Store</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Technical Authentication Strip */}
      <div className="bg-[#FCFAF6] border-t border-amber-100 py-6 px-6 text-center text-xs font-semibold text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {currentYear} AstroNova Inc. Vetted Mild Orange & Yellow Architecture Layout.</p>
          <div className="flex gap-6 uppercase tracking-widest text-[9px] font-black text-slate-400">
            <span className="hover:text-orange-600 cursor-pointer transition-colors">Data Privacy Standards</span>
            <span className="hover:text-orange-600 cursor-pointer transition-colors">ISO 27001 Secure Node</span>
          </div>
        </div>
      </div>

    </footer>
  );
}