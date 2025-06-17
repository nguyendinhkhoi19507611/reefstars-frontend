import React from 'react';
import { Helmet } from 'react-helmet-async';

import HeroSection from '../components/Home/HeroSection';
import RecentActivity from '../components/Home/RecentActivity';
import RegionsOverview from '../components/Home/RegionsOverview';
import StatsSection from '../components/Home/StatsSection';
import FeaturedCompanies from '../components/Home/FeaturedCompanies';
import CallToAction from '../components/Home/CallToAction';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>ReefStars - Coral Conservation Tracking Platform</title>
        <meta 
          name="description" 
          content="Track and monitor coral restoration efforts across Vietnam. Join our community in protecting marine ecosystems through innovative technology and citizen science." 
        />
        <meta name="keywords" content="coral conservation, marine protection, Vietnam reefs, coral tracking, environmental conservation" />
        <meta property="og:title" content="ReefStars - Coral Conservation Tracking" />
        <meta property="og:description" content="Track and monitor coral restoration efforts across Vietnam's pristine waters." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://reefstars.vn" />
      </Helmet>

      <div className="overflow-hidden">
        <HeroSection />
      
        <StatsSection />
      
        <RecentActivity />
      
        <RegionsOverview />
      
        <FeaturedCompanies />
      
        <CallToAction />
      </div>
    </>
  );
};

export default Home;