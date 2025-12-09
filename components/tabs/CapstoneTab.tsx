import React from 'react';
import { Capstone } from '../../types';

export const CapstoneTab: React.FC<{ capstone: Capstone }> = ({ capstone }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-stanford-dark text-white p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div className="relative z-10 text-center max-w-3xl mx-auto">
            <span className="text-stanford-red font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Final Degree Requirement</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">{capstone.title}</h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                {capstone.description}
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Industry Requirements Matrix */}
        <div className="bg-white border-t-4 border-stanford-red p-8 shadow-lg rounded-sm">
            <h3 className="text-2xl font-serif font-bold text-stanford-dark mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-stanford-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                Industry Requirements
            </h3>
            <p className="text-gray-600 mb-6 text-sm">Your project must satisfy <strong>all</strong> of the following strict technical constraints to pass.</p>
            
            <div className="space-y-6">
                <div className="bg-stanford-fog p-4 rounded border-l-4 border-gray-400">
                    <span className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Technical Complexity</span>
                    <p className="text-stanford-dark font-medium">{capstone.requirements.complexity}</p>
                </div>
                <div className="bg-stanford-fog p-4 rounded border-l-4 border-gray-400">
                    <span className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Data Scale & Management</span>
                    <p className="text-stanford-dark font-medium">{capstone.requirements.dataScale}</p>
                </div>
                <div className="bg-stanford-fog p-4 rounded border-l-4 border-gray-400">
                    <span className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Deployment & Infrastructure</span>
                    <p className="text-stanford-dark font-medium">{capstone.requirements.deployment}</p>
                </div>
                <div className="bg-stanford-fog p-4 rounded border-l-4 border-gray-400">
                    <span className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Standards & Compliance</span>
                    <p className="text-stanford-dark font-medium">{capstone.requirements.industryStandards}</p>
                </div>
            </div>
        </div>

        {/* Suggestions & Milestones */}
        <div className="space-y-12">
            <div>
                <h3 className="text-2xl font-serif font-bold text-stanford-dark mb-6">Suggested Domains</h3>
                <div className="flex flex-wrap gap-3">
                    {capstone.suggestedTopics.map((topic, idx) => (
                        <div key={idx} className="bg-blue-50 text-blue-900 px-4 py-3 rounded-sm border border-blue-100 text-sm font-semibold flex-grow text-center">
                            {topic}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                 <h3 className="text-2xl font-serif font-bold text-stanford-dark mb-6">Project Milestones</h3>
                 <div className="relative border-l-2 border-gray-200 pl-8 ml-3 space-y-8">
                    {capstone.milestones.map((milestone, idx) => (
                        <div key={idx} className="relative">
                            <span className="absolute -left-[41px] top-0 w-6 h-6 bg-stanford-red text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                                {idx + 1}
                            </span>
                            <h4 className="font-bold text-gray-800">{milestone}</h4>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-300 p-8 rounded-sm">
          <h3 className="text-white font-serif font-bold text-xl mb-4">Final Deliverables Checklist</h3>
          <ul className="grid md:grid-cols-2 gap-4">
              {capstone.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {item}
                  </li>
              ))}
          </ul>
      </div>
    </div>
  );
};