import React from 'react';

export function Badge({ children, variant = 'info', size = 'sm', className = '' }) {
  const baseStyle = "inline-flex items-center gap-1.5 font-medium rounded-full tracking-normal border-none transition-all font-sans";
  
  const sizeStyles = {
    sm: "px-3 py-1 text-[11px]",
    md: "px-3.5 py-1.5 text-xs"
  };

  const variantStyles = {
    info: "bg-[#E8F0FE] text-[#0B57D0]",
    success: "bg-[#E6F4EA] text-[#137333]",
    warning: "bg-[#FEF7E0] text-[#B06000]",
    danger: "bg-[#FCE8E6] text-[#C5221F]",
    purple: "bg-[#F3E8FF] text-[#6B21A8]",
    indigo: "bg-[#E8EAF6] text-[#283593]",
    neutral: "bg-[#E1E9F5] text-[#444746]"
  };

  return (
    <span className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80"></span>
      <span>{children}</span>
    </span>
  );
}
