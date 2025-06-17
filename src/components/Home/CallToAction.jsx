// File: reefstars-frontend/src/components/Home/CallToAction.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ArrowRight, 
  Users, 
  Camera, 
  Heart,
  Waves,
  Sparkles,
  Globe,
  Target
} from 'lucide-react';

const CallToAction = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const features = [
    {
      icon: Camera,
      title: 'Document Growth',
      description: 'Capture and share the beauty of coral restoration through photography'
    },
    {
      icon: Users,
      title: 'Join Community',
      description: 'Connect with fellow conservationists and marine enthusiasts worldwide'
    },
    {
      icon: Heart,
      title: 'Make Impact',
      description: 'Contribute to scientific research and reef conservation efforts'
    },
    {
      icon: Globe,
      title: 'Global Mission',
      description: 'Be part of a worldwide movement to protect marine ecosystems'
    }
  ];

  return (
    <section ref={ref} className="section relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-ocean-600 via-ocean-700 to-reef-800"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-waves opacity-10"></div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20], rotate: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-40 h-40 bg-coral-400/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/3 w-24 h-24 bg-reef-400/10 rounded-full blur-xl"
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center text-white"
        >
          {/* Main CTA Content */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto mb-16">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-8">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium">Join the Movement</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Ready to Make Waves in
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Ocean Conservation?
              </span>
            </h2>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-12 max-w-3xl mx-auto">
              Join thousands of conservationists tracking coral growth, sharing discoveries, 
              and contributing to the restoration of Vietnam's marine ecosystems.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link 
                to="/register" 
                className="bg-white text-ocean-600 hover:bg-gray-50 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl flex items-center justify-center group"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <Link 
                to="/regions" 
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center"
              >
                <Waves className="h-5 w-5 mr-2" />
                <span>Explore Regions</span>
              </Link>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Stats Banner */}
          <motion.div 
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">1,000+</div>
                <div className="text-white/80">Coral Stars Tracked</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
                <div className="text-white/80">Community Members</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">95%</div>
                <div className="text-white/80">Survival Success Rate</div>
              </div>
            </div>

            {/* Quote */}
            <div className="mt-12 max-w-3xl mx-auto">
              <blockquote className="text-xl md:text-2xl font-medium text-white/90 italic leading-relaxed">
                "Every coral star we plant and monitor brings us one step closer to restoring 
                the ocean's natural beauty and biodiversity."
              </blockquote>
              <div className="mt-4 text-white/70">
                — Marine Conservation Team
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-2 text-white/80">
                <Target className="h-5 w-5" />
                <span>Make a Real Difference</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <Users className="h-5 w-5" />
                <span>Join Global Community</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <Heart className="h-5 w-5" />
                <span>Protect Our Oceans</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;