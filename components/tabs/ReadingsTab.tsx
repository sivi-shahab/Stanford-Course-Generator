import React from 'react';
import { Module } from '../../types';

export const ReadingsTab: React.FC<{ modules: Module[] }> = ({ modules }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-serif font-bold text-stanford-dark mb-2">Weekly Reading List</h2>
      <p className="text-gray-600 mb-10 italic">Ensure all required texts are read prior to the week's lecture.</p>

      <div className="space-y-12">
        {modules.map((module) => (
          <div key={module.weekNumber} className="relative pl-8 border-l-2 border-gray-200">
            <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-stanford-red border-4 border-white"></span>
            
            <h3 className="text-2xl font-serif font-bold text-stanford-dark mb-1">
              Week {module.weekNumber}: {module.topic}
            </h3>
            
            <div className="mt-6 grid gap-4">
              {module.readings.length > 0 ? (
                module.readings.map((reading, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 p-5 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 pt-1 opacity-80">
                          {reading.type === 'Book' && <span className="text-2xl">📖</span>}
                          {reading.type === 'Paper' && <span className="text-2xl">📄</span>}
                          {reading.type === 'Video' && <span className="text-2xl">📺</span>}
                          {reading.type === 'Article' && <span className="text-2xl">📰</span>}
                      </div>
                      <div className="flex-grow">
                          <h4 className="text-lg font-bold text-stanford-dark leading-snug">
                              {reading.title}
                          </h4>
                          <p className="text-stanford-red font-medium text-sm mb-2">{reading.author}</p>
                          <div className="flex items-center gap-2 mb-2">
                             <span className="bg-stanford-fog text-xs font-bold px-2 py-0.5 rounded-sm border border-gray-300 uppercase tracking-wide">
                                {reading.type}
                             </span>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">
                              {reading.description}
                          </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic text-sm">No specific readings assigned for this week.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};