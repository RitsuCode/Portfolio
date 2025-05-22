import React, { useState, useRef } from 'react';

export default function Navbar() {
  const [hoverIndex, setHoverIndex] = useState(null);
  const navItems = [
    { name: 'Home', sectionId: 'home' },
    { name: 'Projects', sectionId: 'projects' },
    { name: 'About', sectionId: 'about' },
    { name: 'Contact', sectionId: 'contact' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav className="fixed mt-10 bg-gray-900 bg-opacity-20 outline outline-white outline-1 rounded-full shadow-md backdrop-blur-sm z-50">
      <div className="grid grid-cols-4 text-gray-300 font-medium text-lg">
        {/* Morphing hover background */}
        <div
          className={`absolute inset-y-0 bg-white bg-opacity-10 rounded-full transition-all duration-300 ease-out ${
            hoverIndex !== null ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            width: `${100 / navItems.length}%`,
            left: `${hoverIndex !== null ? hoverIndex * (100 / navItems.length) : 0}%`,
          }}
        />

        {/* Navigation items */}
        {navItems.map((item, index) => (
          <button
            key={item.name}
            className="relative z-10 text-center cursor-pointer px-8 py-4 transition-colors duration-300 hover:text-white"
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => scrollToSection(item.sectionId)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </nav>
  );
}