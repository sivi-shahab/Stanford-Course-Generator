
import React from 'react';
import { CourseData } from '../types';
import { jsPDF } from 'jspdf';

interface CourseHeaderProps {
  course: CourseData;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const CourseHeader: React.FC<CourseHeaderProps> = ({ course, activeTab, setActiveTab }) => {
  const tabs = ['Home', 'Syllabus', 'Readings', 'Assignments', 'Projects', 'Capstone'];

  const handleDownloadSyllabus = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxLineWidth = pageWidth - margin * 2;
    
    let y = 20;

    // Title
    doc.setFont("times", "bold");
    doc.setFontSize(22);
    doc.setTextColor(140, 21, 21);
    doc.text("STANFORD ONLINE", margin, y);
    y += 10;
    
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text(course.title, margin, y);
    y += 8;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`${course.code} | ${course.instructor} | ${course.department}`, margin, y);
    y += 15;

    // Description
    doc.setFont("times", "normal");
    const desc = doc.splitTextToSize(course.description, maxLineWidth);
    doc.text(desc, margin, y);
    y += (desc.length * 6) + 10;

    // Modules
    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.text("Course Schedule", margin, y);
    y += 8;
    
    doc.setFont("times", "normal");
    doc.setFontSize(11);
    course.modules.forEach(m => {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(`Week ${m.weekNumber}: ${m.topic}`, margin, y);
        y += 6;
    });
    y += 10;

    // Assignments
    if (y > 260) { doc.addPage(); y = 20; }
    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.text("Assignments", margin, y);
    y += 8;
    
    doc.setFont("times", "normal");
    doc.setFontSize(11);
    course.assignments.forEach(a => {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(`• ${a.title}`, margin, y);
        y += 6;
    });
    y += 10;

    // Projects
    if (y > 260) { doc.addPage(); y = 20; }
    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.text("Projects", margin, y);
    y += 8;
    
    doc.setFont("times", "normal");
    doc.setFontSize(11);
    course.projects.forEach(p => {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(`• ${p.title}`, margin, y);
        y += 6;
    });
    y += 10;

    // Capstone
    if (y > 260) { doc.addPage(); y = 20; }
    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.text("Capstone Requirement", margin, y);
    y += 8;
    doc.setFont("times", "normal");
    doc.setFontSize(11);
    
    doc.text(course.capstone.title, margin, y);
    y += 6;
    const capsDesc = doc.splitTextToSize(course.capstone.description, maxLineWidth);
    doc.text(capsDesc, margin, y);

    doc.save(`${course.code}_Syllabus.pdf`);
  };

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
        <div className="flex items-center gap-4">
             <div className="hidden md:block text-sm font-sans text-gray-500 uppercase tracking-widest">
               {course.department}
             </div>
             <button 
                onClick={handleDownloadSyllabus}
                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-stanford-red px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wide transition-colors flex items-center gap-2"
             >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                PDF Syllabus
             </button>
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
