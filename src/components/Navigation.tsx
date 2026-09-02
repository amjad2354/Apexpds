import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ActiveTab } from '../types';
import { Building, Heart, User, LogOut, Menu, X, PlusCircle } from 'lucide-react';

export const Navigation: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    favorites,
    setIsFavoritesDrawerOpen,
    setIsAuthModalOpen,
    currentUser,
    logout
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'properties', label: 'Properties' },
    { id: 'sell', label: 'Sell Property' },
    { id: 'agents', label: 'Agents' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-blue-600 p-2.5 rounded-xl group-hover:bg-blue-700 transition shadow-md shadow-blue-500/20">
              <Building className="text-white w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tight text-gray-900">
              Apex<span className="text-blue-600">PDS</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 font-medium">
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-3">
            {/* Favorites Heart Button */}
            <button
              onClick={() => setIsFavoritesDrawerOpen(true)}
              className="relative p-2.5 rounded-xl text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition"
              title="Saved Properties"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Auth / Profile */}
            {currentUser ? (
              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-gray-200">
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-blue-600"
                />
                <span className="text-xs font-bold text-gray-800 hidden lg:inline max-w-[100px] truncate">
                  {currentUser.name}
                </span>
                <button
                  onClick={logout}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 text-gray-700 hover:text-blue-600 text-xs font-bold px-3 py-2 rounded-xl hover:bg-gray-50 transition"
              >
                <User className="w-4 h-4" />
                Sign In
              </button>
            )}

            {/* Add Listing Button */}
            <button
              onClick={() => handleNavClick('sell')}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Listing</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-2 animate-slide-down">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition flex items-center justify-between ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{item.label}</span>
                {item.id === 'sell' && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md">
                    Free
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            {currentUser ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-xs font-bold text-gray-800">{currentUser.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" /> Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl text-xs transition"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
