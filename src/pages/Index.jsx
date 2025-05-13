
import React, { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import ShieldSection from '../components/home/ShieldSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import InfoSections from '../components/home/InfoSections';
import CTASection from '../components/home/CTASection';
import ErrorBoundary from '../components/ErrorBoundary';

const Index = () => {
  // Log when the component mounts to help with debugging
  useEffect(() => {
    console.log('Index page mounted');
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Tech particle background */}
      <div className="particle-container absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="tech-particles"></div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 via-indigo-950/30 to-purple-950/40 pointer-events-none z-0"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <ErrorBoundary>
          <HeroSection />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <ShieldSection />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <FeaturesSection />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <HowItWorksSection />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <InfoSections />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <CTASection />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Index;
