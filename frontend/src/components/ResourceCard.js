import React from 'react';
import { FileText, Video, Download, User } from 'lucide-react'; // Install: npm install lucide-react

const ResourceCard = ({ resource }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {resource.category}
          </span>
          {resource.fileType === 'video' ? <Video size={18} /> : <FileText size={18} />}
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{resource.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{resource.description}</p>
        
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <User size={14} className="mr-1" />
          <span>Uploaded by: {resource.uploader?.name?.first || 'Anonymous'}</span>
        </div>

        <a 
          href={`http://localhost:5000${resource.fileUrl}`} 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center justify-center w-full bg-gray-100 text-gray-700 py-2 rounded font-semibold hover:bg-gray-200 transition"
        >
          <Download size={16} className="mr-2" />
          View Resource
        </a>
      </div>
    </div>
  );
};

export default ResourceCard;