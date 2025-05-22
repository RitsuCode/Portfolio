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
  const [index, setIndex] = useState(0); // phrase index
  const [subIndex, setSubIndex] = useState(0); // character index
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false); // Delay flag

   useEffect(() => {
    if (pause) return; // Skip update while pausing

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (subIndex < phrases[index].length) {
          setSubIndex(subIndex + 1);
        } else {
          // Full word typed — pause before deleting
          setPause(true);
          setTimeout(() => {
            setDeleting(true);
            setPause(false);
          }, 1500); // Delay after typing
        }
      } else {
        if (subIndex > 0) {
          setSubIndex(subIndex - 1);
        } else {
          // Finished deleting — move to next word with pause
          setPause(true);
          setTimeout(() => {
            setIndex((index + 1) % phrases.length);
            setDeleting(false);
            setPause(false);
          }, 500); // Delay before typing next
        }
      }

      setText(phrases[index].substring(0, subIndex));
    }, deleting ? 50 : 100); // Typing speed

        return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, pause]);

  return (
    <section id='home' className="bg-displayBg bg-no-repeat bg-cover w-full min-h-screen flex flex-col items-center">
      <CustomCursor />
      {/* Navbar */}
      <Navbar />
      <div className="flex flex-col w-full max-w-6xl h-full justify-center items-center px-4 mt-36">
        <div className="flex flex-row w-full max-w-6xl justify-between items-center">
          <div className="flex flex-col text-left w-1/2">
            <p className="text-4xl text-gray-300 font-light">Hi, my name is</p>
            <h1 className="text-8xl text-white font-bold mb-4">Rich <br /> Zaraspe</h1>

            {/*  Typewriter Text */}
            <p className="text-4xl text-gray-300 mb-8 font-light min-h-[48px]">
              {text}
              <span className="animate-pulse">|</span>
            </p>

            <button className="relative group p-[2px] rounded-[10px] bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 w-44 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,234,100)]">
              <span className="block px-8 py-2 bg-gray-800 rounded-lg text-3xl font-light text-white transition-all duration-300 group-hover:bg-gray-900 hover:text-cyan-200">
                View CV
              </span>
            </button>
          </div>

          <div className="w-1/2 flex justify-center">
            <div className="bg-ritsu bg-no-repeat bg-contain bg-center w-full h-full min-h-[700px]" />
          </div>
        </div>
        <SocmedLinks />
        <div className="w-full h-px bg-white/30 my-10" id='about'/>
        <EducationExperienceToggle />
        <SkillSetShowcase />
        <div className="w-full h-px bg-white/30 my-10" id="contact" />
        <ContactMe />
        <div className='mb-96 '/>
      </div>
    </section>
    
  );
}
