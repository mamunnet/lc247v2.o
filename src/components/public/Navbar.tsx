import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  Home, 
  Building2, 
  ShieldCheck, 
  UserCog, 
  Users, 
  Star, 
  Award,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import SearchPopup from '../SearchPopup';

const PublicNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const menuItems = [
    { path: '/', label: 'হোম', icon: Home },
    { path: '/company-head', label: 'কোম্পানি হেড', icon: Building2 },
    { path: '/admin', label: 'এডমিন', icon: ShieldCheck },
    { path: '/ss-admin', label: 'সিনিয়র সাব এডমিন', icon: UserCog },
    { path: '/sub-admin', label: 'সাব এডমিন', icon: Users },
    { path: '/super-agent', label: 'সুপার এজেন্ট', icon: Star },
    { path: '/master-agent', label: 'মাস্টার এজেন্ট', icon: Award }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-gray-900 border-b border-gray-800">
      {/* Desktop Navigation */}
      <nav className="hidden md:block">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold relative">
              <span className="text-white">LC</span>
              <span className="text-[#65EDBF]">247</span>
              <span className="absolute -right-4 top-0 text-[0.6rem] text-gray-400">v.2</span>
            </Link>

            {/* Desktop Menu */}
            <div className="flex items-center space-x-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'animate-pulse' : ''}`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center space-x-2 bg-gray-800 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-300"
            >
              <Search className="w-4 h-4" />
              <span>এজেন্ট খুঁজুন</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden">
        <div className="px-3 py-2">
          <div className="flex items-center justify-between mb-3">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Logo */}
            <Link to="/" className="text-xl font-bold relative">
              <span className="text-white">LC</span>
              <span className="text-[#65EDBF]">247</span>
              <span className="absolute -right-3 top-0 text-[0.5rem] text-gray-400">v.2</span>
            </Link>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50">
              <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                  <Link to="/" className="text-xl font-bold relative">
                    <span className="text-white">LC</span>
                    <span className="text-[#65EDBF]">247</span>
                    <span className="absolute -right-3 top-0 text-[0.5rem] text-gray-400">v.2</span>
                  </Link>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-1.5 text-gray-400 hover:text-white rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20' 
                            : 'text-gray-300 bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 hover:bg-gray-700/50'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Scrollable Menu */}
          <div className="relative">
            <div className="absolute inset-0 bg-gray-800/30 backdrop-blur-sm rounded-lg -z-10" />
            
            <div className="relative px-2 py-1.5 rounded-lg overflow-hidden">
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-gray-800/70 text-gray-400 rounded-full shadow-lg backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/70 transition-colors"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>

              <div 
                ref={scrollRef}
                className="overflow-x-auto scrollbar-hide py-1.5 px-6"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className="flex space-x-2 whitespace-nowrap">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20 border border-emerald-400/30' 
                            : 'text-gray-300 bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 hover:bg-gray-700/50'
                        }`}
                      >
                        <Icon className={`w-3 h-3 ${isActive ? 'animate-pulse' : ''}`} />
                        <span className="text-xs font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-gray-800/70 text-gray-400 rounded-full shadow-lg backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/70 transition-colors"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Popup */}
      <SearchPopup
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
};

export default PublicNavbar;