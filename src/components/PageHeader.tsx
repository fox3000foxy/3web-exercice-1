import React from 'react';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    icon?: string;
    iconColor?: string;
    actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
    title, 
    subtitle, 
    icon, 
    iconColor = 'blue',
    actions 
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                        {icon && <i className={`fas fa-${icon} text-${iconColor}-600 text-lg sm:text-xl`}></i>}
                        <span className="truncate">{title}</span>
                    </h1>
                    {subtitle && <p className="text-gray-600 mt-1 text-sm sm:text-base">{subtitle}</p>}
                </div>
                {actions && <div className="flex-shrink-0">{actions}</div>}
            </div>
        </div>
    );
};

export default PageHeader;
