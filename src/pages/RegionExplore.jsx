// File: reefstars-frontend/src/pages/RegionExplore.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  MapPin, 
  Building2, 
  Waves, 
  TrendingUp, 
  Calendar,
  Star,
  Thermometer,
  CloudRain,
  Eye,
  ArrowRight,
  Filter,
  Search,
  Grid3X3,
  List
} from 'lucide-react';
import { statsAPI, companiesAPI, reefStarsAPI } from '../services/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const RegionExplore = () => {
  const { regionName } = useParams();
  const [selectedRegion, setSelectedRegion] = useState(regionName || null);
  const [regions, setRegions] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [reefStars, setReefStars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await statsAPI.getRegions();
        if (response.data.success) {
          setRegions(response.data.data);
          if (!selectedRegion && response.data.data.length > 0) {
            setSelectedRegion(response.data.data[0].name);
          }
        }
      } catch (error) {
        console.error('Failed to fetch regions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedRegion) {
      fetchRegionData();
    }
  }, [selectedRegion]);

  const fetchRegionData = async () => {
    try {
      setLoading(true);
      
      const [companiesRes, reefStarsRes] = await Promise.all([
        companiesAPI.getByRegion(selectedRegion),
        reefStarsAPI.getAll({ region: selectedRegion, limit: 12 })
      ]);

      if (companiesRes.data.success) {
        setCompanies(companiesRes.data.data);
      }

      if (reefStarsRes.data.success) {
        setReefStars(reefStarsRes.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch region data:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentRegion = regions.find(r => r.name === selectedRegion);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'companies', label: 'Companies', icon: Building2 },
    { id: 'reefstars', label: 'Reef Stars', icon: Waves }
  ];

  const getRegionGradient = (regionName) => {
    const gradients = {
      'Nha Trang': 'from-blue-500 to-cyan-500',
      'Phu Quoc': 'from-emerald-500 to-teal-500',
      'Da Nang': 'from-orange-500 to-red-500',
      'Quy Nhon': 'from-purple-500 to-pink-500',
      'Con Dao': 'from-indigo-500 to-blue-500',
      'Phan Thiet': 'from-green-500 to-emerald-500'
    };
    return gradients[regionName] || 'from-gray-500 to-gray-600';
  };

  if (loading && regions.length === 0) {
    return <LoadingSpinner fullScreen text="Loading regions..." />;
  }

  return (
    <>
      <Helmet>
        <title>{selectedRegion ? `${selectedRegion} - Regions` : 'Explore Regions'} | ReefStars</title>
        <meta name="description" content={`Discover coral conservation efforts in ${selectedRegion || 'Vietnam'}. Explore reef stars, partner companies, and conservation statistics.`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-ocean-50">
        {/* Region Selection Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <h1 className="text-3xl font-bold text-gray-900">Explore Conservation Regions</h1>
              
              {/* Region Selector */}
              <div className="flex flex-wrap gap-2">
                {regions.map((region) => (
                  <button
                    key={region._id}
                    onClick={() => setSelectedRegion(region.name)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      selectedRegion === region.name
                        ? 'bg-ocean-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {region.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {currentRegion && (
          <>
            {/* Region Hero */}
            <div className={`relative bg-gradient-to-br ${getRegionGradient(currentRegion.name)} text-white overflow-hidden`}>
              <div className="absolute inset-0 bg-pattern-waves opacity-10"></div>
              
              <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">{currentRegion.name}</h2>
                    <p className="text-xl text-white/90 leading-relaxed mb-8">
                      {currentRegion.description}
                    </p>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{currentRegion.stats?.totalCompanies || 0}</div>
                        <div className="text-white/80 text-sm">Companies</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{currentRegion.stats?.totalReefStars || 0}</div>
                        <div className="text-white/80 text-sm">Reef Stars</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{currentRegion.stats?.survivalRate || 0}%</div>
                        <div className="text-white/80 text-sm">Survival</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Climate Info */}
                    {currentRegion.climate && (
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                        <h3 className="text-lg font-semibold mb-4">Climate Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Thermometer className="h-4 w-4" />
                            <span className="text-sm">Avg Temp: {currentRegion.climate.averageTemperature}°C</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Waves className="h-4 w-4" />
                            <span className="text-sm">Avg Depth: {currentRegion.climate.averageDepth}m</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Best Visiting Time */}
                    {currentRegion.bestVisitingTime && (
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                        <h3 className="text-lg font-semibold mb-4">Best Time to Visit</h3>
                        <p className="text-white/90">{currentRegion.bestVisitingTime.description}</p>
                      </div>
                    )}
                  </motion.div>
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
                        {tab.id === 'companies' && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            {companies.length}
                          </span>
                        )}
                        {tab.id === 'reefstars' && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            {reefStars.length}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="container mx-auto px-4 py-8">
              {activeTab === 'overview' && (
                <RegionOverview region={currentRegion} companies={companies} reefStars={reefStars} />
              )}
              
              {activeTab === 'companies' && (
                <CompaniesTab companies={companies} region={currentRegion.name} viewMode={viewMode} setViewMode={setViewMode} />
              )}
              
              {activeTab === 'reefstars' && (
                <ReefStarsTab reefStars={reefStars} region={currentRegion.name} viewMode={viewMode} setViewMode={setViewMode} />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

// Region Overview Component
const RegionOverview = ({ region, companies, reefStars }) => {
  return (
    <div className="space-y-8">
      {/* Highlights */}
      {region.highlights && region.highlights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Region Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {region.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-ocean-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="h-5 w-5 text-ocean-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">{highlight.title}</h4>
                  <p className="text-sm text-gray-600">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Featured Companies & Recent Reef Stars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Companies</h3>
          <div className="space-y-4">
            {companies.slice(0, 5).map((company, index) => (
              <Link
                key={company._id}
                to={`/companies/${company._id}`}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-300"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-ocean-100 to-reef-100 rounded-lg flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-ocean-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{company.name}</div>
                  <div className="text-sm text-gray-500">{company.stats?.totalReefStars || 0} reef stars</div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Link>
            ))}
          </div>
          
          {companies.length > 5 && (
            <Link to={`/companies?region=${region.name}`} className="block mt-4 text-center text-ocean-600 hover:text-ocean-700 font-medium">
              View All Companies →
            </Link>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Reef Stars</h3>
          <div className="space-y-4">
            {reefStars.slice(0, 5).map((reefStar, index) => (
              <Link
                key={reefStar._id}
                to={`/reefstars/${reefStar._id}`}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-300"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-coral-100 to-reef-100 rounded-lg flex items-center justify-center">
                  <Waves className="h-5 w-5 text-coral-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{reefStar.qrCode}</div>
                  <div className="text-sm text-gray-500">{reefStar.coralType} • {reefStar.location.siteName}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">
                    +{reefStar.currentHealth?.growthPercentage || 0}%
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {reefStars.length > 5 && (
            <Link to={`/reefstars?region=${region.name}`} className="block mt-4 text-center text-ocean-600 hover:text-ocean-700 font-medium">
              View All Reef Stars →
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Companies Tab Component
const CompaniesTab = ({ companies, region, viewMode, setViewMode }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">
          Conservation Partners in {region}
        </h3>
        
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

      {/* Companies Display */}
      {companies.length === 0 ? (
        <div className="text-center py-12">
          <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Companies Found</h3>
          <p className="text-gray-600">No conservation partners found in this region yet.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {companies.map((company, index) => (
            <motion.div
              key={company._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/companies/${company._id}`} className="card block hover-lift">
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-ocean-100 rounded-xl flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-ocean-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{company.name}</h4>
                      <p className="text-sm text-gray-500">{company.location?.address}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-ocean-600">{company.stats?.totalReefStars || 0}</div>
                      <div className="text-xs text-gray-500">Reef Stars</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">{company.stats?.survivalRate || 0}%</div>
                      <div className="text-xs text-gray-500">Survival</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-600">{company.stats?.totalUsers || 0}</div>
                      <div className="text-xs text-gray-500">Users</div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// ReefStars Tab Component
const ReefStarsTab = ({ reefStars, region, viewMode, setViewMode }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">
          Reef Stars in {region}
        </h3>
        
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

      {/* ReefStars Display */}
      {reefStars.length === 0 ? (
        <div className="text-center py-12">
          <Waves className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Reef Stars Found</h3>
          <p className="text-gray-600">No reef stars found in this region yet.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {reefStars.map((reefStar, index) => (
            <motion.div
              key={reefStar._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/reefstars/${reefStar._id}`} className="card block hover-lift">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{reefStar.qrCode}</h4>
                      <p className="text-sm text-gray-500">{reefStar.coralType} Coral</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        +{reefStar.currentHealth?.growthPercentage || 0}%
                      </div>
                      <div className="text-xs text-gray-500">Growth</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {reefStar.location.siteName}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Planted {new Date(reefStar.plantedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegionExplore;