import React from 'react';

interface FormLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const FormLayout: React.FC<FormLayoutProps> = ({ title, children }) => (
  <div className="w-full">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1 h-8 bg-gradient-to-b from-brand-pink to-brand-purple rounded-full"></div>
      <h2 className="text-2xl font-bold bg-gradient-to-r from-brand-pink to-brand-purple bg-clip-text text-transparent">
        {title}
      </h2>
    </div>
    <div className="space-y-1">{children}</div>
  </div>
);
