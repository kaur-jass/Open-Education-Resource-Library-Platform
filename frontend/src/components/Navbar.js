import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, PlusCircle, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Useful for highlighting active links

  // Helper to highlight active page
  const isActive = (path) => location.pathname === path ? "text-white font-bold" : "text-gray-300";

  return (
    <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-[#34495e] text-white shadow-md sticky top-0 z-50">
      <div className="flex items-center space-x-8">
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center">
          OER <span className="text-blue-400 uppercase ml-1">Commons</span>
        </Link>
        
        {/* LINKS */}
        <div className="hidden lg:flex space-x-6 text-sm font-medium">
          <Link to="/discover" className={`${isActive('/discover')} hover:text-white transition`}>Discover</Link>
          <Link to="/hubs" className={`${isActive('/hubs')} hover:text-white transition`}>Hubs</Link>
          <Link to="/groups" className={`${isActive('/groups')} hover:text-white transition`}>Groups</Link>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* ADD OER - Points to Upload */}
        <button 
          onClick={() => navigate('/upload')}
          className="flex items-center bg-[#27ae60] hover:bg-[#2ecc71] px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-green-900/20"
        >
          <PlusCircle size={16} className="mr-2" />
          <span>Add OER</span>
        </button>

        {/* AUTH SECTION */}
        {user ? (
          <div className="flex items-center space-x-4 border-l border-gray-600 pl-4 ml-2">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-gray-400 uppercase font-bold leading-none">Welcome</span>
              <span className="text-sm font-bold text-blue-400">
                {/* Fixed access based on your userController payload */}
                {user.name?.first || user.name || 'Jaspreet'} 
              </span>
            </div>
            <button 
              onClick={() => {
                logout();
                navigate('/');
              }} 
              className="p-2 rounded-full hover:bg-red-500/10 text-gray-300 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <Link 
            to="/login" 
            className="text-sm font-bold bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
          >
            Sign In / Register
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;