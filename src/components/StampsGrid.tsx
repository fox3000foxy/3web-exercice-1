import React from 'react';

interface StampsGridProps {
  userPoints: number;
  nombreTampons: number;
  onStampClick: (index: number) => void;
}

const StampsGrid: React.FC<StampsGridProps> = ({ userPoints, nombreTampons, onStampClick }) => (
  <div className='grid grid-cols-2 xs:grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3 md:gap-4 mb-6'>
    {Array.from({ length: nombreTampons }).map((_, index) => (
      <button key={index} onClick={() => onStampClick(index + 1)} className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all transform hover:scale-105 border-2 ${index < userPoints ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-md border-purple-600' : 'bg-white text-gray-400 hover:bg-gray-50 border-gray-300 border-dashed'}`} aria-label={`Tampon ${index + 1}`}>
        <i className={`fas ${index < userPoints ? 'fa-check-circle' : 'fa-circle'} text-2xl md:text-4xl`}></i>
        <span className='mt-1 md:mt-2 font-bold text-xs md:text-sm'>#{index + 1}</span>
      </button>
    ))}
  </div>
);

export default StampsGrid;
