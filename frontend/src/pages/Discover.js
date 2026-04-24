import React, { useState } from 'react';
import Navbar from '../components/Navbar';
// Icons for professional subject areas
import { 
  Database, Code, Cpu, Shield, Globe, Calculator, FlaskConical, Library, 
  Landmark, Atom, Cloud, BarChart, ExternalLink, Search, Book, Scale, 
  Music, HeartPulse, Languages, Lightbulb, Users, GraduationCap
} from 'lucide-react';

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Expanded dataset for a high-density "Infinite Library" feel
  const subjects = [
    { name: 'Applied Science', icon: <FlaskConical />, count: '14k+', color: 'bg-emerald-600', url: 'https://phet.colorado.edu/' },
    { name: 'DBMS & SQL', icon: <Database />, count: '5k+', color: 'bg-blue-600', url: 'https://www.mongodb.com/academy' },
    { name: 'Artificial Intelligence', icon: <Cpu />, count: '2k+', color: 'bg-purple-600', url: 'https://www.deeplearning.ai/' },
    { name: 'Mathematics', icon: <Calculator />, count: '8k+', color: 'bg-indigo-500', url: 'https://www.khanacademy.org/math' },
    { name: 'Computer Science', icon: <Code />, count: '12k+', color: 'bg-slate-800', url: 'https://ocw.mit.edu/' },
    { name: 'Cyber Security', icon: <Shield />, count: '1k+', color: 'bg-red-600', url: 'https://www.cybrary.it/' },
    { name: 'Physical Science', icon: <Atom />, count: '10k+', color: 'bg-sky-600', url: 'https://archive.org/details/science' },
    { name: 'Humanities', icon: <Landmark />, count: '10k+', color: 'bg-amber-700', url: 'https://www.khanacademy.org/humanities' },
    { name: 'Web Development', icon: <Globe />, count: '9k+', color: 'bg-yellow-500', url: 'https://developer.mozilla.org/' },
    { name: 'Data Science', icon: <BarChart />, count: '3k+', color: 'bg-orange-500', url: 'https://www.datacamp.com/' },
    { name: 'Law & Ethics', icon: <Scale />, count: '500+', color: 'bg-stone-700', url: 'https://www.law.cornell.edu/' },
    { name: 'Business', icon: <Lightbulb />, count: '4k+', color: 'bg-lime-600', url: 'https://open.umn.edu/opentextbooks/' },
    { name: 'Medicine', icon: <HeartPulse />, count: '7k+', color: 'bg-rose-500', url: 'https://www.ncbi.nlm.nih.gov/pmc/' },
    { name: 'Engineering', icon: <Book />, count: '6k+', color: 'bg-zinc-600', url: 'https://www.engineering.com/' },
    { name: 'Music & Arts', icon: <Music />, count: '2k+', color: 'bg-pink-500', url: 'https://artsandculture.google.com/' },
    { name: 'World Languages', icon: <Languages />, count: '1k+', color: 'bg-violet-600', url: 'https://www.duolingo.com/' },
    { name: 'Social Science', icon: <Users />, count: '9k+', color: 'bg-teal-600', url: 'https://www.oercommons.org/browse?f.general_subject=social-sciences' },
    { name: 'Higher Education', icon: <GraduationCap />, count: '15k+', color: 'bg-cyan-700', url: 'https://www.merlot.org/merlot/' },
    { name: 'Cloud Computing', icon: <Cloud />, count: '800+', color: 'bg-sky-400', url: 'https://aws.amazon.com/training/' },
    { name: 'Open Collections', icon: <Library />, count: '50k+', color: 'bg-neutral-800', url: 'https://archive.org/' },
  ];

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    // Navigate to OER Commons search for any custom input
    window.open(`https://www.oercommons.org/search?f.search=${encodeURIComponent(searchQuery)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Dynamic Search Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#34495e] mb-4">Global Discovery Hub</h1>
          <p className="text-gray-500 max-w-2xl mx-auto mb-10">Search millions of vetted resources or browse our curated subject areas below.</p>
          
          <form onSubmit={handleGlobalSearch} className="relative max-w-2xl mx-auto group">
            <input 
              type="text" 
              placeholder="Type any subject to navigate to global sources..." 
              className="w-full pl-14 pr-32 py-5 rounded-2xl border-2 border-gray-100 shadow-xl focus:border-blue-500 transition-all outline-none text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500" size={24} />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#27ae60] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#219150] shadow-md transition-all">
              Navigate
            </button>
          </form>
        </div>

        {/* High-Density Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {subjects.map((sub) => (
            <div 
              key={sub.name}
              onClick={() => window.open(sub.url, '_blank')}
              className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group"
            >
              <div className={`${sub.color} text-white p-4 rounded-2xl inline-block mb-4 group-hover:rotate-6 transition-transform shadow-lg`}>
                {React.cloneElement(sub.icon, { size: 28 })}
              </div>
              <h3 className="text-lg font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">
                {sub.name}
              </h3>
              <div className="flex items-center justify-between mt-4">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{sub.count} Files</span>
                <ExternalLink size={14} className="text-gray-300 group-hover:text-blue-500" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Verified Provider Footer */}
      <footer className="bg-[#34495e] py-12 text-center text-white/40 text-sm border-t border-white/5">
        <p>Curated Portal for Global Open Educational Resources (OER).</p>
        <p className="mt-1">All external links open in a new tab for continued access.</p>
      </footer>
    </div>
  );
};

export default Discover;