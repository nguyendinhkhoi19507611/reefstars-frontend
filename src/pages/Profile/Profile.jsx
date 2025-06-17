import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  User, 
  Settings, 
  Waves, 
  Camera, 
  Edit3,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Award,
  TrendingUp,
  Heart,
  Eye
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { authAPI, getImageUrl } from '../../services/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import MyReefStars from './MyReefStars';
import ProfileSettings from './ProfileSettings';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const location = useLocation();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await authAPI.getMyReefStars({ limit: 1 });
        if (response.data.success) {
          // Calculate basic stats
          const reefStars = response.data.data;
          setStats({
            totalReefStars: response.data.total || 0,
            activeReefStars: reefStars.filter(rs => rs.status === 'active').length,
            joinedDate: user?.createdAt,
            averageGrowth: reefStars.length > 0 ? 
              Math.round(reefStars.reduce((acc, rs) => acc + (rs.currentHealth?.growthPercentage || 0), 0) / reefStars.length) : 0
          });
        }
      } catch (error) {
        console.error('Failed to fetch user stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserStats();
    }
  }, [user]);

  const tabs = [
    { id: 'overview', label: 'Overview', path: '/profile', icon: User },
    { id: 'reefstars', label: 'My Reef Stars', path: '/profile/reefstars', icon: Waves },
    { id: 'settings', label: 'Settings', path: '/profile/settings', icon: Settings }
  ];

  const isActiveTab = (path) => {
    if (path === '/profile') {
      return location.pathname === '/profile';
    }
    return location.pathname.startsWith(path);
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading profile..." />;
  }

  return (
    <>
      <Helmet>
        <title>Profile - {user?.fullName} | ReefStars</title>
        <meta name="description" content="Manage your ReefStars profile and coral conservation activities." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-ocean-50">
        {/* Profile Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-ocean-100 to-reef-100 shadow-lg">
                    {user?.avatar ? (
                      <img 
                        src={getImageUrl(user.avatar)} 
                        alt={user.fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="h-16 w-16 text-ocean-400" />
                      </div>
                    )}
                  </div>
                  <button className="absolute bottom-2 right-2 w-8 h-8 bg-ocean-600 hover:bg-ocean-700 rounded-full flex items-center justify-center text-white transition-colors duration-300">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 mt-4">{user?.fullName}</h1>
                <p className="text-gray-600 flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {user?.email}
                </p>
                {user?.phone && (
                  <p className="text-gray-600 flex items-center mt-1">
                    <Phone className="h-4 w-4 mr-2" />
                    {user.phone}
                  </p>
                )}
              </div>

              {/* Stats Section */}
              <div className="flex-1">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-ocean-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Waves className="h-6 w-6 text-ocean-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stats?.totalReefStars || 0}</div>
                    <div className="text-sm text-gray-600">Reef Stars</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stats?.activeReefStars || 0}</div>
                    <div className="text-sm text-gray-600">Active</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Award className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stats?.averageGrowth || 0}%</div>
                    <div className="text-sm text-gray-600">Avg Growth</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-coral-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Calendar className="h-6 w-6 text-coral-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {stats?.joinedDate ? Math.floor((new Date() - new Date(stats.joinedDate)) / (1000 * 60 * 60 * 24 * 30)) : 0}
                    </div>
                    <div className="text-sm text-gray-600">Months</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/profile/settings" className="btn-primary">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Link>
                  <Link to="/reefstars/create" className="btn-secondary">
                    <Waves className="h-4 w-4 mr-2" />
                    Add Reef Star
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Link
                    key={tab.id}
                    to={tab.path}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-300 ${
                      isActiveTab(tab.path)
                        ? 'border-ocean-500 text-ocean-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ProfileOverview user={user} stats={stats} />} />
            <Route path="/reefstars" element={<MyReefStars />} />
            <Route path="/settings" element={<ProfileSettings />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

// Profile Overview Component
const ProfileOverview = ({ user, stats }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Recent Activity */}
      <div className="lg:col-span-2">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Coral update recorded</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Received like on update</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Award className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Milestone achieved: 3 months</p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info & Achievements */}
      <div className="space-y-6">
        {/* Profile Info */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-500">Member Since</label>
              <p className="font-medium text-gray-900">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Conservation Impact</label>
              <p className="font-medium text-gray-900">{stats?.totalReefStars || 0} Reef Stars</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Profile Views</label>
              <p className="font-medium text-gray-900">--</p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <Award className="h-6 w-6 text-yellow-600" />
              <div>
                <p className="font-medium text-gray-900">First Reef Star</p>
                <p className="text-xs text-gray-500">Plant your first coral</p>
              </div>
            </div>
            
            {stats?.totalReefStars >= 5 && (
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Award className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Reef Guardian</p>
                  <p className="text-xs text-gray-500">Plant 5 reef stars</p>
                </div>
              </div>
            )}
            
            {stats?.totalReefStars >= 10 && (
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Award className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Ocean Protector</p>
                  <p className="text-xs text-gray-500">Plant 10 reef stars</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;