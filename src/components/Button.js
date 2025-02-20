// 🧶 Button 컴포넌트 정의
// ✔ `variant`: 버튼 스타일 유형
// ✔ `children`: 버튼 내부의 내용 (텍스트, 아이콘 등)
// ✔ `className`: 추가적인 CSS 클래스
// ✔ `disabled`: 버튼 비활성화 여부 (기본값: false)

import classNames from 'classnames';

function Button({
  size = 'base',
  variant = 'primary', // 기본값: primary
  children, // 버튼 내부 콘텐츠
  className = '', // 추가적인 스타일 적용 가능
  disabled = false, // 비활성화 여부
  ...props // 기타 속성 (onClick, type 등)
}) {
  // 💠 공통 스타일 (모든 버튼에 적용)
  const baseStyles =
    'px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out text-lg shadow-md';
  const baseStyles2 = 'px-4 py-2 font-semibold rounded transition duration-300';
  const baseStyles3 = 'px-6 py-2 rounded font-semibold transition duration-300';

  // 💠 버튼 크기 스타일
  const sizeStyles = size === 'lg' ? 'text-lg' : 'text-base';

  // 💠 스타일 유형별 클래스 정의
  const variantStyles = {
    primary: `${baseStyles} bg-black text-white hover:bg-gray-900 hover:shadow-lg hover:scale-105 active:scale-95`,
    secondary: `${baseStyles2} ${sizeStyles} bg-secondary text-black hover:bg-black hover:text-white hover:border hover:border-white`,
    outline: `${baseStyles} border border-white text-white hover:bg-white hover:text-black`,
    hero: `${baseStyles3} ${sizeStyles} bg-secondary text-black hover:bg-black hover:text-white hover:border hover:border-white`,
    hero2: `${baseStyles3} ${sizeStyles} border border-white text-white hover:bg-white hover:text-black`,
  };

  return (
    <button
      className={classNames(
        baseStyles,
        variantStyles[variant] || variantStyles.primary,
        { 'opacity-50 cursor-not-allowed grayscale': disabled }, // 🚫 비활성화 버튼
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
