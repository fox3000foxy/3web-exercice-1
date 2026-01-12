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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        {icon && <i className={`fas fa-${icon} text-${iconColor}-600`}></i>}
                        {title}
                    </h1>
                    {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
                </div>
                {actions && <div>{actions}</div>}
            </div>
        </div>
    );
};

export default PageHeader;
