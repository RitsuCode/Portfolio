// src/Components/DeveloperGrid.jsx
import React from 'react';

const DeveloperGrid = React.memo(function DeveloperGrid({ projects }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((proj, idx) => (
        <div
          key={idx}
          className="border border-white/30 rounded-xl overflow-hidden group hover:shadow-xl transition-shadow duration-300"
        >
          {/* lazy-load via a real <img> instead of backgroundImage */}
          <div className="relative h-48 sm:h-64">
            <img
              src={proj.imageUrl}
              alt={proj.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-between items-center px-6 py-4 bg-gray-900 bg-opacity-50">
            <h3 className="text-xl text-white font-medium">{proj.title}</h3>
            <a
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 border-2 border-white text-white rounded-full group-hover:bg-white group-hover:text-gray-900 transition-colors duration-300"
            >
              View
            </a>
          </div>
        </div>
      ))}
    </div>
  );
});

export default DeveloperGrid;
