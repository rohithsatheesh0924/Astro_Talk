import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft,
  Sun,
  Moon,
  Calendar,
  Sparkle,
  MessageSquare,
  ChevronDown,
  Orbit,     
  Flame,     
  Globe,     
  Wind,      
  Waves,     
  Compass,   
  Activity,  
  ShieldCheck,
  TrendingUp,
  Layers 
} from 'lucide-react';

// Structured Traditional Zodiac Reference Dataset with High-End Icons
const ZODIAC_SIGNS = [
  { id: 'aries', name: 'Aries', date: 'Mar 21 - Apr 19', icon: Flame, element: 'Fire', rulingPlanet: 'Mars' },
  { id: 'taurus', name: 'Taurus', date: 'Apr 20 - May 20', icon: Globe, element: 'Earth', rulingPlanet: 'Venus' },
  { id: 'gemini', name: 'Gemini', date: 'May 21 - Jun 20', icon: Wind, element: 'Air', rulingPlanet: 'Mercury' },
  { id: 'cancer', name: 'Cancer', date: 'Jun 21 - Jul 22', icon: Waves, element: 'Water', rulingPlanet: 'Moon' },
  { id: 'leo', name: 'Leo', date: 'Jul 23 - Aug 22', icon: Sun, element: 'Fire', rulingPlanet: 'Sun' },
  { id: 'virgo', name: 'Virgo', date: 'Aug 23 - Sep 22', icon: Compass, element: 'Earth', rulingPlanet: 'Mercury' },
  { id: 'libra', name: 'Libra', date: 'Sep 23 - Oct 22', icon: Activity, element: 'Air', rulingPlanet: 'Venus' },
  { id: 'scorpio', name: 'Scorpio', date: 'Oct 23 - Nov 21', icon: Orbit, element: 'Water', rulingPlanet: 'Mars' },
];

const MOCK_HOROSCOPES = {
  personal: "Planetary alignments favor structured analytical shifts today. A sudden wave of positive cosmic energy assists you in breaking through operational blockages that have slowed down your recent personal execution pipelines.",
  profession: "The solar transit through your secondary house creates an optimal blueprint for strategic commercial expansions. Avoid making speculative capital investments in the afternoon, but remain fully open to long-term collaborative agreements.",
  emotions: "Lunar aspects recommend deliberate balance in close relationship networks. Clear, transparent communication is strongly favored over keeping your emotional states closed off from those who provide your inner baseline stability.",
  health: "Metabolic and physical energy levels remain highly synchronized under the current solar cycle. It is an excellent window to introduce structured wellness routines or clear chronic fatigue points through deliberate downtime blocks.",
  travel: "Mercury's current path indicates clear avenues for short-distance business transit or property-focused routing. Double-check small scheduling parameters if departing during the afternoon transition phase."
};

// Reusable Intersection Observer for structural specific transition effects
function HoroscopeAnimatedWrapper({ children, animationVariant = 'fade-up' }) {
  const [isVisible, setIsVisible] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); 
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const variants = {
    'scale-reveal': isVisible ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-md',
    'slide-from-left': isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12',
    'card-perspective-flip': isVisible ? 'opacity-100 [transform:perspective(1200px)_rotateY(0deg)]' : 'opacity-0 [transform:perspective(1200px)_rotateY(-8deg)]',
    'slide-from-right': isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
  };

  return (
    <div
      ref={nodeRef}
      className={`transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) transform will-change-transform ${variants[animationVariant]}`}
    >
      {children}
    </div>
  );
}

export default function HoroscopePage({ setActivePage }) {
  const [selectedSign, setSelectedSign] = useState(ZODIAC_SIGNS[0]);
  const [timeframe, setTimeframe] = useState('Today'); 
  const [openInsight, setOpenInsight] = useState('personal'); 

  return (
    <div className="bg-amber-50/30 text-slate-900 min-h-screen pb-20 overflow-x-hidden">
      
      {/* SECTION 1: Dynamic Premium Header Banner with Scale Reveal */}
      <HoroscopeAnimatedWrapper animationVariant="scale-reveal">
        <section className="relative bg-gradient-to-b from-amber-100 via-amber-50 to-white pt-12 pb-16 px-6 overflow-hidden border-b border-amber-100">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <button 
                onClick={() => setActivePage('home')}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 bg-white border border-amber-200 px-4 py-2 rounded-xl hover:bg-amber-50/50 transition-all mb-4 shadow-sm"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" /> Back to Dashboard
              </button>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                Daily <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">Horoscope Insights</span>
              </h1>
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Real-Time Planetary Alignments & Mathematical Forecasts
              </p>
            </div>

            {/* Timeframe Selector Tab Array */}
            <div className="flex gap-1 bg-white p-1.5 rounded-2xl border border-amber-200 shadow-sm shrink-0 self-start md:self-center">
              {['Today', 'Weekly', 'Monthly'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTimeframe(tab)}
                  className={`text-xs font-bold px-4 py-2.5 rounded-xl uppercase tracking-wider transition-all ${
                    timeframe === tab
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </section>
      </HoroscopeAnimatedWrapper>

      {/* SECTION 2: Horizontal Sign Selection Carousel Matrix with Slide From Left */}
      <HoroscopeAnimatedWrapper animationVariant="slide-from-left">
        <section className="py-12 px-6 max-w-7xl mx-auto border-b border-amber-200/50 bg-[#FDFBF9]/40 rounded-3xl mb-8 overflow-hidden">
          {/* Style sheet injection targeting WebKit and Firefox framework scrolling engines */}
          <style dangerouslySetInnerHTML={{__html: `
            .hide-scrollbar-horoscope::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar-horoscope {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            @keyframes horoscope-scroll-forward {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-horoscope-forward {
              animation: horoscope-scroll-forward 30s linear infinite;
            }
            .animate-horoscope-forward:hover {
              animation-play-state: paused;
            }
          `}} />

          {/* Horizontal Sign Selection Container with strict right-to-left marquee animation pipeline */}
          <div className="relative w-full overflow-x-auto hide-scrollbar-horoscope pointer-events-auto">
            <div className="flex gap-5 w-max px-2 py-2 items-center snap-x animate-horoscope-forward">
              
              {/* Render Loop Iteration 1 */}
              {ZODIAC_SIGNS.map((sign) => {
                const SignIcon = sign.icon;
                const isSelected = selectedSign.id === sign.id;
                return (
                  <button
                    key={`zod-track-1-${sign.id}`}
                    onClick={() => setSelectedSign(sign)}
                    className={`flex flex-col items-center bg-white p-7 min-w-[160px] rounded-2xl border transition-all duration-300 snap-item shadow-sm hover:shadow-md ${
                      isSelected 
                        ? 'border-orange-500 bg-gradient-to-b from-white to-amber-50/20 ring-4 ring-orange-500/5 -translate-y-1.5' 
                        : 'border-amber-200/60 hover:border-orange-400'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 border shadow-sm ${
                      isSelected 
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-transparent scale-110 shadow-orange-500/10' 
                        : 'bg-amber-50/60 text-orange-600 border-amber-200/40 group-hover:bg-amber-100'
                    }`}>
                      <SignIcon className="w-6 h-6 stroke-[1.75]" />
                    </div>

                    <span className={`text-sm font-black tracking-widest uppercase transition-colors ${
                      isSelected ? 'text-orange-600' : 'text-slate-900'
                    }`}>
                      {sign.name}
                    </span>
                    
                    <span className="text-[10px] text-slate-400 font-bold mt-1.5 whitespace-nowrap tracking-wide">
                      {sign.date}
                    </span>
                  </button>
                );
              })}

              {/* Render Loop Iteration 2 (Creates the continuous infinite loop mirror) */}
              {ZODIAC_SIGNS.map((sign) => {
                const SignIcon = sign.icon;
                const isSelected = selectedSign.id === sign.id;
                return (
                  <button
                    key={`zod-track-2-${sign.id}`}
                    onClick={() => setSelectedSign(sign)}
                    className={`flex flex-col items-center bg-white p-7 min-w-[160px] rounded-2xl border transition-all duration-300 snap-item shadow-sm hover:shadow-md ${
                      isSelected 
                        ? 'border-orange-500 bg-gradient-to-b from-white to-amber-50/20 ring-4 ring-orange-500/5 -translate-y-1.5' 
                        : 'border-amber-200/60 hover:border-orange-400'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 border shadow-sm ${
                      isSelected 
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-transparent scale-110 shadow-orange-500/10' 
                        : 'bg-amber-50/60 text-orange-600 border-amber-200/40 group-hover:bg-amber-100'
                    }`}>
                      <SignIcon className="w-6 h-6 stroke-[1.75]" />
                    </div>

                    <span className={`text-sm font-black tracking-widest uppercase transition-colors ${
                      isSelected ? 'text-orange-600' : 'text-slate-900'
                    }`}>
                      {sign.name}
                    </span>
                    
                    <span className="text-[10px] text-slate-400 font-bold mt-1.5 whitespace-nowrap tracking-wide">
                      {sign.date}
                    </span>
                  </button>
                );
              })}

            </div>
          </div>
        </section>
      </HoroscopeAnimatedWrapper>

      {/* SECTION 3: Deep Metrics Display Grid Split Layout */}
      <section className="py-12 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Technical Metadata Parameters Card with Perspective Flip */}
        <div className="lg:col-span-4 w-full">
          <HoroscopeAnimatedWrapper animationVariant="card-perspective-flip">
            <div className="bg-white border border-amber-200/70 p-6 rounded-2xl shadow-sm">
              <div className="text-center pb-6 border-b border-slate-100">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
                  <selectedSign.icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h2 className="text-2xl font-black text-slate-950 uppercase tracking-tight">{selectedSign.name}</h2>
                <span className="text-xs text-slate-400 font-bold tracking-widest uppercase mt-1 block">{selectedSign.date}</span>
              </div>

              {/* Clean Data Matrix Rows */}
              <div className="mt-6 space-y-3 text-xs font-bold uppercase tracking-wider">
                <div className="flex justify-between items-center p-3.5 bg-[#FAF8F5] rounded-xl border border-amber-200/40">
                  <span className="text-slate-400">Natural Element</span>
                  <span className="text-orange-600 font-black">{selectedSign.element}</span>
                </div>
                <div className="flex justify-between items-center p-3.5 bg-[#FAF8F5] rounded-xl border border-amber-200/40">
                  <span className="text-slate-400">Ruling Planet</span>
                  <span className="text-slate-800 font-black">{selectedSign.rulingPlanet}</span>
                </div>
                <div className="flex justify-between items-center p-3.5 bg-[#FAF8F5] rounded-xl border border-amber-200/40">
                  <span className="text-slate-400">Energy Matrix</span>
                  <span className="text-amber-600 font-black">Highly Stable</span>
                </div>
              </div>

              {/* Themed Call-to-Action Action Area */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <button 
                  onClick={() => setActivePage('chat')}
                  className="w-full py-3.5 bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md shadow-orange-500/10 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 stroke-[2]" /> Discuss {selectedSign.name} Chart Live
                </button>
              </div>
            </div>
          </HoroscopeAnimatedWrapper>
        </div>

        {/* Right Column: High-Density 5-Item Text Insight Accordion Panel with Slide From Right */}
        <div className="lg:col-span-8 space-y-4 w-full">
          <HoroscopeAnimatedWrapper animationVariant="slide-from-right">
            <div className="space-y-4">
              {[
                { id: 'personal', title: 'Personal & Vitality Forecast', icon: Sparkle, text: MOCK_HOROSCOPES.personal },
                { id: 'profession', title: 'Career, Finance & Strategy Blueprint', icon: TrendingUp, text: MOCK_HOROSCOPES.profession },
                { id: 'emotions', title: 'Relational & Emotional Alignment', icon: Layers, text: MOCK_HOROSCOPES.emotions },
                { id: 'health', title: 'Health, Wellness & Energy Cycles', icon: ShieldCheck, text: MOCK_HOROSCOPES.health },
                { id: 'travel', title: 'Travel & Planetary Transit Vectors', icon: Compass, text: MOCK_HOROSCOPES.travel }
              ].map((item) => {
                const ItemIcon = item.icon;
                const isOpen = openInsight === item.id;
                return (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-2xl border border-amber-200/70 overflow-hidden shadow-sm transition-all hover:border-orange-400"
                  >
                    <button
                      onClick={() => setOpenInsight(isOpen ? null : item.id)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left font-black text-sm sm:text-base text-slate-900 hover:bg-amber-50/10 transition-all focus:outline-none group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-colors ${
                          isOpen 
                            ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-transparent' 
                            : 'bg-amber-50/60 text-orange-600 border-amber-200/40 group-hover:bg-amber-100/50'
                        }`}>
                          <ItemIcon className="w-4 h-4 stroke-[2]" />
                        </div>
                        <span className="uppercase tracking-wider text-xs sm:text-sm text-slate-800">{item.title}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-orange-500' : ''}`} />
                    </button>
                    
                    {isOpen && (
                      <div className="px-6 pb-6 pt-3 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed border-t border-dashed border-amber-100">
                        {item.text}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </HoroscopeAnimatedWrapper>
        </div>

      </section>

    </div>
  );
}