// File: reefstars-frontend/src/pages/Profile/MyReefStars.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  MapPin,
  Calendar,
  TrendingUp,
  Eye,
  Edit,
  MoreVertical
} from 'lucide-react';
import { authAPI, getImageUrl, formatDate, getStatusColor, getHealthColor } from '../../services/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const MyReefStars = () => {
  const [reefStars, setReefStars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'monitoring', 'dead'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'growth'

  useEffect(() => {
    const fetchMyReefStars = async () => {
      try {
        setLoading(true);
        const params = {
          status: filter !== 'all' ? filter : undefined,
          sortBy: sortBy === 'growth' ? 'growthPercentage' : 'createdAt',
          order: sortBy === 'oldest' ? 'asc' : 'desc'
        };

        const response = await authAPI.getMyReefStars(params);
        if (response.data.success) {
          setReefStars(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch reef stars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyReefStars();
  }, [filter, sortBy]);

  const filteredReefStars = reefStars.filter(reefStar =>
    reefStar.qrCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reefStar.coralType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reefStar.location.siteName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusCounts = {
    all: reefStars.length,
    active: reefStars.filter(rs => rs.status === 'active').length,
    monitoring: reefStars.filter(rs => rs.status === 'monitoring').length,
    dead: reefStars.filter(rs => rs.status === 'dead').length
  };

  if (loading) {
    return <LoadingSpinner text="Loading your reef stars..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Reef Stars</h2>
          <p className="text-gray-600">Manage and monitor your coral restoration projects</p>
        </div>
        
        <Link to="/reefstars/create" className="btn-primary self-start lg:self-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add New Reef Star
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div key={status} className="card p-4">
            <div className="text-2xl font-bold text-gray-900">{count}</div>
            <div className="text-sm text-gray-600 capitalize">
              {status === 'all' ? 'Total' : status} Reef Stars
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search reef stars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input min-w-[120px]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="monitoring">Monitoring</option>
            <option value="dead">Dead</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input min-w-[120px]"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="growth">By Growth</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'grid' ? 'bg-white shadow text-ocean-600' : 'text-gray-500'
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'list' ? 'bg-white shadow text-ocean-600' : 'text-gray-500'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Reef Stars Display */}
      {filteredReefStars.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Reef Stars Found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm ? 'Try adjusting your search terms.' : 'Start your coral conservation journey by planting your first reef star.'}
          </p>
          <Link to="/reefstars/create" className="btn-primary">
            Plant Your First Reef Star
          </Link>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReefStars.map((reefStar, index) => (
                <ReefStarCard key={reefStar._id} reefStar={reefStar} index={index} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReefStars.map((reefStar, index) => (
                <ReefStarListItem key={reefStar._id} reefStar={reefStar} index={index} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Grid Card Component
const ReefStarCard = ({ reefStar, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card hover-lift overflow-hidden group"
    >
      {/* Header */}
      <div className="relative h-32 bg-gradient-to-br from-ocean-400 to-reef-500 p-4">
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reefStar.status)}`}>
            {reefStar.status}
          </span>
          <div className="text-right">
            <div className="text-white font-bold text-lg">
              {reefStar.currentHealth?.growthPercentage || 0}%
            </div>
            <div className="text-white/80 text-xs">Growth</div>
          </div>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-white font-semibold">{reefStar.qrCode}</div>
          <div className="text-white/80 text-sm">{reefStar.coralType} Coral</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
          <MapPin className="h-4 w-4" />
          <span>{reefStar.location.siteName}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <Calendar className="h-4 w-4" />
          <span>Planted {formatDate(reefStar.plantedDate)}</span>
        </div>

        {reefStar.currentHealth && (
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">Health Status</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthColor(reefStar.currentHealth.status)}`}>
              {reefStar.currentHealth.status}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2">
          <Link
            to={`/reefstars/${reefStar._id}`}
            className="flex-1 btn-secondary text-sm"
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Link>
          <Link
            to={`/reefstars/${reefStar._id}/update`}
            className="flex-1 btn-primary text-sm"
          >
            <Edit className="h-4 w-4 mr-1" />
            Update
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// List Item Component
const ReefStarListItem = ({ reefStar, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="card p-4 hover-lift"
    >
      <div className="flex items-center space-x-4">
        {/* Status Indicator */}
        <div className={`w-4 h-4 rounded-full ${
          reefStar.status === 'active' ? 'bg-green-500' :
          reefStar.status === 'monitoring' ? 'bg-blue-500' :
          reefStar.status === 'dead' ? 'bg-red-500' : 'bg-gray-500'
        }`}></div>

        {/* Main Info */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <div className="font-semibold text-gray-900">{reefStar.qrCode}</div>
            <div className="text-sm text-gray-600">{reefStar.coralType}</div>
          </div>
          
          <div>
            <div className="text-sm text-gray-900">{reefStar.location.siteName}</div>
            <div className="text-xs text-gray-500">Depth: {reefStar.location.depth}m</div>
          </div>
          
          <div>
            <div className="text-sm text-gray-900">{formatDate(reefStar.plantedDate)}</div>
            <div className="text-xs text-gray-500">Planted</div>
          </div>
          
          <div>
            <div className="text-sm font-semibold text-green-600">
              {reefStar.currentHealth?.growthPercentage || 0}%
            </div>
            <div className="text-xs text-gray-500">Growth</div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthColor(reefStar.currentHealth?.status || 'unknown')}`}>
              {reefStar.currentHealth?.status || 'Unknown'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Link
            to={`/reefstars/${reefStar._id}`}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </Link>
          <Link
            to={`/reefstars/${reefStar._id}/update`}
            className="p-2 text-gray-400 hover:text-ocean-600 transition-colors duration-200"
            title="Add Update"
          >
            <Edit className="h-4 w-4" />
          </Link>
          <button
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            title="More Options"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MyReefStars;