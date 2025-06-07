// src/Components/ArtistGallery.jsx
import React from 'react';

const ArtistGallery = React.memo(function ArtistGallery({ gallery, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {gallery.map((art) => (
        <div key={art.id} className="overflow-hidden rounded-lg">
          <img
            src={art.imageUrl}
            alt={art.title}
            loading="lazy"
            className="w-full h-40 object-cover cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={() => onSelect(art.imageUrl)}
          />
        </div>
      ))}
    </div>
  );
});

export default ArtistGallery;
