import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  Phone, 
  Star, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Users2, 
  Award, 
  HelpCircle, 
  ChevronDown,
  Smartphone,
  Compass,
  Layers,
  Activity,
  Milestone,
  Fingerprint,
  PieChart,
  Globe2
} from 'lucide-react';

// Structured Traditional Zodiac Reference Dataset mapped with clean vector icons
const ZODIAC_SIGNS = [
  { name: 'Aries', date: 'Mar 21 - Apr 19', icon: Compass },
  { name: 'Taurus', date: 'Apr 20 - May 20', icon: Layers },
  { name: 'Gemini', date: 'May 21 - Jun 20', icon: Activity },
  { name: 'Cancer', date: 'Jun 21 - Jul 22', icon: Milestone },
  { name: 'Leo', date: 'Jul 23 - Aug 22', icon: Fingerprint },
  { name: 'Virgo', date: 'Aug 23 - Sep 22', icon: PieChart },
  { name: 'Libra', date: 'Sep 23 - Oct 22', icon: Sparkles },
  { name: 'Scorpio', date: 'Oct 23 - Nov 21', icon: Globe2 },
];

const EXPERT_ASTROLOGERS = [
  { id: 1, name: 'Roshni Noom', expertise: 'Vedic, Kundli Specialist', experience: 15, rating: 4.8, rate: 45, reviews: '14k', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150' },
  { id: 2, name: 'Ratna Ramn', expertise: 'Tarot Card, Numerology', experience: 12, rating: 4.9, rate: 60, reviews: '19k', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150' },
  { id: 3, name: 'Alok Shastri', expertise: 'KP System, Vastu Expert', experience: 20, rating: 5.0, rate: 80, reviews: '32k', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150' },
  { id: 4, name: 'Kavita Mishra', expertise: 'Psychic, Palmistry', experience: 9, rating: 4.7, rate: 35, reviews: '8k', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' }
];

const REVIEWS = [
  { id: 1, name: 'Megha Sharma', location: 'Delhi', text: 'Highly accurate predictions! The chat interface is lightning fast and completely private.', rating: 5 },
  { id: 2, name: 'Rahul Verma', location: 'Mumbai', text: 'Roshni Noom guided me perfectly through my career transition phase. Highly recommend AstroNova.', rating: 5 },
  { id: 3, name: 'Ananya Iyer', location: 'Bangalore', text: 'Incredibly neat design. Checking my daily horoscope has become my everyday morning ritual now.', rating: 5 }
];

const FAQS = [
  { q: "How can I start a chat session with an astrologer?", a: "Simply tap on the 'Start Chat' button next to your preferred online astrologer. Ensure your wallet has sufficient balance for the per-minute session charge." },
  { q: "Is my personal birth data kept safe and confidential?", a: "Absolutely. AstroNova deploys end-to-end operational encryption across all text, voice, and database points ensuring absolute confidentiality." },
  { q: "Can I get a refund if the network disconnects?", a: "Yes, our automated audit system immediately triggers a full roll-back if a technical error breaks the conversation pipeline." }
];

// Reusable Observer Component to mount explicit variants dynamically
function UniqueAnimatedSection({ children, animationType = 'fade-up' }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animationClasses = {
    'scale-up': isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
    'fade-up': isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
    'slide-left': isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16',
    'slide-right': isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16',
    'reveal-rotate': isVisible ? 'opacity-100 rotate-0 translate-y-0' : 'opacity-0 -rotate-1 translate-y-8',
    'top-down': isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12',
    'flip-up': isVisible ? 'opacity-100 [transform:perspective(1000px)_rotateX(0deg)]' : 'opacity-0 [transform:perspective(1000px)_rotateX(15deg)] translate-y-8'
  };

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) transform will-change-transform ${animationClasses[animationType]}`}
    >
      {children}
    </div>
  );
}

export default function HomePage({ setActivePage }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-amber-50/30 text-slate-900 overflow-x-hidden">
      
      {/* SECTION 1: Premium Sunburst Hero Banner */}
     <UniqueAnimatedSection animationType="scale-up">
  <section className="relative bg-gradient-to-br from-amber-50/50 via-white to-amber-100/20 pt-24 pb-20 px-6 overflow-hidden">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
      {/* LEFT COLUMN: Text Content & Conversion Nodes */}
      <div className="z-10 text-center lg:text-left">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-950 tracking-tight leading-[1.1]">
          Talk to <span className="text-orange-600">Astrologers</span> <br />
          right now.
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-600 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
          India's most-loved astrology platform. <span className="font-bold text-slate-900">48,726+ verified astrologers</span> in 13 languages. Instant chat, free kundli, honest answers — average reply under 12 seconds.
        </p>
        
        {/* Action Nodes */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
          <button 
            onClick={() => setActivePage('chat')}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
          >
            Get Free Chat
          </button>
          <button 
            onClick={() => setActivePage('store')}
            className="px-8 py-4 bg-white border border-amber-200 hover:border-orange-300 text-slate-800 font-bold text-sm uppercase tracking-wider rounded-2xl transition-all hover:bg-amber-50/40"
          >
            Download The App
          </button>
        </div>

        {/* Customer Social Proof Strip */}
        <div className="mt-8 flex items-center justify-center lg:justify-start gap-3">
  {/* Stacked Avatar Layer */}
  <div className="flex -space-x-3">
    {[
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100",
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100"
    ].map((imgUrl, i) => (
      <img 
        key={i} 
        src={imgUrl} 
        alt="Customer" 
        className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
      />
    ))}
    {/* Extra "Plus" Indicator for large scale */}
    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[9px] font-black text-slate-500 shadow-sm">
      +99
    </div>
  </div>

  {/* Statistical Data Block */}
  <div className="text-left">
    <div className="flex items-center gap-1.5">
      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      <span className="text-sm font-black text-slate-950">4.7</span>
      <span className="text-xs font-bold text-slate-500">• 120.2M+ customers</span>
    </div>
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
      1326 Million+ chat/call minutes served
    </p>
  </div>
</div>
      </div>

      {/* RIGHT COLUMN: Zodiac / Astrological Illustration */}
      {/* RIGHT COLUMN: Professional Solar Orbit Illustration */}
<div className="flex justify-center lg:justify-end relative">
  <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
    
    {/* Solar System Container */}
    <div className="relative w-full h-full flex items-center justify-center animate-spin-slow">
      
      {/* Orbital Paths */}
      <div className="absolute inset-0 rounded-full border-[1px] border-amber-200/40" />
      <div className="absolute inset-20 rounded-full border-[1px] border-amber-200/40" />
      
      {/* Central Sun (Pulsing) */}
      <div className="relative flex items-center justify-center">
         <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-full shadow-[0_0_60px_rgba(251,146,60,0.5)] animate-pulse-soft" />
      </div>
      
      {/* Orbiting Planets (Independently Animated) */}
      <div className="absolute w-full h-full animate-spin-reverse-slow">
        <div className="absolute top-[10%] left-[50%] w-4 h-4 bg-amber-400 rounded-full shadow-lg" />
      </div>
      <div className="absolute w-full h-full animate-spin-slow-delay">
        <div className="absolute bottom-[20%] right-[15%] w-3 h-3 bg-orange-500 rounded-full shadow-lg" />
      </div>
    </div>
  </div>
</div>

    </div>
  </section>
</UniqueAnimatedSection>

      {/* SECTION 2: Zodiac Sign Navigator Infinite Dynamic Loop */}
      <UniqueAnimatedSection animationType="fade-up">
        <section className="py-16 px-6 max-w-7xl mx-auto text-center overflow-hidden">
          
          {/* Inject safe custom local sub-scroller definitions for right-to-left marquee mapping */}
          <style dangerouslySetInnerHTML={{__html: `
            .hide-scrollbar-zodiac::-webkit-scrollbar { display: none; }
            .hide-scrollbar-zodiac { -ms-overflow-style: none; scrollbar-width: none; }
            @keyframes zodiac-scroll-forward { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
            .animate-zodiac-forward { animation: zodiac-scroll-forward 30s linear infinite; }
            .animate-zodiac-forward:hover { animation-play-state: paused; }
          `}} />

          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Pick Your Sign. Read Your Destiny.</h2>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mt-2 mb-10">Instant Daily, Weekly & Annual Insights</p>
          </div>

          <div className="relative w-full overflow-x-auto hide-scrollbar-zodiac pointer-events-auto">
            <div className="flex gap-4 w-max px-4 animate-zodiac-forward">
              
              {/* Iteration Layer Block 1 */}
              {ZODIAC_SIGNS.map((sign) => {
                const IconComponent = sign.icon;
                return (
                  <div 
                    key={`zodiac-inline-1-${sign.name}`}
                    onClick={() => setActivePage('horoscope')}
                    className="bg-white p-5 rounded-2xl border border-amber-100 hover:border-orange-400 shadow-sm hover:shadow-md transition-all cursor-pointer group hover:-translate-y-1 w-[140px] sm:w-[160px] shrink-0 select-none text-center"
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-amber-100 text-orange-600 flex items-center justify-center mx-auto mb-3 transition-colors border border-amber-200/20">
                      <IconComponent className="w-4 h-4 stroke-[2]" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{sign.name}</h3>
                    <p className="text-[10px] text-slate-400 font-semibold mt-1">{sign.date}</p>
                  </div>
                );
              })}

              {/* Iteration Layer Block 2 (Continuous Loop Sync Clone) */}
              {ZODIAC_SIGNS.map((sign) => {
                const IconComponent = sign.icon;
                return (
                  <div 
                    key={`zodiac-inline-2-${sign.name}`}
                    onClick={() => setActivePage('horoscope')}
                    className="bg-white p-5 rounded-2xl border border-amber-100 hover:border-orange-400 shadow-sm hover:shadow-md transition-all cursor-pointer group hover:-translate-y-1 w-[140px] sm:w-[160px] shrink-0 select-none text-center"
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-amber-100 text-orange-600 flex items-center justify-center mx-auto mb-3 transition-colors border border-amber-200/20">
                      <IconComponent className="w-4 h-4 stroke-[2]" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{sign.name}</h3>
                    <p className="text-[10px] text-slate-400 font-semibold mt-1">{sign.date}</p>
                  </div>
                );
              })}

            </div>
          </div>

        </section>
      </UniqueAnimatedSection>

      {/* SECTION 3: Left-to-Right Lateral Glide Entry */}
      <UniqueAnimatedSection animationType="slide-left">
        <section className="py-16 px-6 bg-gradient-to-b from-white to-amber-50/20 border-t border-b border-amber-100/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 text-center sm:text-left">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Expert Astrologers for Chat</h2>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mt-2">Verified Experts Online Right Now</p>
              </div>
             
              <button 
                onClick={() => setActivePage('all-astrologers')}
                className="mt-4 sm:mt-0 text-xs font-bold uppercase tracking-widest text-orange-600 hover:text-orange-700 flex items-center justify-center gap-1 transition-colors"
              >
                View Complete Council Matrix <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {EXPERT_ASTROLOGERS.map((astro) => (
                <div key={astro.id} className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group overflow-hidden">
                  <div className="absolute top-3 right-3 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <img src={astro.image} alt={astro.name} className="w-14 h-14 rounded-full object-cover border-2 border-amber-200" />
                    <div>
                      <h3 className="text-base font-black text-slate-900">{astro.name}</h3>
                      <p className="text-xs font-medium text-slate-400">{astro.expertise}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1 bg-slate-50 p-2.5 rounded-xl text-center mb-4 border border-slate-100 text-[11px] font-bold">
                    <div>
                      <span className="text-[9px] block text-slate-400 uppercase tracking-wider">Experience</span>
                      <span className="text-slate-800">{astro.experience} Yrs</span>
                    </div>
                    <div>
                      <span className="text-[9px] block text-slate-400 uppercase tracking-wider">Rating</span>
                      <span className="text-amber-600 flex items-center justify-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {astro.rating}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] block text-slate-400 uppercase tracking-wider">Rate</span>
                      <span className="text-slate-950">₹{astro.rate}/min</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setActivePage('chat')}
                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" /> Start Chat
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </UniqueAnimatedSection>

{/* SECTION: Premium Institutional Kundli & Panchang Side-by-Side Split Workspace */}
<UniqueAnimatedSection animationType="scale-up">
  <section className="py-16 px-6 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      
      {/* LEFT COLUMN PANEL: Verified Kundli Creation Module */}
      <div className="bg-white border border-amber-200/80 rounded-3xl shadow-xl shadow-orange-500/5 overflow-hidden w-full">
        {/* Header Identity Strips */}
        <div className="bg-[#FCFAF6] border-b border-amber-100 px-6 py-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 mt-4 mb-6 leading-tight">
            Kundli / <span className="text-orange-600 uppercase tracking-tight">Birth Chart</span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1.5">
            Generate Instant Vedic Planetary Layout Formats
          </p>
        </div>

        {/* Input Configuration Workspace */}
        <form onSubmit={(e) => e.preventDefault()} className="p-6 sm:p-10 space-y-6">
          <div>
            {/* Synchronized label configuration with institutional tracking specs */}
            <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
              Enter Birth Details
            </label>
            <input 
              type="text" 
              placeholder="Name"
              className="w-full bg-[#FCFAF6] border border-amber-200 p-3.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider outline-none text-slate-800 placeholder-slate-400 focus:border-orange-500 bg-white transition-colors"
            />
          </div>

          {/* Gender Custom Form Dropdown Selection */}
          <div>
            <select className="w-full bg-[#FCFAF6] border border-amber-200 p-3.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-widest outline-none text-slate-700 focus:border-orange-500 bg-white cursor-pointer transition-colors">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other / Non-Binary</option>
            </select>
          </div>

          {/* Date Parameter Split Matrix (DD / MM / YYYY) */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <input 
                type="number" 
                placeholder="28"
                min="1"
                max="31"
                className="w-full text-center bg-[#FCFAF6] border border-amber-200 p-3.5 rounded-xl text-xs sm:text-sm font-mono font-black outline-none text-slate-800 placeholder-slate-400 focus:border-orange-500 bg-white transition-colors"
              />
            </div>
            <div>
              <input 
                type="number" 
                placeholder="5"
                min="1"
                max="12"
                className="w-full text-center bg-[#FCFAF6] border border-amber-200 p-3.5 rounded-xl text-xs sm:text-sm font-mono font-black outline-none text-slate-800 placeholder-slate-400 focus:border-orange-500 bg-white transition-colors"
              />
            </div>
            <div>
              <input 
                type="number" 
                placeholder="2026"
                className="w-full text-center bg-[#FCFAF6] border border-amber-200 p-3.5 rounded-xl text-xs sm:text-sm font-mono font-black outline-none text-slate-800 placeholder-slate-400 focus:border-orange-500 bg-white transition-colors"
              />
            </div>
          </div>

          {/* Precise Birth Time Matrix (HH / MM / SS) */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <input 
                type="number" 
                placeholder="12"
                min="0"
                max="23"
                className="w-full text-center bg-[#FCFAF6] border border-amber-200 p-3.5 rounded-xl text-xs sm:text-sm font-mono font-black outline-none text-slate-800 placeholder-slate-400 focus:border-orange-500 bg-white transition-colors"
              />
            </div>
            <div>
              <input 
                type="number" 
                placeholder="33"
                min="0"
                max="59"
                className="w-full text-center bg-[#FCFAF6] border border-amber-200 p-3.5 rounded-xl text-xs sm:text-sm font-mono font-black outline-none text-slate-800 placeholder-slate-400 focus:border-orange-500 bg-white transition-colors"
              />
            </div>
            <div>
              <input 
                type="number" 
                placeholder="53"
                min="0"
                max="59"
                className="w-full text-center bg-[#FCFAF6] border border-amber-200 p-3.5 rounded-xl text-xs sm:text-sm font-mono font-black outline-none text-slate-800 placeholder-slate-400 focus:border-orange-500 bg-white transition-colors"
              />
            </div>
          </div>

          {/* Geographic Coordinates Parameter Anchor */}
          <div>
            <input 
              type="text" 
              placeholder="Birth place"
              className="w-full bg-[#FCFAF6] border border-amber-200 p-3.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider outline-none text-slate-800 placeholder-slate-400 focus:border-orange-500 bg-white transition-colors"
            />
          </div>

          {/* Form Action Dispatch Node */}
          <div className="pt-2 text-center">
            <button 
              type="submit"
              onClick={() => setActivePage('horoscope')}
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md shadow-orange-500/10 hover:-translate-y-0.5 focus:outline-none"
            >
              Get Kundli
            </button>
          </div>
        </form>
      </div>

      {/* RIGHT COLUMN PANEL: Verified Native Daily Panchang Engine Data Sheet Component */}
      <div className="bg-white border border-amber-200/80 rounded-3xl shadow-xl shadow-orange-500/5 overflow-hidden w-full">
        {/* Component Header Mirroring image_b0259b.png */}
        <div className="bg-[#FCFAF6] border-b border-amber-100 px-6 py-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 mt-4 mb-6 leading-tight uppercase tracking-tight">
            Panchang
          </h2>
          <p className="text-xs sm:text-sm font-black text-slate-800 tracking-wide uppercase mt-1">
            New Delhi, India (28 May, 2026)
          </p>
        </div>

        {/* Data Points Framework matching image_b0259b.png */}
        <div className="p-6 sm:p-10 divide-y divide-amber-100/60 text-xs sm:text-sm font-bold text-slate-700 space-y-4">
          
          {/* Top Astronomical Metrics Area */}
          <div className="space-y-3.5 pb-4">
            <p className="leading-relaxed">
              <span className="text-slate-400 uppercase font-black text-[11px] tracking-wider mr-2">Tithi:</span> 
              Shukla <span className="text-orange-600 underline cursor-pointer decoration-amber-300">Dwadashi</span> upto 07:59:42
            </p>
            <p className="leading-relaxed">
              <span className="text-slate-400 uppercase font-black text-[11px] tracking-wider mr-2">Month Amanta:</span> 
              Jyeshtha (Adhik)
            </p>
            <p className="leading-relaxed">
              <span className="text-slate-400 uppercase font-black text-[11px] tracking-wider mr-2">Month Purnimanta:</span> 
              Jyeshtha (Adhik)
            </p>
            <p className="leading-relaxed">
              <span className="text-slate-400 uppercase font-black text-[11px] tracking-wider mr-2">Day:</span> 
              Guruvara | <span className="text-slate-900 font-black">Samvat:</span> 2083
            </p>
          </div>

          {/* Lower Transit Core Alignment Rows */}
          <div className="space-y-3.5 pt-5">
            <p className="leading-relaxed">
              <span className="text-slate-400 uppercase font-black text-[11px] tracking-wider mr-2">Nakshatra:</span> 
              <span className="text-orange-600 underline cursor-pointer decoration-amber-300">Chitra</span> upto 08:09:05
            </p>
            <p className="leading-relaxed">
              <span className="text-slate-400 uppercase font-black text-[11px] tracking-wider mr-2">Yoga:</span> 
              <span className="text-orange-600 underline cursor-pointer decoration-amber-300">Variyan</span> upto 27:53:57
            </p>
            <p className="leading-relaxed">
              <span className="text-slate-400 uppercase font-black text-[11px] tracking-wider mr-2">Karan:</span> 
              <span className="text-orange-600 underline cursor-pointer decoration-amber-300">Baalav</span> upto 07:59:42, 
              <span className="text-orange-600 underline cursor-pointer decoration-amber-300 ml-1">Kolav</span> upto 20:54:41
            </p>
          </div>

          {/* Dynamic Interactive Call to Action Node */}
          <div className="pt-6 text-center border-t border-amber-100">
            <button 
              onClick={() => setActivePage('horoscope')}
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md shadow-orange-500/10 hover:-translate-y-0.5 focus:outline-none"
            >
              Today Panchang
            </button>
          </div>

        </div>
      </div>

    </div>
  </section>
</UniqueAnimatedSection>
      

      {/* SECTION 4: Right-to-Left Lateral Slide Entry */}
      <UniqueAnimatedSection animationType="slide-right">
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <span className="text-[10px] font-black tracking-widest text-orange-600 uppercase bg-orange-50 px-3 py-1 rounded-full">Secure Enterprise Ecosystem</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 mt-4 mb-6 leading-tight">Why Millions Place Trust In Our Panel Answers</h2>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">
                We stand apart from fragmented astrological portals by enforcing standard, non-negotiable compliance protocols for user identity anonymity and vetting accuracy.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Rigorous 4-Stage Astrologer Interview Screening</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Every vendor undergoes background tracking and technical chart testing.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Absolute Anonymity Framework</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Your profile name, chat query strings, and birth configurations are securely purged.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Verified System Audited Reviews Only</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">100% of reviews originate exclusively from confirmed premium transaction clients.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Metrics Grid Container Layout */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-amber-100/70 text-center">
                <Users2 className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <h3 className="text-2xl font-black text-slate-900">10M+</h3>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-1">Happy Users Served</p>
              </div>
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-6 rounded-2xl text-white text-center shadow-md shadow-orange-500/10">
                <Award className="w-8 h-8 text-white mx-auto mb-2" />
                <h3 className="text-2xl font-black">5,000+</h3>
                <p className="text-xs font-bold text-amber-100 uppercase tracking-wide mt-1">Verified Experts</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-amber-100/70 text-center col-span-2">
                <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <h3 className="text-xl font-black text-slate-900">100% Secure Transaction Nodes</h3>
                <p className="text-xs font-semibold text-slate-400 mt-1">PCI-DSS Compliant Payment Gateways</p>
              </div>
            </div>

          </div>
        </section>
      </UniqueAnimatedSection>

      {/* SECTION 5: Rotational Shift Infinite Review Ticker Loop */}
      <UniqueAnimatedSection animationType="reveal-rotate">
        <section className="py-16 px-6 bg-amber-50/50 border-t border-b border-amber-100 overflow-hidden">
          <style dangerouslySetInnerHTML={{__html: `
            .hide-scrollbar-ticker::-webkit-scrollbar { display: none; }
            .hide-scrollbar-ticker { -ms-overflow-style: none; scrollbar-width: none; }
            @keyframes ticker-scroll-forward { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
            .animate-ticker-forward { animation: ticker-scroll-forward 25s linear infinite; }
            .animate-ticker-forward:hover { animation-play-state: paused; }
          `}} />

          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Stories From Our Blessed Users</h2>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mt-2 mb-10">Real Experiences From Across The Globe</p>
          </div>

          <div className="relative w-full overflow-x-auto hide-scrollbar-ticker pointer-events-auto">
            <div className="flex gap-6 w-max px-4 animate-ticker-forward">
              
              {/* Render Box Iteration 1 */}
              {REVIEWS.map((rev) => (
                <div 
                  key={`rev-loop-1-${rev.id}`} 
                  className="bg-white p-6 rounded-2xl border border-amber-100/60 shadow-sm text-left flex flex-col justify-between w-[280px] sm:w-[360px] shrink-0 select-none"
                >
                  <div>
                    <div className="flex gap-0.5 text-amber-400 mb-3">
                      {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium italic leading-relaxed">"{rev.text}"</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900">{rev.name}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">{rev.location}</span>
                  </div>
                </div>
              ))}

              {/* Render Box Iteration 2 (Loop Mirror) */}
              {REVIEWS.map((rev) => (
                <div 
                  key={`rev-loop-2-${rev.id}`} 
                  className="bg-white p-6 rounded-2xl border border-amber-100/60 shadow-sm text-left flex flex-col justify-between w-[280px] sm:w-[360px] shrink-0 select-none"
                >
                  <div>
                    <div className="flex gap-0.5 text-amber-400 mb-3">
                      {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium italic leading-relaxed">"{rev.text}"</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900">{rev.name}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">{rev.location}</span>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </section>
      </UniqueAnimatedSection>

      {/* SECTION 6: Top-Down Dropdown Entry */}
      <UniqueAnimatedSection animationType="top-down">
        <section className="py-20 px-6 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <HelpCircle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Questions Before You Consult?</h2>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mt-2">Clear Answers to Help You Begin Securely</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-amber-100 overflow-hidden transition-all shadow-sm">
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left font-black text-sm sm:text-base text-slate-900 hover:bg-amber-50/20 transition-all"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openFaq === index ? 'rotate-180 text-orange-500' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed border-t border-dashed border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </UniqueAnimatedSection>

      {/* SECTION 7: Perspective Flip-Up Card Reveal */}
      <UniqueAnimatedSection animationType="flip-up">
        <section className="py-12 px-6 max-w-7xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-orange-500/10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Consult on the Go with Our Native App</h2>
              <p className="text-xs sm:text-sm font-medium text-amber-50 max-w-xl mt-2 leading-relaxed">
                Download the AstroNova smartphone build to unlock instant push alerts for favorite astrologer logins, continuous private sessions, and premium discount nodes.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <div className="bg-slate-950 text-white rounded-xl px-4 py-2.5 text-xs font-bold cursor-pointer hover:bg-slate-900 transition-colors flex items-center gap-2 border border-slate-800">
                <Smartphone className="w-4 h-4" />
                <div>
                  <span className="text-[10px] font-normal block opacity-70">Download on</span>
                  <span>Google Play</span>
                </div>
              </div>
              <div className="bg-slate-950 text-white rounded-xl px-4 py-2.5 text-xs font-bold cursor-pointer hover:bg-slate-900 transition-colors flex items-center gap-2 border border-slate-800">
                <Smartphone className="w-4 h-4" />
                <div>
                  <span className="text-[10px] font-normal block opacity-70">Download on</span>
                  <span>App Store</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </UniqueAnimatedSection>

    </div>
  );
}