import React from 'react';
import { CourseData } from '../../types';

export const HomeTab: React.FC<{ course: CourseData }> = ({ course }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 animate-fade-in">
      <div className="md:col-span-2">
        <h2 className="text-3xl font-serif font-bold text-stanford-dark mb-6">Course Description</h2>
        <div className="prose prose-lg text-gray-700 font-sans leading-relaxed whitespace-pre-line mb-10">
          {course.description}
        </div>

        <h3 className="text-2xl font-serif font-bold text-stanford-dark mb-4">Learning Outcomes</h3>
        <ul className="list-disc pl-6 space-y-2 mb-10 text-gray-700">
          {course.learningOutcomes.map((outcome, idx) => (
            <li key={idx} className="pl-2">{outcome}</li>
          ))}
        </ul>
      </div>

      <div className="md:col-span-1">
        <div className="bg-stanford-beige p-6 rounded-sm border-l-4 border-stanford-red">
          <h3 className="font-bold font-serif text-xl mb-4 text-stanford-dark">Prerequisites</h3>
          <ul className="space-y-3">
             {course.prerequisites.map((prereq, idx) => (
               <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-stanford-red font-bold">›</span> {prereq}
               </li>
             ))}
          </ul>
        </div>

        <div className="mt-8 bg-white border border-gray-200 p-6 rounded-sm shadow-sm">
            <h3 className="font-bold font-serif text-xl mb-4 text-stanford-dark">Announcements</h3>
            <div className="space-y-4">
                <div className="pb-4 border-b border-gray-100 last:border-0">
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Today</p>
                    <p className="text-sm text-gray-800">Welcome to {course.code}! Please review the syllabus and purchase required texts.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
