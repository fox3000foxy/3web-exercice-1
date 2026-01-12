import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label: string;
  icon?: string;
}

const SelectFilter: React.FC<SelectFilterProps> = ({ value, onChange, options, label, icon = 'filter' }) => {
  return (
    <div>
      <label className='block text-sm font-medium text-gray-700 mb-2'>
        <i className={`fas fa-${icon} mr-2`}></i>
        {label}
      </label>
      <select value={value} onChange={e => onChange(e.target.value)} className='input w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter;
