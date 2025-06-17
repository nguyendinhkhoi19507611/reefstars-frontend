import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Play, 
  ArrowRight, 
  Users, 
  Waves, 
  TrendingUp, 
  MapPin,
  Camera,
  Heart
} from 'lucide-react';
import { statsAPI } from '../../services/api';

const HeroSection = () => {
  const [stats, setStats] = useState({
    totalReefStars: 0,
    activeReefStars: 0,
    totalUsers: 0,
    survivalRate: 0
  });
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await statsAPI.getOverview();
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);

  const heroStats = [
    {
      icon: Waves,
      value: stats.totalReefStars,
      label: 'Coral Stars',
      color: 'text-ocean-600',
      bg: 'bg-ocean-100'
    },
    {
      icon: TrendingUp,
      value: `${stats.survivalRate}%`,
      label: 'Survival Rate',
      color: 'text-reef-600',
      bg: 'bg-reef-100'
    },
    {
      icon: Users,
      value: stats.totalUsers,
      label: 'Community Members',
      color: 'text-coral-600',
      bg: 'bg-coral-100'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-ocean-50 to-reef-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Background Waves */}
        <div className="absolute inset-0 bg-pattern-waves opacity-5"></div>
        
        {/* Floating Coral Elements */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-20 h-20 bg-coral-200 rounded-full blur-xl opacity-60"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
          className="absolute top-40 right-20 w-32 h-32 bg-ocean-200 rounded-full blur-xl opacity-60"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-reef-200 rounded-full blur-xl opacity-60"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-ocean-200">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  Live Coral Tracking System
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">Protecting</span>
                <br />
                <span className="text-gradient">Vietnam's Coral</span>
                <br />
                <span className="text-gray-900">Reefs Together</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                Join our community in monitoring and celebrating coral restoration efforts across Vietnam's pristine waters. Track growth, share discoveries, and contribute to marine conservation.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/regions" className="btn-primary group">
                <span>Explore Regions</span>
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="btn-secondary group"
              >
                <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span>Watch Story</span>
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8"
            >
              {heroStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 ${stat.bg} rounded-xl mb-3`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Content - Visual */}
          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-ocean-400 via-ocean-500 to-reef-500 p-8 shadow-2xl">
                {/* Mock Coral Reef Visualization */}
                <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center relative overflow-hidden">
                  {/* Animated Coral Elements */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="absolute inset-4 bg-gradient-to-br from-coral-300 to-coral-400 rounded-xl opacity-80"
                  />
                  
                  <motion.div
                    animate={{ 
                      scale: [1.05, 1, 1.05],
                      opacity: [0.6, 0.9, 0.6]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    className="absolute inset-8 bg-gradient-to-br from-reef-300 to-reef-400 rounded-lg opacity-70"
                  />

                  {/* Center Icon */}
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Waves className="h-10 w-10 text-ocean-600" />
                  </motion.div>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute -right-4 top-1/4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 max-w-xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Heart className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Coral Health</div>
                    <div className="text-xs text-gray-500">95% Excellent</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -left-4 bottom-1/4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 max-w-xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Camera className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">New Update</div>
                    <div className="text-xs text-gray-500">2 hours ago</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Video Modal */}
      {isVideoOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setIsVideoOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative max-w-4xl w-full mx-4 bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <div className="text-white text-center">
                <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Coral Conservation Story Video</p>
                <p className="text-sm opacity-75 mt-2">Coming Soon</p>
              </div>
            </div>
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors duration-300"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;