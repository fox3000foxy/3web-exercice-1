import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', size = 'md', icon, disabled = false, type = 'button', fullWidth = false }) => {
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm',
    success: 'bg-green-600 hover:bg-green-700 text-white shadow-sm',
    outline: 'bg-transparent hover:bg-gray-50 text-gray-700 border border-gray-300',
  };

  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2.5 px-5 text-sm',
    lg: 'py-3 px-6 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
                ${variantClasses[variant]} 
                ${sizeClasses[size]}
                ${fullWidth ? 'w-full' : ''}
                font-medium rounded-lg transition-colors duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2
            `}>
      {icon && <i className={`fas fa-${icon}`}></i>}
      {children}
    </button>
  );
};

export default Button;
