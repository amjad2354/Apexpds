import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  X, Heart, MapPin, Bed, Bath, Ruler, Calendar, Car, Shield, Check,
  Phone, Mail, Calculator, Send, Share2, DollarSign
} from 'lucide-react';

export const PropertyDetailModal: React.FC = () => {
  const {
    selectedProperty,
    closePropertyDetail,
    isFavorite,
    toggleFavorite,
    bookTour,
    submitContactInquiry,
    addToast
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'calculator' | 'tour' | 'inquiry'>('overview');

  // Calculator State
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);

  // Tour Booking State
  const [tourType, setTourType] = useState<'In-Person' | 'Video Walkthrough'>('In-Person');
  const [tourDate, setTourDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [tourTime, setTourTime] = useState<string>('11:00 AM');
  const [tourName, setTourName] = useState('');
  const [tourEmail, setTourEmail] = useState('');
  const [tourPhone, setTourPhone] = useState('');
  const [tourNotes, setTourNotes] = useState('');

  // Inquiry State
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState(
    selectedProperty ? `Hello, I am interested in "${selectedProperty.title}" at ${selectedProperty.location}. Please contact me with more information.` : ''
  );

  if (!selectedProperty) return null;

  const images = selectedProperty.gallery?.length > 0 ? selectedProperty.gallery : [selectedProperty.image];
  const isFav = isFavorite(selectedProperty.id);

  // Mortgage calculation
  const calculatedMortgage = useMemo(() => {
    const principalPrice = selectedProperty.status === 'FOR RENT' ? selectedProperty.price * 12 * 20 : selectedProperty.price;
    const downPaymentAmount = (principalPrice * downPaymentPercent) / 100;
    const loanAmount = principalPrice - downPaymentAmount;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;

    let monthlyPrincipalInterest = 0;
    if (monthlyRate > 0) {
      monthlyPrincipalInterest =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
    }

    const estimatedPropertyTax = (principalPrice * 0.012) / 12;
    const estimatedHomeInsurance = (principalPrice * 0.0035) / 12;
    const estimatedHOA = selectedProperty.propertyType === 'Apartment' || selectedProperty.propertyType === 'Penthouse' ? 420 : 150;
    const totalMonthly = monthlyPrincipalInterest + estimatedPropertyTax + estimatedHomeInsurance + estimatedHOA;

    return {
      downPaymentAmount,
      loanAmount,
      monthlyPrincipalInterest: Math.round(monthlyPrincipalInterest),
      estimatedPropertyTax: Math.round(estimatedPropertyTax),
      estimatedHomeInsurance: Math.round(estimatedHomeInsurance),
      estimatedHOA,
      totalMonthly: Math.round(totalMonthly)
    };
  }, [selectedProperty, downPaymentPercent, interestRate, loanTermYears]);

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookTour({
      propertyId: selectedProperty.id,
      propertyTitle: selectedProperty.title,
      tourType,
      date: tourDate,
      time: tourTime,
      fullName: tourName || 'Valued Guest',
      email: tourEmail || 'client@example.com',
      phone: tourPhone || '+1 (555) 000-0000',
      notes: tourNotes
    });
    setActiveTab('overview');
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContactInquiry({
      fullName: inquiryName || 'Valued Client',
      email: inquiryEmail || 'client@example.com',
      phone: inquiryPhone || '+1 (555) 000-0000',
      subject: `Inquiry on ${selectedProperty.title}`,
      message: inquiryMessage,
      propertyId: selectedProperty.id
    });
    setActiveTab('overview');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link Copied!', 'Property link copied to your clipboard.', 'info');
    } else {
      addToast('Property Saved', 'Share link ready.', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-5xl w-full my-auto shadow-2xl overflow-hidden border border-gray-100 relative flex flex-col max-h-[92vh]">
        {/* Top Floating Actions */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-700 backdrop-blur shadow-md flex items-center justify-center transition"
            title="Share Property"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleFavorite(selectedProperty.id)}
            className={`w-10 h-10 rounded-full bg-white/90 hover:bg-white backdrop-blur shadow-md flex items-center justify-center transition ${
              isFav ? 'text-rose-500' : 'text-gray-700 hover:text-rose-500'
            }`}
            title={isFav ? 'Remove from favorites' : 'Save to favorites'}
          >
            <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500' : ''}`} />
          </button>
          <button
            onClick={closePropertyDetail}
            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-700 backdrop-blur shadow-md flex items-center justify-center transition"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="overflow-y-auto flex-1">
          {/* Gallery Section */}
          <div className="relative bg-black h-72 sm:h-96 md:h-[420px]">
            <img
              src={images[activeImageIndex] || selectedProperty.image}
              alt={selectedProperty.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute bottom-4 left-4 z-10 flex gap-2">
              <span
                className={`text-xs font-bold px-3 py-1.5 rounded-lg text-white shadow-lg ${
                  selectedProperty.status === 'FOR SALE' ? 'bg-blue-600' : 'bg-emerald-600'
                }`}
              >
                {selectedProperty.status}
              </span>
              <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-gray-900/85 backdrop-blur text-white shadow-lg">
                {selectedProperty.propertyType}
              </span>
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="absolute bottom-4 right-4 z-10 flex gap-2 bg-black/60 backdrop-blur-md p-1.5 rounded-xl">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-9 rounded-lg overflow-hidden border-2 transition ${
                      activeImageIndex === idx ? 'border-blue-500 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8">
            {/* Header Details */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
                  {selectedProperty.title}
                </h2>
                <p className="text-gray-500 flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-1.5 text-blue-600 shrink-0" />
                  {selectedProperty.location}
                </p>
              </div>
              <div className="md:text-right">
                <span className="text-3xl sm:text-4xl font-black text-blue-600 tracking-tight">
                  {selectedProperty.priceDisplay}
                </span>
                <p className="text-xs text-gray-400 mt-1">
                  {selectedProperty.status === 'FOR SALE'
                    ? `Est. $${Math.round(selectedProperty.price / selectedProperty.sqft).toLocaleString()}/sqft`
                    : 'Inclusive of maintenance fees'}
                </p>
              </div>
            </div>

            {/* Quick Specs Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-gray-100 text-gray-700">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Bed className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Bedrooms</p>
                  <p className="font-bold text-gray-900">{selectedProperty.beds} Beds</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Bath className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Bathrooms</p>
                  <p className="font-bold text-gray-900">{selectedProperty.baths} Baths</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Ruler className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Living Area</p>
                  <p className="font-bold text-gray-900">{selectedProperty.sqft.toLocaleString()} sqft</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Year Built</p>
                  <p className="font-bold text-gray-900">{selectedProperty.yearBuilt}</p>
                </div>
              </div>
            </div>

            {/* Interactive Tabs Menu */}
            <div className="flex border-b border-gray-200 mt-6 gap-2 sm:gap-6 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview & Features' },
                { id: 'calculator', label: 'Payment Calculator' },
                { id: 'tour', label: 'Schedule a Tour' },
                { id: 'inquiry', label: 'Contact Agent' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`py-3 font-bold text-sm whitespace-nowrap border-b-2 transition ${
                    activeTab === t.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="py-6 space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {selectedProperty.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Premium Amenities & Highlights</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedProperty.amenities.map((amenity, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-xl">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-xl">
                      <Car className="w-4 h-4 text-blue-500 shrink-0" />
                      <span>{selectedProperty.garageSpaces} Parking Spaces</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-xl">
                      <Shield className="w-4 h-4 text-blue-500 shrink-0" />
                      <span>Verified Title & Inspected</span>
                    </div>
                  </div>
                </div>

                {/* Assigned Agent Box */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50/70 to-indigo-50/70 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedProperty.agent.avatar}
                      alt={selectedProperty.agent.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">{selectedProperty.agent.name}</h4>
                      <p className="text-xs text-blue-600 font-semibold">{selectedProperty.agent.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{selectedProperty.agent.phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <a
                      href={`tel:${selectedProperty.agent.phone}`}
                      className="flex-1 sm:flex-initial bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-gray-50 transition"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call
                    </a>
                    <button
                      onClick={() => setActiveTab('inquiry')}
                      className="flex-1 sm:flex-initial bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition"
                    >
                      <Mail className="w-3.5 h-3.5" /> Message
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: MORTGAGE & PAYMENT CALCULATOR */}
            {activeTab === 'calculator' && (
              <div className="py-6 space-y-6">
                <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Interactive Financing Estimate</h4>
                    <p className="text-xs text-gray-500">
                      Customize your down payment, interest rate, and term to project your monthly payments.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Controls */}
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-sm font-semibold mb-2">
                        <span className="text-gray-700">Down Payment ({downPaymentPercent}%)</span>
                        <span className="text-blue-600 font-bold">
                          ${calculatedMortgage.downPaymentAmount.toLocaleString()}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="50"
                        step="5"
                        value={downPaymentPercent}
                        onChange={e => setDownPaymentPercent(Number(e.target.value))}
                        className="w-full accent-blue-600 h-2 bg-gray-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm font-semibold mb-2">
                        <span className="text-gray-700">Interest Rate ({interestRate}%)</span>
                        <span className="text-blue-600 font-bold">{interestRate}% APR</span>
                      </div>
                      <input
                        type="range"
                        min="3"
                        max="10"
                        step="0.1"
                        value={interestRate}
                        onChange={e => setInterestRate(Number(e.target.value))}
                        className="w-full accent-blue-600 h-2 bg-gray-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <span className="block text-sm font-semibold text-gray-700 mb-2">Loan Term</span>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setLoanTermYears(30)}
                          className={`py-2.5 rounded-xl font-bold text-xs border transition ${
                            loanTermYears === 30
                              ? 'bg-blue-600 text-white border-blue-600 shadow'
                              : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          30-Year Fixed
                        </button>
                        <button
                          type="button"
                          onClick={() => setLoanTermYears(15)}
                          className={`py-2.5 rounded-xl font-bold text-xs border transition ${
                            loanTermYears === 15
                              ? 'bg-blue-600 text-white border-blue-600 shadow'
                              : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          15-Year Fixed
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Results Breakdown Card */}
                  <div className="p-6 bg-gray-900 text-white rounded-3xl flex flex-col justify-between">
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Estimated Monthly Payment</p>
                      <p className="text-4xl font-black text-white mt-1">
                        ${calculatedMortgage.totalMonthly.toLocaleString()}
                        <span className="text-sm font-normal text-gray-400">/mo</span>
                      </p>

                      <div className="mt-6 space-y-3 text-xs border-t border-gray-800 pt-4">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Principal & Interest</span>
                          <span className="font-bold">${calculatedMortgage.monthlyPrincipalInterest.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Property Taxes</span>
                          <span className="font-bold">${calculatedMortgage.estimatedPropertyTax.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Homeowners Insurance</span>
                          <span className="font-bold">${calculatedMortgage.estimatedHomeInsurance.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">HOA / Maintenance</span>
                          <span className="font-bold">${calculatedMortgage.estimatedHOA.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('inquiry')}
                      className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs transition"
                    >
                      Pre-Qualify With Our Lending Advisor
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: SCHEDULE A TOUR */}
            {activeTab === 'tour' && (
              <form onSubmit={handleTourSubmit} className="py-6 space-y-5">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Book a Private Tour</h4>
                  <p className="text-gray-500 text-xs">
                    Choose between a personal walkthrough or an interactive 3D virtual showing.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTourType('In-Person')}
                    className={`py-3 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition ${
                      tourType === 'In-Person'
                        ? 'bg-blue-600 text-white border-blue-600 shadow'
                        : 'bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    In-Person Showing
                  </button>
                  <button
                    type="button"
                    onClick={() => setTourType('Video Walkthrough')}
                    className={`py-3 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition ${
                      tourType === 'Video Walkthrough'
                        ? 'bg-blue-600 text-white border-blue-600 shadow'
                        : 'bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    3D Video Walkthrough
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={tourDate}
                      onChange={e => setTourDate(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Preferred Time Slot
                    </label>
                    <select
                      value={tourTime}
                      onChange={e => setTourTime(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-blue-600 outline-none"
                    >
                      <option>09:00 AM - 10:00 AM</option>
                      <option>11:00 AM - 12:00 PM</option>
                      <option>02:00 PM - 03:00 PM</option>
                      <option>04:00 PM - 05:00 PM</option>
                      <option>06:00 PM - 07:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alexander Hamilton"
                      value={tourName}
                      onChange={e => setTourName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={tourEmail}
                      onChange={e => setTourEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={tourPhone}
                      onChange={e => setTourPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-blue-600 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Special Requests or Questions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={tourNotes}
                    onChange={e => setTourNotes(e.target.value)}
                    placeholder="E.g., We would like to view the wine cellar and garage specifically."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-blue-600 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition text-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Confirm Tour Appointment
                </button>
              </form>
            )}

            {/* TAB 4: CONTACT AGENT */}
            {activeTab === 'inquiry' && (
              <form onSubmit={handleInquirySubmit} className="py-6 space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Direct Agent Inquiry</h4>
                  <p className="text-gray-500 text-xs">
                    Connect directly with {selectedProperty.agent.name} regarding this listing.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={inquiryName}
                      onChange={e => setInquiryName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={inquiryEmail}
                      onChange={e => setInquiryEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={inquiryPhone}
                      onChange={e => setInquiryPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-blue-600 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={inquiryMessage}
                    onChange={e => setInquiryMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-blue-600 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition text-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Inquiry to {selectedProperty.agent.name}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
