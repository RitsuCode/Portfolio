export default function SocmedLinks() {
  const links = [
    { name: 'Instagram', bgClass: 'bg-insta', href: 'https://www.instagram.com/stegoscope' },
    { name: 'Facebook', bgClass: 'bg-facebook', href: 'https://facebook.com/Rich.Zaraspe' },
    { name: 'LinkedIn', bgClass: 'bg-linkedin', href: 'https://www.linkedin.com/in/rich-zaraspe-2701342b4' },
    { name: 'GitHub', bgClass: 'bg-github', href: 'https://github.com/Ritsucode' },
  ];

  return (
    <div className="flex flex-row justify-start items-start w-full mt-10">
      {links.map(({ name, bgClass, href }) => (
        <a
          key={name}
          href={href}
          className="relative w-16 h-16 m-4 rounded-full outline outline-1 outline-white overflow-hidden group"
          aria-label={`Go to ${name}`}
        >
          {/* Background Circle */}
          <div className="absolute inset-0 bg-gradient-radial from-gray-700 via-gray-800 to-gray-900 rounded-full z-0" />

          {/* Shimmer on Hover */}
          <div className="absolute inset-0 rounded-full bg-shimmer bg-[length:200%_100%] opacity-0 group-hover:opacity-100 animate-shimmer z-10" />

          {/* Icon */}
          <div
            className={`${bgClass} bg-no-repeat bg-contain bg-center w-8 h-8 relative z-20 m-auto top-1/2 -translate-y-1/2`}
          />
        </a>
      ))}
    </div>
  );
}
