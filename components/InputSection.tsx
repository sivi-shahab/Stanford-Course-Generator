import React, { useState, useRef } from 'react';

interface InputSectionProps {
  onGenerate: (topic: string, file?: { data: string; mimeType: string }) => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ onGenerate, isLoading }) => {
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<{ name: string; data: string; mimeType: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
        const base64Data = base64String.split(',')[1];
        setSelectedFile({
          name: file.name,
          data: base64Data,
          mimeType: file.type
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() || selectedFile) {
      const filePayload = selectedFile ? { data: selectedFile.data, mimeType: selectedFile.mimeType } : undefined;
      onGenerate(input, filePayload);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-stanford-fog relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-2 bg-stanford-red"></div>
      
      <div className="max-w-2xl w-full z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <svg className="w-16 h-16 text-stanford-red" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
            </svg>
          </div>
          <h1 className="text-5xl font-serif font-bold text-stanford-dark mb-4 tracking-tight">
            Stanford Course Generator
          </h1>
          <p className="text-xl text-stanford-gray font-sans font-light">
            Transform any topic or syllabus into a world-class academic curriculum.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 shadow-2xl rounded-sm border-t-4 border-stanford-red">
          <div className="mb-6">
            <label htmlFor="syllabus" className="block text-sm font-bold uppercase tracking-wider text-stanford-gray mb-3">
              Topic or Instructions
            </label>
            <textarea
              id="syllabus"
              className="w-full h-32 p-4 border border-gray-300 rounded-sm focus:ring-2 focus:ring-stanford-red focus:border-transparent outline-none font-sans text-lg transition-all"
              placeholder="E.g., Introduction to Quantum Computing..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="mb-6">
             <label className="block text-sm font-bold uppercase tracking-wider text-stanford-gray mb-3">
               Or Upload Syllabus (PDF)
             </label>
             <div className="flex items-center flex-wrap gap-4">
               <label className={`cursor-pointer bg-stanford-beige text-stanford-dark px-5 py-3 rounded-sm border border-gray-300 font-sans font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                 <svg className="w-5 h-5 text-stanford-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                 </svg>
                 Choose PDF
                 <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="application/pdf" 
                    className="hidden" 
                    onChange={handleFileChange} 
                    disabled={isLoading}
                 />
               </label>

               {selectedFile && (
                 <div className="flex items-center gap-2 text-sm text-stanford-dark bg-blue-50 px-4 py-2 border border-blue-100 rounded-sm animate-fade-in">
                   <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" /></svg>
                   <span className="font-medium truncate max-w-[200px]">{selectedFile.name}</span>
                   <button 
                      type="button" 
                      onClick={handleRemoveFile} 
                      className="ml-2 text-red-500 font-bold hover:text-red-700 p-1 hover:bg-red-50 rounded"
                      disabled={isLoading}
                   >
                     ✕
                   </button>
                 </div>
               )}
             </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading || (!input.trim() && !selectedFile)}
            className="mt-2 w-full bg-stanford-red text-white font-serif font-semibold text-xl py-4 hover:bg-[#721111] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing & Designing...
              </>
            ) : (
              'Generate Course Website'
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-stanford-gray">
          <p>Powered by Google Gemini 2.5 Flash</p>
        </div>
      </div>
    </div>
  );
};