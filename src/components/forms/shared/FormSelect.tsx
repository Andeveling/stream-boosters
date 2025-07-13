import type React from 'react';
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
    <label
      className="mb-2 block text-left font-semibold text-text-light"
      htmlFor={name}
    >
      {label}
    </label>
    <select
      className={`w-full cursor-pointer rounded-lg border-2 bg-brand-darker px-4 py-3 text-text-light transition-all duration-200 focus:outline-none focus:ring-2 ${
        error
          ? 'border-brand-red shadow-brand-red/20 shadow-lg focus:ring-brand-red/50'
          : 'border-brand-card hover:border-brand-purple focus:border-brand-pink focus:ring-brand-pink/50'
      } `}
      id={name}
      name={name}
      onChange={onChange}
      value={value}
    >
      {placeholder && (
        <option className="text-text-muted" value="">
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option
          className="bg-brand-darker text-text-light"
          key={opt.value}
          value={opt.value}
        >
          {opt.label}
        </option>
      ))}
    </select>
    {error && (
      <div className="mt-2 flex items-center gap-2">
        <span className="text-brand-red text-sm">⚠️</span>
        <span className="font-medium text-brand-red text-sm">
          {error.message}
        </span>
      </div>
    )}
  </div>
);
