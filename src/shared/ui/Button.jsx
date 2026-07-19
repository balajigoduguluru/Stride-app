import React from 'react';

export function Button({ 
  children, 
  variant = 'primary', // 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost' | 'glass'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  className = '',
  ...props 
}) {
  const baseStyle = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-95 tracking-normal";
  
  const sizeStyles = {
    sm: "px-4 py-2 text-xs gap-2 min-h-[36px]",
    md: "px-5 py-2.5 text-xs font-semibold gap-2 min-h-[40px]",
    lg: "px-6 py-3 text-sm font-semibold gap-2.5 min-h-[48px]"
  };

  const variantStyles = {
    primary: "bg-[#0B57D0] hover:bg-[#0842A0] text-white shadow-sm hover:shadow-md border-none",
    accent: "bg-[#006A4E] hover:bg-[#00523C] text-white shadow-sm hover:shadow-md border-none",
    secondary: "bg-[#E1E9F5] hover:bg-[#D3E3FD] text-[#041E49] border-none font-semibold",
    danger: "bg-[#B3261E] hover:bg-[#8C1D18] text-white shadow-sm hover:shadow-md border-none",
    ghost: "bg-transparent hover:bg-[#1F1F1F]/5 text-[#444746] hover:text-[#1F1F1F] border-none",
    glass: "bg-[#FFFFFF] hover:bg-[#F0F4F9] text-[#1F1F1F] shadow-sm border-none"
  };

  return (
    <button 
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className={size === 'sm' ? "w-4 h-4" : size === 'lg' ? "w-5 h-5" : "w-4 h-4"} />}
      <span>{children}</span>
    </button>
  );
}
