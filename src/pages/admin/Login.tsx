import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { AlertCircle, Lock, User, LogIn, Home } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (login(username, password)) {
      navigate('/adminpanel');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Home Button */}
      <Link
        to="/"
        className="fixed top-4 left-4 bg-gray-800/50 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 backdrop-blur-sm border border-gray-700/50"
      >
        <Home className="w-5 h-5" />
        <span>Back to Home</span>
      </Link>

      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            LC247
          </h1>
          <p className="text-gray-400 mt-2">Admin Control Panel</p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50">
          {/* Header */}
          <div className="px-8 pt-8 pb-4">
            <div className="bg-emerald-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-semibold text-center text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-400 text-center text-sm">
              Please sign in to access your admin dashboard
            </p>
          </div>

          {/* Form Section */}
          <div className="p-8 pt-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div className="space-y-4">
                {/* Username Input */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg
                               text-white placeholder-gray-400
                               focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500
                               transition-all duration-200"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg
                               text-white placeholder-gray-400
                               focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500
                               transition-all duration-200"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 px-4 rounded-lg
                         hover:from-emerald-600 hover:to-emerald-700
                         focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50
                         transition-all duration-200 flex items-center justify-center space-x-2
                         shadow-lg shadow-emerald-500/25"
              >
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} LC247. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;