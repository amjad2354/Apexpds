import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Home, Tag, Search, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveTab } = useApp();
  const [purpose, setPurpose] = useState<'All' | 'FOR SALE' | 'FOR RENT'>('FOR SALE');
  const [locationQuery, setLocationQuery] = useState('');
  const [propertyType, setPropertyType] = useState('All');
  const [priceRange, setPriceRange] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    let maxPrice = 10000000;
    if (priceRange === '500k') maxPrice = 500000;
    if (priceRange === '1m') maxPrice = 1000000;
    if (priceRange === '3m') maxPrice = 3000000;

    setActiveTab('properties', {
      keyword: locationQuery.trim(),
      propertyType,
      status: purpose,
      maxPrice
    });
  };

  const handleQuickSearch = (query: string, type: string) => {
    setActiveTab('properties', {
      keyword: query,
      propertyType: type,
      status: 'All'
    });
  };

  return (
    <section className="relative min-h-[700px] flex items-center justify-center pt-24 pb-20 overflow-hidden">
      {/* Background Image & Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
          className="w-full h-full object-cover scale-105 animate-pulse duration-[10000ms]"
          alt="Luxury Architecture"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-gray-950/40" />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Sub-badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-bold tracking-wider uppercase mb-6 animate-fade-in">
          <Sparkles className="w-4 h-4 text-blue-400" /> Curated Luxury Real Estate Marketplace
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
          Find a Place Where You <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-300">
            Truly Belong
          </span>
        </h1>

        <p className="text-gray-300 text-base sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Discover architectural masterpieces, private waterfront estates, and metropolitan penthouses represented by elite luxury advisors.
        </p>

        {/* Interactive Search Box */}
        <div className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-3xl shadow-2xl max-w-4xl mx-auto border border-white/40">
          {/* Purpose Toggle (Buy vs Rent) */}
          <div className="flex gap-2 mb-3 px-2">
            <button
              type="button"
              onClick={() => setPurpose('FOR SALE')}
              className={`px-5 py-2 rounded-xl font-bold text-xs transition ${
                purpose === 'FOR SALE'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Buy Properties
            </button>
            <button
              type="button"
              onClick={() => setPurpose('FOR RENT')}
              className={`px-5 py-2 rounded-xl font-bold text-xs transition ${
                purpose === 'FOR RENT'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Rent Properties
            </button>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
            {/* Location Input */}
            <div className="flex-1 flex items-center px-4 py-3 bg-gray-50/80 rounded-2xl border border-gray-100 focus-within:border-blue-600 transition">
              <MapPin className="text-blue-600 mr-3 w-5 h-5 shrink-0" />
              <input
                type="text"
                value={locationQuery}
                onChange={e => setLocationQuery(e.target.value)}
                placeholder="City, Beverly Hills, NY, Austin..."
                className="w-full bg-transparent outline-none text-gray-800 text-sm font-medium placeholder-gray-400"
              />
            </div>

            {/* Property Type Dropdown */}
            <div className="flex-1 flex items-center px-4 py-3 bg-gray-50/80 rounded-2xl border border-gray-100 focus-within:border-blue-600 transition">
              <Home className="text-blue-600 mr-3 w-5 h-5 shrink-0" />
              <select
                value={propertyType}
                onChange={e => setPropertyType(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-800 text-sm font-medium cursor-pointer"
              >
                <option value="All">All Property Types</option>
                <option value="Villa">Luxury Villa</option>
                <option value="Apartment">Apartment / Condo</option>
                <option value="Penthouse">Sky Penthouse</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            {/* Price Range Dropdown */}
            <div className="flex-1 flex items-center px-4 py-3 bg-gray-50/80 rounded-2xl border border-gray-100 focus-within:border-blue-600 transition">
              <Tag className="text-blue-600 mr-3 w-5 h-5 shrink-0" />
              <select
                value={priceRange}
                onChange={e => setPriceRange(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-800 text-sm font-medium cursor-pointer"
              >
                <option value="all">Any Price Range</option>
                <option value="500k">Under $500,000</option>
                <option value="1m">Under $1,000,000</option>
                <option value="3m">Under $3,000,000</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Search className="w-4 h-4" /> Search
            </button>
          </form>
        </div>

        {/* Quick Search Suggestions */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-300">
          <span className="font-semibold text-gray-400">Popular Searches:</span>
          {[
            { label: 'Beverly Hills Villas', query: 'Beverly Hills', type: 'Villa' },
            { label: 'Manhattan Penthouses', query: 'Manhattan', type: 'Penthouse' },
            { label: 'Austin Waterfront', query: 'Austin', type: 'Villa' },
            { label: 'Miami Beachfront', query: 'Miami', type: 'All' }
          ].map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleQuickSearch(s.query, s.type)}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition backdrop-blur-sm"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
