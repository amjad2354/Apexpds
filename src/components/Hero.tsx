import { MapPin, Home, Tag } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-[650px] flex items-center justify-center pt-20">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Luxury Home" />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-4xl px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Find a Place Where You <br/><span className="text-blue-400">Belong</span></h1>
        
        <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2">
          <div className="flex-1 flex items-center px-4 py-3 border-r border-gray-100">
            <MapPin className="text-blue-600 mr-3 w-5 h-5" />
            <input type="text" placeholder="Location, City, Zip..." className="w-full outline-none text-gray-700" />
          </div>
          <div className="flex-1 flex items-center px-4 py-3 border-r border-gray-100">
            <Home className="text-blue-600 mr-3 w-5 h-5" />
            <select className="w-full outline-none text-gray-700 bg-transparent">
              <option>Property Type</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Commercial</option>
            </select>
          </div>
          <div className="flex-1 flex items-center px-4 py-3 border-r border-gray-100">
            <Tag className="text-blue-600 mr-3 w-5 h-5" />
            <select className="w-full outline-none text-gray-700 bg-transparent">
              <option>Price Range</option>
              <option>$100k - $500k</option>
              <option>$500k - $1M</option>
            </select>
          </div>
          <button className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
