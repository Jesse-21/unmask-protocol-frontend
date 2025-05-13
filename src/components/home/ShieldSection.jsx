
import React from 'react';
import LogoFallback from '../LogoFallback';

const ShieldSection = () => (
  <section className="mb-16 relative">
    <div className="glass-morph p-6 rounded-lg border border-blue-500/20 shadow-glow flex flex-col md:flex-row items-center gap-8">
      <div className="w-full md:w-2/3 order-2 md:order-1">
        <h2 className="text-xl font-bold mb-3 text-gradient">Your Shield in the Web3 Landscape</h2>
        <p className="text-sm mb-3 font-normal">
          Unmask Protocol creates a structured, verifiable path to expose bad actors in Web3, enforcing accountability without sacrificing privacy or decentralization.
        </p>
        <p className="text-base font-semibold">
          Expose deception. Enforce accountability. Protect Web3.
        </p>
      </div>
      <div className="w-full md:w-1/3 order-1 md:order-2 flex justify-center">
        <div className="pulse-subtle">
          <img 
            src="./protection-shield.png" 
            alt="Protection Shield" 
            className="h-36 w-auto" 
            onError={(e) => {
              console.error("Shield image failed to load, using fallback component");
              const container = e.target.parentElement;
              if (container) {
                // Create the fallback SVG directly rather than replacing with a component
                container.innerHTML = `
                  <svg width="144" height="144" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-36 w-auto">
                    <path d="M100 0C44.8 0 0 44.8 0 100C0 155.2 44.8 200 100 200C155.2 200 200 155.2 200 100C200 44.8 155.2 0 100 0ZM100 180C55.8 180 20 144.2 20 100C20 55.8 55.8 20 100 20C144.2 20 180 55.8 180 100C180 144.2 144.2 180 100 180Z" fill="url(#paint0_linear)"/>
                    <path d="M140 80C140 102.1 122.1 120 100 120C77.9 120 60 102.1 60 80C60 57.9 77.9 40 100 40C122.1 40 140 57.9 140 80Z" fill="url(#paint1_linear)"/>
                    <path d="M65 125C65 115.1 73.1 107 83 107H117C126.9 107 135 115.1 135 125V155H155V125C155 104.0 138.0 87 117 87H83C62.0 87 45 104.0 45 125V155H65V125Z" fill="url(#paint2_linear)"/>
                    <defs>
                      <linearGradient id="paint0_linear" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#3B82F6"/>
                        <stop offset="1" stop-color="#8B5CF6"/>
                      </linearGradient>
                      <linearGradient id="paint1_linear" x1="60" y1="40" x2="140" y2="120" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#3B82F6"/>
                        <stop offset="1" stop-color="#8B5CF6"/>
                      </linearGradient>
                      <linearGradient id="paint2_linear" x1="45" y1="87" x2="155" y2="155" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#3B82F6"/>
                        <stop offset="1" stop-color="#8B5CF6"/>
                      </linearGradient>
                    </defs>
                  </svg>
                `;
              }
            }}
          />
        </div>
      </div>
    </div>
  </section>
);

export default ShieldSection;
