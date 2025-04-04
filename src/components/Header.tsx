
import React from 'react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff } from 'lucide-react';

interface HeaderProps {
  isActive: boolean;
  onToggleActive: () => void;
  currentTab: string;
  onTabChange: (value: string) => void;
}

const Header = ({ isActive, onToggleActive, currentTab, onTabChange }: HeaderProps) => {
  return (
    <div className="px-4 py-4 border-b bg-white sticky top-0 z-10">
      <div className="flex items-center justify-between mb-4">
        <Logo size="md" />
        <Button
          size="sm"
          variant={isActive ? "default" : "outline"}
          onClick={onToggleActive}
          className={isActive ? "bg-fb-primary hover:bg-fb-primary/90" : "text-fb-primary"}
        >
          {isActive ? (
            <Eye className="mr-2 h-4 w-4" />
          ) : (
            <EyeOff className="mr-2 h-4 w-4" />
          )}
          {isActive ? "Active" : "Disabled"}
        </Button>
      </div>
      
      <Tabs value={currentTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default Header;
