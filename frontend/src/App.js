import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// IMPORTANT: If you don't have this file, remove the next line
// import './App.css'; 

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Upload = lazy(() => import('./pages/Upload'));
const Discover = lazy(() => import('./pages/Discover'));
const Hubs = lazy(() => import('./pages/Hubs'));
const Groups = lazy(() => import('./pages/Groups'));

const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-[#f8fafc]">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/hubs" element={<Hubs />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;