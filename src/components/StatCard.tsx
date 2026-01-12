import React from 'react';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: string;
    iconColorFrom?: string;
    iconColorTo?: string;
    valueColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
    label,
    value,
    icon,
    iconColorFrom = 'blue-500',
    iconColorTo = 'blue-600',
    valueColor = 'gray-900',
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600 mb-1">{label}</p>
                    <p className={`text-xl sm:text-2xl font-bold text-${valueColor}`}>{value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br from-${iconColorFrom} to-${iconColorTo} rounded-lg flex items-center justify-center shadow-md`}>
                    <i className={`fas fa-${icon} text-white text-lg`}></i>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
