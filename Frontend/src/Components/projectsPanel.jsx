// src/Components/ProjectsPanel.jsx
import React, { useState, Suspense, lazy, useMemo } from 'react';
import DeveloperGrid from './DeveloperGrid';

// Lazy-load ArtistGallery only when needed
const ArtistGallery = lazy(() => import('./ArtistGallery'));

export default React.memo(function ProjectsPanel() {
  const [view, setView] = useState('developer');
  const [hoverIndex, setHoverIndex] = useState(null);
  const [lightboxImg, setLightboxImg] = useState(null);

  // ✅ Memoized project data to avoid re-renders
  const devProjects = useMemo(() => [
    {
      title: 'Datalysis',
      imageUrl: '/assets/images/Datalysis.png',
      link: 'https://datalysis-git-vitedatalysis-ritsucodes-projects.vercel.app/',
      details:
        'A web app built with React, Django, Python, and SQLite that transforms CSV and JSON files into interactive graphs, generates insights, and allows users to compute KPIs or create custom formulas.',
    },
    {
      title: 'Nanucell Store',
      imageUrl: '/assets/images/nanucell.png',
      link: 'https://nanucell-htm4.vercel.app/',
      details:
        'A responsive e-commerce site built with Vue.js and Tailwind CSS, powered by Firebase Firestore for real-time data and secure admin management. Deployed on Firebase Hosting for scalability and seamless performance.',
    },
  ], []);

  const artGallery = useMemo(() => [
    { id: 1, imageUrl: '/assets/images/Camera mann.png', title: 'Artwork 1' },
    { id: 2, imageUrl: '/assets/images/coverface.png', title: 'Artwork 2' },
    { id: 3, imageUrl: '/assets/images/Emogur.png', title: 'Artwork 3' },
    { id: 4, imageUrl: '/assets/images/doc.png', title: 'Artwork 4' },
    { id: 5, imageUrl: '/assets/images/blep.png', title: 'Artwork 5' },
    { id: 6, imageUrl: '/assets/images/cat.png', title: 'Artwork 6' },
    { id: 7, imageUrl: '/assets/images/Girl.png', title: 'Artwork 7' },
    { id: 8, imageUrl: '/assets/images/half.png', title: 'Artwork 8' },
    { id: 9, imageUrl: '/assets/images/headfon.png', title: 'Artwork 9' },
    { id: 10, imageUrl: '/assets/images/Coverurface.png', title: 'Artwork 10' },
  ], []);

  const toggleItems = [
    { name: 'Developer', value: 'developer' },
    { name: 'Artist', value: 'artist' },
  ];

  return (
    <section id="projects" className="w-full max-w-6xl mx-auto px-4 py-12 sm:py-16">
      {/* ─── Developer / Artist Toggle ─── */}
      <div className="relative flex justify-center mb-10">
        <div className="relative inline-grid grid-cols-2 bg-purple-600 bg-opacity-20 rounded-full overflow-hidden">
          {/* Morphing hover‐background */}
          <div
            className={`absolute inset-y-1 bg-white bg-opacity-20 rounded-full transition-all duration-300 ease-out ${
              hoverIndex !== null ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              width: `${100 / toggleItems.length}%`,
              left:
                hoverIndex !== null
                  ? `${hoverIndex * (100 / toggleItems.length)}%`
                  : 0,
            }}
          />

          {toggleItems.map((item, idx) => (
            <button
              key={item.value}
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => setView(item.value)}
              className={`relative z-10 py-2 px-6 sm:px-10 text-sm sm:text-base font-medium transition-colors duration-300 rounded-full ${
                view === item.value
                  ? 'text-gray-900 bg-white'
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Projects Display ─── */}
      <div className="transition-all duration-500">
        {view === 'developer' ? (
          <DeveloperGrid projects={devProjects} />
        ) : (
          <Suspense fallback={<div className="text-gray-400 text-center">Loading gallery…</div>}>
            <ArtistGallery gallery={artGallery} onSelect={setLightboxImg} />
          </Suspense>
        )}
      </div>

      {/* ─── Lightbox ─── */}
      {lightboxImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-2 right-2 text-white text-3xl font-bold hover:scale-110 transition-transform"
            >
              &times;
            </button>
            <img
              src={lightboxImg}
              alt="Artwork"
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-lg"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      )}
    </section>
  );
});
