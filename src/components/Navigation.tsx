import { Building } from "lucide-react";

export function Navigation() {
  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Building className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-800">
              ApexPDSSolutions
            </span>
          </div>
          <div className="hidden md:flex space-x-8 font-medium">
            <a href="#" className="text-blue-600">Home</a>
            <a href="#" className="hover:text-blue-600 transition">Properties</a>
            <a href="#" className="hover:text-blue-600 transition">Sell Property</a>
            <a href="#" className="hover:text-blue-600 transition">Agents</a>
            <a href="#" className="hover:text-blue-600 transition">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden md:block font-semibold">Sign In</button>
            <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
              Add Listing
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
