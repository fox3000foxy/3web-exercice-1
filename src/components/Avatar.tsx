import React from 'react';

interface AvatarProps {
  name: string;
  isAdmin?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ name, isAdmin = false, size = 'md', className = '' }) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-sm',
  };

  const gradientClass = isAdmin ? 'bg-gradient-to-br from-orange-500 to-red-600' : 'bg-gradient-to-br from-blue-500 to-blue-600';

  return <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center text-white font-semibold ${gradientClass} ${className}`}>{initials}</div>;
};

export default Avatar;
