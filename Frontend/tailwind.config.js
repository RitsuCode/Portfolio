// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fade: 'fade 1s ease-in-out',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 200' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fade: {
          '0%,100%': { opacity: 0 },
          '50%': { opacity: 1 },
        },
      },
      backgroundImage:{
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        displayBg: "url('src/assets/images/Background.png')",
        displayBgLight: "url('src/assets/images/BackgroundLight.png')",
        ritsu: "url('src/assets/images/RitsuIcon.png')",
        insta: "url('src/assets/images/Logos/instagram.png')",
        facebook: "url('src/assets/images/Logos/facebook.png')",
        linkedin: "url('src/assets/images/Logos/linkedin.png')",
        github: "url('src/assets/images/Logos/git.png')",
        ub: "url('src/assets/images/Logos/ub.png')",
        valenin: "url('src/assets/images/Logos/valenin.png')",
    },
    backgroundSize: {
        shimmer: '200% 100%',
      },
  },
},
  plugins: [],
}
