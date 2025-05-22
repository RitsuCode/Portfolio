import {
  SiReact,
  SiTailwindcss,
  SiPython,
  SiGithub,
  SiJavascript,
  SiC,
  SiCplusplus,
  SiKrita,
  SiAdobephotoshop,
  SiFigma,
  SiVite,
  SiJira,
  SiDjango,
  SiPhp,
} from 'react-icons/si';

export default function SkillSetShowcase() {
  const devTools = [
    { name: 'React', icon: <SiReact /> },
    { name: 'TailwindCSS', icon: <SiTailwindcss /> },
    { name: 'Python', icon: <SiPython /> },
    { name: 'Django', icon: <SiDjango /> },
    { name: 'vite', icon: <SiVite /> },
    { name: 'GitHub', icon: <SiGithub /> },
    { name: 'Jira', icon: <SiJira /> },
    { name: 'JavaScript', icon: <SiJavascript /> },
    { name: 'C', icon: <SiC /> },
    { name: 'C++', icon: <SiCplusplus /> },
    { name: 'PHP', icon: <SiPhp /> },
  ];

  const designTools = [
    { name: 'Krita', icon: <SiKrita /> },
    { name: 'Photoshop', icon: <SiAdobephotoshop /> },
    { name: 'Figma', icon: <SiFigma /> },
  ];

  const renderIcons = (tools) =>
    tools.map((tool, index) => (
      <div key={index} className="relative group">
        {/* Tooltip label */}
        <span className="absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs sm:text-sm text-white bg-gray-900 bg-opacity-80 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 pointer-events-none whitespace-nowrap">
          {tool.name}
        </span>

        {/* Icon with animation only on icon */}
        <div className="transition-transform duration-300 hover:scale-110 hover:rotate-12 text-3xl sm:text-4xl md:text-5xl">
          {tool.icon}
        </div>
      </div>
    ));

  return (
    <div className="mt-10 md:mt-20 w-full max-w-6xl mx-auto text-white px-4 sm:px-6">
      <div className="w-full px-4 sm:px-6 md:px-10 py-6 md:py-8 bg-opacity-20 backdrop-blur-md rounded-xl md:rounded-2xl hover:shadow-lg hover:shadow-black transition-shadow">
        <div className="space-y-6 md:space-y-8">
          {/* Development Tools */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
            <p className="w-full sm:w-32 md:w-40 text-gray-300 text-lg sm:text-xl md:text-2xl font-light">
              Development Tools
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
              {renderIcons(devTools)}
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full mt-4 md:mt-5 px-4 sm:px-6 md:px-10 py-6 md:py-8 bg-opacity-20 backdrop-blur-md rounded-xl md:rounded-2xl hover:shadow-lg hover:shadow-black transition-shadow">
        {/* Design Tools */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <p className="w-full sm:w-32 md:w-40 text-gray-300 text-lg sm:text-xl md:text-2xl font-light">
            Design & Visualization
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {renderIcons(designTools)}
          </div>
        </div>
      </div>
    </div>
  );
}