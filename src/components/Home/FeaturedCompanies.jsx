import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Building2, 
  MapPin, 
  Waves, 
  TrendingUp, 
  Star,
  ArrowRight,
  Award,
  Users
} from 'lucide-react';
import { companiesAPI, getImageUrl } from '../../services/api';

const FeaturedCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    const fetchTopCompanies = async () => {
      try {
        const response = await companiesAPI.getTop({ limit: 6, metric: 'totalReefStars' });
        if (response.data.success) {
          setCompanies(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch top companies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopCompanies();
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

  const getRegionGradient = (region) => {
    const gradients = {
      'Nha Trang': 'from-blue-500 to-cyan-500',
      'Phu Quoc': 'from-emerald-500 to-teal-500',
      'Da Nang': 'from-orange-500 to-red-500',
      'Quy Nhon': 'from-purple-500 to-pink-500',
      'Con Dao': 'from-indigo-500 to-blue-500',
      'Phan Thiet': 'from-green-500 to-emerald-500'
    };
    return gradients[region] || 'from-gray-500 to-gray-600';
  };

  if (loading) {
    return (
      <section className="section bg-gradient-to-br from-white to-ocean-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Partners</h2>
            <p className="text-xl text-gray-600">Leading conservation organizations</p>
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
    <section ref={ref} className="section bg-gradient-to-br from-white to-ocean-50">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Conservation Partners
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the tourism companies leading coral restoration efforts across Vietnam's coastal regions.
              Together, we're rebuilding marine ecosystems one reef star at a time.
            </p>
          </motion.div>

          {/* Companies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companies.map((company, index) => (
              <motion.div
                key={company._id}
                variants={itemVariants}
                className="group"
              >
                <Link 
                  to={`/companies/${company._id}`}
                  className="card block hover-lift overflow-hidden"
                >
                  {/* Company Header with Gradient */}
                  <div className={`relative h-32 bg-gradient-to-br ${getRegionGradient(company.location.region)} p-6 flex items-end`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    
                    {/* Company Logo */}
                    <div className="absolute top-4 right-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        {company.logo ? (
                          <img 
                            src={getImageUrl(company.logo)} 
                            alt={company.name}
                            className="w-8 h-8 object-cover rounded-lg"
                          />
                        ) : (
                          <Building2 className="h-6 w-6 text-white" />
                        )}
                      </div>
                    </div>

                    {/* Top Performer Badge */}
                    {index < 3 && (
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center space-x-1 bg-yellow-400/90 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                          <Award className="h-3 w-3" />
                          <span>Top {index + 1}</span>
                        </div>
                      </div>
                    )}

                    {/* Region Info */}
                    <div className="relative z-10 text-white">
                      <div className="flex items-center space-x-2 text-white/90 mb-1">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{company.location.region}</span>
                      </div>
                    </div>
                  </div>

                  {/* Company Content */}
                  <div className="p-6">
                    {/* Company Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-ocean-600 transition-colors duration-300">
                      {company.name}
                    </h3>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-ocean-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                          <Waves className="h-6 w-6 text-ocean-600" />
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {company.stats?.totalReefStars || 0}
                        </div>
                        <div className="text-xs text-gray-500">Reef Stars</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                          <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {company.stats?.survivalRate || 0}%
                        </div>
                        <div className="text-xs text-gray-500">Survival</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                          <Users className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {company.stats?.totalUsers || 0}
                        </div>
                        <div className="text-xs text-gray-500">Participants</div>
                      </div>
                    </div>

                    {/* Rating */}
                    {company.rating && company.rating.average > 0 && (
                      <div className="flex items-center justify-center mb-4">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(company.rating.average) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-2">
                            {company.rating.average.toFixed(1)} ({company.rating.count})
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-200">
                      <div className="text-gray-500">
                        Active Conservation
                      </div>
                      
                      <div className="flex items-center space-x-1 text-ocean-600 group-hover:text-ocean-700 transition-colors duration-300">
                        <span className="font-medium">View Details</span>
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
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-ocean-gradient rounded-2xl flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Partner With Us
              </h3>
              <p className="text-gray-600 mb-6">
                Join our network of conservation-minded tourism companies. Make a positive impact 
                while offering unique experiences to your guests.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/companies" className="btn-secondary">
                  View All Partners
                </Link>
                <Link to="/partner-signup" className="btn-primary">
                  Become a Partner
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCompanies;