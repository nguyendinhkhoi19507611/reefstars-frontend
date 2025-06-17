// File: reefstars-frontend/src/components/ReefStar/GrowthChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { formatDateShort } from '../../services/api';

const GrowthChart = ({ updates, height = 300 }) => {
  // Prepare data for chart
  const chartData = updates
    .slice()
    .reverse() // Show chronological order
    .map((update, index) => ({
      date: formatDateShort(update.updateDate),
      growth: update.growthPercentage,
      health: update.healthStatus,
      fullDate: update.updateDate,
      index
    }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{label}</p>
          <div className="flex items-center space-x-2 mt-2">
            <div className="w-3 h-3 bg-ocean-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Growth: </span>
            <span className="font-medium text-ocean-600">{data.growth}%</span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <div className={`w-3 h-3 rounded-full ${getHealthBadgeColor(data.health)}`}></div>
            <span className="text-sm text-gray-600">Health: </span>
            <span className="font-medium capitalize">{data.health}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  const getHealthBadgeColor = (health) => {
    const colors = {
      excellent: 'bg-green-500',
      good: 'bg-emerald-500',
      fair: 'bg-yellow-500',
      poor: 'bg-orange-500',
      dead: 'bg-red-500'
    };
    return colors[health] || 'bg-gray-500';
  };

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p>No growth data available yet</p>
        </div>
      </div>
    );
  }

  if (chartData.length === 1) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-20 h-20 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-ocean-600">{chartData[0].growth}%</span>
          </div>
          <p className="text-gray-600">First measurement recorded</p>
          <p className="text-sm text-gray-500">{chartData[0].date}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Chart */}
      <div className="bg-gradient-to-br from-ocean-50/50 to-reef-50/50 rounded-xl p-4">
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0891b2" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              label={{ value: 'Growth %', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="growth"
              stroke="#0891b2"
              strokeWidth={3}
              fill="url(#growthGradient)"
              dot={{ fill: '#0891b2', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: '#0891b2', strokeWidth: 2, fill: '#ffffff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Growth Statistics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            +{chartData[chartData.length - 1].growth - chartData[0].growth}%
          </div>
          <div className="text-sm text-gray-600">Total Growth</div>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">
            {Math.round((chartData[chartData.length - 1].growth - chartData[0].growth) / (chartData.length - 1))}%
          </div>
          <div className="text-sm text-gray-600">Avg per Update</div>
        </div>
      </div>

      {/* Health Status Timeline */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Health Status Timeline</h4>
        <div className="flex items-center space-x-2 overflow-x-auto">
          {chartData.map((item, index) => (
            <div key={index} className="flex flex-col items-center min-w-0 flex-shrink-0">
              <div className={`w-4 h-4 rounded-full ${getHealthBadgeColor(item.health)} mb-1`}></div>
              <div className="text-xs text-gray-500 text-center whitespace-nowrap">
                {item.date}
              </div>
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-gray-200">
          {['excellent', 'good', 'fair', 'poor', 'dead'].map((status) => (
            <div key={status} className="flex items-center space-x-1">
              <div className={`w-3 h-3 rounded-full ${getHealthBadgeColor(status)}`}></div>
              <span className="text-xs text-gray-600 capitalize">{status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrowthChart;