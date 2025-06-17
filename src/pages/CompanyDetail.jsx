// File: reefstars-frontend/src/pages/CompanyDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft,
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  Waves,
  TrendingUp,
  Users,
  Award,
  Calendar,
  Eye,
  ExternalLink,
  Share2
} from 'lucide-react';
import { 
  companiesAPI, 
  getImageUrl, 
  formatDate, 
  getStatusColor, 
  getHealthColor 
} from '../services/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const CompanyDetail = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [reefStars, setReefStars] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setLoading(true);
        
        // Fetch company details
        const companyResponse = await companiesAPI.getById(id);
        if (companyResponse.data.success) {
          setCompany(companyResponse.data.data);
        }

        // Fetch company's reef stars
        const reefStarsResponse = await companiesAPI.getReefStars(id, { limit: 12 });
        if (reefStarsResponse.data.success) {
          setReefStars(reefStarsResponse.data.data);
        }

        // Fetch company stats
        const statsResponse = await companiesAPI.getStats(id);
        if (statsResponse.data.success) {
          setStats(statsResponse.data.data);
        }

      } catch (error) {
        console.error('Failed to fetch company data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCompanyData();
    }
  }, [id]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'reefstars', label: 'Reef Stars', icon: Waves },
    { id: 'statistics', label: 'Statistics', icon: TrendingUp }
  ];

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading company details..." />;
  }

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏢</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Not Found</h2>
          <p className="text-gray-600 mb-6">The company you're looking for doesn't exist.</p>
          <Link to="/companies" className="btn-primary">
            View All Companies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${company.name} - Conservation Partner | ReefStars`}</title>
        <meta 
          name="description" 
          content={`Learn about ${company.name}'s coral conservation efforts in ${company.location.region}. View their reef stars and environmental impact.`} 
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-ocean-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link 
                  to="/companies" 
                  className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-300"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </Link>
                
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {company.location.region}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="btn-secondary">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </button>
                {company.contact?.website && (
                  <a 
                    href={company.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Company Hero */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card overflow-hidden"
              >
                {/* Header Image/Gradient */}
                <div className="h-32 bg-gradient-to-r from-ocean-500 to-reef-500 relative">
                  <div className="absolute inset-0 bg-pattern-waves opacity-10"></div>
                  
                  {/* Company Logo */}
                  <div className="absolute -bottom-6 left-6">
                    <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                      {company.logo ? (
                        <img 
                          src={getImageUrl(company.logo)} 
                          alt={company.name}
                          className="w-16 h-16 object-cover rounded-xl"
                        />
                      ) : (
                        <Building2 className="h-12 w-12 text-ocean-600" />
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  {company.rating && company.rating.average > 0 && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">{company.rating.average.toFixed(1)}</span>
                        <span className="text-sm text-gray-500">({company.rating.count})</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 pt-12">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{company.name}</h2>
                    <p className="text-gray-600 leading-relaxed">{company.description}</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-4 gap-4 py-6 border-t border-b border-gray-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-ocean-600">{company.stats?.totalReefStars || 0}</div>
                      <div className="text-sm text-gray-500">Reef Stars</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{company.stats?.survivalRate || 0}%</div>
                      <div className="text-sm text-gray-500">Survival Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{company.stats?.totalUsers || 0}</div>
                      <div className="text-sm text-gray-500">Participants</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-coral-600">{company.stats?.activeReefStars || 0}</div>
                      <div className="text-sm text-gray-500">Active</div>
                    </div>
                  </div>

                  {/* Certifications */}
                  {company.certifications && company.certifications.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h3>
                      <div className="flex flex-wrap gap-2">
                        {company.certifications.map((cert, index) => (
                          <div key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            <Award className="h-3 w-3 inline mr-1" />
                            {cert.name}
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

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'overview' && (
                    <CompanyOverview company={company} />
                  )}

                  {activeTab === 'reefstars' && (
                    <CompanyReefStars reefStars={reefStars} companyName={company.name} />
                  )}

                  {activeTab === 'statistics' && stats && (
                    <CompanyStatistics stats={stats} company={company} />
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">Address</div>
                      <div className="font-medium text-gray-900">{company.location.address}</div>
                    </div>
                  </div>
                  
                  {company.contact?.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-600">Phone</div>
                        <div className="font-medium text-gray-900">{company.contact.phone}</div>
                      </div>
                    </div>
                  )}
                  
                  {company.contact?.email && (
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-600">Email</div>
                        <div className="font-medium text-gray-900">{company.contact.email}</div>
                      </div>
                    </div>
                  )}
                  
                  {company.contact?.website && (
                    <div className="flex items-center space-x-3">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-600">Website</div>
                        <a 
                          href={company.contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-ocean-600 hover:text-ocean-700"
                        >
                          Visit Website
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Location Map */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Map integration</p>
                    <p className="text-xs">Available in full version</p>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600 text-center">
                  {company.location.coordinates.lat.toFixed(4)}, {company.location.coordinates.lng.toFixed(4)}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button className="w-full btn-primary text-sm">
                    <Star className="h-4 w-4 mr-2" />
                    Leave Review
                  </button>
                  <button className="w-full btn-secondary text-sm">
                    <Users className="h-4 w-4 mr-2" />
                    Follow Company
                  </button>
                  <button className="w-full btn-secondary text-sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Profile
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

// Company Overview Component
const CompanyOverview = ({ company }) => {
  return (
    <div className="space-y-6">
      {/* Company Description */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">About {company.name}</h3>
        <p className="text-gray-700 leading-relaxed">{company.description}</p>
      </div>

      {/* Highlights */}
      {company.highlights && company.highlights.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Highlights & Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {company.highlights.map((highlight, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">{highlight.title}</h4>
                <p className="text-sm text-gray-600">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conservation Impact */}
      <div className="bg-gradient-to-r from-ocean-50 to-reef-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Conservation Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((company.stats?.totalReefStars || 0) * 0.1)}kg
            </div>
            <div className="text-sm text-gray-600">CO₂ Absorbed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.round((company.stats?.totalReefStars || 0) * 0.05)}m²
            </div>
            <div className="text-sm text-gray-600">Habitat Created</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round((company.stats?.totalReefStars || 0) * 0.2)}
            </div>
            <div className="text-sm text-gray-600">Species Supported</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Company ReefStars Component
const CompanyReefStars = ({ reefStars, companyName }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Reef Stars by {companyName}
        </h3>
        <Link to={`/reefstars?company=${companyName}`} className="text-ocean-600 hover:text-ocean-700 font-medium">
          View All →
        </Link>
      </div>

      {reefStars.length === 0 ? (
        <div className="text-center py-8">
          <Waves className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No reef stars found for this company yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reefStars.map((reefStar, index) => (
            <motion.div
              key={reefStar._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/reefstars/${reefStar._id}`} className="card block hover-lift">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
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
                      {formatDate(reefStar.plantedDate)}
                    </div>
                  </div>

                  {reefStar.currentHealth && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthColor(reefStar.currentHealth.status)}`}>
                        {reefStar.currentHealth.status}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// Company Statistics Component
const CompanyStatistics = ({ stats, company }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Performance Statistics</h3>
      
      {/* Status Distribution */}
      {stats.statusDistribution && (
        <div className="card-ocean p-6">
          <h4 className="font-medium text-gray-900 mb-4">Reef Star Status Distribution</h4>
          <div className="space-y-3">
            {stats.statusDistribution.map((status, index) => (
              <div key={status._id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${
                    status._id === 'active' ? 'bg-green-500' :
                    status._id === 'monitoring' ? 'bg-blue-500' :
                    status._id === 'dead' ? 'bg-red-500' : 'bg-gray-500'
                  }`}></div>
                  <span className="text-sm text-gray-700 capitalize">{status._id}</span>
                </div>
                <div className="text-sm font-medium text-gray-900">{status.count}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Coral Type Distribution */}
      {stats.coralTypeDistribution && (
        <div className="card-reef p-6">
          <h4 className="font-medium text-gray-900 mb-4">Coral Species Distribution</h4>
          <div className="space-y-3">
            {stats.coralTypeDistribution.map((type, index) => (
              <div key={type._id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-reef-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">{type._id}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{type.count}</span>
                  <span className="text-xs text-green-600">
                    {Math.round(type.survivalRate)}% survival
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Monthly Growth */}
      {stats.monthlyGrowth && stats.monthlyGrowth.length > 0 && (
        <div className="card-coral p-6">
          <h4 className="font-medium text-gray-900 mb-4">Monthly Reef Star Creation</h4>
          <div className="space-y-2">
            {stats.monthlyGrowth.slice(-6).map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  {month._id.month}/{month._id.year}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-coral-500 h-2 rounded-full" 
                      style={{ width: `${Math.min((month.count / 10) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{month.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Overall Performance */}
      <div className="bg-gradient-to-r from-ocean-50 to-reef-50 rounded-xl p-6">
        <h4 className="font-medium text-gray-900 mb-4">Overall Performance</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-ocean-600">{company.stats?.survivalRate || 0}%</div>
            <div className="text-sm text-gray-600">Survival Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.statusDistribution ? 
                Math.round(stats.statusDistribution.reduce((acc, curr) => acc + curr.averageGrowth, 0) / stats.statusDistribution.length) : 0}%
            </div>
            <div className="text-sm text-gray-600">Avg Growth</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;