import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navItems = [
    { name: 'Home', sectionId: 'home' },
    { name: 'Projects', sectionId: 'projects' },
    { name: 'About', sectionId: 'about' },
    { name: 'Contact', sectionId: 'contact' }
  ];

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <nav className={`fixed ${isScrolled ? 'mt-4' : 'mt-6 md:mt-10'} transition-all duration-300 bg-gray-900 bg-opacity-20 outline outline-white outline-1 rounded-full shadow-md backdrop-blur-sm z-50 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[90%] md:w-auto`}>
      <div className="grid grid-cols-4 text-gray-300 font-medium text-sm sm:text-base md:text-lg">
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
            className="relative z-10 text-center cursor-pointer px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 transition-colors duration-300 hover:text-white"
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