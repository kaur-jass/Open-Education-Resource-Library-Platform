import React from 'react';
import Navbar from '../components/Navbar';

const Hubs = () => {
  const hubs = [
    { name: "Computer Science Hub", org: "Global Tech University", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=500&q=60" },
    { name: "Open Math Initiative", org: "Math Society", img: "https://images.unsplash.com/photo-1509228468518-180dd48a5791?auto=format&fit=crop&w=500&q=60" },
    { name: "AI Research Lab", org: "Future Mind Foundation", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=500&q=60" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="text-left">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#34495e]">OER Hubs</h1>
            <p className="text-gray-500 mt-2 text-sm md:text-base">Customized collections created by our partners.</p>
          </div>
          <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold text-sm transition-all shadow-lg active:scale-95">
            Create a Hub
          </button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {hubs.map((hub, idx) => (
            <div key={idx} className="group overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="relative h-48 overflow-hidden">
                <img src={hub.img} alt={hub.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{hub.name}</h3>
                <p className="text-blue-600 text-sm font-semibold mt-1 uppercase tracking-wider">{hub.org}</p>
                <button className="mt-6 w-full border-2 border-gray-100 py-3 rounded-xl font-bold text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                  View Collection
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Hubs;