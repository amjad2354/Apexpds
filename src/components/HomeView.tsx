import React from 'react';
import { Hero } from './Hero';
import { Stats } from './Stats';
import { FeaturedProperties } from './FeaturedProperties';
import { CallToAction } from './CallToAction';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck, Eye, Headphones, Sparkles, Star, Quote, ArrowRight,
  TrendingUp, Award, CheckCircle
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { setActiveTab } = useApp();

  const testimonials = [
    {
      name: 'Harrison Sterling',
      role: 'Private Equity Principal',
      location: 'Beverly Hills, CA',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      quote: 'Apex PDS Solutions negotiated our modern villa acquisition off-market with absolute confidentiality. Their valuation model saved us over $400k during closing.'
    },
    {
      name: 'Camilla Dupont',
      role: 'Interior Architect & Developer',
      location: 'Tribeca, New York',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      quote: 'Selling our flagship penthouse through Apex was frictionless. We received three competitive bids within 12 days and finalized well above asking price.'
    },
    {
      name: 'Julian Thorne',
      role: 'Tech Executive & Investor',
      location: 'Lake Austin, TX',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      quote: 'The 3D virtual walkthrough and seamless tour scheduling made evaluating residences across the country effortless. Truly white-glove luxury service.'
    }
  ];

  return (
    <div>
      {/* Hero with live search */}
      <Hero />

      {/* Verified Stats */}
      <Stats />

      {/* Featured Properties Grid */}
      <FeaturedProperties />

      {/* Why Choose Apex Section */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Institutional Standard
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
              Why Discerning Clients Choose Apex
            </h2>
            <p className="text-gray-500 text-base sm:text-lg mt-3 leading-relaxed">
              We redefine luxury real estate through confidential advisory, verified listings, and data-driven market positioning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-gray-50/70 border border-gray-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Escrow Protected & Title Verified</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Every property listed on our marketplace undergoes strict legal due diligence, title clearance, and architectural inspection.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> Guaranteed clear title
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> Protected institutional escrow
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-gray-50/70 border border-gray-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Private & Off-Market Portfolio</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Gain confidential access to trophy properties, private islands, and penthouse penthouses not publicly listed on MLS systems.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> NDA-protected transactions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> Direct-to-owner negotiations
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-gray-50/70 border border-gray-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Headphones className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dedicated Broker Advisory</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Direct access to top-ranked brokers who handle financing coordination, architectural consultations, and relocation logistics.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> 24/7 Concierge WhatsApp access
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> Comprehensive tax & 1031 advisory
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Client Testimonials */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-wider mb-3">
              <Star className="w-3.5 h-3.5 fill-blue-600 text-blue-600" /> Client Testimonials
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
              Trusted by Discerning Homeowners
            </h2>
            <p className="text-gray-500 text-base sm:text-lg mt-3 leading-relaxed">
              Read how our dedicated senior advisors navigate luxury acquisitions and sales with precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                    <p className="text-xs text-blue-600 font-semibold">{t.role}</p>
                    <p className="text-xs text-gray-400">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <CallToAction />
    </div>
  );
};
