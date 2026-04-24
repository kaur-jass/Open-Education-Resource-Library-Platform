import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', role: 'Student'
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Map frontend names to the backend nested 'name' object structure
      const payload = {
        name: { first: formData.firstName, last: formData.lastName },
        email: formData.email,
        password: formData.password,
        role: formData.role
      };
      await axios.post('http://localhost:5000/api/auth/register', payload);
      alert("Registration Successful! Please Login.");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] px-4 py-12 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#34495e] tracking-tight">
            Join <span className="text-blue-600 uppercase">OER</span>
          </h2>
          <p className="mt-2 text-sm text-gray-500">Create your account to start learning</p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleRegister}>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text" required placeholder="First Name"
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            />
            <input
              type="text" required placeholder="Last Name"
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            />
          </div>
          
          <input
            type="email" required placeholder="Email address"
            className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          
          <input
            type="password" required placeholder="Password"
            className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">I am a:</label>
            <select 
              className="block w-full px-3 py-3 border border-gray-300 bg-white rounded-lg text-gray-700 focus:outline-none focus:ring-blue-500 text-sm"
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
          </div>

          <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-[#27ae60] hover:bg-[#219150] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all shadow-md active:scale-95">
            Create Account
          </button>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-500">Already have an account?</span>{' '}
          <Link to="/login" className="font-bold text-blue-600 hover:text-blue-500 underline decoration-2 underline-offset-4">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;