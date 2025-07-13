import type React from 'react';
import type { FieldError } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
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
    <label
      className="mb-2 block text-left font-semibold text-text-light"
      htmlFor={name}
    >
      {label}
    </label>
    {as === 'input' ? (
      <input
        className={`w-full rounded-lg border-2 bg-brand-darker px-4 py-3 text-text-light placeholder-text-muted transition-all duration-200 focus:outline-none focus:ring-2 ${
          error
            ? 'border-brand-red shadow-brand-red/20 shadow-lg focus:ring-brand-red/50'
            : 'border-brand-card hover:border-brand-purple focus:border-brand-pink focus:ring-brand-pink/50'
        } `}
        id={name}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    ) : (
      <textarea
        className={`w-full resize-none rounded-lg border-2 bg-brand-darker px-4 py-3 text-text-light placeholder-text-muted transition-all duration-200 focus:outline-none focus:ring-2 ${
          error
            ? 'border-brand-red shadow-brand-red/20 shadow-lg focus:ring-brand-red/50'
            : 'border-brand-card hover:border-brand-purple focus:border-brand-pink focus:ring-brand-pink/50'
        } `}
        id={name}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        value={value}
      />
    )}
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
