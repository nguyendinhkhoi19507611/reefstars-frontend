import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Clock, 
  MapPin, 
  User, 
  Heart, 
  MessageCircle, 
  TrendingUp,
  Eye,
  ArrowRight,
  Camera
} from 'lucide-react';
import { coralUpdatesAPI, getImageUrl, formatDate, getHealthColor } from '../../services/api';

const RecentActivity = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    const fetchRecentUpdates = async () => {
      try {
        const response = await coralUpdatesAPI.getRecent({ limit: 6 });
        if (response.data.success) {
          setUpdates(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch recent updates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentUpdates();
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

  if (loading) {
    return (
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <p className="text-gray-600">Latest updates from our coral restoration community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="card p-6 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="section bg-white">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Latest updates from our coral restoration community across Vietnam
            </p>
          </motion.div>

          {/* Activity Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {updates.map((update, index) => (
              <motion.div
                key={update._id}
                variants={itemVariants}
                className="group"
              >
                <Link 
                  to={`/reefstars/${update.reefStarId._id}`}
                  className="card block hover-lift overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {update.images && update.images.length > 0 ? (
                      <img
                        src={getImageUrl(update.images[0])}
                        alt="Coral update"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-ocean-100 to-reef-100 flex items-center justify-center">
                        <Camera className="h-12 w-12 text-ocean-400" />
                      </div>
                    )}
                    
                    {/* Health Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthColor(update.healthStatus)}`}>
                        {update.healthStatus}
                      </span>
                    </div>

                    {/* Growth Badge */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <div className="flex items-center space-x-1 text-xs font-medium text-green-600">
                        <TrendingUp className="h-3 w-3" />
                        <span>{update.growthPercentage}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* ReefStar Info */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-6 h-6 bg-ocean-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-ocean-600">
                          {update.reefStarId.qrCode.slice(-2)}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {update.reefStarId.coralType} Coral
                      </span>
                    </div>

                    {/* Update Notes */}
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {update.notes || 'Health monitoring update with growth measurements and environmental observations.'}
                    </p>

                    {/* Location */}
                    <div className="flex items-center space-x-2 mb-4 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{update.reefStarId.companyId?.name}</span>
                      <span>•</span>
                      <span>{update.reefStarId.companyId?.location?.region}</span>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{update.likesCount || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{update.commentsCount || 0}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(update.updateDate)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-12"
          >
            <Link 
              to="/recent-activity" 
              className="btn-secondary group inline-flex items-center"
            >
              <span>View All Activity</span>
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecentActivity;