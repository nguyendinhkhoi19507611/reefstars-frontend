// File: reefstars-frontend/src/components/Home/RegionsOverview.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  MapPin, 
  Building2, 
  Waves, 
  TrendingUp, 
  Users,
  ArrowRight,
  Star,
  Activity
} from 'lucide-react';
import { statsAPI } from '../../services/api';

const RegionsOverview = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await statsAPI.getRegions();
        if (response.data.success) {
          setRegions(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch regions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

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

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const getRegionGradient = (index) => {
    const gradients = [
      'from-blue-500 to-cyan-500',
      'from-emerald-500 to-teal-500',
      'from-orange-500 to-red-500',
      'from-purple-500 to-pink-500',
      'from-indigo-500 to-blue-500',
      'from-green-500 to-emerald-500'
    ];
    return gradients[index % gradients.length];
  };

  if (loading) {
    return (
      <section className="section bg-gradient-to-br from-slate-50 to-ocean-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Regions</h2>
            <p className="text-xl text-gray-600">Discover coral restoration across Vietnam</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="card p-6 animate-pulse">
                <div className="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="section bg-gradient-to-br from-slate-50 to-ocean-50">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Conservation Regions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From the pristine waters of Phu Quoc to the vibrant reefs of Nha Trang, 
              discover coral restoration efforts across Vietnam's most beautiful coastal regions.
            </p>
          </motion.div>

          {/* Regions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regions.map((region, index) => (
              <motion.div
                key={region._id}
                variants={cardVariants}
                className="group"
              >
                <Link 
                  to={`/regions/${region.name.toLowerCase().replace(' ', '-')}`}
                  className="card block hover-lift overflow-hidden"
                >
                  {/* Region Header with Gradient */}
                  <div className={`relative h-40 bg-gradient-to-br ${getRegionGradient(index)} p-6 flex items-end`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 text-white">
                      <h3 className="text-2xl font-bold mb-1">{region.name}</h3>
                      <div className="flex items-center space-x-2 text-white/90">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">Vietnam</span>
                      </div>
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Waves className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Region Content */}
                  <div className="p-6">
                    {/* Description */}
                    <p className="text-gray-600 mb-6 line-clamp-2">
                      {region.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-ocean-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                          <Building2 className="h-6 w-6 text-ocean-600" />
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {region.stats?.totalCompanies || 0}
                        </div>
                        <div className="text-xs text-gray-500">Companies</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-reef-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                          <Waves className="h-6 w-6 text-reef-600" />
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {region.stats?.totalReefStars || 0}
                        </div>
                        <div className="text-xs text-gray-500">Reef Stars</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-coral-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                          <TrendingUp className="h-6 w-6 text-coral-600" />
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {region.stats?.survivalRate || 0}%
                        </div>
                        <div className="text-xs text-gray-500">Survival</div>
                      </div>
                    </div>

                    {/* Best Visiting Time */}
                    {region.bestVisitingTime && (
                      <div className="bg-gradient-to-r from-ocean-50 to-reef-50 rounded-lg p-4 mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Star className="h-4 w-4 text-ocean-600" />
                          <span className="text-sm font-medium text-gray-900">Best Time to Visit</span>
                        </div>
                        <p className="text-xs text-gray-600">
                          {region.bestVisitingTime.description || 
                           `${getMonthName(region.bestVisitingTime.start)} - ${getMonthName(region.bestVisitingTime.end)}`}
                        </p>
                      </div>
                    )}

                    {/* Highlights */}
                    {region.highlights && region.highlights.length > 0 && (
                      <div className="space-y-2 mb-6">
                        {region.highlights.slice(0, 2).map((highlight, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-ocean-400 rounded-full"></div>
                            <span className="text-sm text-gray-600">{highlight.title}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Activity className="h-4 w-4" />
                        <span>Active Conservation</span>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-ocean-600 group-hover:text-ocean-700 transition-colors duration-300">
                        <span className="font-medium">Explore</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-16"
          >
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Make a Difference?
              </h3>
              <p className="text-gray-600 mb-6">
                Join thousands of conservationists in protecting Vietnam's marine ecosystems. 
                Start your coral restoration journey today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="btn-primary">
                  Join the Community
                </Link>
                <Link to="/regions" className="btn-secondary">
                  Explore All Regions
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Helper function to get month name
const getMonthName = (monthNumber) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return months[monthNumber - 1] || '';
};

export default RegionsOverview;