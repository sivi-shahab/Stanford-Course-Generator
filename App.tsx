import React, { useState } from 'react';
import { InputSection } from './components/InputSection';
import { CourseView } from './components/CourseView';
import { generateCourse } from './services/geminiService';
import { CourseData } from './types';

function App() {
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (topic: string, file?: { data: string; mimeType: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await generateCourse(topic, file);
      setCourseData(data);
    } catch (err) {
      console.error(err);
      setError("Failed to generate course. Please try a different topic/file or check your API key.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCourseData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] font-sans">
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded z-[100] shadow-lg flex items-center gap-2">
          <span className="font-bold">Error:</span> {error}
          <button onClick={() => setError(null)} className="ml-4 font-bold">✕</button>
        </div>
      )}

      {!courseData ? (
        <InputSection onGenerate={handleGenerate} isLoading={isLoading} />
      ) : (
        <CourseView course={courseData} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;