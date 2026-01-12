import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    icon?: string;
    iconColor?: string;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    icon, 
    iconColor = 'blue',
    maxWidth = 'md' 
}) => {
    if (!isOpen) return null;

    const widthClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
    };

    const colorClasses = {
        blue: 'from-blue-500 to-blue-600',
        purple: 'from-purple-600 to-purple-700',
        orange: 'from-orange-500 to-orange-600',
        yellow: 'from-yellow-400 to-orange-500',
        green: 'from-green-500 to-emerald-600',
        red: 'from-red-500 to-red-600',
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className={`bg-white rounded-2xl p-8 ${widthClasses[maxWidth]} w-full shadow-2xl relative animate-slide-in`}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
                >
                    <i className="fas fa-times text-xl"></i>
                </button>

                <div className="text-center">
                    {icon && (
                        <div className={`inline-block bg-gradient-to-br ${colorClasses[iconColor as keyof typeof colorClasses] || colorClasses.blue} p-6 rounded-full mb-4 shadow-lg`}>
                            <i className={`fas fa-${icon} text-white text-5xl`}></i>
                        </div>
                    )}
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
