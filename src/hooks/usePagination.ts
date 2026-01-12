import { useMemo, useState } from 'react';

interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage: number;
}

interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  paginatedItems: T[];
  startIndex: number;
  setCurrentPage: (page: number) => void;
  resetPage: () => void;
}

export function usePagination<T>({ items, itemsPerPage }: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedItems = useMemo(() => {
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, startIndex, itemsPerPage]);

  const resetPage = () => setCurrentPage(1);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    startIndex,
    setCurrentPage,
    resetPage,
  };
}
