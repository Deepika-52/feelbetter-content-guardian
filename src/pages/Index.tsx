
import React, { useState } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import Settings from '@/components/Settings';
import Stats from '@/components/Stats';
import FilterDemo from '@/components/FilterDemo';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const [isActive, setIsActive] = useState(true);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [sensitivityLevel, setSensitivityLevel] = useState(70);
  const [blockedContentCount, setBlockedContentCount] = useState(38);

  const handleToggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        isActive={isActive} 
        onToggleActive={handleToggleActive}
        currentTab={currentTab}
        onTabChange={setCurrentTab}
      />
      
      <div className="flex-1">
        {currentTab === 'dashboard' && (
          <Dashboard 
            isActive={isActive} 
            blockedContentCount={blockedContentCount}
            protectionLevel={sensitivityLevel}
          />
        )}
        
        {currentTab === 'settings' && (
          <Settings 
            onSensitivityChange={setSensitivityLevel}
            sensitivityLevel={sensitivityLevel}
          />
        )}
        
        {currentTab === 'stats' && (
          <Stats blockedContentCount={blockedContentCount} />
        )}
        
        <FilterDemo isActive={isActive} sensitivityLevel={sensitivityLevel} />
      </div>
    </div>
  );
};

export default Index;
