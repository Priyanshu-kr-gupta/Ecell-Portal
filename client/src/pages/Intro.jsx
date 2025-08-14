import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import logo from "../assets/logo_black.png";

export default function Intro() {
  const { userRole, isAuthenticated } = useAuth();

  // Determine the dashboard route based on user role
  const getDashboardRoute = () => {
    if (!isAuthenticated) {
      return '/login';
    }
    return userRole === 'Admin' ? '/admin' : '/user';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full mix-blend-lighten filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full mix-blend-lighten filter blur-xl opacity-40 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-full mix-blend-lighten filter blur-xl opacity-40 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo and branding */}
        <div className="mb-12 transform hover:scale-105 transition-transform duration-300">
          {/* <img 
            src={logo} 
            alt="E-Cell Logo" 
            className="h-48 mx-auto mb-8 drop-shadow-2xl"
          /> */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent leading-tight">
              E-Cell
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
              Your gateway to entrepreneurship and innovation. Transform ideas into reality and build the future.
            </p>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl border border-slate-700/50 transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Innovation Hub</h3>
            <p className="text-gray-400 text-sm">Connect with like-minded entrepreneurs and innovators</p>
          </div>

          <div className="bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl border border-slate-700/50 transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H7m-2 0h2m0 0h7.5" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Startup Support</h3>
            <p className="text-gray-400 text-sm">Get mentorship and resources to build your startup</p>
          </div>

          <div className="bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl border border-slate-700/50 transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
            <p className="text-gray-400 text-sm">Join events, workshops, and networking sessions</p>
          </div>
        </div>

        {/* Call to action */}
        <div className="space-y-6">
          <Link
            to={getDashboardRoute()}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300 hover:scale-105"
          >
            <span className="relative flex items-center space-x-2">
              <span>
                {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
              </span>
              <svg 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>

          {!isAuthenticated && (
            <div className="flex justify-center space-x-4 text-sm">
              <Link 
                to="/login" 
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 underline-offset-4 hover:underline"
              >
                Already have an account? Sign in
              </Link>
              <span className="text-gray-600">|</span>
              <Link 
                to="/register" 
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 underline-offset-4 hover:underline"
              >
                New here? Create account
              </Link>
            </div>
          )}
        </div>

        {/* Additional info */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            Empowering the next generation of entrepreneurs since 2024
          </p>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-bounce opacity-40" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-teal-400 rounded-full animate-bounce opacity-50" style={{animationDelay: '2s'}}></div>
      </div>
    </div>
  );
}