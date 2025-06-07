// src/Components/ProjectsPanel.jsx
import React, { useState, Suspense } from 'react';
import DeveloperGrid from './DeveloperGrid';

// lazy-load the gallery bundle only when needed
const ArtistGallery = React.lazy(() =>
  import(/* webpackChunkName: "ArtistGallery" */ './ArtistGallery')
);

const devProjects = [
  {
    title: 'Datalysis',
    imageUrl: '../assets/images/Datalysis.png',
    link: 'https://datalysis-git-vitedatalysis-ritsucodes-projects.vercel.app/'
  }
];

const artGallery = [
  { id: 1, imageUrl: '../assets/images/Camera mann.png', title: 'Artwork 1' },
  { id: 2, imageUrl: '../assets/images/coverface.png', title: 'Artwork 2' },
  { id: 3, imageUrl: '../assets/images/Emogur.png', title: 'Artwork 3' },
  { id: 4, imageUrl: '../assets/images/doc.png', title: 'Artwork 4' },
  { id: 5, imageUrl: '../assets/images/blep.png', title: 'Artwork 5' },
  { id: 6, imageUrl: '../assets/images/cat.png', title: 'Artwork 6' },
  { id: 7, imageUrl: '../assets/images/Girl.png', title: 'Artwork 7' },
  { id: 8, imageUrl: '../assets/images/half.png', title: 'Artwork 8' },
  { id: 9, imageUrl: '../assets/images/headfon.png', title: 'Artwork 9' },
  { id: 10, imageUrl: '../assets/images/Coverurface.png', title: 'Artwork 10' }
];

export default React.memo(function ProjectsPanel() {
  const [view, setView] = useState('developer');
  const [hoverIndex, setHoverIndex] = useState(null);
  const [lightboxImg, setLightboxImg] = useState(null);

  const toggleItems = [
    { name: 'Developer', value: 'developer' },
    { name: 'Artist',    value: 'artist' }
  ];

  return (
    <section id="projects" className="w-full max-w-6xl mx-auto px-4 py-12">

      {/* ─── Developer / Artist Toggle ─── */}
      <div className="relative inline-grid grid-cols-2 bg-opacity-30 rounded-full mb-8">
        {/* Morphing hover‐background */}
        <div
          className={`
            absolute inset-y-1 bg-white bg-opacity-10 rounded-full 
            transition-all duration-300 ease-out
            ${hoverIndex !== null ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            width: `${100 / toggleItems.length}%`,
            left:  hoverIndex !== null
              ? `${hoverIndex * (100 / toggleItems.length)}%`
              : 0
          }}
        />

        {toggleItems.map((item, idx) => (
          <button
            key={item.value}
            onMouseEnter={() => setHoverIndex(idx)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => setView(item.value)}
            className={`
              relative z-10 py-2 px-10 transition-colors duration-300 rounded-full
              ${view === item.value ? 'text-gray-900 bg-white' : 'text-white'}
            `}
          >
            {item.name}
          </button>
        ))}
      </div>

      {view === 'developer' ? (
        <DeveloperGrid projects={devProjects} />
      ) : (
        <Suspense fallback={<div className="text-gray-400">Loading gallery…</div>}>
          <ArtistGallery gallery={artGallery} onSelect={setLightboxImg} />
        </Suspense>
      )}

      {lightboxImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setLightboxImg(null)}
        >
          <div className="relative max-w-full max-h-full" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-2 right-2 text-white text-2xl font-bold"
            >
              &times;
            </button>
            <img
              src={lightboxImg}
              alt=""
              className="max-w-screen-md max-h-screen"
              loading="eager"
            />
          </div>
        </div>
      )}
    </section>
  );
});
