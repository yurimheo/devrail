import React from 'react';

function Button({ variant = 'primary', children, className = '', ...props }) {
  const baseStyles = 'px-4 py-2 rounded font-semibold';
  const variantStyles =
    variant === 'outline'
      ? 'border border-gray-500 text-gray-500'
      : 'bg-primary text-white';

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
