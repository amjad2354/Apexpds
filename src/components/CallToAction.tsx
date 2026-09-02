import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Sparkles, Building, PhoneCall } from 'lucide-react';

export const CallToAction: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <section className="bg-gray-900 py-24 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 bg-gradient-to-r from-gray-950/80 to-gray-900/80 p-8 sm:p-14 rounded-3xl border border-gray-800 backdrop-blur-md">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 font-bold text-xs uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" /> High-Value Property Representation
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              Are you planning to sell or lease your property?
            </h2>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
              Partner with Apex PDS Solutions. We leverage international investor syndication and targeted private marketing to achieve maximum liquidity and optimal appraisal value.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
            <button
              onClick={() => setActiveTab('sell')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-sm transition shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2"
            >
              List Your Property <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold text-sm transition flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" /> Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
