import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  Building2,
  Activity,
  TrendingUp,
  Heart,
  MessageCircle,
  Share2,
  Camera,
  Eye,
  QrCode,
  Waves,
  Clock,
  Award
} from 'lucide-react';
import { 
  reefStarsAPI, 
  coralUpdatesAPI, 
  getImageUrl, 
  formatDate, 
  getHealthColor, 
  getStatusColor 
} from '../services/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ImageGallery from '../components/ReefStar/ImageGallery';
import GrowthChart from '../components/ReefStar/GrowthChart';
import UpdateTimeline from '../components/ReefStar/UpdateTimeline';
import CoralStats from '../components/ReefStar/CoralStats';

const ReefStarDetail = () => {
  const { id } = useParams();
  const [reefStar, setReefStar] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchReefStarData = async () => {
      try {
        setLoading(true);
       
        const reefStarResponse = await reefStarsAPI.getById(id);
        if (reefStarResponse.data.success) {
          setReefStar(reefStarResponse.data.data);
        }
       
        const updatesResponse = await coralUpdatesAPI.getByReefStar(id, { limit: 10 });
        if (updatesResponse.data.success) {
          setUpdates(updatesResponse.data.data);
        }
       
        const statsResponse = await reefStarsAPI.getStats(id);
        if (statsResponse.data.success) {
          setStats(statsResponse.data.data);
        }

      } catch (error) {
        console.error('Failed to fetch reef star data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchReefStarData();
    }
  }, [id]);

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading reef star details..." />;
  }

  if (!reefStar) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🐠</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Reef Star Not Found</h2>
          <p className="text-gray-600 mb-6">The reef star you're looking for doesn't exist.</p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'updates', label: 'Updates', icon: Activity },
    { id: 'gallery', label: 'Gallery', icon: Camera },
    { id: 'stats', label: 'Statistics', icon: TrendingUp }
  ];

  const milestones = reefStar.milestones || [];
  const latestUpdate = updates[0];

  return (
    <>
      <Helmet>
        <title>{`Reef Star ${reefStar.qrCode} - ${reefStar.coralType} Coral | ReefStars`}</title>
        <meta 
          name="description" 
          content={`Track the growth and health of ${reefStar.coralType} coral at ${reefStar.location.siteName}. Join our conservation efforts.`} 
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-ocean-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link 
                  to="/" 
                  className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-300"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </Link>
                
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Reef Star {reefStar.qrCode}
                  </h1>
                  <p className="text-gray-600">
                    {reefStar.coralType} Coral • {reefStar.location.siteName}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="btn-secondary">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </button>
                <button className="btn-primary">
                  <QrCode className="h-4 w-4 mr-2" />
                  QR Code
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card overflow-hidden"
              >
                <div className="bg-gradient-to-r from-ocean-500 to-reef-500 px-6 py-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-4">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reefStar.status)}`}>
                        {reefStar.status}
                      </div>
                      {latestUpdate && (
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthColor(latestUpdate.healthStatus)}`}>
                          {latestUpdate.healthStatus}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-semibold">
                        {reefStar.currentHealth?.growthPercentage || 0}% Growth
                      </span>
                    </div>
                  </div>
                </div>
              
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-ocean-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <Calendar className="h-6 w-6 text-ocean-600" />
                      </div>
                      <div className="text-sm text-gray-500">Planted</div>
                      <div className="font-semibold text-gray-900">{formatDate(reefStar.plantedDate)}</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-reef-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <Waves className="h-6 w-6 text-reef-600" />
                      </div>
                      <div className="text-sm text-gray-500">Depth</div>
                      <div className="font-semibold text-gray-900">{reefStar.location.depth}m</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-coral-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <Clock className="h-6 w-6 text-coral-600" />
                      </div>
                      <div className="text-sm text-gray-500">Age</div>
                      <div className="font-semibold text-gray-900">{stats?.ageInDays || 0} days</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <Activity className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="text-sm text-gray-500">Updates</div>
                      <div className="font-semibold text-gray-900">{stats?.updateStats?.totalUpdates || 0}</div>
                    </div>
                  </div>

                  {/* Milestones */}
                  {milestones.length > 0 && (
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Award className="h-5 w-5 mr-2 text-yellow-500" />
                        Milestones Achieved
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {milestones.map((milestone, index) => (
                          <div 
                            key={index}
                            className="bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1 rounded-full"
                          >
                            <span className="text-sm font-medium text-yellow-800">
                              {milestone.type.replace('_', ' ')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Tabs */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-300 ${
                            activeTab === tab.id
                              ? 'border-ocean-500 text-ocean-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Details</h3>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-gray-500">Site Name</div>
                              <div className="font-medium text-gray-900">{reefStar.location.siteName}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Coordinates</div>
                              <div className="font-medium text-gray-900">
                                {reefStar.location.coordinates.lat.toFixed(4)}, {reefStar.location.coordinates.lng.toFixed(4)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {reefStar.tags && reefStar.tags.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                          <div className="flex flex-wrap gap-2">
                            {reefStar.tags.map((tag, index) => (
                              <span 
                                key={index}
                                className="bg-ocean-100 text-ocean-800 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'updates' && (
                    <UpdateTimeline updates={updates} reefStarId={id} />
                  )}

                  {activeTab === 'gallery' && (
                    <ImageGallery updates={updates} />
                  )}

                  {activeTab === 'stats' && stats && (
                    <CoralStats stats={stats} reefStar={reefStar} />
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Owner Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Owner</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                    {reefStar.ownerId?.avatar ? (
                      <img 
                        src={getImageUrl(reefStar.ownerId.avatar)} 
                        alt={reefStar.ownerId.fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{reefStar.ownerId?.fullName}</div>
                    <div className="text-sm text-gray-500">Coral Guardian</div>
                  </div>
                </div>
              </motion.div>

              {/* Company Info */}
              {reefStar.companyId && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="card p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Partner Company</h3>
                  <Link 
                    to={`/companies/${reefStar.companyId._id}`}
                    className="flex items-center space-x-3 hover:bg-gray-50 -m-2 p-2 rounded-lg transition-colors duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                      {reefStar.companyId.logo ? (
                        <img 
                          src={getImageUrl(reefStar.companyId.logo)} 
                          alt={reefStar.companyId.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Building2 className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{reefStar.companyId.name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {reefStar.companyId.location?.region}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Growth Chart */}
              {updates.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="card p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Trend</h3>
                  <GrowthChart updates={updates} />
                </motion.div>
              )}

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button className="w-full btn-secondary text-sm">
                    <Heart className="h-4 w-4 mr-2" />
                    Follow Updates
                  </button>
                  <button className="w-full btn-secondary text-sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Leave Comment
                  </button>
                  <button className="w-full btn-secondary text-sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Progress
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReefStarDetail;