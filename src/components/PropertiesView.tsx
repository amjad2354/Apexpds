import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Property } from '../types';
import {
  Search, MapPin, Bed, Bath, Ruler, Heart, SlidersHorizontal, RotateCcw,
  Sparkles, ArrowUpDown
} from 'lucide-react';

export const PropertiesView: React.FC = () => {
  const {
    properties,
    filters,
    updateFilter,
    resetFilters,
    openPropertyDetail,
    isFavorite,
    toggleFavorite
  } = useApp();

  // Filter and sort logic
  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      // Keyword filter
      if (filters.keyword.trim()) {
        const query = filters.keyword.toLowerCase().trim();
        const matchesTitle = prop.title.toLowerCase().includes(query);
        const matchesLoc = prop.location.toLowerCase().includes(query);
        const matchesCity = prop.city.toLowerCase().includes(query);
        const matchesDesc = prop.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLoc && !matchesCity && !matchesDesc) {
          return false;
        }
      }

      // Status filter
      if (filters.status !== 'All' && prop.status !== filters.status) {
        return false;
      }

      // Property Type filter
      if (filters.propertyType !== 'All' && prop.propertyType !== filters.propertyType) {
        return false;
      }

      // Beds filter
      if (filters.beds !== 'any') {
        const minBeds = parseInt(filters.beds, 10);
        if (prop.beds < minBeds) return false;
      }

      // Baths filter
      if (filters.baths !== 'any') {
        const minBaths = parseInt(filters.baths, 10);
        if (prop.baths < minBaths) return false;
      }

      // Max price filter (for rent vs sale)
      if (filters.maxPrice > 0 && prop.price > filters.maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [properties, filters]);

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title & Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" /> Exclusive Real Estate Portfolio
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
          Explore Available Properties
        </h1>
        <p className="text-gray-500 mt-2 text-base max-w-2xl">
          Browse luxury villas, penthouses, modern condominiums, and commercial estates verified by Apex advisors.
        </p>
      </div>

      {/* Filter and Search Panel */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-10">
        {/* Top search bar row */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search by city, address, community, or title..."
              value={filters.keyword}
              onChange={e => updateFilter('keyword', e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-sm transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Status switcher */}
            <div className="inline-flex p-1 bg-gray-100 rounded-2xl">
              {(['All', 'FOR SALE', 'FOR RENT'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => updateFilter('status', st)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                    filters.status === st
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {st === 'All' ? 'All Purposes' : st === 'FOR SALE' ? 'Buy' : 'Rent'}
                </button>
              ))}
            </div>

            {/* Sort selector */}
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={e => updateFilter('sortBy', e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2.5 pl-4 pr-9 rounded-2xl text-xs font-bold focus:border-blue-600 outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Additions</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
            </div>

            {/* Reset button */}
            <button
              onClick={resetFilters}
              className="p-2.5 rounded-2xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition"
              title="Reset all filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Secondary filters row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Property Type
            </label>
            <select
              value={filters.propertyType}
              onChange={e => updateFilter('propertyType', e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-3 rounded-xl text-xs font-semibold focus:border-blue-600 outline-none cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Bedrooms
            </label>
            <select
              value={filters.beds}
              onChange={e => updateFilter('beds', e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-3 rounded-xl text-xs font-semibold focus:border-blue-600 outline-none cursor-pointer"
            >
              <option value="any">Any Bedrooms</option>
              <option value="1">1+ Bedrooms</option>
              <option value="2">2+ Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Bathrooms
            </label>
            <select
              value={filters.baths}
              onChange={e => updateFilter('baths', e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-3 rounded-xl text-xs font-semibold focus:border-blue-600 outline-none cursor-pointer"
            >
              <option value="any">Any Bathrooms</option>
              <option value="1">1+ Bathrooms</option>
              <option value="2">2+ Bathrooms</option>
              <option value="3">3+ Bathrooms</option>
              <option value="4">4+ Bathrooms</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Max Price Cap
            </label>
            <select
              value={filters.maxPrice}
              onChange={e => updateFilter('maxPrice', Number(e.target.value))}
              className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-3 rounded-xl text-xs font-semibold focus:border-blue-600 outline-none cursor-pointer"
            >
              <option value={10000000}>No Limit</option>
              <option value={10000}>Up to $10,000/mo (Rent)</option>
              <option value={1000000}>Up to $1,000,000</option>
              <option value={2000000}>Up to $2,000,000</option>
              <option value={3500000}>Up to $3,500,000</option>
              <option value={5000000}>Up to $5,000,000</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600 text-sm font-medium">
          Showing <span className="font-bold text-gray-900">{filteredProperties.length}</span> properties
        </p>
      </div>

      {/* Property Grid */}
      {filteredProperties.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-lg mx-auto my-12">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <SlidersHorizontal className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Matching Properties Found</h3>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            We couldn't find any properties matching your current filters. Try relaxing your search criteria or resetting filters.
          </p>
          <button
            onClick={resetFilters}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-sm shadow transition"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map(property => {
            const isFav = isFavorite(property.id);
            return (
              <div
                key={property.id}
                onClick={() => openPropertyDetail(property)}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer group"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-lg text-white shadow-md ${
                        property.status === 'FOR SALE' ? 'bg-blue-600' : 'bg-emerald-600'
                      }`}
                    >
                      {property.status}
                    </span>
                    <span className="text-xs font-bold px-3 py-1 rounded-lg bg-gray-900/80 backdrop-blur text-white shadow-md">
                      {property.propertyType}
                    </span>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(property.id);
                    }}
                    className={`absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur shadow-md flex items-center justify-center transition ${
                      isFav ? 'text-rose-500' : 'text-gray-700 hover:text-rose-500 hover:bg-white'
                    }`}
                    title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                  </button>

                  {/* Price overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="text-2xl font-black text-white tracking-tight drop-shadow-md">
                      {property.priceDisplay}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition line-clamp-1">
                      {property.title}
                    </h3>
                    <p className="text-gray-500 text-sm flex items-center mb-4 line-clamp-1">
                      <MapPin className="w-4 h-4 mr-1.5 text-blue-600 shrink-0" />
                      {property.location}
                    </p>
                  </div>

                  <div>
                    {/* Specs Row */}
                    <div className="flex justify-between items-center py-4 border-t border-gray-100 text-gray-600 text-sm">
                      <span className="flex items-center">
                        <Bed className="w-4 h-4 mr-1.5 text-blue-500" />
                        {property.beds} Beds
                      </span>
                      <span className="flex items-center">
                        <Bath className="w-4 h-4 mr-1.5 text-blue-500" />
                        {property.baths} Baths
                      </span>
                      <span className="flex items-center">
                        <Ruler className="w-4 h-4 mr-1.5 text-blue-500" />
                        {property.sqft.toLocaleString()} sqft
                      </span>
                    </div>

                    <button className="w-full mt-2 bg-gray-50 hover:bg-blue-600 hover:text-white text-gray-900 font-bold py-3 rounded-2xl text-xs transition duration-200">
                      View Details & Tour
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
