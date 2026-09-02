import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Bed, Bath, Ruler, Heart, ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedProperties: React.FC = () => {
  const { properties, openPropertyDetail, isFavorite, toggleFavorite, setActiveTab } = useApp();

  const featuredList = properties.filter(p => p.featured).slice(0, 3);
  const displayProperties = featuredList.length > 0 ? featuredList : properties.slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 gap-4">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Handpicked Collection
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Featured Residences
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base max-w-xl">
            Explore our prime architectural listings with proven appraisal value, verified titles, and bespoke amenities.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('properties')}
          className="text-blue-600 font-bold text-sm flex items-center hover:text-blue-700 transition group self-start md:self-auto"
        >
          View All Listings
          <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayProperties.map(p => {
          const isFav = isFavorite(p.id);
          return (
            <div
              key={p.id}
              onClick={() => openPropertyDetail(p)}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-lg text-white shadow-md ${
                      p.status === 'FOR SALE' ? 'bg-blue-600' : 'bg-emerald-600'
                    }`}
                  >
                    {p.status}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-lg bg-gray-900/80 backdrop-blur text-white shadow-md">
                    {p.propertyType}
                  </span>
                </div>

                {/* Favorite Toggle Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(p.id);
                  }}
                  className={`absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur shadow-md flex items-center justify-center transition ${
                    isFav ? 'text-rose-500' : 'text-gray-700 hover:text-rose-500 hover:bg-white'
                  }`}
                  title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                </button>

                {/* Price Display */}
                <span className="absolute bottom-4 left-4 text-2xl font-black text-white tracking-tight drop-shadow-md">
                  {p.priceDisplay}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition line-clamp-1">
                    {p.title}
                  </h3>
                  <p className="text-gray-500 text-sm flex items-center mb-4 line-clamp-1">
                    <MapPin className="w-4 h-4 mr-1.5 text-blue-600 shrink-0" />
                    {p.location}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center py-4 border-t border-gray-100 text-gray-600 text-sm">
                    <span className="flex items-center">
                      <Bed className="w-4 h-4 mr-1.5 text-blue-500" />
                      {p.beds} Beds
                    </span>
                    <span className="flex items-center">
                      <Bath className="w-4 h-4 mr-1.5 text-blue-500" />
                      {p.baths} Baths
                    </span>
                    <span className="flex items-center">
                      <Ruler className="w-4 h-4 mr-1.5 text-blue-500" />
                      {p.sqft.toLocaleString()} sqft
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
    </section>
  );
};
