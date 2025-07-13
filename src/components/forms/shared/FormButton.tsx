import React from 'react';

interface FormButtonProps {
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
}) => (
  <button
    type={type}
    disabled={disabled}
    className={`
      w-full py-3 px-8 rounded-lg font-bold text-white transition-all duration-300
      bg-gradient-to-r from-brand-pink to-brand-purple
      hover:from-brand-purple hover:to-brand-pink hover:scale-105
      focus:outline-none focus:ring-2 focus:ring-brand-pink/50
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
      shadow-lg shadow-brand-pink/20 hover:shadow-xl hover:shadow-brand-purple/30
      ${className}
    `}
  >
    {disabled ? (
      <div className="flex items-center justify-center gap-2">
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        Enviando...
      </div>
    ) : (
      children
    )}
  </button>
);
