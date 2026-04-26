import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ResourceCard from '../components/ResourceCard';
import Footer from '../components/Footer'; // 1. IMPORT ADDED HERE
import { LayoutGrid, Loader2, RefreshCcw, SearchX } from 'lucide-react';

const Home = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const fetchResources = useCallback(async (searchTerm = '', category = 'Subject') => {
    setLoading(true);
    try {
      let url = 'http://localhost:5000/api/resources';
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (category && category !== 'Subject') params.append('category', category);
      
      const { data } = await axios.get(`${url}?${params.toString()}`);
      setResources(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const categoryFromUrl = new URLSearchParams(location.search).get('category');
    fetchResources('', categoryFromUrl || 'Subject');
  }, [location.search, fetchResources]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      <Hero onSearch={fetchResources} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between mb-10 gap-4 border-b border-gray-200 pb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg">
              <LayoutGrid className="text-white" size={22} />
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#34495e]">Resources</h2>
              <p className="text-sm text-gray-500 font-medium italic">
                {new URLSearchParams(location.search).get('category') || 'All Subjects'}
              </p>
            </div>
          </div>
          <div className="bg-white px-5 py-2 rounded-full shadow-sm border border-gray-100 text-blue-600 font-bold">
            {resources.length} Results
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-32">
            <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
            <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Loading Library...</p>
          </div>
        ) : resources.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((item) => (
              <ResourceCard key={item._id} resource={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
            <SearchX className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-2xl font-bold text-gray-400">No local resources found</h3>
            <button onClick={() => fetchResources()} className="mt-6 flex items-center mx-auto text-blue-600 font-bold">
              <RefreshCcw size={18} className="mr-2" /> Reset
            </button>
          </div>
        )}
      </main>

      <Footer /> {/* 2. FOOTER INTEGRATED HERE */}
    </div>
  );
};

export default Home;