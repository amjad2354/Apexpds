import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Agent } from '../types';
import {
  Star, Phone, Mail, Award, Calendar, CheckCircle2,
  X, Send, Sparkles, Building2
} from 'lucide-react';

export const AgentsView: React.FC = () => {
  const { agents, submitContactInquiry, addToast } = useApp();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [consultingAgent, setConsultingAgent] = useState<Agent | null>(null);

  // Consultation Modal State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [consultationType, setConsultationType] = useState('Property Acquisition & Buying');
  const [preferredDate, setPreferredDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [message, setMessage] = useState('');

  const specialties = [
    'All',
    'Ultra-Luxury Estates',
    'Penthouses',
    'Modern Villas',
    'Commercial & Rentals'
  ];

  const filteredAgents = agents.filter(agent => {
    if (selectedSpecialty === 'All') return true;
    if (selectedSpecialty === 'Ultra-Luxury Estates') return agent.specialty.includes('Luxury');
    if (selectedSpecialty === 'Penthouses') return agent.specialty.includes('Penthouse');
    if (selectedSpecialty === 'Modern Villas') return agent.specialty.includes('Villa');
    if (selectedSpecialty === 'Commercial & Rentals') return agent.specialty.includes('Commercial') || agent.specialty.includes('Rental');
    return true;
  });

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultingAgent) return;

    submitContactInquiry({
      fullName: clientName || 'Private Client',
      email: clientEmail || 'client@example.com',
      phone: clientPhone || '+1 (555) 000-0000',
      subject: `Consultation Booking: ${consultationType} with ${consultingAgent.name}`,
      message: `Preferred Date: ${preferredDate}. Details: ${message || 'Discussion of investment and real estate portfolio goals.'}`
    });

    addToast(
      'Consultation Scheduled!',
      `Appointment with ${consultingAgent.name} confirmed for ${preferredDate}. Our office will send a calendar invite.`,
      'success'
    );

    setConsultingAgent(null);
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setMessage('');
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" /> World-Class Advisory
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
          Meet Our Senior Real Estate Advisors
        </h1>
        <p className="text-gray-500 text-base sm:text-lg mt-3 leading-relaxed">
          Over $1.8 Billion in completed luxury residential and commercial transactions. Our dedicated brokers provide bespoke white-glove representation.
        </p>
      </div>

      {/* Specialty Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-12">
        {specialties.map(spec => (
          <button
            key={spec}
            onClick={() => setSelectedSpecialty(spec)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition ${
              selectedSpecialty === spec
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredAgents.map(agent => (
          <div
            key={agent.id}
            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between"
          >
            <div>
              {/* Photo */}
              <div className="relative h-72 overflow-hidden bg-gray-100">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold text-gray-800">{agent.rating}</span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{agent.name}</h3>
                <p className="text-xs text-blue-600 font-semibold mb-2">{agent.role}</p>
                <p className="text-xs text-gray-500 line-clamp-3 mb-4 leading-relaxed">
                  {agent.bio}
                </p>

                <div className="grid grid-cols-2 gap-2 py-3 border-y border-gray-100 text-xs mb-4">
                  <div>
                    <span className="text-gray-400 block">Experience</span>
                    <span className="font-bold text-gray-800">{agent.experienceYears} Years</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Active Listings</span>
                    <span className="font-bold text-gray-800">{agent.activeListingsCount} Properties</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-gray-600 mb-5">
                  <a
                    href={`tel:${agent.phone}`}
                    className="flex items-center gap-2 hover:text-blue-600 transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-gray-400" /> {agent.phone}
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="flex items-center gap-2 hover:text-blue-600 transition"
                  >
                    <Mail className="w-3.5 h-3.5 text-gray-400" /> {agent.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => setConsultingAgent(agent)}
                className="w-full bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 font-bold py-3 rounded-2xl text-xs transition flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" /> Book Consultation
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Consultation Modal */}
      {consultingAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 relative">
            <button
              onClick={() => setConsultingAgent(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <div className="flex items-center gap-4 mb-6 pb-5 border-b border-gray-100">
                <img
                  src={consultingAgent.avatar}
                  alt={consultingAgent.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-gray-200"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Schedule with {consultingAgent.name}
                  </h3>
                  <p className="text-xs text-blue-600 font-semibold">{consultingAgent.role}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{consultingAgent.specialty}</p>
                </div>
              </div>

              <form onSubmit={handleConsultationSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Jonathan Mercer"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jonathan@mercer.com"
                      value={clientEmail}
                      onChange={e => setClientEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 123-4567"
                      value={clientPhone}
                      onChange={e => setClientPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Consultation Goal
                    </label>
                    <select
                      value={consultationType}
                      onChange={e => setConsultationType(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm cursor-pointer"
                    >
                      <option>Property Acquisition & Buying</option>
                      <option>Selling / Listing Valuation</option>
                      <option>Luxury Rental Advisory</option>
                      <option>Commercial / 1031 Exchange</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      onChange={e => setPreferredDate(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Specific Requirements or Questions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your target budget, location preference, or timeline..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition text-sm flex items-center justify-center gap-2 mt-2"
                >
                  <Send className="w-4 h-4" /> Confirm Advisory Appointment
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
