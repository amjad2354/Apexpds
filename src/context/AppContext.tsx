import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, Agent, FilterState, ToastMessage, User, ActiveTab, TourBooking, ContactInquiry } from '../types';
import { initialProperties, initialAgents } from '../data/mockData';

interface AppContextType {
  properties: Property[];
  agents: Agent[];
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab, initialFilters?: Partial<FilterState>) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: (key: keyof FilterState, value: any) => void;
  resetFilters: () => void;
  favorites: string[];
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  selectedProperty: Property | null;
  openPropertyDetail: (property: Property) => void;
  closePropertyDetail: () => void;
  isFavoritesDrawerOpen: boolean;
  setIsFavoritesDrawerOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  selectedAgentForContact: Agent | null;
  setSelectedAgentForContact: (agent: Agent | null) => void;
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'agent'> & { agentName?: string; agentPhone?: string; agentEmail?: string }) => Property;
  bookTour: (booking: TourBooking) => void;
  submitContactInquiry: (inquiry: ContactInquiry) => void;
}

const defaultFilters: FilterState = {
  keyword: '',
  propertyType: 'All',
  status: 'All',
  minPrice: 0,
  maxPrice: 10000000,
  beds: 'any',
  baths: 'any',
  sortBy: 'featured'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Properties state with localStorage persistence
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem('apex_properties');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved properties', e);
    }
    return initialProperties;
  });

  const [agents] = useState<Agent[]>(initialAgents);

  // Active tab with browser URL hash sync
  const [activeTab, setActiveTabState] = useState<ActiveTab>(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    if (['home', 'properties', 'sell', 'agents', 'contact'].includes(hash)) {
      return hash as ActiveTab;
    }
    return 'home';
  });

  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // Favorites state with localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('apex_favorites');
      return saved ? JSON.parse(saved) : ['prop-1'];
    } catch (e) {
      return ['prop-1'];
    }
  });

  // Current user auth
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('apex_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [selectedAgentForContact, setSelectedAgentForContact] = useState<Agent | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Save properties to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('apex_properties', JSON.stringify(properties));
    } catch (e) {
      console.error(e);
    }
  }, [properties]);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('apex_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Handle browser back/forward navigation with hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (['home', 'properties', 'sell', 'agents', 'contact'].includes(hash)) {
        setActiveTabState(hash as ActiveTab);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const setActiveTab = (tab: ActiveTab, initialFilters?: Partial<FilterState>) => {
    setActiveTabState(tab);
    window.location.hash = `#/${tab}`;
    if (initialFilters) {
      setFilters(prev => ({ ...prev, ...initialFilters }));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const toggleFavorite = (propertyId: string) => {
    const isFav = favorites.includes(propertyId);
    if (isFav) {
      setFavorites(prev => prev.filter(id => id !== propertyId));
      addToast('Removed from Saved Homes', undefined, 'info');
    } else {
      setFavorites(prev => [...prev, propertyId]);
      addToast('Saved to Favorites', 'Access your saved homes anytime in the heart icon menu.', 'success');
    }
  };

  const isFavorite = (propertyId: string) => favorites.includes(propertyId);

  const openPropertyDetail = (property: Property) => {
    setSelectedProperty(property);
  };

  const closePropertyDetail = () => {
    setSelectedProperty(null);
  };

  const login = (user: User) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('apex_user', JSON.stringify(user));
    } catch (e) {}
    setIsAuthModalOpen(false);
    addToast(`Welcome back, ${user.name}!`, `Signed in as ${user.role}.`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('apex_user');
    } catch (e) {}
    addToast('Signed out', 'You have been safely signed out.', 'info');
  };

  const addToast = (title: string, description?: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    const newToast: ToastMessage = { id, title, description, type };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addProperty = (newPropData: Omit<Property, 'id' | 'createdAt' | 'agent'> & { agentName?: string; agentPhone?: string; agentEmail?: string }): Property => {
    const defaultAgent = agents[0];
    const newProperty: Property = {
      ...newPropData,
      id: `prop-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      agent: {
        name: newPropData.agentName || defaultAgent.name,
        phone: newPropData.agentPhone || defaultAgent.phone,
        email: newPropData.agentEmail || defaultAgent.email,
        avatar: defaultAgent.avatar,
        title: 'Listing Agent'
      }
    };

    setProperties(prev => [newProperty, ...prev]);
    addToast('Listing Published Successfully!', `"${newProperty.title}" is now visible in the marketplace.`, 'success');
    return newProperty;
  };

  const bookTour = (booking: TourBooking) => {
    addToast(
      'Tour Request Confirmed!',
      `Scheduled ${booking.tourType} tour on ${booking.date} at ${booking.time}. Our agent will contact you shortly.`,
      'success'
    );
  };

  const submitContactInquiry = (inquiry: ContactInquiry) => {
    addToast(
      'Inquiry Received!',
      `Thank you ${inquiry.fullName}. An Apex advisor will reply to ${inquiry.email} within 2 business hours.`,
      'success'
    );
  };

  return (
    <AppContext.Provider
      value={{
        properties,
        agents,
        activeTab,
        setActiveTab,
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        favorites,
        toggleFavorite,
        isFavorite,
        selectedProperty,
        openPropertyDetail,
        closePropertyDetail,
        isFavoritesDrawerOpen,
        setIsFavoritesDrawerOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        selectedAgentForContact,
        setSelectedAgentForContact,
        currentUser,
        login,
        logout,
        toasts,
        addToast,
        removeToast,
        addProperty,
        bookTour,
        submitContactInquiry
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
