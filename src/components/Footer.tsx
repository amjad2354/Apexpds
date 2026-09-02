import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building, MapPin, Phone, Mail, Send, Facebook, Instagram, Linkedin,
  Shield, CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, addToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    addToast(
      'Subscribed to Market Insights!',
      `Thank you! Monthly private luxury market reports will be delivered to ${newsletterEmail}.`,
      'success'
    );
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-gray-950 text-white border-t border-gray-800 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Info (Col 1-2) */}
          <div className="lg:col-span-2">
            <div
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2 mb-6 cursor-pointer inline-flex"
            >
              <div className="bg-blue-600 p-2.5 rounded-xl">
                <Building className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Apex<span className="text-blue-500">PDS</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Apex PDS Solutions is an internationally recognized luxury real estate brokerage providing institutional advisory, bespoke property acquisitions, and confidential transaction management.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-6">Marketplace</h4>
            <ul className="space-y-3.5 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => setActiveTab('properties', { status: 'FOR SALE' })}
                  className="hover:text-white transition"
                >
                  Properties for Sale
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('properties', { status: 'FOR RENT' })}
                  className="hover:text-white transition"
                >
                  Luxury Rentals
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('sell')}
                  className="hover:text-white transition"
                >
                  List Your Residence
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('agents')}
                  className="hover:text-white transition"
                >
                  Senior Brokers
                </button>
              </li>
            </ul>
          </div>

          {/* Advisory & Support */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-6">Services</h4>
            <ul className="space-y-3.5 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="hover:text-white transition"
                >
                  Concierge Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('agents')}
                  className="hover:text-white transition"
                >
                  Advisory Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="hover:text-white transition"
                >
                  Valuation & Appraisals
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="hover:text-white transition"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-6">Market Insights</h4>
            <p className="text-gray-400 mb-4 text-xs leading-relaxed">
              Subscribe to receive off-market listings and quarterly real estate reports.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="relative">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white text-xs transition placeholder-gray-500"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 rounded-lg text-xs font-bold transition flex items-center justify-center"
                title="Subscribe"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="flex items-center gap-2 mt-4 text-[11px] text-gray-500">
              <Shield className="w-3.5 h-3.5 text-blue-500" />
              <span>We value your privacy. Unsubscribe anytime.</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Apex PDS Solutions International, LLC. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => setActiveTab('contact')} className="hover:text-gray-400 transition">Privacy Policy</button>
            <button onClick={() => setActiveTab('contact')} className="hover:text-gray-400 transition">Terms of Service</button>
            <button onClick={() => setActiveTab('contact')} className="hover:text-gray-400 transition">Equal Housing Opportunity</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
