import React from 'react';

interface RewardCardProps {
  reward: string;
  userPoints: number;
  nombreTampons: number;
  onShowModal: () => void;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward, userPoints, nombreTampons, onShowModal }) => (
  <div className='bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-orange-200'>
    <div className='flex items-start gap-4'>
      <div className='w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md'>
        <i className='fas fa-gift text-white text-xl'></i>
      </div>
      <div className='flex-1'>
        <h3 className='text-lg font-bold text-gray-900 mb-1'>Récompense</h3>
        <p className='text-gray-700'>{reward}</p>
        {userPoints === nombreTampons && (
          <button
            onClick={onShowModal}
            className='mt-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all shadow-md'
          >
            <i className='fas fa-gift mr-2'></i>
            Réclamer ma récompense
          </button>
        )}
      </div>
    </div>
  </div>
);

export default RewardCard;
