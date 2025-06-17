import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Waves, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Heart,
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Explore',
      links: [
        { name: 'Regions', path: '/regions' },
        { name: 'Companies', path: '/companies' },
        { name: 'Statistics', path: '/statistics' },
        { name: 'QR Scanner', path: '/qr-scanner' },
      ]
    },
    {
      title: 'Community',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Conservation', path: '/conservation' },
        { name: 'Education', path: '/education' },
        { name: 'Get Involved', path: '/get-involved' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'FAQs', path: '/faq' },
        { name: 'Report Issue', path: '/report' },
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-waves opacity-5"></div>
      
      {/* Wave Decoration */}
      <div className="absolute top-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 text-slate-800"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 pt-20 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="relative">
                  <Waves className="h-8 w-8 text-ocean-400" />
                  <div className="absolute inset-0 bg-ocean-400 rounded-full blur-xl opacity-30"></div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-ocean-400 to-reef-400 bg-clip-text text-transparent">
                  ReefStars
                </span>
              </div>
              
              <p className="text-slate-300 mb-6 leading-relaxed">
                Empowering coral conservation through technology. Track, monitor, and celebrate 
                the growth of coral reefs across Vietnam's pristine waters.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-slate-300">
                  <Mail className="h-4 w-4 text-ocean-400" />
                  <span className="text-sm">contact@reefstars.vn</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <Phone className="h-4 w-4 text-ocean-400" />
                  <span className="text-sm">+84 (0)28 1234 5678</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <MapPin className="h-4 w-4 text-ocean-400" />
                  <span className="text-sm">Ho Chi Minh City, Vietnam</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={section.title} className="lg:col-span-1">
                <h3 className="text-lg font-semibold mb-6 text-white">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-slate-300 hover:text-ocean-400 transition-colors duration-300 flex items-center group"
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-slate-700">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Stay Updated with Our Conservation Efforts
              </h3>
              <p className="text-slate-300 mb-8">
                Get the latest updates on coral restoration projects and marine conservation initiatives.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500 transition-colors duration-300"
                />
                <button className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-700">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-slate-300">
                <span>&copy; {currentYear} ReefStars. Made with</span>
                <Heart className="h-4 w-4 text-red-400 fill-current" />
                <span>for our oceans.</span>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-slate-800 hover:bg-ocean-600 rounded-xl flex items-center justify-center transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5 text-slate-300 group-hover:text-white transition-colors duration-300" />
                    </motion.a>
                  );
                })}
              </div>

              {/* Legal Links */}
              <div className="flex items-center space-x-6 text-sm text-slate-400">
                <Link 
                  to="/privacy" 
                  className="hover:text-ocean-400 transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
                <Link 
                  to="/terms" 
                  className="hover:text-ocean-400 transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;