import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Plus, Users, Globe, ArrowRight } from 'lucide-react';

const Hubs = () => {
  const navigate = useNavigate();

  // 1. Load initial data from localStorage if it exists, otherwise use defaults
  const [hubs, setHubs] = useState(() => {
    const savedHubs = localStorage.getItem('oer_hubs');
    return savedHubs ? JSON.parse(savedHubs) : [
      { name: "Computer Science Hub", org: "Global Tech University", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500", members: "12k" },
      { name: "Open Math Initiative", org: "Math Society", img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500", members: "8k" }, // Updated Math Image Link
      { name: "AI Research Lab", org: "Future Mind Foundation", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500", members: "5k" },
      { name: "Environmental Science", org: "Green Earth Org", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500", members: "15k" },
      { name: "Digital Humanities", org: "History Archive", img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500", members: "3k" },
      { name: "Open Engineering", org: "Polytech Institute", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500", members: "9k" }
    ];
  });

  // 2. Save to localStorage whenever 'hubs' state changes
  useEffect(() => {
    localStorage.setItem('oer_hubs', JSON.stringify(hubs));
  }, [hubs]);

  const [showModal, setShowModal] = useState(false);
  const [newHub, setNewHub] = useState({ 
    name: '', 
    org: '', 
    img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500', // New default library image
    members: '1' 
  });

  const handleCreateHub = (e) => {
    e.preventDefault();
    if(newHub.name && newHub.org) {
      const updatedHubs = [newHub, ...hubs];
      setHubs(updatedHubs);
      setShowModal(false);
      setNewHub({ name: '', org: '', img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500', members: '1' });
    }
  };

  const navigateToHub = (hubName) => {
    const searchParam = hubName.toLowerCase().replace(/ /g, '_');
    navigate(`/discover?category=${searchParam}`); 
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-2 uppercase tracking-widest">
              <Globe size={16} /> Global Network
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#34495e]">OER Hubs</h1>
            <p className="text-gray-500 mt-2 max-w-md">Collaborative spaces curated by institutions.</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl hover:-translate-y-1 active:scale-95"
          >
            <Plus size={20} /> Create a Hub
          </button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hubs.map((hub, idx) => (
            <div key={idx} className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col">
              <div className="relative h-56 overflow-hidden bg-gray-200">
                <img 
                  src={hub.img} 
                  alt={hub.name} 
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/500x300?text=OER+Library"; }} // Fallback if link breaks
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-1 shadow-sm">
                  <Users size={12} className="text-blue-600" /> {hub.members} Members
                </div>
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">{hub.org}</p>
                <h3 className="text-2xl font-bold text-gray-800 leading-tight mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">{hub.name}</h3>
                
                <div className="mt-auto">
                  <button 
                    onClick={() => navigateToHub(hub.name)}
                    className="w-full flex items-center justify-center gap-2 bg-gray-50 py-4 rounded-xl font-bold text-gray-600 group-hover:bg-blue-600 group-hover:text-white transition-all"
                  >
                    View Collection <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* CREATE HUB MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl">
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-2">New OER Hub</h2>
            <form onSubmit={handleCreateHub} className="space-y-5">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase mb-2">Hub Name</label>
                <input type="text" required className="w-full px-5 py-4 bg-gray-50 border rounded-2xl outline-none" value={newHub.name} onChange={(e) => setNewHub({...newHub, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase mb-2">Organization</label>
                <input type="text" required className="w-full px-5 py-4 bg-gray-50 border rounded-2xl outline-none" value={newHub.org} onChange={(e) => setNewHub({...newHub, org: e.target.value})} />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 font-bold text-gray-400">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold">Create Now</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hubs;