import { MapPin, Bed, Bath, Ruler } from "lucide-react";

interface Property {
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  status: 'FOR SALE' | 'FOR RENT';
}

const properties: Property[] = [
  {
    title: "Modernist Sky Villa",
    location: "Beverly Hills, CA 90210",
    price: "$1,250,000",
    beds: 4,
    baths: 3,
    sqft: "2,400 sqft",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800",
    status: 'FOR SALE'
  },
  {
    title: "The Penthouse Suite",
    location: "Manhattan, NY 10001",
    price: "$4,500/mo",
    beds: 2,
    baths: 2,
    sqft: "1,150 sqft",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    status: 'FOR RENT'
  },
  {
    title: "Lakeside Retreat",
    location: "Austin, TX 78701",
    price: "$890,000",
    beds: 3,
    baths: 3,
    sqft: "1,900 sqft",
    image: "https://images.unsplash.com/photo-1600607687940-47a0f925901e?auto=format&fit=crop&q=80&w=800",
    status: 'FOR SALE'
  },
];

export function FeaturedProperties() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Featured Listings</h2>
          <p className="text-gray-500 mt-2">Explore our hand-picked premium properties</p>
        </div>
        <a href="#" className="text-blue-600 font-bold flex items-center hover:underline">
          View All <span className="ml-2 text-sm">→</span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {properties.map((p, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="relative overflow-hidden">
              <img src={p.image} className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105" alt={p.title} />
              <span className={`absolute top-4 left-4 ${p.status === 'FOR SALE' ? 'bg-blue-600' : 'bg-green-600'} text-white px-3 py-1 rounded-md text-sm font-bold`}>{p.status}</span>
              <span className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-md text-sm font-bold text-gray-800">{p.price}</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{p.title}</h3>
              <p className="text-gray-500 flex items-center text-sm mb-4">
                <MapPin className="mr-2 text-blue-600 w-4 h-4" /> {p.location}
              </p>
              <div className="flex justify-between items-center py-4 border-t border-gray-50 text-gray-600">
                <span className="flex items-center text-sm"><Bed className="mr-2 text-blue-500 w-4 h-4" /> {p.beds} Beds</span>
                <span className="flex items-center text-sm"><Bath className="mr-2 text-blue-500 w-4 h-4" /> {p.baths} Baths</span>
                <span className="flex items-center text-sm"><Ruler className="mr-2 text-blue-500 w-4 h-4" /> {p.sqft}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
