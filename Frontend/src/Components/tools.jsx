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
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-sm text-white bg-gray-900 bg-opacity-80 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 pointer-events-none">
            {tool.name}
        </span>

        {/* Icon with animation only on icon */}
        <div className="transition-transform duration-300 hover:scale-110 hover:rotate-12">
            {tool.icon}
        </div>
        </div>
    ));

  return (
    <div className="mt-20 w-full text-white">
      <div className="w-full px-10 py-8 bg-opacity-20 backdrop-blur-md rounded-2xl hover:shadow-lg hover:shadow-black mx-auto transition-shadow">
        <div className="space-y-8">

          {/* Development Tools */}
          <div className="flex items-start space-x-6">
            <p className="w-40 text-gray-300 text-2xl font-light">Development Tools</p>
            <div className="grid grid-cols-7 gap-12 text-5xl text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]">
              {renderIcons(devTools)}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-5 px-10 py-8 bg-opacity-20 backdrop-blur-md rounded-2xl hover:shadow-lg hover:shadow-black mx-auto transition-shadow">
          {/* Design Tools */}
          <div className="flex items-center space-x-6">
            <p className="w-40 text-gray-300 text-2xl font-light">Design & Visualization</p>
            <div className="grid grid-cols-4 gap-12 text-5xl text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]">
              {renderIcons(designTools)}
            </div>
          </div>

      </div>
    </div>
  );
}
