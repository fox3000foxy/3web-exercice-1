import React from 'react';

interface FormFieldProps {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'number' | 'password' | 'textarea' | 'select';
    value: string | number;
    onChange: (value: string | number) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    icon?: string;
    options?: { value: string | number; label: string }[];
    rows?: number;
}

const FormField: React.FC<FormFieldProps> = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    placeholder,
    required = false,
    disabled = false,
    error,
    icon,
    options = [],
    rows = 4,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const newValue = type === 'number' ? parseFloat(e.target.value) : e.target.value;
        onChange(newValue);
    };

    return (
        <div className="space-y-2">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {icon && <i className={`fas fa-${icon} mr-2`}></i>}
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {type === 'textarea' ? (
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    rows={rows}
                    className={`
                        w-full px-4 py-2.5 border rounded-lg 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        transition-all duration-200
                        ${error ? 'border-red-500' : 'border-gray-300'}
                        ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
                    `}
                />
            ) : type === 'select' ? (
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    required={required}
                    disabled={disabled}
                    className={`
                        w-full px-4 py-2.5 border rounded-lg 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        transition-all duration-200
                        ${error ? 'border-red-500' : 'border-gray-300'}
                        ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
                    `}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    step={type === 'number' ? '0.01' : undefined}
                    className={`
                        w-full px-4 py-2.5 border rounded-lg 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        transition-all duration-200
                        ${error ? 'border-red-500' : 'border-gray-300'}
                        ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
                    `}
                />
            )}

            {error && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                    <i className="fas fa-exclamation-circle"></i>
                    {error}
                </p>
            )}
        </div>
    );
};

export default FormField;
