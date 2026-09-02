import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart, MapPin, Bed, Bath, Ruler, Trash2, ArrowRight } from 'lucide-react';

export const FavoritesDrawer: React.FC = () => {
  const {
    isFavoritesDrawerOpen,
    setIsFavoritesDrawerOpen,
    favorites,
    properties,
    toggleFavorite,
    openPropertyDetail,
    setActiveTab
  } = useApp();

  if (!isFavoritesDrawerOpen) return null;

  const savedProperties = properties.filter(p => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsFavoritesDrawerOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-left">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
              <Heart className="w-5 h-5 fill-rose-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Saved Properties</h3>
              <p className="text-xs text-gray-500">{savedProperties.length} homes bookmarked</p>
            </div>
          </div>
          <button
            onClick={() => setIsFavoritesDrawerOpen(false)}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {savedProperties.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">No Saved Properties Yet</h4>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Click the heart icon on any property to save it to your personal shortlist for quick access.
              </p>
              <button
                onClick={() => {
                  setIsFavoritesDrawerOpen(false);
                  setActiveTab('properties');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition"
              >
                Browse All Properties
              </button>
            </div>
          ) : (
            savedProperties.map(property => (
              <div
                key={property.id}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span
                    className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-md text-white ${
                      property.status === 'FOR SALE' ? 'bg-blue-600' : 'bg-emerald-600'
                    }`}
                  >
                    {property.status}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(property.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-rose-500 hover:bg-rose-50 transition shadow"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-900 text-base line-clamp-1">{property.title}</h4>
                  </div>
                  <p className="text-blue-600 font-extrabold text-lg mb-2">{property.priceDisplay}</p>
                  <p className="text-gray-500 text-xs flex items-center mb-3 line-clamp-1">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-gray-400 shrink-0" />
                    {property.location}
                  </p>

                  <div className="flex justify-between items-center text-xs text-gray-600 border-t border-gray-100 pt-3 mb-3">
                    <span className="flex items-center">
                      <Bed className="w-3.5 h-3.5 mr-1 text-blue-500" /> {property.beds} Beds
                    </span>
                    <span className="flex items-center">
                      <Bath className="w-3.5 h-3.5 mr-1 text-blue-500" /> {property.baths} Baths
                    </span>
                    <span className="flex items-center">
                      <Ruler className="w-3.5 h-3.5 mr-1 text-blue-500" /> {property.sqft} sqft
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setIsFavoritesDrawerOpen(false);
                      openPropertyDetail(property);
                    }}
                    className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 transition"
                  >
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {savedProperties.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <button
              onClick={() => {
                setIsFavoritesDrawerOpen(false);
                setActiveTab('properties');
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm shadow transition"
            >
              Explore More Listings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
