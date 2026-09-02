import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { faqs } from '../data/mockData';
import {
  MapPin, Phone, Mail, Clock, Send, ChevronDown, ChevronUp,
  MessageSquare, Sparkles, Building
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { submitContactInquiry } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Buying & Acquisition Inquiry');
  const [message, setMessage] = useState('');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContactInquiry({
      fullName,
      email,
      phone,
      subject,
      message
    });
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Client Services
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
          Connect With Our Global Team
        </h1>
        <p className="text-gray-500 text-base sm:text-lg mt-3 leading-relaxed">
          Whether inquiring about private luxury acquisitions, listing representation, or market valuation, our advisors are here for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        {/* Contact Information & Offices (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-600" /> Flagship Offices
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Beverly Hills (HQ)</h4>
                  <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
                    9465 Wilshire Blvd, Suite 800<br />Beverly Hills, CA 90212
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Manhattan Flagship</h4>
                  <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
                    432 Park Avenue, 28th Floor<br />New York, NY 10022
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 my-6 pt-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Direct Phone</h4>
                  <p className="text-gray-500 text-xs mt-0.5">+1 (800) 555-APEX / +1 (310) 555-0190</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Direct Email</h4>
                  <p className="text-gray-500 text-xs mt-0.5">concierge@apexpds.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Operating Hours</h4>
                  <p className="text-gray-500 text-xs mt-0.5">Mon – Sat: 8:00 AM – 8:00 PM EST<br />Sun: 10:00 AM – 6:00 PM EST</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Send a Direct Message</h3>
            <p className="text-gray-500 text-sm mb-6">
              Complete the form below and an Apex Senior Broker will respond promptly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Charlotte Hayes"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="charlotte@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Inquiry Nature *
                  </label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm transition cursor-pointer"
                  >
                    <option>Buying & Acquisition Inquiry</option>
                    <option>Selling / Property Valuation</option>
                    <option>Luxury Rental Inquiry</option>
                    <option>Commercial Portfolio Advisory</option>
                    <option>Media & Partnership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Message Details *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Please describe how we can assist you with your property needs..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/25 transition text-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-4xl mx-auto pt-10 border-t border-gray-200">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="text-gray-500 text-sm mt-2">Answers to common real estate inquiries and platform features.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isExpanded = expandedFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-gray-900 text-base hover:text-blue-600 transition"
                >
                  <span>{faq.question}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 ml-4" />
                  )}
                </button>
                {isExpanded && (
                  <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
