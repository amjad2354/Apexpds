import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyType, PropertyStatus } from '../types';
import { samplePropertyImages } from '../data/mockData';
import {
  Building, Upload, CheckCircle2, Shield, DollarSign, Home, Image as ImageIcon,
  Sparkles, ArrowRight
} from 'lucide-react';

export const SellPropertyView: React.FC = () => {
  const { addProperty, setActiveTab, openPropertyDetail } = useApp();

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('Villa');
  const [status, setStatus] = useState<PropertyStatus>('FOR SALE');
  const [price, setPrice] = useState<number>(1450000);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [beds, setBeds] = useState<number>(4);
  const [baths, setBaths] = useState<number>(3);
  const [sqft, setSqft] = useState<number>(2600);
  const [yearBuilt, setYearBuilt] = useState<number>(2023);
  const [garageSpaces, setGarageSpaces] = useState<number>(2);
  const [selectedImage, setSelectedImage] = useState<string>(samplePropertyImages[0]);
  const [customImageUrl, setCustomImageUrl] = useState<string>('');
  const [sellerName, setSellerName] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');

  // Selected Amenities
  const availableAmenities = [
    'Swimming Pool', 'Smart Home Automation', 'Private Elevator', 'Wine Cellar',
    'Spa & Sauna', '24/7 Security Concierge', 'Waterfront / Ocean View', 'Rooftop Terrace',
    'Home Theater', 'EV Charging Station', 'Chef Kitchen', 'Private Garden'
  ];
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Swimming Pool', 'Smart Home Automation', '24/7 Security Concierge'
  ]);

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(prev => prev.filter(a => a !== amenity));
    } else {
      setSelectedAmenities(prev => [...prev, amenity]);
    }
  };

  const currentImage = customImageUrl.trim() || selectedImage;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fullLocation = address ? `${address}, ${city}, ${state} ${zip}`.trim() : `${city || 'Beverly Hills'}, ${state || 'CA'} ${zip || '90210'}`;

    const newProperty = addProperty({
      title: title.trim() || 'Exclusive Luxury Residence',
      description: description.trim() || 'A masterfully curated luxury residence featuring top-tier finishes and premium architectural craftsmanship.',
      location: fullLocation,
      city: city.trim() || 'Beverly Hills',
      state: state.trim() || 'CA',
      zip: zip.trim() || '90210',
      price: Number(price),
      priceDisplay: status === 'FOR RENT' ? `$${Number(price).toLocaleString()}/mo` : `$${Number(price).toLocaleString()}`,
      beds: Number(beds),
      baths: Number(baths),
      sqft: Number(sqft),
      propertyType,
      status,
      featured: true,
      image: currentImage,
      gallery: [currentImage, ...samplePropertyImages.slice(1, 3)],
      yearBuilt: Number(yearBuilt),
      garageSpaces: Number(garageSpaces),
      amenities: selectedAmenities,
      agentName: sellerName || 'Sophia Montgomery',
      agentPhone: sellerPhone || '+1 (310) 555-0192',
      agentEmail: sellerEmail || 'sophia@apexpds.com'
    });

    // Automatically navigate to Properties view and open the newly submitted property
    setActiveTab('properties');
    openPropertyDetail(newProperty);
  };

  return (
    <div className="pt-28 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Seller & Broker Portal
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
          List Your Property With Apex
        </h1>
        <p className="text-gray-500 text-base sm:text-lg mt-3 leading-relaxed">
          Reach qualified buyers and luxury real estate investors worldwide. Submit your property details below for immediate marketplace listing.
        </p>
      </div>

      {/* Trust metric highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Optimal Market Value</h4>
            <p className="text-xs text-gray-500">Properties sold for up to 104% of asking price.</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Global Syndication</h4>
            <p className="text-xs text-gray-500">Featured across top luxury networks & high-net-worth investors.</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Verified Representation</h4>
            <p className="text-xs text-gray-500">Protected legal escrow and dedicated broker guidance.</p>
          </div>
        </div>
      </div>

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 space-y-8">
        {/* SECTION 1: BASICS */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
            <Home className="w-5 h-5 text-blue-600" /> 1. Property Overview
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Property Headline / Title *
              </label>
              <input
                type="text"
                required
                placeholder="E.g., The Glass Horizon Penthouse with Infinity Terrace"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Property Type *
              </label>
              <select
                value={propertyType}
                onChange={e => setPropertyType(e.target.value as PropertyType)}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-sm font-medium cursor-pointer"
              >
                <option value="Villa">Villa / Estate</option>
                <option value="Apartment">Apartment / Condominium</option>
                <option value="Penthouse">Penthouse Suite</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Commercial">Commercial / Office</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Listing Purpose *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStatus('FOR SALE')}
                  className={`py-3 rounded-2xl font-bold text-xs transition border ${
                    status === 'FOR SALE'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-gray-50 text-gray-600 border-gray-200'
                  }`}
                >
                  For Sale
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('FOR RENT')}
                  className={`py-3 rounded-2xl font-bold text-xs transition border ${
                    status === 'FOR RENT'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-gray-50 text-gray-600 border-gray-200'
                  }`}
                >
                  For Rent
                </button>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Asking Price ($ USD) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-gray-400 font-bold">$</span>
                <input
                  type="number"
                  required
                  min="500"
                  step="1000"
                  value={price}
                  onChange={e => setPrice(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {status === 'FOR RENT' ? 'Monthly rental rate' : 'Total purchase price'}
              </p>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Detailed Property Description *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Highlight architectural styling, designer appliances, natural light, renovations, and outdoor living spaces..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: LOCATION */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-600" /> 2. Location Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="sm:col-span-3">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Street Address *
              </label>
              <input
                type="text"
                required
                placeholder="1042 Ocean View Boulevard"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                City *
              </label>
              <input
                type="text"
                required
                placeholder="Beverly Hills"
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                State *
              </label>
              <input
                type="text"
                required
                placeholder="CA"
                value={state}
                onChange={e => setState(e.target.value)}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Postal / Zip Code *
              </label>
              <input
                type="text"
                required
                placeholder="90210"
                value={zip}
                onChange={e => setZip(e.target.value)}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-sm font-medium"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: SPECIFICATIONS */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600" /> 3. Specifications & Dimensions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Beds
              </label>
              <input
                type="number"
                min="0"
                value={beds}
                onChange={e => setBeds(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Baths
              </label>
              <input
                type="number"
                min="1"
                value={baths}
                onChange={e => setBaths(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Living Area (sqft)
              </label>
              <input
                type="number"
                min="200"
                value={sqft}
                onChange={e => setSqft(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Year Built
              </label>
              <input
                type="number"
                min="1800"
                max="2030"
                value={yearBuilt}
                onChange={e => setYearBuilt(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Garage Spaces
              </label>
              <input
                type="number"
                min="0"
                value={garageSpaces}
                onChange={e => setGarageSpaces(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: AMENITIES */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 pb-2 border-b border-gray-100 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" /> 4. Amenities & Luxury Features
          </h3>
          <p className="text-xs text-gray-500 mb-4">Click to select the features available in your property:</p>
          <div className="flex flex-wrap gap-2.5">
            {availableAmenities.map(amenity => {
              const selected = selectedAmenities.includes(amenity);
              return (
                <button
                  type="button"
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition border flex items-center gap-1.5 ${
                    selected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <span className={selected ? 'text-white' : 'text-gray-400'}>✓</span>
                  {amenity}
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 5: PHOTOS */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-blue-600" /> 5. Showcase Photography
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            Select one of our high-resolution luxury demo architectural photos or paste your own custom image URL:
          </p>

          {/* Sample quick photos */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
            {samplePropertyImages.map((img, i) => (
              <button
                type="button"
                key={i}
                onClick={() => {
                  setSelectedImage(img);
                  setCustomImageUrl('');
                }}
                className={`h-20 rounded-xl overflow-hidden border-2 transition relative ${
                  selectedImage === img && !customImageUrl ? 'border-blue-600 scale-105 shadow-md' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`preset-${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Or Custom Image URL (Optional)
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={customImageUrl}
              onChange={e => setCustomImageUrl(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-sm"
            />
          </div>

          {/* Live Preview */}
          <div className="mt-4 rounded-2xl overflow-hidden h-48 border border-gray-200 relative">
            <img src={currentImage} alt="Listing preview" className="w-full h-full object-cover" />
            <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-lg">
              Cover Image Preview
            </span>
          </div>
        </div>

        {/* SECTION 6: CONTACT INFORMATION */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" /> 6. Owner / Representative Contact
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Eleanor Vance"
                value={sellerName}
                onChange={e => setSellerName(e.target.value)}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="eleanor@vanceholdings.com"
                value={sellerEmail}
                onChange={e => setSellerEmail(e.target.value)}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+1 (555) 234-5678"
                value={sellerPhone}
                onChange={e => setSellerPhone(e.target.value)}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Submission Button */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            By submitting, you authorize Apex PDS Solutions to publish this listing across our verified luxury buyer network.
          </p>
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-blue-500/25 transition text-sm flex items-center justify-center gap-2 whitespace-nowrap"
          >
            Publish Property Listing <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
