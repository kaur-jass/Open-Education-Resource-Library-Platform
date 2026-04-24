import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Using Lazy Loading to prevent one broken file from killing the whole app
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Upload = lazy(() => import('./pages/Upload'));
const Discover = lazy(() => import('./pages/Discover'));
const Hubs = lazy(() => import('./pages/Hubs'));
const Groups = lazy(() => import('./pages/Groups'));

// Simple Loading Spinner component
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-gray-50">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Suspense handles the "Waiting" time while pages load */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Main Landing Page */}
            <Route path="/" element={<Home />} />
            
            {/* Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Feature Pages from your Screenshots */}
            <Route path="/discover" element={<Discover />} />
            <Route path="/hubs" element={<Hubs />} />
            <Route path="/groups" element={<Groups />} />
            
            {/* The Upload Form seen in your image_6d181f.jpg */}
            <Route path="/upload" element={<Upload />} />

            {/* If user types a wrong URL, send them Home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;