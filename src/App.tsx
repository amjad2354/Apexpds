import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { PropertiesView } from './components/PropertiesView';
import { SellPropertyView } from './components/SellPropertyView';
import { AgentsView } from './components/AgentsView';
import { ContactView } from './components/ContactView';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { AuthModal } from './components/AuthModal';
import { ToastContainer } from './components/ToastContainer';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navigation />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'properties' && <PropertiesView />}
        {activeTab === 'sell' && <SellPropertyView />}
        {activeTab === 'agents' && <AgentsView />}
        {activeTab === 'contact' && <ContactView />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Global Drawers & Modals */}
      <FloatingWhatsApp />
      <PropertyDetailModal />
      <FavoritesDrawer />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
