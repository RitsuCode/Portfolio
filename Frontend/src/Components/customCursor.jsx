import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed top-0 left-0 z-50 w-8 h-8 rounded-full bg-opacity-50 outline bg-cyan-300 blur-3xl transition-all duration-150 ${
        hovered ? 'scale-125 opacity-80' : 'scale-100 opacity-100'
      }`}
      style={{
        transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0)`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  );
}
