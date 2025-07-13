import React from 'react';
import type { FieldError } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  error?: FieldError;
  placeholder?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  placeholder,
}) => (
  <div className="mb-6">
    <label htmlFor={name} className="block font-semibold mb-2 text-text-light text-left">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`
        w-full px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer
        bg-brand-darker border-2 text-text-light
        focus:outline-none focus:ring-2
        ${error 
          ? 'border-brand-red focus:ring-brand-red/50 shadow-lg shadow-brand-red/20' 
          : 'border-brand-card hover:border-brand-purple focus:border-brand-pink focus:ring-brand-pink/50'
        }
      `}
    >
      {placeholder && (
        <option value="" className="text-text-muted">
          {placeholder}
        </option>
      )}
      {options.map(opt => (
        <option key={opt.value} value={opt.value} className="bg-brand-darker text-text-light">
          {opt.label}
        </option>
      ))}
    </select>
    {error && (
      <div className="flex items-center gap-2 mt-2">
        <span className="text-brand-red text-sm">⚠️</span>
        <span className="text-brand-red text-sm font-medium">{error.message}</span>
      </div>
    )}
  </div>
);
