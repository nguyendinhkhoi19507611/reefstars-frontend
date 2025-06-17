// File: reefstars-frontend/src/pages/Statistics.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Waves, 
  Building2,
  Heart,
  Globe,
  Calendar,
  Target,
  Award,
  Activity,
  Filter,
  Download
} from 'lucide-react';
import { statsAPI } from '../services/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Statistics = () => {
  const [overview, setOverview] = useState(null);
  const [survivalRateData, setSurvivalRateData] = useState(null);
  const [coverageData, setCoverageData] = useState(null);
  const [monthlyGrowth, setMonthlyGrowth] = useState(null);
  const [healthDistribution, setHealthDistribution] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [timeRange, setTimeRange] = useState('1year');

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        setLoading(true);
        
        const [
          overviewRes,
          survivalRes,
          coverageRes,
          growthRes,
          healthRes,
          leaderRes
        ] = await Promise.all([
          statsAPI.getOverview(),
          statsAPI.getSurvivalRate({ region: selectedRegion !== 'all' ? selectedRegion : undefined, timeRange }),
          statsAPI.getCoverage({ region: selectedRegion !== 'all' ? selectedRegion : undefined }),
          statsAPI.getMonthlyGrowth({ region: selectedRegion !== 'all' ? selectedRegion : undefined }),
          statsAPI.getHealthDistribution({ region: selectedRegion !== 'all' ? selectedRegion : undefined, timeRange }),
          statsAPI.getLeaderboard({ type: 'companies', limit: 10 })
        ]);

        if (overviewRes.data.success) setOverview(overviewRes.data.data);
        if (survivalRes.data.success) setSurvivalRateData(survivalRes.data.data);
        if (coverageRes.data.success) setCoverageData(coverageRes.data.data);
        if (growthRes.data.success) setMonthlyGrowth(growthRes.data.data);
        if (healthRes.data.success) setHealthDistribution(healthRes.data.data);
        if (leaderRes.data.success) setLeaderboard(leaderRes.data.data);

      } catch (error) {
        console.error('Failed to fetch statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStats();
  }, [selectedRegion, timeRange]);

  const regions = ['all', 'Nha Trang', 'Phu Quoc', 'Da Nang', 'Quy Nhon', 'Con Dao', 'Phan Thiet'];
  const timeRanges = [
    { value: '1month', label: '1 Month' },
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: '1year', label: '1 Year' },
    { value: 'all', label: 'All Time' }
  ];

  // Color schemes for charts
  const healthColors = {
    excellent: '#10b981',
    good: '#059669',
    fair: '#f59e0b',
    poor: '#f97316',
    dead: '#ef4444'
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading statistics..." />;
  }

  return (
    <>
      <Helmet>
        <title>Statistics Dashboard | ReefStars</title>
        <meta name="description" content="Comprehensive statistics and analytics for coral conservation efforts across Vietnam." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-ocean-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Conservation Analytics</h1>
                <p className="text-gray-600 mt-2">Real-time insights into coral restoration efforts</p>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="input min-w-[140px]"
                >
                  {regions.map(region => (
                    <option key={region} value={region}>
                      {region === 'all' ? 'All Regions' : region}
                    </option>
                  ))}
                </select>

                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="input min-w-[120px]"
                >
                  {timeRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>

                <button className="btn-secondary">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Overview Stats */}
          {overview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <div className="card p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-ocean-100 rounded-xl flex items-center justify-center">
                    <Waves className="h-6 w-6 text-ocean-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{overview.totalReefStars?.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total Reef Stars</div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{overview.survivalRate}%</div>
                    <div className="text-sm text-gray-600">Survival Rate</div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{overview.totalUsers?.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Active Members</div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-coral-100 rounded-xl flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-coral-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{overview.totalCompanies}</div>
                    <div className="text-sm text-gray-600">Partner Companies</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Survival Rate by Coral Type */}
            {survivalRateData?.byCoralType && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Survival Rate by Coral Type</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={survivalRateData.byCoralType}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis 
                        dataKey="coralType" 
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={100}
                      />
                      <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="survivalRate" fill="#0891b2" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}

            {/* Health Distribution */}
            {healthDistribution?.distribution && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Health Status Distribution</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={healthDistribution.distribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        dataKey="count"
                        nameKey="healthStatus"
                        label={({ healthStatus, percentage }) => `${healthStatus} ${percentage}%`}
                      >
                        {healthDistribution.distribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={healthColors[entry.healthStatus] || '#6b7280'} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}
          </div>

          {/* Monthly Growth Trend */}
          {monthlyGrowth?.reefStarCreation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Reef Star Creation Trend</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyGrowth.reefStarCreation}>
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0891b2" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: '#64748b', fontSize: 12 }}
                    />
                    <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#0891b2"
                      strokeWidth={3}
                      fill="url(#colorGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* Regional Performance & Leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Coverage by Region */}
            {coverageData?.byRegion && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Regional Performance</h3>
                <div className="space-y-4">
                  {coverageData.byRegion.map((region, index) => (
                    <div key={region.region} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-ocean-100 rounded-lg flex items-center justify-center">
                          <span className="text-xs font-bold text-ocean-600">#{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{region.region}</div>
                          <div className="text-sm text-gray-500">{region.totalReefStars} reef stars</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{region.averageCoverage}%</div>
                        <div className="text-xs text-gray-500">Avg Coverage</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Top Companies Leaderboard */}
            {leaderboard && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Conservation Partners</h3>
                <div className="space-y-4">
                  {leaderboard.slice(0, 5).map((company, index) => (
                    <div key={company._id} className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        index === 0 ? 'bg-yellow-100 text-yellow-600' :
                        index === 1 ? 'bg-gray-100 text-gray-600' :
                        index === 2 ? 'bg-orange-100 text-orange-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {index < 3 ? <Award className="h-4 w-4" /> : <span className="text-xs font-bold">#{index + 1}</span>}
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{company.name}</div>
                        <div className="text-sm text-gray-500">{company.location?.region}</div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-ocean-600">{company.stats?.totalReefStars || 0}</div>
                        <div className="text-xs text-gray-500">Reef Stars</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Key Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {overview ? Math.round((overview.activeReefStars / overview.totalReefStars) * 100) : 0}%
                </div>
                <div className="text-sm text-gray-600">Active Rate</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Activity className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{overview?.recentUpdates || 0}</div>
                <div className="text-sm text-gray-600">Recent Updates</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Globe className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">6</div>
                <div className="text-sm text-gray-600">Regions Covered</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-coral-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-8 w-8 text-coral-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {survivalRateData?.byCoralType ? 
                    Math.round(survivalRateData.byCoralType.reduce((acc, curr) => acc + curr.survivalRate, 0) / survivalRateData.byCoralType.length) : 0}%
                </div>
                <div className="text-sm text-gray-600">Avg Survival</div>
              </div>
            </div>
          </motion.div>

          {/* Environmental Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-ocean-500 to-reef-500 rounded-2xl p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-6">Environmental Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                  {overview ? Math.round(overview.totalReefStars * 0.1) : 0}kg
                </div>
                <div className="text-white/90">CO₂ Absorbed</div>
                <div className="text-white/70 text-sm">Estimated annual absorption</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                  {overview ? Math.round(overview.totalReefStars * 0.05) : 0}m²
                </div>
                <div className="text-white/90">Habitat Created</div>
                <div className="text-white/70 text-sm">Marine life shelter area</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                  {overview ? Math.round(overview.totalReefStars * 0.2) : 0}
                </div>
                <div className="text-white/90">Species Supported</div>
                <div className="text-white/70 text-sm">Estimated biodiversity index</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Statistics;