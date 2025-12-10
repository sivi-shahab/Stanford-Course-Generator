
import React, { useState } from 'react';
import { Project, GradingResult } from '../../types';
import { gradeSubmission } from '../../services/geminiService';

export const ProjectsTab: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const [submissions, setSubmissions] = useState<{ [key: number]: string }>({});
  const [grades, setGrades] = useState<{ [key: number]: GradingResult }>({});
  const [loadingMap, setLoadingMap] = useState<{ [key: number]: boolean }>({});

  const handleSubmit = async (index: number, project: Project) => {
    const submissionText = submissions[index];
    if (!submissionText?.trim()) return;

    setLoadingMap(prev => ({ ...prev, [index]: true }));
    try {
        const result = await gradeSubmission(
            'Project',
            project.title,
            project.description + " Deliverables: " + project.deliverables.join(", "),
            submissionText
        );
        setGrades(prev => ({ ...prev, [index]: result }));
    } catch (e) {
        console.error(e);
        alert("Grading failed. Please try again.");
    } finally {
        setLoadingMap(prev => ({ ...prev, [index]: false }));
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-serif font-bold text-stanford-dark mb-8">Semester Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
            <div key={idx} className="bg-white border-t-4 border-stanford-red shadow-lg p-8 rounded-sm hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full">
                <div className="flex-grow">
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

                    <div className="mb-6">
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

                <div className="mt-6 pt-6 border-t border-gray-100">
                    <h4 className="font-bold text-stanford-dark mb-3 text-sm uppercase tracking-wider">Project Submission</h4>
                     {!grades[idx] ? (
                        <div className="flex flex-col gap-3">
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-sm font-sans text-sm focus:ring-2 focus:ring-stanford-red focus:border-transparent outline-none h-24 bg-stanford-fog"
                                placeholder="Link to GitHub Repo or Project Description..."
                                value={submissions[idx] || ''}
                                onChange={(e) => setSubmissions(prev => ({ ...prev, [idx]: e.target.value }))}
                            />
                            <button 
                                onClick={() => handleSubmit(idx, project)}
                                disabled={loadingMap[idx] || !submissions[idx]}
                                className="w-full bg-stanford-dark text-white px-4 py-2 rounded-sm text-sm font-semibold hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loadingMap[idx] ? 'Evaluating...' : 'Submit Project'}
                            </button>
                        </div>
                    ) : (
                        <div className="bg-green-50 border border-green-100 p-4 rounded-sm animate-fade-in">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-lg text-green-800">Score: {grades[idx].score}/100</span>
                                <button 
                                    onClick={() => setGrades(prev => { const n = {...prev}; delete n[idx]; return n; })}
                                    className="text-xs text-green-600 underline hover:text-green-800"
                                >
                                    Retry
                                </button>
                            </div>
                            <p className="text-green-800 text-sm leading-relaxed">{grades[idx].feedback}</p>
                        </div>
                    )}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};
