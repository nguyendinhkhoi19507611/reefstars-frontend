// File: reefstars-frontend/src/components/Home/StatsSection.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Waves, 
  TrendingUp, 
  Users, 
  Building2, 
  Heart,
  Activity,
  Target,
  Globe
} from 'lucide-react';
import { statsAPI } from '../../services/api';

const StatsSection = () => {
  const [stats, setStats] = useState({
    totalReefStars: 0,
    activeReefStars: 0,
    totalUsers: 0,
    totalCompanies: 0,
    survivalRate: 0,
    averageGrowth: 0,
    recentUpdates: 0
  });
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await statsAPI.getOverview();
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const mainStats = [
    {
      icon: Waves,
      value: stats.totalReefStars,
      label: 'Coral Stars Planted',
      description: 'Active coral restoration sites',
      color: 'ocean',
      gradient: 'from-ocean-500 to-cyan-500'
    },
    {
      icon: TrendingUp,
      value: `${stats.survivalRate}%`,
      label: 'Survival Rate',
      description: 'Thriving coral colonies',
      color: 'reef',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Users,
      value: stats.totalUsers,
      label: 'Community Members',
      description: 'Conservation advocates',
      color: 'coral',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Building2,
      value: stats.totalCompanies,
      label: 'Partner Organizations',
      description: 'Tourism companies involved',
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  const secondaryStats = [
    {
      icon: Activity,
      value: stats.recentUpdates,
      label: 'Recent Updates',
      sublabel: 'This week'
    },
    {
      icon: Target,
      value: stats.activeReefStars,
      label: 'Active Projects',
      sublabel: 'Currently monitored'
    },
    {
      icon: Globe,
      value: '6',
      label: 'Regions Covered',
      sublabel: 'Across Vietnam'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  const countUpVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={ref} className="section bg-gradient-to-br from-white via-ocean-50/30 to-reef-50/30">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Together, we're making a measurable difference in coral conservation across Vietnam's marine ecosystems.
            </p>
          </motion.div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {mainStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={countUpVariants}
                  className="relative group"
                >
                  <div className="card-ocean p-8 text-center hover-lift relative overflow-hidden">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    {/* Icon */}
                    <div className="relative z-10 mb-6">
                      <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    
                    {/* Value */}
                    <div className="relative z-10 mb-3">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="text-4xl font-bold text-gray-900 mb-2"
                      >
                        {loading ? (
                          <div className="w-16 h-10 bg-gray-200 rounded mx-auto animate-pulse"></div>
                        ) : (
                          <CountUpNumber value={typeof stat.value === 'string' ? stat.value : stat.value} />
                        )}
                      </motion.div>
                      <h3 className="text-lg font-semibold text-gray-900">{stat.label}</h3>
                      <p className="text-sm text-gray-600 mt-1">{stat.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Secondary Stats */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {secondaryStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {loading ? (
                        <div className="w-12 h-6 bg-gray-200 rounded mx-auto animate-pulse"></div>
                      ) : (
                        <CountUpNumber value={stat.value} />
                      )}
                    </div>
                    <div className="text-sm font-medium text-gray-900">{stat.label}</div>
                    <div className="text-xs text-gray-500">{stat.sublabel}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Progress Bars */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Conservation Progress</h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Coral Survival Rate</span>
                      <span className="font-semibold text-green-600">{stats.survivalRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${stats.survivalRate}%` } : { width: 0 }}
                        transition={{ duration: 1.5, delay: 1 }}
                        className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Active Monitoring</span>
                      <span className="font-semibold text-blue-600">
                        {stats.totalReefStars ? Math.round((stats.activeReefStars / stats.totalReefStars) * 100) : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { 
                          width: `${stats.totalReefStars ? Math.round((stats.activeReefStars / stats.totalReefStars) * 100) : 0}%` 
                        } : { width: 0 }}
                        transition={{ duration: 1.5, delay: 1.2 }}
                        className="bg-gradient-to-r from-blue-400 to-cyan-500 h-3 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Community Growth</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Heart className="h-5 w-5 text-red-500" />
                      <span className="text-gray-600">Active Members</span>
                    </div>
                    <span className="font-semibold text-gray-900">{stats.totalUsers}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Building2 className="h-5 w-5 text-purple-500" />
                      <span className="text-gray-600">Partner Companies</span>
                    </div>
                    <span className="font-semibold text-gray-900">{stats.totalCompanies}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Waves className="h-5 w-5 text-ocean-500" />
                      <span className="text-gray-600">Coral Sites</span>
                    </div>
                    <span className="font-semibold text-gray-900">{stats.totalReefStars}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Count up animation component
const CountUpNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (typeof value === 'string') {
      setDisplayValue(value);
      return;
    }

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepValue = value / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setDisplayValue(Math.round(stepValue * currentStep));
      
      if (currentStep >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{typeof displayValue === 'number' ? displayValue.toLocaleString() : displayValue}</span>;
};

export default StatsSection;