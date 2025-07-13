import React from 'react';
import type { FieldError } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: FieldError;
  placeholder?: string;
  as?: 'input' | 'textarea';
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  as = 'input',
}) => (
  <div className="mb-6">
    <label htmlFor={name} className="block font-semibold mb-2 text-text-light text-left">
      {label}
    </label>
    {as === 'input' ? (
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-4 py-3 rounded-lg transition-all duration-200
          bg-brand-darker border-2 text-text-light placeholder-text-muted
          focus:outline-none focus:ring-2 focus:ring-brand-pink/50
          ${error 
            ? 'border-brand-red shadow-lg shadow-brand-red/20' 
            : 'border-brand-card hover:border-brand-purple'
          }
        `}
      />
    ) : (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-4 py-3 rounded-lg transition-all duration-200 resize-none
          bg-brand-darker border-2 text-text-light placeholder-text-muted
          focus:outline-none focus:ring-2 focus:ring-brand-pink/50
          ${error 
            ? 'border-brand-red shadow-lg shadow-brand-red/20' 
            : 'border-brand-card hover:border-brand-purple'
          }
        `}
        rows={4}
      />
    )}
    {error && (
      <div className="flex items-center gap-2 mt-2">
        <span className="text-brand-red text-sm">⚠️</span>
        <span className="text-brand-red text-sm font-medium">{error.message}</span>
      </div>
    )}
  </div>
);
