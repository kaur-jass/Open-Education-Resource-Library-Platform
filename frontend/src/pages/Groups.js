import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Users, MessageSquare, ShieldCheck, Search, Plus, X } from 'lucide-react';

const Groups = () => {
  // 1. Persistence Logic: Load from localStorage or use defaults
  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem('oer_groups');
    return saved ? JSON.parse(saved) : [
      { title: "Database Systems Educators", members: 1200, type: "Public", iconBg: "bg-blue-100 text-blue-600", joined: false },
      { title: "AI Research Group", members: 850, type: "Closed", iconBg: "bg-purple-100 text-purple-600", joined: false },
      { title: "Open Source Curriculum", members: 3200, type: "Public", iconBg: "bg-green-100 text-green-600", joined: false }
    ];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newGroup, setNewGroup] = useState({ title: '', type: 'Public' });

  // Sync with localStorage whenever groups change
  useEffect(() => {
    localStorage.setItem('oer_groups', JSON.stringify(groups));
  }, [groups]);

  // 2. Search Logic
  const filteredGroups = groups.filter(group => 
    group.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 3. Join/Leave Toggle Logic
  const toggleJoin = (index) => {
    const updatedGroups = [...groups];
    // Find the actual item in the main array, not the filtered one
    const groupTitle = filteredGroups[index].title;
    const actualIndex = groups.findIndex(g => g.title === groupTitle);
    
    updatedGroups[actualIndex].joined = !updatedGroups[actualIndex].joined;
    updatedGroups[actualIndex].members += updatedGroups[actualIndex].joined ? 1 : -1;
    setGroups(updatedGroups);
  };

  // 4. Create Group Logic
  const handleCreate = (e) => {
    e.preventDefault();
    const colors = [
      "bg-orange-100 text-orange-600",
      "bg-pink-100 text-pink-600",
      "bg-cyan-100 text-cyan-600"
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    setGroups([{
      ...newGroup,
      members: 1,
      iconBg: randomColor,
      joined: true
    }, ...groups]);
    setShowModal(false);
    setNewGroup({ title: '', type: 'Public' });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-serif font-bold text-[#2c3e50]">Collaboration Groups</h1>
            <p className="text-gray-500 mt-1">Connect with educators worldwide to build better resources.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <input 
                type="text" 
                placeholder="Search groups..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all" 
              />
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white p-3.5 rounded-2xl hover:bg-blue-700 shadow-lg transition-transform active:scale-90"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>

        {/* Groups List */}
        <div className="grid gap-4">
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group, idx) => (
              <div 
                key={idx} 
                className={`bg-white p-6 rounded-[2rem] border transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                  group.joined ? 'border-blue-200 bg-blue-50/30' : 'border-gray-100 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex items-center space-x-5">
                  <div className={`${group.iconBg} p-5 rounded-[1.5rem] shrink-0 shadow-inner`}>
                    <Users size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{group.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 font-medium gap-5 mt-2">
                      <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                        <MessageSquare size={14} className="mr-2 text-gray-400" /> {group.members.toLocaleString()} Members
                      </span>
                      <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                        <ShieldCheck size={14} className="mr-2 text-gray-400" /> {group.type}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => toggleJoin(idx)}
                  className={`w-full md:w-44 py-4 rounded-2xl font-bold transition-all shadow-sm active:scale-95 ${
                    group.joined 
                    ? 'bg-gray-200 text-gray-600 hover:bg-red-100 hover:text-red-600' 
                    : 'bg-[#27ae60] hover:bg-[#219150] text-white'
                  }`}
                >
                  {group.joined ? "Leave Group" : "Join Group"}
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-medium">No groups found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>

      {/* --- CREATE GROUP MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
            
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-6">Start a Group</h2>
            
            <form onSubmit={handleCreate} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1">Group Title</label>
                <input 
                  type="text" required 
                  placeholder="e.g. Physics Teachers 2026"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={newGroup.title}
                  onChange={(e) => setNewGroup({...newGroup, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1">Privacy</label>
                <select 
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                  value={newGroup.type}
                  onChange={(e) => setNewGroup({...newGroup, type: e.target.value})}
                >
                  <option value="Public">Public (Anyone can join)</option>
                  <option value="Closed">Closed (Invite only)</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                Create & Join Group
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Groups;