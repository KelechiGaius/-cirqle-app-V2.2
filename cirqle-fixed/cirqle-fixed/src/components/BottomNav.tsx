
import React from 'react';
import { Home, Users, User } from 'lucide-react';
import { AppTab } from '../types';

interface BottomNavProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-100 px-6 py-3 pb-6 z-50 flex justify-around items-center shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
      <button 
        onClick={() => onTabChange('home')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-cirqle-primary' : 'text-slate-300 hover:text-slate-500'}`}
      >
        <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
        <span className="text-[10px] font-medium">Home</span>
      </button>
      
      <button 
        onClick={() => onTabChange('circle')}
        className={`relative flex flex-col items-center gap-1 transition-colors ${activeTab === 'circle' ? 'text-cirqle-primary' : 'text-slate-300 hover:text-slate-500'}`}
      >
        {/* Notification Dot */}
        <span className="absolute top-0 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        <Users size={24} strokeWidth={activeTab === 'circle' ? 2.5 : 2} />
        <span className="text-[10px] font-medium">Circle</span>
      </button>

      <button 
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-cirqle-primary' : 'text-slate-300 hover:text-slate-500'}`}
      >
        <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
        <span className="text-[10px] font-medium">Profile</span>
      </button>
    </div>
  );
};

export default BottomNav;
