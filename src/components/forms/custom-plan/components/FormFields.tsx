import { forwardRef } from 'react';
import type { ComponentPropsWithRef } from 'react';

// Props base para todos los campos
interface BaseFieldProps {
  label: string;
  error?: string;
  className?: string;
}

// Textarea Component
interface TextareaProps extends BaseFieldProps, ComponentPropsWithRef<'textarea'> {}

export const FormTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-left text-text-light mb-2 font-medium">
          {label}
        </label>
        <textarea
          ref={ref}
          className={`
            w-full bg-brand-darker border border-brand-card rounded-lg p-4 
            text-text-light placeholder-text-muted 
            focus:ring-2 focus:ring-brand-pink focus:outline-none 
            transition-all duration-300 resize-none
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          rows={4}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-red-500 flex items-center">
            <span className="mr-1">⚠️</span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

// Number Input Component
interface NumberInputProps extends BaseFieldProps, ComponentPropsWithRef<'input'> {}

export const FormNumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-left text-text-light mb-2 font-medium">
          {label}
        </label>
        <input
          ref={ref}
          type="number"
          className={`
            w-full bg-brand-darker border border-brand-card rounded-lg p-4 
            text-text-light placeholder-text-muted 
            focus:ring-2 focus:ring-brand-pink focus:outline-none 
            transition-all duration-300
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-red-500 flex items-center">
            <span className="mr-1">⚠️</span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormNumberInput.displayName = 'FormNumberInput';

// Radio Group Component
interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps extends BaseFieldProps {
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  name: string;
}

export const FormRadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  value,
  onChange,
  name,
  error,
  className = ''
}) => {
  return (
    <div className={`w-full ${className}`}>
      <label className="block text-left text-text-light mb-4 font-medium">
        {label}
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`
              py-3 px-4 rounded-lg font-semibold transition-all duration-300 
              hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 
              ${
                value === option.value
                  ? 'bg-brand-pink text-white focus:ring-brand-pink'
                  : 'bg-brand-card text-text-muted hover:bg-brand-card/70 focus:ring-brand-purple'
              }
              ${error ? 'ring-2 ring-red-500' : ''}
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 flex items-center">
          <span className="mr-1">⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
};

// Button Grid Component (para opciones múltiples como duración)
interface ButtonGridProps extends BaseFieldProps {
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  columns?: number;
}

export const FormButtonGrid: React.FC<ButtonGridProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  className = '',
  columns = 2
}) => {
  const gridClass = columns === 2 ? 'grid-cols-2' : `grid-cols-${columns}`;
  
  return (
    <div className={`w-full ${className}`}>
      <label className="block text-left text-text-light mb-4 font-medium">
        {label}
      </label>
      <div className={`grid ${gridClass} gap-4
        sm:grid-cols-2
        grid-cols-1
      `}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`
              py-3 px-4 rounded-lg font-semibold transition-all duration-300 
              hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
              ${
                value === option.value
                  ? 'bg-brand-pink text-white focus:ring-brand-pink'
                  : 'bg-brand-card text-text-muted hover:bg-brand-card/70 focus:ring-brand-purple'
              }
              ${error ? 'ring-2 ring-red-500' : ''}
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 flex items-center">
          <span className="mr-1">⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
};
