
import React from 'react';

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
            src="unmask-icon.png" 
            alt="Protection Shield" 
            className="h-36 w-auto" 
            onError={(e) => {
              console.error("Shield image failed to load:", e);
              e.target.src = "placeholder.svg"; // Fallback without leading slash
            }}
          />
        </div>
      </div>
    </div>
  </section>
);

export default ShieldSection;
