import React from 'react';
import { Module } from '../../types';

export const SyllabusTab: React.FC<{ modules: Module[] }> = ({ modules }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-serif font-bold text-stanford-dark mb-8 pb-4 border-b border-gray-200">
        Course Schedule
      </h2>
      
      <div className="space-y-8">
        {modules.map((mod) => (
          <div key={mod.weekNumber} className="flex flex-col md:flex-row gap-6 hover:bg-stanford-fog p-4 rounded-lg transition-colors group">
            <div className="flex-shrink-0 w-24">
              <span className="inline-block bg-stanford-red text-white font-serif font-bold px-3 py-1 rounded-sm shadow-md">
                Week {mod.weekNumber}
              </span>
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-stanford-dark mb-2 group-hover:text-stanford-red transition-colors">
                {mod.topic}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {mod.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {mod.keyConcepts.map((concept, idx) => (
                  <span key={idx} className="text-xs font-semibold uppercase tracking-wider bg-gray-200 text-gray-700 px-2 py-1 rounded-sm">
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
