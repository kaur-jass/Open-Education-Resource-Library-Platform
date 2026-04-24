import React, { useState } from 'react';

const Hero = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Subject');

  const categories = ["DBMS", "Software Engineering", "AI", "Mathematics", "Others"];

  const handleSearchClick = () => {
    onSearch(searchTerm, category);
  };

  return (
    <div className="relative h-[550px] flex flex-col items-center justify-center text-white text-center px-4 bg-cover bg-fixed bg-center" 
         style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}>
      
      <div className="animate-fade-in-up">
        <h1 className="text-6xl font-serif mb-4 italic font-bold">Explore. Create. Collaborate.</h1>
        <p className="max-w-2xl mx-auto mb-10 text-xl font-light text-gray-200">
          OER Commons is a public digital library of open educational resources. 
          Find free lecture notes, textbooks, and more.
        </p>

        {/* Search Bar Container */}
        <div className="flex flex-col md:flex-row items-center bg-white p-2 rounded-2xl shadow-2xl w-full max-w-5xl mx-auto text-black border-4 border-white/20 backdrop-blur-sm">
          <input 
            type="text" 
            placeholder="Search for subjects, topics, or authors..." 
            className="flex-1 p-4 outline-none text-lg w-full md:border-r border-gray-100" 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select 
            className="p-4 bg-white outline-none text-gray-500 font-medium w-full md:w-48 cursor-pointer"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Subject">Subject</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <button 
            onClick={handleSearchClick}
            className="bg-[#27ae60] text-white px-12 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#219150] transition-all w-full md:w-auto shadow-lg"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;