import { Property, Agent } from '../types';

export const initialAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Sophia Montgomery',
    role: 'Principal Luxury Advisor',
    specialty: 'Ultra-Luxury Estates & Waterfront',
    phone: '+1 (310) 555-0192',
    email: 'sophia@apexpds.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    experienceYears: 14,
    rating: 4.98,
    activeListingsCount: 18,
    bio: 'Ranked among the top 1% of luxury brokers nationwide. Specialized in confidential high-net-worth acquisitions and Beverly Hills architectural masterpieces.'
  },
  {
    id: 'agent-2',
    name: 'Marcus Vance',
    role: 'Managing Director, Commercial & High-Rise',
    specialty: 'Penthouses & Mixed-Use Developments',
    phone: '+1 (212) 555-0144',
    email: 'marcus@apexpds.com',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    experienceYears: 11,
    rating: 4.95,
    activeListingsCount: 12,
    bio: 'Over $350M in career sales across Manhattan and Brooklyn. Known for keen investment analysis, 1031 exchanges, and trophy penthouse developments.'
  },
  {
    id: 'agent-3',
    name: 'Elena Rostova',
    role: 'Senior Relocation & Villa Specialist',
    specialty: 'Modern Villas & Smart Architectural Homes',
    phone: '+1 (512) 555-0188',
    email: 'elena@apexpds.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    experienceYears: 8,
    rating: 4.92,
    activeListingsCount: 15,
    bio: 'Passionate about sustainable architecture, smart home integrations, and private lakeside estates across Austin and Southern California.'
  },
  {
    id: 'agent-4',
    name: 'David Chen',
    role: 'Commercial & Rental Portfolio Manager',
    specialty: 'Corporate Relocations & Luxury Rentals',
    phone: '+1 (415) 555-0163',
    email: 'david@apexpds.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    experienceYears: 9,
    rating: 4.90,
    activeListingsCount: 22,
    bio: 'Expert advisor for high-profile tech executives and international clients seeking bespoke luxury leasing and prime metropolitan investments.'
  }
];

export const initialProperties: Property[] = [
  {
    id: 'prop-1',
    title: 'Modernist Sky Villa',
    description: 'An architectural marvel perched high above Beverly Hills offering unobstructed panoramic views from downtown to the Pacific Ocean. Features an infinity-edge pool, private cinema, glass wine cellar, and integrated smart-home automation throughout.',
    location: 'Beverly Hills, CA 90210',
    city: 'Beverly Hills',
    state: 'CA',
    zip: '90210',
    price: 1250000,
    priceDisplay: '$1,250,000',
    beds: 4,
    baths: 3,
    sqft: 2400,
    propertyType: 'Villa',
    status: 'FOR SALE',
    featured: true,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200'
    ],
    yearBuilt: 2022,
    garageSpaces: 3,
    amenities: ['Infinity Pool', 'Smart Home', 'Private Cinema', 'Wine Cellar', 'Spa & Sauna', 'Security 24/7', 'Mountain View'],
    agent: {
      name: 'Sophia Montgomery',
      phone: '+1 (310) 555-0192',
      email: 'sophia@apexpds.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      title: 'Principal Luxury Advisor'
    },
    createdAt: '2025-01-15'
  },
  {
    id: 'prop-2',
    title: 'The Penthouse Suite',
    description: 'Soaring high above Manhattan, this trophy duplex penthouse delivers floor-to-ceiling glass, custom Italian marble kitchen, private wraparound terrace, and dedicated elevator foyer access in one of Tribeca’s most sought-after doorman buildings.',
    location: 'Manhattan, NY 10001',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    price: 4500,
    priceDisplay: '$4,500/mo',
    beds: 2,
    baths: 2,
    sqft: 1150,
    propertyType: 'Penthouse',
    status: 'FOR RENT',
    featured: true,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200'
    ],
    yearBuilt: 2021,
    garageSpaces: 1,
    amenities: ['Skyline View', 'Concierge 24/7', 'Private Elevator', 'Rooftop Terrace', 'Fitness Center', 'Valet Parking'],
    agent: {
      name: 'Marcus Vance',
      phone: '+1 (212) 555-0144',
      email: 'marcus@apexpds.com',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
      title: 'Managing Director'
    },
    createdAt: '2025-02-01'
  },
  {
    id: 'prop-3',
    title: 'Lakeside Sanctuary',
    description: 'Immerse yourself in tranquil luxury nestled along the shores of Lake Austin. Highlights include a private two-slip boat dock, expansive outdoor kitchen, native cedar woodwork, floor-to-ceiling windows, and lush botanical gardens.',
    location: 'Austin, TX 78701',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    price: 890000,
    priceDisplay: '$890,000',
    beds: 3,
    baths: 3,
    sqft: 1900,
    propertyType: 'Villa',
    status: 'FOR SALE',
    featured: true,
    image: 'https://images.unsplash.com/photo-1600607687940-47a0f925901e?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1600607687940-47a0f925901e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200'
    ],
    yearBuilt: 2023,
    garageSpaces: 2,
    amenities: ['Waterfront', 'Private Boat Dock', 'Fire Pit', 'Outdoor Kitchen', 'Hardwood Floors', 'Solar Powered'],
    agent: {
      name: 'Elena Rostova',
      phone: '+1 (512) 555-0188',
      email: 'elena@apexpds.com',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
      title: 'Senior Relocation Specialist'
    },
    createdAt: '2025-02-10'
  },
  {
    id: 'prop-4',
    title: 'Oceanfront Glass Horizon',
    description: 'Direct Atlantic frontage in prestigious Sunny Isles. Revel in private beach access, expansive deep balconies, custom Sub-Zero and Miele appliances, and access to five-star resort amenities including beachside service.',
    location: 'Miami Beach, FL 33139',
    city: 'Miami Beach',
    state: 'FL',
    zip: '33139',
    price: 2150000,
    priceDisplay: '$2,150,000',
    beds: 4,
    baths: 4,
    sqft: 3100,
    propertyType: 'Penthouse',
    status: 'FOR SALE',
    featured: false,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&q=80&w=1200'
    ],
    yearBuilt: 2023,
    garageSpaces: 2,
    amenities: ['Oceanfront', 'Direct Beach Access', 'Resort Pool', 'Tennis Courts', 'Private Cabana', 'Valet'],
    agent: {
      name: 'Sophia Montgomery',
      phone: '+1 (310) 555-0192',
      email: 'sophia@apexpds.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      title: 'Principal Luxury Advisor'
    },
    createdAt: '2025-02-12'
  },
  {
    id: 'prop-5',
    title: 'The Tribeca Artisan Loft',
    description: 'Historic cast-iron authenticity meets sleek contemporary minimalism. High 13-foot timber beamed ceilings, exposed brick accent walls, oversized wood-burning fireplace, and custom blackened steel staircase.',
    location: 'Tribeca, New York, NY 10013',
    city: 'New York',
    state: 'NY',
    zip: '10013',
    price: 6800,
    priceDisplay: '$6,800/mo',
    beds: 2,
    baths: 2,
    sqft: 1650,
    propertyType: 'Apartment',
    status: 'FOR RENT',
    featured: false,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200'
    ],
    yearBuilt: 2019,
    garageSpaces: 1,
    amenities: ['High Ceilings', 'Exposed Brick', 'Fireplace', 'Wine Refrigerator', 'Keyed Elevator', 'Pet Friendly'],
    agent: {
      name: 'Marcus Vance',
      phone: '+1 (212) 555-0144',
      email: 'marcus@apexpds.com',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
      title: 'Managing Director'
    },
    createdAt: '2025-02-18'
  },
  {
    id: 'prop-6',
    title: 'Aspen Modern Alpine Estate',
    description: 'Set against dramatic mountain peaks, this winter and summer sanctuary offers ski-in/ski-out convenience, heated stone motor court, indoor lap pool, steam room, and radiant in-floor heating throughout.',
    location: 'Aspen, CO 81611',
    city: 'Aspen',
    state: 'CO',
    zip: '81611',
    price: 3450000,
    priceDisplay: '$3,450,000',
    beds: 5,
    baths: 6,
    sqft: 4800,
    propertyType: 'Villa',
    status: 'FOR SALE',
    featured: false,
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'
    ],
    yearBuilt: 2024,
    garageSpaces: 4,
    amenities: ['Ski-in/Ski-out', 'Indoor Heated Pool', 'Steam Room', 'Heated Driveway', 'Mountain Views', 'Custom Wet Bar'],
    agent: {
      name: 'Elena Rostova',
      phone: '+1 (512) 555-0188',
      email: 'elena@apexpds.com',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
      title: 'Senior Relocation Specialist'
    },
    createdAt: '2025-02-22'
  },
  {
    id: 'prop-7',
    title: 'Grand Millennium Commercial Hub',
    description: 'Prime Class-A commercial headquarters featuring state-of-the-art HVAC filtration, LEED Gold certification, modular open-concept work wings, boardroom suites, and private secured subterranean executive parking.',
    location: 'Seattle, WA 98101',
    city: 'Seattle',
    state: 'WA',
    zip: '98101',
    price: 5200000,
    priceDisplay: '$5,200,000',
    beds: 0,
    baths: 8,
    sqft: 14200,
    propertyType: 'Commercial',
    status: 'FOR SALE',
    featured: false,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'
    ],
    yearBuilt: 2022,
    garageSpaces: 15,
    amenities: ['LEED Gold', 'Conference Center', 'Fiber Optic Ready', 'Rooftop Lounge', '24/7 Access', 'Security Turnstiles'],
    agent: {
      name: 'David Chen',
      phone: '+1 (415) 555-0163',
      email: 'david@apexpds.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      title: 'Commercial Portfolio Manager'
    },
    createdAt: '2025-02-24'
  },
  {
    id: 'prop-8',
    title: 'Parkview Brownstone Residence',
    description: 'A meticulously restored 4-story historic townhome directly overlooking the park. Boasts a chef’s gourmet kitchen with French range, private landscaped English courtyard, wine cellar, and master suite with fireplace.',
    location: 'Boston, MA 02116',
    city: 'Boston',
    state: 'MA',
    zip: '02116',
    price: 1980000,
    priceDisplay: '$1,980,000',
    beds: 4,
    baths: 3,
    sqft: 2850,
    propertyType: 'Townhouse',
    status: 'FOR SALE',
    featured: false,
    image: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200'
    ],
    yearBuilt: 2020,
    garageSpaces: 1,
    amenities: ['Park View', 'Private Garden', 'Restored Fireplaces', 'Wine Cellar', 'Walk-in Closets', 'Chef Kitchen'],
    agent: {
      name: 'Sophia Montgomery',
      phone: '+1 (310) 555-0192',
      email: 'sophia@apexpds.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      title: 'Principal Luxury Advisor'
    },
    createdAt: '2025-02-26'
  },
  {
    id: 'prop-9',
    title: 'Silicon Valley Smart Contemporary',
    description: 'A modern net-zero architectural showpiece located minutes from major tech campuses. Equipped with integrated solar panels, Tesla Powerwalls, smart home voice controls, saltwater pool, and zen Japanese garden.',
    location: 'Palo Alto, CA 94301',
    city: 'Palo Alto',
    state: 'CA',
    zip: '94301',
    price: 7500,
    priceDisplay: '$7,500/mo',
    beds: 3,
    baths: 3,
    sqft: 2100,
    propertyType: 'Apartment',
    status: 'FOR RENT',
    featured: false,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200'
    ],
    yearBuilt: 2023,
    garageSpaces: 2,
    amenities: ['Tesla EV Charger', 'Solar Net Zero', 'Smart Home Automation', 'Saltwater Pool', 'High-Speed Mesh', 'Zen Garden'],
    agent: {
      name: 'David Chen',
      phone: '+1 (415) 555-0163',
      email: 'david@apexpds.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      title: 'Commercial Portfolio Manager'
    },
    createdAt: '2025-02-28'
  }
];

export const samplePropertyImages = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1200'
];

export const faqs = [
  {
    question: "How do I schedule an in-person or virtual property tour?",
    answer: "You can click on any property card to open its detail view, select the 'Schedule Tour' tab, pick your preferred date and time, and choose between an In-Person or 3D Virtual tour. Our assigned luxury agent will immediately receive your request and confirm your appointment."
  },
  {
    question: "What is required to list my property on ApexPDSSolutions?",
    answer: "Simply navigate to our 'Sell Property' page or click 'Add Listing' in the top navigation. You can submit photos, property specs, pricing, and amenities. Your listing is verified and immediately published live across our platform."
  },
  {
    question: "How does the interactive Mortgage Calculator work?",
    answer: "Inside any property detail view, our built-in mortgage calculator estimates monthly principal and interest, property taxes, and homeowners insurance based on your custom down payment, interest rate, and loan term (15 or 30 years)."
  },
  {
    question: "Can I speak directly with a dedicated luxury agent?",
    answer: "Yes! Visit our 'Agents' tab to view individual broker portfolios, track record, and specialties. You can schedule a private advisory consultation, phone call, or connect instantaneously via our floating WhatsApp button."
  },
  {
    question: "Are your listings updated in real time?",
    answer: "Yes, our catalog synchronizes live. Once a property status changes or a new residence is submitted, the marketplace reflects the changes immediately."
  }
];
