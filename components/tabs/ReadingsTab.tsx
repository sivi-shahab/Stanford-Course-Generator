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
                          <div className="flex justify-between items-start gap-4">
                             <div>
                                <h4 className="text-lg font-bold text-stanford-dark leading-snug">
                                    {reading.title}
                                </h4>
                                <p className="text-stanford-red font-medium text-sm mb-2">{reading.author}</p>
                             </div>
                             {reading.url && (
                                <a 
                                  href={reading.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wide transition-colors ${
                                      reading.type === 'Video' 
                                      ? 'bg-red-600 text-white hover:bg-red-700' 
                                      : 'bg-stanford-fog text-stanford-dark hover:bg-gray-200 border border-gray-300'
                                  }`}
                                >
                                  {reading.type === 'Video' ? (
                                    <>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                                        Watch
                                    </>
                                  ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        Link
                                    </>
                                  )}
                                </a>
                             )}
                          </div>
                          
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