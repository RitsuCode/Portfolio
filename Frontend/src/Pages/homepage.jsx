import { useEffect, useState } from 'react';
import Navbar from '../Components/navbar';
import SocmedLinks from '../Components/socmedLinks';
import EducationExperienceToggle from '../Components/experiences';
import SkillSetShowcase from '../Components/tools';
import CustomCursor from '../Components/customCursor';
import ContactMe from '../Components/contact';

export default function Home() {
  const phrases = [
    "A Computer Engineer Graduate",
    "An Artist",
    "A Developer"
  ];

  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) return;

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (subIndex < phrases[index].length) {
          setSubIndex(subIndex + 1);
        } else {
          setPause(true);
          setTimeout(() => {
            setDeleting(true);
            setPause(false);
          }, 1500);
        }
      } else {
        if (subIndex > 0) {
          setSubIndex(subIndex - 1);
        } else {
          setPause(true);
          setTimeout(() => {
            setIndex((index + 1) % phrases.length);
            setDeleting(false);
            setPause(false);
          }, 500);
        }
      }

      setText(phrases[index].substring(0, subIndex));
    }, deleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, pause]);

  return (
    <section id='home' className="bg-displayBg bg-no-repeat bg-cover w-full min-h-screen flex flex-col items-center">
      <CustomCursor />
      <Navbar />
      <div className="flex flex-col w-full max-w-6xl h-full justify-center items-center px-4 mt-20 md:mt-36">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row w-full max-w-6xl justify-between items-center">
          {/* Text Content */}
          <div className="flex flex-col text-center lg:text-left w-full lg:w-1/2 order-2 lg:order-1 mt-10 lg:mt-0">
            <p className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-light">Hi, my name is</p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-bold mb-4">
              Rich <br className="hidden sm:block" /> Zaraspe
            </h1>

            {/* Typewriter Text */}
            <p className="text-2xl md:text-3xl lg:text-4xl text-gray-300 mb-8 font-light min-h-[36px] md:min-h-[48px]">
              {text}
              <span className="animate-pulse">|</span>
            </p>

            <div className="flex justify-center lg:justify-start">
              <button className="relative group p-[2px] rounded-[10px] bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 w-36 md:w-44 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,234,100)]">
                <span className="block px-6 md:px-8 py-2 bg-gray-800 rounded-lg text-xl md:text-2xl lg:text-3xl font-light text-white transition-all duration-300 group-hover:bg-gray-900 hover:text-cyan-200">
                  View CV
                </span>
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2">
            <div className="bg-ritsu bg-no-repeat bg-contain bg-center w-full h-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[700px]" />
          </div>
        </div>

        <SocmedLinks />
        <div className="w-full h-px bg-white/30 my-10" id='about'/>
        <EducationExperienceToggle />
        <SkillSetShowcase />
        <div className="w-full h-px bg-white/30 my-10" id="contact" />
        <ContactMe />
        <div className='mb-20 md:mb-40 lg:mb-96'/>
      </div>
    </section>
  );
}