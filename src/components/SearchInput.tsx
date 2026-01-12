import React from 'react';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    icon?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
    value,
    onChange,
    placeholder = 'Rechercher...',
    label = 'Rechercher',
    icon = 'search',
}) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className={`fas fa-${icon} mr-2`}></i>
                {label}
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="input w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>
    );
};

export default SearchInput;
