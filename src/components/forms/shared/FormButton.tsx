import type React from 'react';

interface FormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export const FormButton: React.FC<FormButtonProps> = ({
  children,
  type = 'submit',
  disabled = false,
  className = '',
  ...buttonProps
}) => {
  const isLoading =
    disabled && typeof children === 'string' && children.includes('Enviando');

  return (
    <button
      className={`w-full rounded-lg bg-gradient-to-r from-brand-pink to-brand-purple px-8 py-3 font-bold text-white shadow-brand-pink/20 shadow-lg transition-all duration-300 hover:scale-105 hover:from-brand-purple hover:to-brand-pink hover:shadow-brand-purple/30 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-pink/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${isLoading ? 'opacity-50' : ''} ${className} `}
      disabled={disabled}
      type={type}
      {...buttonProps}
    >
      {disabled ? (
        <div className="flex items-center justify-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Enviando...
        </div>
      ) : (
        children
      )}
    </button>
  );
};
