import { Building, MapPin, Phone, Mail, Send, Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Building className="text-white w-4 h-4" />
            </div>
            <span className="text-xl font-bold tracking-tight">ApexPDSSolutions</span>
          </div>
          <p className="text-gray-500 leading-relaxed mb-6">
            Providing premium real estate services with transparency and excellence since 2010. Your dream home is one click away.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition"><Facebook className="w-5 h-5"/></a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition"><Instagram className="w-5 h-5"/></a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition"><Linkedin className="w-5 h-5"/></a>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-gray-500">
            <li><a href="#" className="hover:text-blue-600 transition">Latest Listings</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">About Our Agency</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Contact Support</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Contact Us</h4>
          <ul className="space-y-4 text-gray-500">
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 text-blue-600 w-5 h-5" />
              <span>123 Realty Tower, <br/>Financial District, NY</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-blue-600 w-5 h-5" />
              <span>+1 (234) 567 890</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-blue-600 w-5 h-5" />
              <span>hello@eliteestates.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Newsletter</h4>
          <p className="text-gray-500 mb-4 text-sm">Subscribe to get the latest property market reports.</p>
          <div className="relative">
            <input type="email" placeholder="Email address" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-600 transition text-sm"/>
            <button className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700">
              <Send className="w-4 h-4"/>
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 border-t border-gray-100 pt-10 text-center text-gray-400 text-sm">
        © 2024 ApexPDSSolutions International. All rights reserved.
      </div>
    </footer>
  );
}
