import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, FileText, CheckCircle, BookOpen } from 'lucide-react';

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Computer Science',
    fileType: 'pdf'
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Expanded Categories List
  const categories = [
    "Computer Science", "DBMS", "Software Engineering", "Artificial Intelligence",
    "Computer Networks", "Cyber Security", "Data Structures & Algorithms",
    "Web Development", "Machine Learning", "Mathematics", "Physics", 
    "Operating Systems", "Cloud Computing", "Digital Marketing", "Others"
  ];

  const handleUpload = async (e) => {
    e.preventDefault();
    if(!file) return alert("Please select a file first!");
    setLoading(true);
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('fileType', formData.fileType);
    data.append('file', file);

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`
        }
      };
      await axios.post('http://localhost:5000/api/resources/upload', data, config);
      alert("Success! Your notes are now live.");
      navigate('/');
    } catch (err) {
      alert("Upload failed. Make sure your backend is running!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="bg-[#34495e] p-8 text-white flex items-center justify-between">
          <div className="flex items-center">
            <BookOpen className="mr-3 text-blue-400" size={32} />
            <div>
              <h2 className="text-2xl font-bold">Share Your Knowledge</h2>
              <p className="text-sm text-gray-300">Upload notes, videos, or PDFs for the community</p>
            </div>
          </div>
          <UploadIcon size={28} className="opacity-50" />
        </div>
        
        <form onSubmit={handleUpload} className="p-8 lg:p-12 space-y-8 text-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Resource Title</label>
                <input 
                  type="text" required placeholder="e.g. Unit 3 DBMS Notes"
                  className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-blue-400 focus:ring-0 transition-all outline-none bg-gray-50"
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Category</label>
                  <select 
                    className="w-full border-2 border-gray-100 p-4 rounded-xl bg-gray-50 outline-none focus:border-blue-400"
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Type</label>
                  <select 
                    className="w-full border-2 border-gray-100 p-4 rounded-xl bg-gray-50 outline-none focus:border-blue-400"
                    onChange={(e) => setFormData({...formData, fileType: e.target.value})}
                  >
                    <option value="notes">Handwritten Notes</option>
                    <option value="pdf">Textbook/PDF</option>
                    <option value="video">Video Lecture</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Description</label>
                <textarea 
                  rows="4" placeholder="Briefly describe the contents..."
                  className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-blue-400 outline-none bg-gray-50"
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
            </div>

            {/* Right Column: File Dropzone */}
            <div className="flex flex-col justify-center">
              <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">File Attachment</label>
              <div className="border-4 border-dashed border-gray-100 rounded-3xl p-10 text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer relative h-full flex flex-col items-center justify-center">
                <input 
                  type="file" required 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                {file ? (
                  <div className="text-blue-600">
                    <CheckCircle size={60} className="mx-auto mb-4 animate-bounce" />
                    <span className="font-bold text-lg">{file.name}</span>
                    <p className="text-sm text-gray-400 mt-2">Click to change file</p>
                  </div>
                ) : (
                  <div className="text-gray-400">
                    <div className="bg-white p-6 rounded-full shadow-md inline-block mb-4">
                        <FileText size={48} className="text-blue-400" />
                    </div>
                    <p className="font-bold text-gray-600">Click or Drag File</p>
                    <p className="text-xs mt-2 px-6">Maximum file size: 50MB (PDF, DOCX, MP4)</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-5 rounded-2xl font-black text-xl text-white tracking-widest transition-all transform active:scale-95 shadow-xl ${loading ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'}`}
          >
            {loading ? "PROCESSING..." : "PUBLISH RESOURCE"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;