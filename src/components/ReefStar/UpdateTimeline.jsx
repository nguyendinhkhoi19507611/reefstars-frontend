// File: reefstars-frontend/src/components/ReefStar/UpdateTimeline.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Camera, 
  TrendingUp, 
  Heart, 
  MessageCircle, 
  User,
  ChevronDown,
  ChevronUp,
  Activity,
  Thermometer,
  Droplets,
  Wind
} from 'lucide-react';
import { getImageUrl, formatDate, getHealthColor } from '../../services/api';

const UpdateTimeline = ({ updates, reefStarId }) => {
  const [expandedUpdate, setExpandedUpdate] = useState(null);

  const toggleExpanded = (updateId) => {
    setExpandedUpdate(expandedUpdate === updateId ? null : updateId);
  };

  if (updates.length === 0) {
    return (
      <div className="text-center py-12">
        <Activity className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Updates Yet</h3>
        <p className="text-gray-500">Updates will appear here as coral monitoring data is collected.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {updates.map((update, index) => (
        <motion.div
          key={update._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative"
        >
          {/* Timeline Line */}
          {index < updates.length - 1 && (
            <div className="absolute left-6 top-16 w-0.5 h-full bg-gray-200 z-0"></div>
          )}

          {/* Update Card */}
          <div className="relative bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start space-x-4">
                {/* Timeline Dot */}
                <div className="flex-shrink-0 relative z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getHealthColor(update.healthStatus)}`}>
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthColor(update.healthStatus)}`}>
                        {update.healthStatus}
                      </span>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(update.updateDate)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">+{update.growthPercentage}%</div>
                        <div className="text-xs text-gray-500">Growth</div>
                      </div>
                    </div>
                  </div>

                  {/* Updated By */}
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                    <User className="h-4 w-4" />
                    <span>Updated by {update.updatedBy}</span>
                  </div>

                  {/* Notes */}
                  {update.notes && (
                    <p className="text-gray-700 leading-relaxed mb-4">{update.notes}</p>
                  )}

                  {/* Images Preview */}
                  {update.images && update.images.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Camera className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{update.images.length} photo(s)</span>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-2">
                        {update.images.slice(0, 4).map((image, imgIndex) => (
                          <div key={imgIndex} className="relative">
                            <img
                              src={getImageUrl(image)}
                              alt={`Update ${imgIndex + 1}`}
                              className="w-full h-20 object-cover rounded-lg"
                            />
                            {imgIndex === 3 && update.images.length > 4 && (
                              <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                                <span className="text-white text-sm font-medium">
                                  +{update.images.length - 4}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors duration-300">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{update.likesCount || 0}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors duration-300">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">{update.commentsCount || 0}</span>
                      </button>
                    </div>

                    {/* Expand Button */}
                    {(update.measurements || update.environmentalConditions || update.observations) && (
                      <button
                        onClick={() => toggleExpanded(update._id)}
                        className="flex items-center space-x-1 text-ocean-600 hover:text-ocean-700 text-sm font-medium transition-colors duration-300"
                      >
                        <span>{expandedUpdate === update._id ? 'Show Less' : 'Show Details'}</span>
                        {expandedUpdate === update._id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedUpdate === update._id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-gray-200 bg-gray-50"
              >
                <div className="p-6 space-y-6">
                  {/* Measurements */}
                  {update.measurements && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Measurements</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {update.measurements.coverage !== undefined && (
                          <div className="bg-white rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-blue-600">{update.measurements.coverage}%</div>
                            <div className="text-xs text-gray-500">Coverage</div>
                          </div>
                        )}
                        {update.measurements.height !== undefined && (
                          <div className="bg-white rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-green-600">{update.measurements.height}cm</div>
                            <div className="text-xs text-gray-500">Height</div>
                          </div>
                        )}
                        {update.measurements.diameter !== undefined && (
                          <div className="bg-white rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-purple-600">{update.measurements.diameter}cm</div>
                            <div className="text-xs text-gray-500">Diameter</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Environmental Conditions */}
                  {update.environmentalConditions && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Environmental Conditions</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {update.environmentalConditions.temperature && (
                          <div className="flex items-center space-x-2 bg-white rounded-lg p-3">
                            <Thermometer className="h-4 w-4 text-red-500" />
                            <div>
                              <div className="text-sm font-medium">{update.environmentalConditions.ph}</div>
                              <div className="text-xs text-gray-500">pH Level</div>
                            </div>
                          </div>
                        )}
                        {update.environmentalConditions.currentStrength && (
                          <div className="flex items-center space-x-2 bg-white rounded-lg p-3">
                            <Wind className="h-4 w-4 text-gray-500" />
                            <div>
                              <div className="text-sm font-medium capitalize">{update.environmentalConditions.currentStrength}</div>
                              <div className="text-xs text-gray-500">Current</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Observations */}
                  {update.observations && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Observations</h4>
                      <div className="bg-white rounded-lg p-4 space-y-3">
                        {update.observations.bleaching && update.observations.bleaching !== 'none' && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Bleaching</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              update.observations.bleaching === 'minor' ? 'bg-yellow-100 text-yellow-800' :
                              update.observations.bleaching === 'moderate' ? 'bg-orange-100 text-orange-800' :
                              update.observations.bleaching === 'severe' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {update.observations.bleaching}
                            </span>
                          </div>
                        )}
                        
                        {update.observations.predation && update.observations.predation !== 'none' && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Predation</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              update.observations.predation === 'minor' ? 'bg-yellow-100 text-yellow-800' :
                              update.observations.predation === 'moderate' ? 'bg-orange-100 text-orange-800' :
                              update.observations.predation === 'severe' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {update.observations.predation}
                            </span>
                          </div>
                        )}
                        
                        {update.observations.competition && update.observations.competition !== 'none' && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Competition</span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium capitalize">
                              {update.observations.competition}
                            </span>
                          </div>
                        )}
                        
                        {update.observations.diseases && update.observations.diseases.length > 0 && (
                          <div>
                            <span className="text-sm text-gray-600 block mb-2">Diseases Observed</span>
                            <div className="flex flex-wrap gap-2">
                              {update.observations.diseases.map((disease, index) => (
                                <span 
                                  key={index}
                                  className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium"
                                >
                                  {disease.replace(/_/g, ' ')}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Weather Conditions */}
                  {update.weather && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Weather Conditions</h4>
                      <div className="bg-white rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4">
                          {update.weather.condition && (
                            <div>
                              <span className="text-sm text-gray-600">Condition</span>
                              <div className="font-medium capitalize">{update.weather.condition}</div>
                            </div>
                          )}
                          {update.weather.visibility && (
                            <div>
                              <span className="text-sm text-gray-600">Visibility</span>
                              <div className="font-medium">{update.weather.visibility}m</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}

      {/* Timeline Summary */}
      <div className="bg-gradient-to-r from-ocean-50 to-reef-50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-ocean-600">{updates.length}</div>
            <div className="text-sm text-gray-600">Total Updates</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {updates.length > 0 ? Math.round(updates.reduce((acc, update) => acc + update.growthPercentage, 0) / updates.length) : 0}%
            </div>
            <div className="text-sm text-gray-600">Average Growth</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-reef-600">
              {updates.filter(update => update.healthStatus === 'excellent' || update.healthStatus === 'good').length}
            </div>
            <div className="text-sm text-gray-600">Healthy Records</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTimeline;