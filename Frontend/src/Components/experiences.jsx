import { useState } from 'react';

export default function EducationExperienceToggle() {
  const [activeTab, setActiveTab] = useState('education');
  const tabs = ['education', 'experience'];
  const activeIndex = tabs.indexOf(activeTab);

  return (
    <div className="w-full mt-10 md:mt-20 px-4 sm:px-6">
      {/* Tab Header */}
      <div className="w-full relative bg-gray-900 bg-opacity-20 outline outline-white outline-1 rounded-lg shadow-md backdrop-blur-sm mx-auto">
        <div className="grid grid-cols-2 text-gray-300 font-medium relative">
          {/* Morphing background */}
          <div
            className={`absolute inset-y-0 bg-white bg-opacity-10 rounded-lg transition-all duration-300 ease-out`}
            style={{
              width: '50%',
              left: `${activeIndex * 50}%`,
            }}
          />

          {/* Tab buttons */}
          {tabs.map((tab, index) => (
            <div
              key={tab}
              className={`relative z-10 text-center cursor-pointer px-4 py-3 sm:px-6 sm:py-4 md:px-8 text-lg sm:text-xl md:text-2xl font-light transition-colors duration-300 ${
                activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'education' ? 'Education' : 'Experiences'}
            </div>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:grid md:grid-cols-2 bg-black bg-opacity-20 gap-4 sm:gap-6 text-gray-300 p-4 sm:p-6 rounded-lg outline outline-1 w-full transition-all duration-500 mt-4 sm:mt-5 pt-6 sm:pt-10">
        {/* Left: Main Info */}
        <div className="flex flex-row items-start">
          <div 
            className={`w-12 h-12 sm:w-16 sm:h-16 m-2 sm:m-4 bg-no-repeat bg-contain bg-center rounded-full outline outline-1 outline-white overflow-hidden group ${
              activeTab === 'education' ? 'bg-ub' : 'bg-valenin'
            }`} 
          />
          <div>
            {activeTab === 'education' ? (
              <>
                <p className="text-sm sm:text-base">September 2021 - September 2025</p>
                <p className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2">University of Batangas</p>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-400">Bachelor of Science in Computer Engineering</p>
              </>
            ) : (
              <>
                <p className="text-sm sm:text-base">February 2025 - June 2025</p>
                <p className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2">Valenin IT Services</p>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-400">Developer Intern</p>
              </>
            )}
          </div>
        </div>

        {/* Right: Detailed Description */}
        <div className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-4 md:mt-0">
          {activeTab === 'education' ? (
            <p>
              During my time at the University of Batangas, I focused on embedded systems, data
              structures, and real-time applications. I also participated in robotics competitions,
              contributed to open-source hardware designs, and served as the lead developer in my
              capstone project involving IoT and automation.
            </p>
          ) : (
            <p>
              As a Developer Intern at Valenin IT Services, I worked on full-stack web development
              using React and Django. I implemented dynamic UI components, collaborated in
              Agile sprints, and helped optimize backend APIs for performance. My role also included
              writing documentation and presenting weekly progress to the team.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}