export function Stats() {
  const stats = [
    { label: "Properties Sold", value: "12k+" },
    { label: "Happy Clients", value: "5k+" },
    { label: "Expert Agents", value: "150+" },
    { label: "Awards Won", value: "25+" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-3xl font-bold text-blue-600">{stat.value}</h3>
            <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
