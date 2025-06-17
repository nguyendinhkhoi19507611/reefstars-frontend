
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';

// Layout Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Pages - Public
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ReefStarDetail from './pages/ReefStarDetail';
import CompanyDetail from './pages/CompanyDetail';
import RegionExplore from './pages/RegionExplore';
import Statistics from './pages/Statistics';

// Pages - Private
import Profile from './pages/Profile/Profile';
import QRScanner from './pages/QRScanner';

// Components
import ProtectedRoute from './components/Auth/ProtectedRoute';
import LoadingSpinner from './components/UI/LoadingSpinner';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          
          <main className="flex-1 pt-16 lg:pt-20">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* ReefStar Routes */}
              <Route path="/reefstars/:id" element={<ReefStarDetail />} />
              
              {/* Company Routes */}
              <Route path="/companies" element={<CompaniesListing />} />
              <Route path="/companies/:id" element={<CompanyDetail />} />
              
              {/* Region Routes */}
              <Route path="/regions" element={<RegionExplore />} />
              <Route path="/regions/:regionName" element={<RegionExplore />} />
              
              {/* Statistics */}
              <Route path="/statistics" element={<Statistics />} />

              {/* Protected Routes */}
              <Route
                path="/profile/*"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/qr-scanner"
                element={
                  <ProtectedRoute>
                    <QRScanner />
                  </ProtectedRoute>
                }
              />

              {/* Additional Public Pages */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/conservation" element={<ConservationPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#ffffff',
              color: '#1f2937',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '14px',
              fontWeight: '500'
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#ffffff',
              },
              style: {
                borderLeft: '4px solid #10b981'
              }
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
              style: {
                borderLeft: '4px solid #ef4444'
              }
            },
            loading: {
              iconTheme: {
                primary: '#0891b2',
                secondary: '#ffffff',
              },
              style: {
                borderLeft: '4px solid #0891b2'
              }
            }
          }}
        />
      </Router>
    </AuthProvider>
  );
}

// Companies Listing Component
const CompaniesListing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-ocean-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Conservation Partners</h1>
          <p className="text-xl text-gray-600">
            Discover tourism companies leading coral restoration efforts across Vietnam
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-24 h-24 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">🏢</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Companies Directory</h3>
          <p className="text-gray-600 mb-8">
            Full companies listing page coming soon! For now, explore featured companies on the homepage.
          </p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

// About Page Component
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-ocean-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About ReefStars</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Empowering coral conservation through technology, community engagement, and data-driven insights.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                ReefStars is dedicated to protecting and restoring Vietnam's precious coral reef ecosystems 
                through innovative tracking technology, community participation, and sustainable tourism practices. 
                We believe that by engaging tourists, local communities, and conservation organizations, 
                we can create a lasting positive impact on marine biodiversity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🌊 Conservation Impact</h3>
                <p className="text-gray-600">
                  Track and monitor coral growth with scientific precision, 
                  contributing valuable data to marine research and conservation efforts.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">👥 Community Engagement</h3>
                <p className="text-gray-600">
                  Connect tourists with conservation efforts, creating awareness 
                  and fostering a sense of responsibility for marine ecosystem protection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Page Component
const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-ocean-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 mb-12">
            Have questions about coral conservation or want to partner with us? We'd love to hear from you.
          </p>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">📧 Email</h3>
                <p className="text-ocean-600">contact@reefstars.vn</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">📞 Phone</h3>
                <p className="text-gray-600">+84 (0)28 1234 5678</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">📍 Location</h3>
                <p className="text-gray-600">Ho Chi Minh City, Vietnam</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Conservation Page Component
const ConservationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-ocean-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Conservation Efforts</h1>
          <p className="text-xl text-gray-600 mb-12">
            Learn about our coral restoration techniques and conservation methodologies.
          </p>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🐠 Marine Conservation</h2>
            <p className="text-gray-600 leading-relaxed">
              Our conservation efforts focus on coral reef restoration, marine biodiversity protection, 
              and sustainable tourism practices. Through ReefStars tracking system, we monitor coral 
              growth and health, providing valuable scientific data for research and conservation planning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Help Page Component
const HelpPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-ocean-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Help Center</h1>
          
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">❓ How to track reef stars?</h3>
              <p className="text-gray-600">
                Use our QR scanner to scan reef star codes or browse by region to find specific coral tracking sites.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">📱 How to use the app?</h3>
              <p className="text-gray-600">
                Create an account, explore regions, scan QR codes, and follow coral growth progress over time.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🤝 How to become a partner?</h3>
              <p className="text-gray-600">
                Tourism companies can join our conservation network. Contact us for partnership opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Privacy Policy Component
const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-ocean-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Privacy Policy</h1>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 prose prose-lg max-w-none">
            <h2>Data Collection</h2>
            <p>We collect information you provide when creating an account and using our coral tracking services.</p>
            
            <h2>Data Usage</h2>
            <p>Your data helps us improve coral conservation efforts and provide better tracking services.</p>
            
            <h2>Data Protection</h2>
            <p>We implement security measures to protect your personal information and respect your privacy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Terms of Service Component
const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-ocean-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Terms of Service</h1>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 prose prose-lg max-w-none">
            <h2>Service Agreement</h2>
            <p>By using ReefStars, you agree to participate in coral conservation efforts responsibly.</p>
            
            <h2>User Responsibilities</h2>
            <p>Users should provide accurate information and respect marine environments during visits.</p>
            
            <h2>Conservation Ethics</h2>
            <p>All activities should prioritize coral health and marine ecosystem protection.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 404 Component
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-ocean-50">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-ocean-400 to-reef-400 rounded-full flex items-center justify-center shadow-xl">
            <span className="text-white text-4xl font-bold">404</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          The reef you're looking for seems to have drifted away. Let's get you back to familiar waters.
        </p>
        <div className="space-y-4">
          <Link to="/" className="btn-primary block">
            Back to Home
          </Link>
          <Link to="/regions" className="btn-secondary block">
            Explore Regions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default App;