import { useState } from 'react';

interface UseSearchReturn {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    handleSearchChange: (value: string, resetPage?: () => void) => void;
}

export function useSearch(initialValue: string = ''): UseSearchReturn {
    const [searchTerm, setSearchTerm] = useState(initialValue);

    const handleSearchChange = (value: string, resetPage?: () => void) => {
        setSearchTerm(value);
        if (resetPage) resetPage();
    };

    return {
        searchTerm,
        setSearchTerm,
        handleSearchChange,
    };
}
