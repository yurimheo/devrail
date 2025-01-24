/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // src 내부 모든 JSX 및 TSX 파일
    "./public/index.html",        // HTML 파일
  ],
  theme: {
    extend: {
      translate: {
        '0': '0px',
        '100': '100px',
        '200': '200px',
        // 각 정거장 위치에 따른 Y축 값
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(to top, #d4af37, #fff7d1)',
      },
      textShadow: {
        gold: '0 0 10px rgba(212, 175, 55, 0.8), 0 0 20px rgba(212, 175, 55, 0.6), 0 2px 2px rgba(0, 0, 0, 0.5)',
      },
      colors: {
        primary: "#000000", // 검정색
        secondary: "#ffffff", // 흰색
        dark: '#1c1f33', // 어두운 배경
        gold: '#d4af37', // 금색
        lightGold: '#fff7d1', // 밝은 금색
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
      },
    },
  },
  plugins: [],
};
