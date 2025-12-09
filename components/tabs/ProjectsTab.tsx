import React from 'react';
import { Project } from '../../types';

export const ProjectsTab: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-serif font-bold text-stanford-dark mb-8">Semester Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
            <div key={idx} className="bg-white border-t-4 border-stanford-red shadow-lg p-8 rounded-sm hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-2xl font-serif font-bold text-stanford-dark mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed min-h-[80px]">{project.description}</p>
                
                <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Tech Stack / Skills</h4>
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, tIdx) => (
                            <span key={tIdx} className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded border border-blue-100">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Deliverables</h4>
                     <ul className="text-sm text-gray-700 space-y-1">
                        {project.deliverables.map((del, dIdx) => (
                            <li key={dIdx} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-stanford-red rounded-full"></span>
                                {del}
                            </li>
                        ))}
                     </ul>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};
