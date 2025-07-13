import type React from 'react';
import { useState } from 'react';
import { CampaignForm } from '../campaign/CampaignForm';
import { ContactForm } from '../contact/ContactForm';

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
    description: 'Cuéntanos sobre tu proyecto',
  },
  {
    id: 'campaign',
    label: 'Campaña personalizada',
    icon: '🚀',
    description: 'Diseña una campaña específica',
  },
];

export const FormTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('contact');

  const handleTabChange = (tabId: string) => {
    console.log('Changing tab to:', tabId); // Debug log
    setActiveTab(tabId);
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Tab Navigation */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        {tabs.map((tab) => (
          <button
            className={`flex-1 rounded-xl border-2 p-6 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 ${
              activeTab === tab.id
                ? 'border-brand-pink bg-brand-pink/10 shadow-brand-pink/20 shadow-lg'
                : 'border-brand-card bg-brand-card/50 hover:border-brand-purple hover:bg-brand-purple/10'
            } `}
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            type="button"
          >
            <div className="mb-2 flex items-center gap-3">
              <span aria-label={tab.label} className="text-2xl" role="img">
                {tab.icon}
              </span>
              <h3
                className={`font-bold text-lg ${activeTab === tab.id ? 'text-brand-pink' : 'text-text-light'}`}
              >
                {tab.label}
              </h3>
            </div>
            <p className="text-sm text-text-muted">{tab.description}</p>
          </button>
        ))}
      </div>

      {/* Form Container */}
      <div className="rounded-2xl border border-brand-card/50 bg-brand-card/30 p-8 shadow-xl backdrop-blur-sm">
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
