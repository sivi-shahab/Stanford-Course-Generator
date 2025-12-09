import React from 'react';
import { Assignment } from '../../types';

export const AssignmentsTab: React.FC<{ assignments: Assignment[] }> = ({ assignments }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-serif font-bold text-stanford-dark mb-8">Problem Sets & Assignments</h2>

      <div className="space-y-6">
        {assignments.map((assignment, idx) => (
          <div key={idx} className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
             <div className="bg-stanford-dark p-6 flex flex-col items-center justify-center text-white min-w-[150px]">
                <span className="text-4xl font-serif font-bold">{(idx + 1).toString().padStart(2, '0')}</span>
                <span className="text-xs uppercase tracking-widest opacity-75">Assignment</span>
             </div>
             <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-stanford-dark">{assignment.title}</h3>
                    <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        ~{assignment.estimatedHours} Hours
                    </span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                    {assignment.description}
                </p>
                <button className="text-stanford-red font-bold text-sm uppercase tracking-wider hover:underline flex items-center gap-1">
                    Download Instructions <span>↓</span>
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
