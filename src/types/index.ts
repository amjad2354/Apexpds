export type PropertyType = 'Apartment' | 'Villa' | 'Commercial' | 'Penthouse' | 'Townhouse';
export type PropertyStatus = 'FOR SALE' | 'FOR RENT';

export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  priceDisplay: string;
  beds: number;
  baths: number;
  sqft: number;
  propertyType: PropertyType;
  status: PropertyStatus;
  featured?: boolean;
  image: string;
  gallery: string[];
  yearBuilt: number;
  garageSpaces: number;
  amenities: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
    title: string;
  };
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  specialty: string;
  phone: string;
  email: string;
  avatar: string;
  experienceYears: number;
  rating: number;
  activeListingsCount: number;
  bio: string;
}

export interface TourBooking {
  propertyId: string;
  propertyTitle: string;
  tourType: 'In-Person' | 'Video Walkthrough';
  date: string;
  time: string;
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface ContactInquiry {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  propertyId?: string;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
  role: 'buyer' | 'seller' | 'agent';
}

export interface FilterState {
  keyword: string;
  propertyType: string;
  status: string;
  minPrice: number;
  maxPrice: number;
  beds: string;
  baths: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest';
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export type ActiveTab = 'home' | 'properties' | 'sell' | 'agents' | 'contact';
