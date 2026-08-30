export function CallToAction() {
  return (
    <section className="bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-8 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Are you a property owner?</h2>
          <p className="text-gray-400 text-lg">We help you sell your property 2x faster than traditional methods.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-xl shadow-blue-900/20">
            List Your Property
          </button>
          <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
