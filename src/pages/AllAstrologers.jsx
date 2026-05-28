import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, 
  Star, 
  MessageSquare, 
  ChevronLeft, 
  Compass, 
  Layers, 
  Activity, 
  Milestone,
  Fingerprint,
  PieChart,
  Sparkles,
  Globe2,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

const EXTENDED_COUNCIL_DATA = [
  { id: 1, name: 'Roshni Noom', expertise: 'Vedic, Kundli Specialist', experience: 15, rating: 4.8, rate: 45, status: 'Online', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150' },
  { id: 2, name: 'Ratna Ramn', expertise: 'Tarot Card, Numerology', experience: 12, rating: 4.9, rate: 60, status: 'Online', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150' },
  { id: 3, name: 'Alok Shastri', expertise: 'KP System, Vastu Expert', experience: 20, rating: 5.0, rate: 80, status: 'Online', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150' },
  { id: 4, name: 'Kavita Mishra', expertise: 'Psychic, Palmistry', experience: 9, rating: 4.7, rate: 35, status: 'Online', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
  { id: 5, name: 'Acharya Shastri', expertise: 'Vedic, Kundli Specialist', experience: 14, rating: 4.9, rate: 50, status: 'Busy', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
  { id: 6, name: 'Astro Radhika', expertise: 'Tarot Card, Numerology', experience: 8, rating: 4.6, rate: 40, status: 'Online', image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150' },
  { id: 7, name: 'Dr. S.K. Pal', expertise: 'KP System, Vastu Expert', experience: 22, rating: 5.0, rate: 90, status: 'Offline', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
  { id: 8, name: 'Meera Krishnan', expertise: 'Psychic, Palmistry', experience: 11, rating: 4.8, rate: 55, status: 'Online', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150' }
];

function CouncilAnimatedSection({ children, layoutType = 'fade-tracking' }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  const styles = {
    'fade-tracking': isVisible ? 'opacity-100 translate-y-0 filter blur-0' : 'opacity-0 translate-y-4 filter blur-[2px]',
    'slide-left-smooth': isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8',
    'stagger-pop-up': isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-[0.99]'
  };

  return (
    <div ref={elementRef} className={`transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) transform will-change-transform ${styles[layoutType]}`}>
      {children}
    </div>
  );
}

// FIXED: Added setSelectedAstrologer hook param to route chat context safely
export default function AllAstrologers({ setActivePage, setSelectedAstrologer }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredCouncil = useMemo(() => {
    return EXTENDED_COUNCIL_DATA.filter((astro) => {
      const matchesSearch = astro.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            astro.expertise.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedFilter === 'All' || astro.expertise.toLowerCase().includes(selectedFilter.toLowerCase());
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedFilter]);

  const handleStartChat = (astro) => {
    if (setSelectedAstrologer) {
      setSelectedAstrologer(astro);
    }
    setActivePage('chat');
  };

  return (
    <div className="bg-amber-50/30 text-slate-900 overflow-x-hidden min-h-screen pb-20">
      
      <CouncilAnimatedSection layoutType="fade-tracking">
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
                Our Expert <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">Astrologer Panel</span>
              </h1>
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Verified Cosmic Consultants Available Instantly
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white border border-amber-200 p-3 rounded-2xl w-full md:max-w-md shadow-sm focus-within:border-orange-400 transition-colors">
              <Search className="w-4 h-4 text-orange-500 shrink-0 ml-1" />
              <input 
                type="text" 
                placeholder="Search by expert name or traditional system..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs sm:text-sm w-full font-medium outline-none text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>
        </section>
      </CouncilAnimatedSection>

      <CouncilAnimatedSection layoutType="slide-left-smooth">
        <section className="py-8 px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 bg-white px-3 py-2 rounded-xl border border-amber-100 shadow-sm">
              <SlidersHorizontal className="w-3.5 h-3.5 text-orange-500" /> Filter
            </div>
            {['All', 'Vedic', 'Tarot Card', 'KP System', 'Psychic'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedFilter(category)}
                className={`text-xs font-bold px-4 py-2 rounded-xl border tracking-wide whitespace-nowrap transition-all ${
                  selectedFilter === category
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 border-transparent text-white shadow-md'
                    : 'bg-white border-amber-200 text-slate-600 hover:border-orange-300 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
      </CouncilAnimatedSection>

      <CouncilAnimatedSection layoutType="stagger-pop-up">
        <section className="px-6 max-w-7xl mx-auto">
          {filteredCouncil.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCouncil.map((astro) => (
                <div 
                  key={astro.id} 
                  className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group overflow-hidden"
                >
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      astro.status === 'Online' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      astro.status === 'Busy' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-slate-50 text-slate-500 border-slate-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        astro.status === 'Online' ? 'bg-emerald-500 animate-pulse' :
                        astro.status === 'Busy' ? 'bg-amber-500' : 'bg-slate-400'
                      }`} /> 
                      {astro.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <img src={astro.image} alt={astro.name} className="w-14 h-14 rounded-full object-cover border-2 border-amber-200" />
                    <div>
                      <h3 className="text-base font-black text-slate-900 tracking-tight">{astro.name}</h3>
                      <p className="text-xs font-medium text-slate-400 mt-0.5">{astro.expertise}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1 bg-slate-50 p-2.5 rounded-xl text-center mb-4 border border-slate-100 text-[11px] font-bold">
                    <div>
                      <span className="text-[9px] block text-slate-400 uppercase tracking-wider">Experience</span>
                      <span className="text-slate-800 font-black">{astro.experience} Yrs</span>
                    </div>
                    <div>
                      <span className="text-[9px] block text-slate-400 uppercase tracking-wider">Rating</span>
                      <span className="text-amber-600 font-black flex items-center justify-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {astro.rating}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] block text-slate-400 uppercase tracking-wider">Rate</span>
                      <span className="text-slate-950 font-black">₹{astro.rate}/min</span>
                    </div>
                  </div>

                  {/* FIXED: Formatted the click trigger action mapping to forward data profiles safely */}
                  <button 
                    onClick={() => handleStartChat(astro)}
                    disabled={astro.status === 'Offline'}
                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:from-slate-100 disabled:to-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                  >
                    <MessageSquare className="w-4 h-4" /> {astro.status === 'Busy' ? 'Queue Chat' : 'Start Chat'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-dashed border-amber-200 rounded-2xl">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">No astrologers found matching your filter selection</p>
            </div>
          )}
        </section>
      </CouncilAnimatedSection>

    </div>
  );
}