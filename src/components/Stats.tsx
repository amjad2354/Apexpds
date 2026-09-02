import React from 'react';
import { Award, Building2, Users, Trophy } from 'lucide-react';

export const Stats: React.FC = () => {
  const stats = [
    {
      label: "Properties Sold & Leased",
      value: "$1.8B+",
      sub: "Across premier markets",
      icon: <Building2 className="w-5 h-5 text-blue-600" />
    },
    {
      label: "Satisfied Private Clients",
      value: "5,200+",
      sub: "99.4% approval rating",
      icon: <Users className="w-5 h-5 text-indigo-600" />
    },
    {
      label: "Senior Luxury Brokers",
      value: "150+",
      sub: "In 18 key global cities",
      icon: <Award className="w-5 h-5 text-emerald-600" />
    },
    {
      label: "Industry Architecture Awards",
      value: "35+",
      sub: "Excellence in brokerage",
      icon: <Trophy className="w-5 h-5 text-amber-500" />
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100/80 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-2xl bg-gray-50 border border-gray-100">
                {stat.icon}
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                Verified
              </span>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-800 text-sm font-bold">{stat.label}</p>
              <p className="text-gray-400 text-xs mt-0.5">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
