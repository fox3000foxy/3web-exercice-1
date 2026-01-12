import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'gray' | 'yellow';
  icon?: string;
  size?: 'sm' | 'md';
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'blue', icon, size = 'md' }) => {
  const variantClasses = {
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    green: 'bg-green-100 text-green-700 border-green-200',
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
    red: 'bg-red-100 text-red-700 border-red-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
    gray: 'bg-gray-100 text-gray-700 border-gray-200',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
  };

  return (
    <span className={`${variantClasses[variant]} border rounded-full font-medium flex items-center gap-1.5 w-fit ${sizeClasses[size]}`}>
      {icon && <i className={`fas fa-${icon}`}></i>}
      {children}
    </span>
  );
};

export default Badge;
