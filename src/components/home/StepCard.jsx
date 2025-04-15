
import React from 'react';

const StepCard = ({ number, title, description, icon }) => (
  <div className="flex gap-4 p-4 rounded-lg border border-blue-500/10 bg-gray-900/40 hover:bg-gray-900/60 transition-all duration-300">
    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 border border-blue-500/20 overflow-hidden">
      {icon}
    </div>
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-bold text-blue-400 opacity-70">STEP {number}</span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </div>
);

export default StepCard;
