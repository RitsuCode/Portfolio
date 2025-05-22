import { useState } from 'react';

export default function EducationExperienceToggle() {
  const [activeTab, setActiveTab] = useState('education');
  const tabs = ['education', 'experience'];
  const activeIndex = tabs.indexOf(activeTab);

  return (
    <div className="w-full mt-20">
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
              className={`relative z-10 text-center cursor-pointer px-8 py-4 text-2xl font-light transition-colors duration-300 ${
                activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'education' ? 'Education' : 'Experiences'}
            </div>
          ))}
        </div>
      </div>

      {/* Two-column Content Section */}
      <div className="grid grid-cols-2 bg-black bg-opacity-20 md:grid-cols-2 gap-6 text-gray-300 text-xl p-6 rounded-lg outline outline-1 w-full transition-all duration-500 mt-5 pt-10">
        {/* Left: Main Info */}
        <div>
          {activeTab === 'education' ? (
            <div className='flex flex-row'>
                <div className="w-16 h-16 m-4 bg-ub bg-no-repeat bg-contain bg-center rounded-full outline outline-1 outline-white overflow-hidden group" />
                <div>
                    <p>September 2021 - September 2025</p>
                    <p className="text-2xl font-semibold mb-2">University of Batangas</p>
                    <p className="mt-2 text-sm text-gray-400"> Bachelor of Science in Computer Engineering</p>
                </div>
            </div>
          ) : (
            <div className='flex flex-row'>
                <div className="w-16 h-16 m-4 bg-valenin bg-no-repeat bg-contain bg-center rounded-full outline outline-1 outline-white overflow-hidden group" />        
                <div>
                    <p>February 2025 - June 2025</p>
                    <p className="text-2xl font-semibold mb-2">Valenin IT Services</p>
                    <p className="mt-2 text-sm text-gray-400">Developer Intern</p>
                </div>
            </div>
          )}
        </div>

        {/* Right: Detailed Description */}
        <div className="text-gray-400 text-sm leading-relaxed">
          {activeTab === 'education' ? (
            <div>
              <p>
                During my time at the University of Batangas, I focused on embedded systems, data
                structures, and real-time applications. I also participated in robotics competitions,
                contributed to open-source hardware designs, and served as the lead developer in my
                capstone project involving IoT and automation.
              </p>
            </div>
          ) : (
            <div>
              <p>
                As a Developer Intern at Valenin IT Services, I worked on full-stack web development
                using React and Django. I implemented dynamic UI components, collaborated in
                Agile sprints, and helped optimize backend APIs for performance. My role also included
                writing documentation and presenting weekly progress to the team.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
