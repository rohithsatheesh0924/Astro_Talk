import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Star, 
  ChevronLeft, 
  ShoppingBag, 
  SlidersHorizontal, 
  Sparkles, 
  ShieldCheck, 
  Gem, 
  Flame, 
  BookOpen 
} from 'lucide-react';

// Importing your custom animation component to ensure consistency
import UniqueAnimatedSection from '../components/UniqueAnimatedSection';

const STORE_CATEGORIES = [
  { id: 'All', label: 'All Products', icon: SlidersHorizontal },
  { id: 'Gemstones', label: 'Premium Gemstones', icon: Gem },
  { id: 'Rudraksha', label: 'Sacred Rudraksha', icon: Flame },
  { id: 'Yantras', label: 'Vastu Yantras', icon: ShieldCheck },
  { id: 'Books', label: 'Vedic Literature', icon: BookOpen },
];

const PRODUCTS_DATA = [
  { id: 1, name: 'Natural Blue Sapphire (Neelam)', category: 'Gemstones', price: 14500, rating: 4.9, reviews: 340, description: 'Lab-certified 4.25 carat natural unheated sapphire for Saturn alignment.', image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=300' },
  { id: 2, name: '5 Mukhi Indonesian Rudraksha Mala', category: 'Rudraksha', price: 2100, rating: 4.8, reviews: 1240, description: '108+1 premium configuration beads for mental clarity and stress containment.', image: 'https://images.unsplash.com/photo-1605289982774-9a6fef564df8?w=300' },
  { id: 3, name: 'Pure Copper Sri Yantra Grid', category: 'Yantras', price: 4200, rating: 5.0, reviews: 180, description: 'Heavy-gauge mathematically accurate layout for financial architecture expansion.', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300' },
  { id: 4, name: 'Brihat Parashara Hora Sastra', category: 'Books', price: 1250, rating: 4.7, reviews: 95, description: 'Comprehensive classic hardbound edition translated into clean English scripts.', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300' },
  { id: 5, name: 'Natural Yellow Sapphire (Pukhraj)', category: 'Gemstones', price: 18900, rating: 4.93, reviews: 512, description: 'Certified flawless unheated gemstone supporting Jupiter planetary transits.', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300' },
  { id: 6, name: 'Original 7 Mukhi Rudraksha Bead', category: 'Rudraksha', price: 3500, rating: 4.85, reviews: 420, description: 'Sourced from elite Nepali farms to stimulate incoming asset liquidity loops.', image: 'https://images.unsplash.com/photo-1596516109370-29001ec8ec36?w=300' },
];

export default function AstroStorePage({ setActivePage }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-amber-50/30 text-slate-900 overflow-x-hidden min-h-screen pb-20">
      
      {/* SECTION 1: Header with fade-in animation */}
      <UniqueAnimatedSection animationType="fade-up">
        <section className="relative bg-gradient-to-b from-amber-100 via-amber-50 to-white pt-12 pb-16 px-6 border-b border-amber-100">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <button onClick={() => setActivePage('home')} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 bg-white border border-amber-200 px-4 py-2 rounded-xl hover:bg-amber-50/50 transition-all mb-4 shadow-sm">
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" /> Back to Dashboard
              </button>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                Astro<span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">Nova Store</span>
              </h1>
            </div>
            <div className="flex items-center gap-3 bg-white border border-amber-200 p-3 rounded-2xl w-full md:max-w-md shadow-sm">
              <Search className="w-4 h-4 text-orange-500 shrink-0 ml-1" />
              <input type="text" placeholder="Search catalog..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent text-xs sm:text-sm w-full outline-none font-medium text-slate-800 placeholder-slate-400" />
            </div>
          </div>
        </section>
      </UniqueAnimatedSection>

      {/* SECTION 2: Categories with fade-up animation */}
      <UniqueAnimatedSection animationType="fade-up">
        <section className="py-12 px-6 max-w-7xl mx-auto border-b border-amber-200/50 bg-[#FDFBF9]/40 rounded-3xl mb-8">
          <div className="flex gap-5 overflow-x-auto pb-2 pt-2 items-center px-2 hide-scrollbar-engine">
            {STORE_CATEGORIES.map((cat) => {
              const CatIcon = cat.icon;
              return (
                <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`flex flex-col items-center bg-white p-6 min-w-[170px] rounded-2xl border transition-all duration-300 ${selectedCategory === cat.id ? 'border-orange-500 bg-gradient-to-b from-white to-amber-50/20 ring-4 ring-orange-500/5 -translate-y-1.5' : 'border-amber-200/60'}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 border ${selectedCategory === cat.id ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' : 'bg-amber-50/60 text-orange-600'}`}>
                    <CatIcon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-black tracking-widest uppercase ${selectedCategory === cat.id ? 'text-orange-600' : 'text-slate-900'}`}>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </section>
      </UniqueAnimatedSection>

      {/* SECTION 3: Product Grid with scale-up animation */}
      <UniqueAnimatedSection animationType="scale-up">
        <section className="px-6 max-w-7xl mx-auto py-6">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white border border-amber-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
                  <div className="relative overflow-hidden bg-amber-50/20 h-52 shrink-0 border-b border-amber-100">
                    <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-white/90 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase text-orange-700">{product.category}</div>
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <h3 className="text-base font-black text-slate-900 mb-2">{product.name}</h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">{product.description}</p>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <span className="text-lg font-black text-slate-950">₹{product.price.toLocaleString('en-IN')}</span>
                      <button className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-black uppercase rounded-xl">Purchase</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-dashed border-amber-200 rounded-2xl">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">No catalog items match your search parameter</p>
            </div>
          )}
        </section>
      </UniqueAnimatedSection>
    </div>
  );
}