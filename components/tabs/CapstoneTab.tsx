import React from 'react';
import { Capstone } from '../../types';

export const CapstoneTab: React.FC<{ capstone: Capstone }> = ({ capstone }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-stanford-dark text-white p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10">
            <span className="text-stanford-red font-bold tracking-widest uppercase text-sm mb-2 block">Final Integration</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">{capstone.title}</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
                {capstone.problemStatement}
            </p>

            <div className="grid md:grid-cols-2 gap-8 border-t border-gray-700 pt-8">
                <div>
                    <h3 className="text-xl font-bold mb-4 font-serif">Phases</h3>
                    <ul className="space-y-4">
                        {capstone.phases.map((phase, idx) => (
                             <li key={idx} className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-stanford-red flex items-center justify-center font-bold text-sm">
                                    {idx + 1}
                                </div>
                                <span className="text-gray-300 mt-1">{phase}</span>
                             </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4 font-serif">Final Deliverable</h3>
                    <div className="bg-white/10 p-6 rounded border border-white/20">
                        <p className="text-white font-medium">
                            {capstone.finalDeliverable}
                        </p>
                    </div>
                    <div className="mt-6">
                        <button className="w-full bg-white text-stanford-dark font-bold py-3 px-6 rounded-sm hover:bg-gray-100 transition-colors">
                            Register Project Team
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
