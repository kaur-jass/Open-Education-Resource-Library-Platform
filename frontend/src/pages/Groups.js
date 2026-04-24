import React from 'react';
import Navbar from '../components/Navbar';
import { Users, MessageSquare, ShieldCheck, Search } from 'lucide-react';

const Groups = () => {
  const groups = [
    { title: "Database Systems Educators", members: "1.2k", type: "Public", iconBg: "bg-blue-100 text-blue-600" },
    { title: "AI Research Group", members: "850", type: "Closed", iconBg: "bg-purple-100 text-purple-600" },
    { title: "Open Source Curriculum", members: "3.2k", type: "Public", iconBg: "bg-green-100 text-green-600" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#34495e]">Collaboration Groups</h1>
          <div className="relative w-full sm:w-64">
            <input type="text" placeholder="Find a group..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        <div className="space-y-4">
          {groups.map((group, idx) => (
            <div key={idx} className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className={`${group.iconBg} p-4 rounded-2xl shrink-0`}>
                  <Users size={28} />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">{group.title}</h3>
                  <div className="flex flex-wrap items-center text-xs md:text-sm text-gray-500 gap-4 mt-1">
                    <span className="flex items-center"><MessageSquare size={14} className="mr-1" /> {group.members} Members</span>
                    <span className="flex items-center"><ShieldCheck size={14} className="mr-1" /> {group.type}</span>
                  </div>
                </div>
              </div>
              <button className="w-full md:w-auto bg-[#27ae60] hover:bg-[#219150] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95">
                Join Group
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Groups;