import React from 'react';
import { FileText, Download, Calendar, Trash2 } from 'lucide-react';

const ResourceCard = ({ resource, onDelete }) => {
  // FIX: Check if fileUrl is an external link or a local filename
  const getFileLink = () => {
    if (resource.fileUrl && resource.fileUrl.startsWith('http')) {
      return resource.fileUrl; // Use external link directly
    }
    return `http://localhost:5000/uploads/${resource.fileUrl}`; // Use local backend
  };

  const handleDelete = async () => {
    // Basic confirmation dialog before deleting
    if (window.confirm(`Are you sure you want to delete "${resource.title}"?`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/resources/${resource._id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Notify the parent component (Home.js) to remove this card from the UI
          onDelete(resource._id);
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message || 'Could not delete resource'}`);
        }
      } catch (error) {
        console.error("Delete request failed:", error);
        alert("Failed to connect to the server.");
      }
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all group relative">
      <div className="flex justify-between items-start mb-6">
        <div className="bg-blue-50 p-4 rounded-2xl group-hover:bg-blue-600 transition-colors">
          <FileText className="text-blue-600 group-hover:text-white" size={28} />
        </div>

        {/* Delete Button - Visible on Hover */}
        <button 
          onClick={handleDelete}
          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
          title="Delete Resource"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="space-y-3">
        <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest">
          {resource.category}
        </span>
        <h3 className="text-2xl font-serif font-bold text-[#34495e] leading-tight">
          {resource.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 italic">
          {resource.description}
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center text-gray-400 text-xs font-bold uppercase">
          <Calendar size={14} className="mr-1" />
          {/* Formats date if it's a timestamp, otherwise shows raw string */}
          {resource.createdAt?.includes('T') ? resource.createdAt.split('T')[0] : resource.createdAt}
        </div>
        
        <a 
          href={getFileLink()} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center bg-[#34495e] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg"
        >
          <Download size={16} className="mr-2" /> View PDF
        </a>
      </div>
    </div>
  );
};

export default ResourceCard;