import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { 
  Calendar, 
  TrendingUp, 
  Activity, 
  Heart, 
  Clock,
  Target,
  Award,
  Thermometer
} from 'lucide-react';

const CoralStats = ({ stats, reefStar }) => {
  const {
    ageInDays,
    survivalStatus,
    currentHealth,
    milestones,
    updateStats
  } = stats;

  // Health distribution data for pie chart
  const healthData = updateStats.healthDistribution ? 
    Object.entries(
      updateStats.healthDistribution.reduce((acc, status) => {
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {})
    ).map(([status, count]) => ({
      name: status,
      value: count,
      color: getHealthColor(status)
    })) : [];

  // Growth trend data (mock data for demonstration)
  const growthTrendData = [
    { month: 'Month 1', growth: 5 },
    { month: 'Month 2', growth: 12 },
    { month: 'Month 3', growth: 25 },
    { month: 'Month 4', growth: 38 },
    { month: 'Month 5', growth: 45 },
    { month: 'Month 6', growth: currentHealth.growthPercentage || 50 }
  ];

  function getHealthColor(status) {
    const colors = {
      excellent: '#10b981',
      good: '#059669',
      fair: '#f59e0b',
      poor: '#f97316',
      dead: '#ef4444'
    };
    return colors[status] || '#6b7280';
  }

  function getSurvivalStatusColor(status) {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      young: 'bg-green-100 text-green-800',
      mature: 'bg-purple-100 text-purple-800',
      veteran: 'bg-gold-100 text-gold-800',
      dead: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  }

  const statCards = [
    {
      icon: Clock,
      label: 'Age',
      value: `${ageInDays} days`,
      subValue: `${Math.floor(ageInDays / 30)} months`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Activity,
      label: 'Total Updates',
      value: updateStats.totalUpdates || 0,
      subValue: 'monitoring sessions',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: TrendingUp,
      label: 'Average Growth',
      value: `${Math.round(updateStats.averageGrowth || 0)}%`,
      subValue: 'per update',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Heart,
      label: 'Current Health',
      value: currentHealth.status || 'unknown',
      subValue: `${currentHealth.growthPercentage || 0}% growth`,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                  <div className="text-xs text-gray-400">{stat.subValue}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Survival Status & Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Survival Status */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Survival Status</h3>
          <div className="text-center">
            <div className={`inline-flex px-4 py-2 rounded-full text-lg font-semibold ${getSurvivalStatusColor(survivalStatus)}`}>
              {survivalStatus.charAt(0).toUpperCase() + survivalStatus.slice(1)}
            </div>
            <p className="text-gray-600 mt-2">
              {survivalStatus === 'new' && 'Recently planted coral, monitoring initial adaptation'}
              {survivalStatus === 'young' && 'Growing steadily, showing good adaptation'}
              {survivalStatus === 'mature' && 'Well-established coral with consistent growth'}
              {survivalStatus === 'veteran' && 'Long-term survivor, contributing to reef ecosystem'}
              {survivalStatus === 'dead' && 'Coral has unfortunately not survived'}
            </p>
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-yellow-500" />
            Milestones Achieved
          </h3>
          {milestones && milestones.length > 0 ? (
            <div className="space-y-3">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">
                      {milestone.type.replace('_', ' ').charAt(0).toUpperCase() + milestone.type.replace('_', ' ').slice(1)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Achieved on {new Date(milestone.achievedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <Award className="h-6 w-6 text-yellow-500" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <Award className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>No milestones achieved yet</p>
              <p className="text-sm">Keep monitoring for future achievements!</p>
            </div>
          )}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Distribution Pie Chart */}
        {healthData.length > 0 && (
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Status Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={healthData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {healthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Growth Trend Line Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Projection</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  label={{ value: 'Growth %', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="growth" 
                  stroke="#0891b2" 
                  strokeWidth={3}
                  dot={{ fill: '#0891b2', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#0891b2', strokeWidth: 2, fill: '#ffffff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-gradient-to-r from-ocean-50 to-reef-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Environmental Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Thermometer className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {Math.round((currentHealth.growthPercentage || 0) * 0.1)}kg
            </div>
            <div className="text-sm text-gray-600">CO₂ Absorbed</div>
            <div className="text-xs text-gray-500">Estimated lifetime</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {Math.round((currentHealth.growthPercentage || 0) * 0.05)}m²
            </div>
            <div className="text-sm text-gray-600">Habitat Created</div>
            <div className="text-xs text-gray-500">Marine life shelter</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {Math.round((currentHealth.growthPercentage || 0) * 0.2)}
            </div>
            <div className="text-sm text-gray-600">Species Supported</div>
            <div className="text-xs text-gray-500">Biodiversity index</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white/50 rounded-lg">
          <p className="text-sm text-gray-700 text-center">
            This coral has been contributing to marine ecosystem health for{' '}
            <span className="font-semibold">{Math.floor(ageInDays / 30)} months</span> and has achieved{' '}
            <span className="font-semibold">{currentHealth.growthPercentage || 0}% growth</span>.
            Every healthy coral plays a vital role in ocean conservation and climate regulation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoralStats;