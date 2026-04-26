import React, { useState } from 'react';
import { Search, BookOpen, Sparkles } from 'lucide-react';

const Hero = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    // Trim handles the "+" issue in URLs by removing leading/trailing spaces
    if (onSearch) {
      onSearch(searchValue.trim());
    }
  };

  return (
    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Professional Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Adjusted gradient to transition better into your white resources section */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a252f]/90 via-[#2c3e50]/80 to-[#f8fafc]"></div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-10 animate-bounce opacity-20 text-white"><BookOpen size={40} /></div>
      <div className="absolute bottom-40 right-20 animate-pulse opacity-20 text-white"><Sparkles size={40} /></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Animated Badge */}
        <div className="inline-flex items-center space-x-2 bg-blue-500/20 border border-blue-400/30 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-ping"></span>
          <span className="text-blue-100 text-xs font-black uppercase tracking-widest">New Resources Available</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
          Explore. Create. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
            Collaborate.
          </span>
        </h1>
        
        <p className="text-blue-100/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
          OER Commons is a public digital library of open educational resources. 
          Find free lecture notes, textbooks, and more.
        </p>
        
        {/* Interactive Search Bar - SUBJECT REMOVED */}
        <div className="bg-white/10 backdrop-blur-xl p-3 rounded-[2.5rem] border border-white/20 shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-2 transform hover:scale-[1.01] transition-all duration-300">
          <div className="flex-1 flex items-center bg-white rounded-[2rem] px-6 py-2 w-full">
            <Search className="text-gray-400 mr-3" size={20} />
            <input 
              type="text" 
              placeholder="Search for subjects, topics, or authors..." 
              className="w-full py-4 text-gray-700 outline-none font-medium placeholder:text-gray-400"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>

          <button 
            onClick={handleSearch}
            className="bg-[#27ae60] hover:bg-[#2ecc71] text-white px-12 py-4 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all shadow-xl hover:shadow-green-500/20 active:scale-95 w-full md:w-auto"
          >
            Search
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/60 text-[10px] font-black uppercase tracking-widest">
          <span className="text-white/30">Popular Tags:</span>
          {["DBMS", "ReactJS", "Physics", "Math"].map(tag => (
            <button 
              key={tag} 
              onClick={() => onSearch(tag)} 
              className="hover:text-blue-400 transition-colors"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;