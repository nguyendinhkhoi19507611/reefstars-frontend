import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Camera,
  Download,
  ZoomIn,
  Heart,
  MessageCircle
} from 'lucide-react';
import { getImageUrl, formatDate } from '../../services/api';

const ImageGallery = ({ updates }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Flatten all images from updates with metadata
  const allImages = updates.reduce((acc, update) => {
    update.images?.forEach((image, index) => {
      acc.push({
        src: image,
        updateDate: update.updateDate,
        healthStatus: update.healthStatus,
        growthPercentage: update.growthPercentage,
        notes: update.notes,
        updateId: update._id,
        index: acc.length
      });
    });
    return acc;
  }, []);

  const openModal = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % allImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(allImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(allImages[prevIndex]);
  };

  const getHealthColor = (status) => {
    const colors = {
      excellent: 'bg-green-100 text-green-800',
      good: 'bg-emerald-100 text-emerald-800',
      fair: 'bg-yellow-100 text-yellow-800',
      poor: 'bg-orange-100 text-orange-800',
      dead: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (allImages.length === 0) {
    return (
      <div className="text-center py-12">
        <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Images Yet</h3>
        <p className="text-gray-500">Images will appear here as updates are added to this reef star.</p>
      </div>
    );
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allImages.map((image, index) => (
          <motion.div
            key={`${image.updateId}-${index}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="relative group cursor-pointer"
            onClick={() => openModal(image, index)}
          >
            {/* Image Container */}
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-md group-hover:shadow-lg transition-all duration-300">
              <img
                src={getImageUrl(image.src)}
                alt={`Coral update from ${formatDate(image.updateDate)}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              
              {/* Zoom Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                  <ZoomIn className="h-5 w-5 text-gray-700" />
                </div>
              </div>
            </div>

            {/* Image Info */}
            <div className="absolute top-2 left-2 right-2">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthColor(image.healthStatus)}`}>
                  {image.healthStatus}
                </span>
                <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                  +{image.growthPercentage}%
                </div>
              </div>
            </div>

            {/* Date */}
            <div className="absolute bottom-2 left-2 right-2">
              <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs text-center">
                {formatDate(image.updateDate)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={closeModal}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[90vh] w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-300 z-10"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Navigation Buttons */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-300 z-10"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-300 z-10"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Main Image */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative">
                  <img
                    src={getImageUrl(selectedImage.src)}
                    alt={`Coral update from ${formatDate(selectedImage.updateDate)}`}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                  
                  {/* Image Counter */}
                  {allImages.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                      {currentIndex + 1} / {allImages.length}
                    </div>
                  )}
                </div>

                {/* Image Details */}
                <div className="p-6 border-t border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthColor(selectedImage.healthStatus)}`}>
                          {selectedImage.healthStatus}
                        </span>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(selectedImage.updateDate)}</span>
                        </div>
                      </div>
                      
                      {selectedImage.notes && (
                        <p className="text-gray-700 leading-relaxed">{selectedImage.notes}</p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          +{selectedImage.growthPercentage}%
                        </div>
                        <div className="text-sm text-gray-500">Growth</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-300">
                        <Heart className="h-5 w-5" />
                        <span className="text-sm">Like</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-300">
                        <MessageCircle className="h-5 w-5" />
                        <span className="text-sm">Comment</span>
                      </button>
                    </div>

                    <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors duration-300">
                      <Download className="h-5 w-5" />
                      <span className="text-sm">Download</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Stats */}
      <div className="mt-8 bg-gradient-to-r from-ocean-50 to-reef-50 rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">{allImages.length}</div>
            <div className="text-sm text-gray-600">Total Images</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">{updates.length}</div>
            <div className="text-sm text-gray-600">Update Sessions</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {updates.length > 0 ? Math.round(updates.reduce((acc, update) => acc + update.growthPercentage, 0) / updates.length) : 0}%
            </div>
            <div className="text-sm text-gray-600">Avg Growth</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageGallery;