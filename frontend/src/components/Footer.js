import React from 'react';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1a252f] text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-black tracking-tighter mb-4">
          OER<span className="text-blue-400">COMMONS</span>
        </h2>
        <div className="flex justify-center space-x-6 mb-8">
          <Github className="cursor-pointer hover:text-blue-400" size={20} />
          <Twitter className="cursor-pointer hover:text-blue-400" size={20} />
          <Linkedin className="cursor-pointer hover:text-blue-400" size={20} />
        </div>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
          © 2026 OER COMMONS. MADE WITH <Heart size={12} className="inline text-red-500 fill-red-500" /> FOR EDUCATION
        </p>
      </div>
    </footer>
  );
};

export default Footer;