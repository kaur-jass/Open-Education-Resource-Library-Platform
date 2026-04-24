import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, PlusCircle, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-[#34495e] text-white shadow-md sticky top-0 z-50">
      <div className="flex items-center space-x-8">
        {/* LOGO - Goes to Home */}
        <Link to="/" className="text-2xl font-bold tracking-tighter">
          OER <span className="text-blue-400 uppercase">Commons</span>
        </Link>
        
        {/* LINKS - Now pointing to real pages */}
        <div className="hidden lg:flex space-x-6 text-sm font-medium text-gray-300">
          <Link to="/discover" className="hover:text-white transition">Discover</Link>
          <Link to="/hubs" className="hover:text-white transition">Hubs</Link>
          <Link to="/groups" className="hover:text-white transition">Groups</Link>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* ADD OER - Points to Upload */}
        <button 
          onClick={() => navigate('/upload')}
          className="flex items-center bg-[#27ae60] hover:bg-[#2ecc71] px-4 py-2 rounded text-sm font-bold transition-all active:scale-95"
        >
          <PlusCircle size={16} className="mr-2" />
          <span>Add OER</span>
        </button>

        {user ? (
          <div className="flex items-center space-x-4 border-l border-gray-500 pl-4">
            <span className="text-sm">Hi, {user.user?.name?.first || 'User'}</span>
            <button onClick={logout} className="text-gray-300 hover:text-red-400">
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-sm font-bold hover:text-blue-400">Sign In/Register</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;