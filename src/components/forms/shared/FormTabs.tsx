import React, { useState } from 'react';
import { ContactForm } from '../contact/ContactForm';
import { CampaignForm } from '../campaign/CampaignForm';

interface TabOption {
  id: string;
  label: string;
  icon: string;
  description: string;
}

const tabs: TabOption[] = [
  {
    id: 'contact',
    label: 'Contacto inicial',
    icon: '💬',
    description: 'Cuéntanos sobre tu proyecto'
  },
  {
    id: 'campaign',
    label: 'Campaña personalizada',
    icon: '🚀',
    description: 'Diseña una campaña específica'
  }
];

export const FormTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('contact');

  const handleTabChange = (tabId: string) => {
    console.log('Changing tab to:', tabId); // Debug log
    setActiveTab(tabId);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            type="button"
            className={`
              flex-1 p-6 rounded-xl border-2 transition-all duration-300 text-left
              focus:outline-none focus:ring-2 focus:ring-brand-pink/50
              ${activeTab === tab.id 
                ? 'border-brand-pink bg-brand-pink/10 shadow-lg shadow-brand-pink/20' 
                : 'border-brand-card bg-brand-card/50 hover:border-brand-purple hover:bg-brand-purple/10'
              }
            `}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" role="img" aria-label={tab.label}>
                {tab.icon}
              </span>
              <h3 className={`font-bold text-lg ${activeTab === tab.id ? 'text-brand-pink' : 'text-text-light'}`}>
                {tab.label}
              </h3>
            </div>
            <p className="text-text-muted text-sm">{tab.description}</p>
          </button>
        ))}
      </div>

      {/* Form Container */}
      <div className="bg-brand-card/30 backdrop-blur-sm rounded-2xl border border-brand-card/50 p-8 shadow-xl">
        {activeTab === 'contact' ? (
          <ContactForm />
        ) : activeTab === 'campaign' ? (
          <CampaignForm />
        ) : (
          <div>Error: Tab no encontrado</div>
        )}
      </div>
    </div>
  );
};
