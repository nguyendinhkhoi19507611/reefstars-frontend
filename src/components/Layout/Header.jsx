import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Waves, 
  Menu, 
  X, 
  User, 
  Settings, 
  LogOut, 
  BarChart3,
  MapPin,
  Building2,
  QrCode,
  Search
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getImageUrl } from '../../services/api';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/', icon: Waves },
    { name: 'Explore Regions', path: '/regions', icon: MapPin },
    { name: 'Companies', path: '/companies', icon: Building2 },
    { name: 'Statistics', path: '/statistics', icon: BarChart3 },
    { name: 'QR Scanner', path: '/qr-scanner', icon: QrCode },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-ocean-100' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Waves className="h-8 w-8 text-ocean-600 group-hover:text-ocean-700 transition-colors duration-300" />
              <div className="absolute inset-0 bg-ocean-400 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <span className="text-xl lg:text-2xl font-bold text-gradient">
              ReefStars
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-ocean-50 ${
                    isActivePath(item.path)
                      ? 'text-ocean-600 bg-ocean-50'
                      : 'text-gray-700 hover:text-ocean-600'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="hidden sm:flex items-center justify-center w-10 h-10 text-gray-600 hover:text-ocean-600 hover:bg-ocean-50 rounded-xl transition-all duration-300">
              <Search className="h-5 w-5" />
            </button>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-2 rounded-xl hover:bg-ocean-50 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-ocean-100">
                    {user?.avatar ? (
                      <img 
                        src={getImageUrl(user.avatar)} 
                        alt={user.fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-ocean-600">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user?.fullName}
                  </span>
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-ocean-50 hover:text-ocean-600 transition-colors duration-200"
                        >
                          <User className="h-4 w-4" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          to="/profile/reefstars"
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-ocean-50 hover:text-ocean-600 transition-colors duration-200"
                        >
                          <Waves className="h-4 w-4" />
                          <span>My ReefStars</span>
                        </Link>
                        <Link
                          to="/profile/settings"
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-ocean-50 hover:text-ocean-600 transition-colors duration-200"
                        >
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </div>
                      
                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 w-full"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-ocean-600 transition-colors duration-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 text-gray-600 hover:text-ocean-600 hover:bg-ocean-50 rounded-xl transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActivePath(item.path)
                        ? 'text-ocean-600 bg-ocean-50'
                        : 'text-gray-700 hover:text-ocean-600 hover:bg-ocean-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {!isAuthenticated && (
                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <Link
                    to="/login"
                    className="block w-full text-center px-4 py-3 text-sm font-medium text-gray-700 hover:text-ocean-600 hover:bg-ocean-50 rounded-xl transition-all duration-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full text-center btn-primary text-sm"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;