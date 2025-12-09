import React from 'react';
import { CourseData } from '../types';

interface CourseHeaderProps {
  course: CourseData;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const CourseHeader: React.FC<CourseHeaderProps> = ({ course, activeTab, setActiveTab }) => {
  const tabs = ['Home', 'Syllabus', 'Readings', 'Assignments', 'Projects', 'Capstone'];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top Red Bar */}
      <div className="bg-stanford-red h-2 w-full"></div>
      
      {/* University Identity */}
      <div className="container mx-auto px-6 py-4 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-2">
           <svg className="w-8 h-8 text-stanford-red" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
            </svg>
           <span className="font-serif text-2xl font-bold text-stanford-red tracking-wide">Stanford <span className="text-black font-normal">Online</span></span>
        </div>
        <div className="text-sm font-sans text-gray-500 uppercase tracking-widest">
          {course.department}
        </div>
      </div>

      {/* Course Title Block */}
      <div className="bg-[#fcfcfc] py-12 px-6 shadow-inner">
        <div className="container mx-auto">
          <div className="font-sans font-bold text-stanford-red mb-2 text-lg">{course.code}</div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-stanford-dark mb-4">{course.title}</h1>
          <p className="font-sans text-xl text-gray-600">Instructor: {course.instructor}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="container mx-auto px-6">
        <nav className="flex overflow-x-auto space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 font-sans font-semibold text-sm uppercase tracking-wider border-b-4 transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'border-stanford-red text-stanford-red'
                  : 'border-transparent text-gray-500 hover:text-stanford-dark hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
