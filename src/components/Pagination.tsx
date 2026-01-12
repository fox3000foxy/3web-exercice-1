import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
  startIndex: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, itemsPerPage, totalItems, startIndex }) => {
  if (totalPages <= 1) return null;

  return (
    <div className='px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0'>
      <div className='text-xs sm:text-sm text-gray-700 text-center sm:text-left'>
        Affichage {startIndex + 1} à {Math.min(startIndex + itemsPerPage, totalItems)} sur {totalItems} résultats
      </div>
      <div className='flex items-center gap-2'>
        <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className='px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm'>
          <i className='fas fa-chevron-left'></i>
        </button>
        <span className='text-xs sm:text-sm text-gray-700 px-2'>
          Page {currentPage} sur {totalPages}
        </span>
        <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className='px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm'>
          <i className='fas fa-chevron-right'></i>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
