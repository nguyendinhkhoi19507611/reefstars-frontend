// File: reefstars-frontend/src/pages/QRScanner.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Camera, 
  QrCode, 
  Search, 
  Upload, 
  AlertCircle,
  CheckCircle,
  X,
  Waves,
  Eye,
  ArrowRight
} from 'lucide-react';
import { reefStarsAPI } from '../services/api';
import toast from 'react-hot-toast';

const QRScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('camera'); // 'camera', 'manual', 'upload'
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Mock QR code scanning (in real app, you would use a QR code library)
  const startScanning = async () => {
    try {
      setScanning(true);
      setError(null);
      
      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // Mock QR detection (in real app, use a QR library like jsQR)
      // This is just for demonstration
      setTimeout(() => {
        // Simulate QR code detection
        const mockQRCode = 'RS' + Math.random().toString(36).substr(2, 6).toUpperCase();
        handleQRDetected(mockQRCode);
      }, 3000);

    } catch (err) {
      setError('Camera access denied. Please enable camera permissions.');
      setScanning(false);
    }
  };

  const stopScanning = () => {
    setScanning(false);
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleQRDetected = async (qrCode) => {
    setLoading(true);
    try {
      const response = await reefStarsAPI.getByQR(qrCode);
      if (response.data.success) {
        setSearchResult(response.data.data);
        stopScanning();
        toast.success('Reef Star found!');
      }
    } catch (error) {
      setError(`Reef Star not found: ${qrCode}`);
      toast.error('Reef Star not found');
    } finally {
      setLoading(false);
    }
  };

  const handleManualSearch = async (e) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await reefStarsAPI.getByQR(manualCode.trim());
      if (response.data.success) {
        setSearchResult(response.data.data);
        toast.success('Reef Star found!');
      }
    } catch (error) {
      setError(`Reef Star not found: ${manualCode}`);
      toast.error('Reef Star not found');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In real app, process image to extract QR code
      toast.info('QR code extraction from images coming soon!');
    }
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>QR Scanner - Find Reef Stars | ReefStars</title>
        <meta name="description" content="Scan QR codes to instantly access reef star information and tracking data." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-ocean-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="w-20 h-20 bg-ocean-gradient rounded-2xl flex items-center justify-center mx-auto mb-6">
                <QrCode className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">QR Code Scanner</h1>
              <p className="text-gray-600 leading-relaxed">
                Scan a reef star QR code to instantly access its conservation data, 
                growth progress, and environmental impact.
              </p>
            </motion.div>

            {/* Mode Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-6 mb-8"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose Scanning Method</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setMode('camera')}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    mode === 'camera' 
                      ? 'border-ocean-500 bg-ocean-50 text-ocean-700' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Camera className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium">Camera Scan</div>
                  <div className="text-sm text-gray-500">Use device camera</div>
                </button>

                <button
                  onClick={() => setMode('manual')}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    mode === 'manual' 
                      ? 'border-ocean-500 bg-ocean-50 text-ocean-700' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Search className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium">Manual Entry</div>
                  <div className="text-sm text-gray-500">Type QR code</div>
                </button>

                <button
                  onClick={() => setMode('upload')}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    mode === 'upload' 
                      ? 'border-ocean-500 bg-ocean-50 text-ocean-700' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Upload className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium">Upload Image</div>
                  <div className="text-sm text-gray-500">From photo library</div>
                </button>
              </div>
            </motion.div>

            {/* Scanner Interface */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card overflow-hidden"
            >
              {mode === 'camera' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Camera Scanner</h3>
                  
                  {!scanning ? (
                    <div className="text-center py-12">
                      <div className="w-32 h-32 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Camera className="h-16 w-16 text-gray-400" />
                      </div>
                      <p className="text-gray-600 mb-6">
                        Position the QR code within the camera frame to scan
                      </p>
                      <button onClick={startScanning} className="btn-primary">
                        <Camera className="h-4 w-4 mr-2" />
                        Start Camera
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      <video
                        ref={videoRef}
                        className="w-full aspect-video bg-gray-900 rounded-xl"
                        playsInline
                        muted
                      />
                      <canvas ref={canvasRef} className="hidden" />
                      
                      {/* Scanning Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <div className="w-64 h-64 border-4 border-white rounded-2xl relative">
                            {/* Corner indicators */}
                            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-ocean-400 rounded-tl-lg"></div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-ocean-400 rounded-tr-lg"></div>
                            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-ocean-400 rounded-bl-lg"></div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-ocean-400 rounded-br-lg"></div>
                          </div>
                          
                          {/* Scanning animation */}
                          <motion.div
                            animate={{ y: [-128, 128, -128] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-ocean-400 to-transparent"
                          />
                        </div>
                      </div>
                      
                      <button
                        onClick={stopScanning}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors duration-300"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {mode === 'manual' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Manual Entry</h3>
                  <form onSubmit={handleManualSearch} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter QR Code
                      </label>
                      <input
                        type="text"
                        value={manualCode}
                        onChange={(e) => setManualCode(e.target.value)}
                        placeholder="e.g., RS123ABC"
                        className="input"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        QR codes typically start with "RS" followed by alphanumeric characters
                      </p>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading || !manualCode.trim()}
                      className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>Searching...</>
                      ) : (
                        <>
                          <Search className="h-4 w-4 mr-2" />
                          Search Reef Star
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {mode === 'upload' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload QR Code Image</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Upload an image containing a QR code
                    </p>
                    <label className="btn-secondary cursor-pointer">
                      Choose Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                      Supports JPG, PNG, GIF up to 5MB
                    </p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4"
              >
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="text-red-700">{error}</span>
                </div>
              </motion.div>
            )}

            {/* Search Result */}
            {searchResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 card p-6"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-green-700 font-medium">Reef Star Found!</span>
                </div>
                
                <div className="bg-gradient-to-r from-ocean-50 to-reef-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{searchResult.qrCode}</h3>
                      <p className="text-gray-600">{searchResult.coralType} Coral</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        +{searchResult.currentHealth?.growthPercentage || 0}%
                      </div>
                      <div className="text-sm text-gray-500">Growth</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-500">Location</div>
                      <div className="font-medium">{searchResult.location.siteName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Planted Date</div>
                      <div className="font-medium">
                        {new Date(searchResult.plantedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => navigate(`/reefstars/${searchResult._id}`)}
                    className="btn-primary w-full"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Full Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Recent Scans */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 card p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Use QR Scanner</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-ocean-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-ocean-600">1</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Find a Reef Star QR Code</div>
                    <div className="text-sm text-gray-600">Look for QR codes on reef star markers underwater or in tourism centers</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-ocean-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-ocean-600">2</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Scan or Enter Code</div>
                    <div className="text-sm text-gray-600">Use your camera to scan or manually type the QR code</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-ocean-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-ocean-600">3</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">View Reef Star Data</div>
                    <div className="text-sm text-gray-600">Access growth progress, photos, and conservation impact</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QRScanner;