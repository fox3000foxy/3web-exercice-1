import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  color?: 'blue' | 'green' | 'red' | 'purple' | 'orange';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color = 'blue', trend }) => {
  const colorStyles = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      text: 'text-blue-600',
      lightBg: 'bg-blue-50',
    },
    green: {
      bg: 'bg-gradient-to-br from-green-500 to-emerald-600',
      text: 'text-green-600',
      lightBg: 'bg-green-50',
    },
    red: {
      bg: 'bg-gradient-to-br from-red-500 to-rose-600',
      text: 'text-red-600',
      lightBg: 'bg-red-50',
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-500 to-violet-600',
      text: 'text-purple-600',
      lightBg: 'bg-purple-50',
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-500 to-amber-600',
      text: 'text-orange-600',
      lightBg: 'bg-orange-50',
    },
  };

  const style = colorStyles[color];

  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow'>
      <div className='flex items-center justify-between'>
        <div className='flex-1'>
          <p className='text-sm font-medium text-gray-600 mb-1'>{title}</p>
          <h3 className='text-3xl font-bold text-gray-900'>{value}</h3>
          {trend && (
            <p className={`text-sm mt-2 flex items-center gap-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <i className={`fas fa-arrow-${trend.isPositive ? 'up' : 'down'} text-xs`}></i>
              <span className='font-semibold'>{Math.abs(trend.value)}%</span>
              <span className='text-gray-500 font-normal'>vs dernier mois</span>
            </p>
          )}
        </div>
        <div className={`${style.bg} w-14 h-14 rounded-xl flex items-center justify-center shadow-md`}>
          <i className={`fas fa-${icon} text-white text-xl`}></i>
        </div>
      </div>
    </div>
  );
};
