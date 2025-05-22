export default function SocmedLinks() {
  const links = [
    { name: 'Instagram', bgClass: 'bg-insta', href: 'https://www.instagram.com/stegoscope' },
    { name: 'Facebook', bgClass: 'bg-facebook', href: 'https://facebook.com/Rich.Zaraspe' },
    { name: 'LinkedIn', bgClass: 'bg-linkedin', href: 'https://www.linkedin.com/in/rich-zaraspe-2701342b4' },
    { name: 'GitHub', bgClass: 'bg-github', href: 'https://github.com/Ritsucode' },
  ];

  return (
    <div className="flex flex-row flex-wrap justify-center md:justify-start items-center w-full mt-8 md:mt-10 px-4 sm:px-0">
      {links.map(({ name, bgClass, href }) => (
        <a
          key={name}
          href={href}
          className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 m-2 sm:m-3 md:m-4 rounded-full outline outline-1 outline-white overflow-hidden group transition-transform duration-300 hover:scale-110"
          aria-label={`Go to ${name}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* Background Circle */}
          <div className="absolute inset-0 bg-gradient-radial from-gray-700 via-gray-800 to-gray-900 rounded-full z-0" />

          {/* Shimmer on Hover */}
          <div className="absolute inset-0 rounded-full bg-shimmer bg-[length:200%_100%] opacity-0 group-hover:opacity-100 animate-shimmer z-10" />

          {/* Icon - Responsive sizing */}
          <div
            className={`${bgClass} bg-no-repeat bg-contain bg-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 relative z-20 m-auto top-1/2 -translate-y-1/2`}
          />
          
          {/* Tooltip for better mobile UX */}
          <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {name}
          </span>
        </a>
      ))}
    </div>
  );
}