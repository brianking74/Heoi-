
import React from 'react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'discover', icon: '🔍', label: 'Explore' },
    { id: 'ai', icon: '🤖', label: 'Heoi! AI' },
    { id: 'meetups', icon: '🤝', label: 'Social' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 pb-safe z-50">
      <div className="flex justify-around items-center h-20 max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center space-y-1 transition-all duration-300 ${
              activeTab === tab.id ? 'text-[#de2810] scale-110' : 'text-gray-400'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-[9px] font-black uppercase tracking-[0.15em]">{tab.label}</span>
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              activeTab === tab.id ? 'bg-[#de2810] opacity-100' : 'bg-transparent opacity-0'
            }`} />
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
