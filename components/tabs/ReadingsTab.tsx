import React from 'react';
import { Reading } from '../../types';

export const ReadingsTab: React.FC<{ readings: Reading[] }> = ({ readings }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-serif font-bold text-stanford-dark mb-2">Required Materials</h2>
      <p className="text-gray-600 mb-8 italic">Please complete readings before the assigned lecture.</p>

      <div className="grid gap-6">
        {readings.map((reading, idx) => (
          <div key={idx} className="bg-white border border-gray-200 p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="flex-shrink-0 pt-1">
                {reading.type === 'Book' && (
                    <span className="material-icon text-2xl">📖</span>
                )}
                 {reading.type === 'Paper' && (
                    <span className="material-icon text-2xl">📄</span>
                )}
                 {reading.type === 'Video' && (
                    <span className="material-icon text-2xl">📺</span>
                )}
                 {reading.type === 'Article' && (
                    <span className="material-icon text-2xl">📰</span>
                )}
            </div>
            <div>
                <h3 className="text-lg font-bold text-stanford-dark">
                    {reading.title}
                </h3>
                <p className="text-stanford-red font-medium mb-2">{reading.author}</p>
                <span className="inline-block bg-stanford-beige text-xs font-bold px-2 py-0.5 rounded-sm text-gray-600 mb-3 border border-gray-300">
                    {reading.type}
                </span>
                <p className="text-gray-600 text-sm leading-relaxed">
                    {reading.description}
                </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
