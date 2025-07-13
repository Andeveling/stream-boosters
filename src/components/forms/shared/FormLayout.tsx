import type React from 'react';

interface FormLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const FormLayout: React.FC<FormLayoutProps> = ({ title, children }) => (
  <div className="w-full">
    <div className="mb-6 flex items-center gap-3">
      <div className="h-8 w-1 rounded-full bg-gradient-to-b from-brand-pink to-brand-purple" />
      <h2 className="bg-gradient-to-r from-brand-pink to-brand-purple bg-clip-text font-bold text-2xl text-transparent">
        {title}
      </h2>
    </div>
    <div className="space-y-1">{children}</div>
  </div>
);
