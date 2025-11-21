
import React from 'react';
import { User } from '../types';
import { LogOut, Settings, MapPin, Mail, Edit2 } from 'lucide-react';

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  return (
    <div className="p-6 space-y-8 pt-10">
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
        <button className="p-2 text-slate-400 hover:text-slate-600">
            <Settings size={24} />
        </button>
      </div>

      {/* Avatar & Main Info */}
      <div className="flex flex-col items-center">
         <div className="relative mb-4">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover" 
            />
            <button className="absolute bottom-0 right-0 bg-slate-900 text-white p-2 rounded-full border-2 border-white hover:bg-cirqle-primary transition-colors">
               <Edit2 size={14} />
            </button>
         </div>
         <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
         <div className="flex items-center gap-2 text-slate-500 mt-1 text-sm">
            <MapPin size={14} /> {user.location || 'No Location Set'}
         </div>
         <div className="flex items-center gap-2 text-slate-400 mt-1 text-xs">
            <Mail size={12} /> {user.email}
         </div>
      </div>

      {/* Stats Row (Decorative) */}
      <div className="flex justify-around bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
         <div className="text-center">
            <span className="block text-xl font-bold text-slate-900">1</span>
            <span className="text-xs text-slate-400 uppercase tracking-wide">Circles</span>
         </div>
         <div className="text-center border-l border-slate-100 pl-6">
            <span className="block text-xl font-bold text-slate-900">12</span>
            <span className="text-xs text-slate-400 uppercase tracking-wide">Friends</span>
         </div>
         <div className="text-center border-l border-slate-100 pl-6">
            <span className="block text-xl font-bold text-slate-900">4</span>
            <span className="text-xs text-slate-400 uppercase tracking-wide">Events</span>
         </div>
      </div>

      {/* Interests */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">My Interests</h3>
        <div className="flex flex-wrap gap-2">
           {user.interests.length > 0 ? user.interests.map((tag, i) => (
             <span key={i} className="bg-slate-50 text-slate-600 px-4 py-2 rounded-full text-sm border border-slate-100">
               {tag}
             </span>
           )) : (
             <p className="text-slate-400 text-sm italic">No interests added yet.</p>
           )}
           <button className="border border-dashed border-slate-300 text-slate-400 px-4 py-2 rounded-full text-sm hover:border-cirqle-primary hover:text-cirqle-primary transition-colors">
             + Add
           </button>
        </div>
      </div>

      <button 
        onClick={onLogout}
        className="w-full border border-red-100 text-red-500 font-bold py-4 rounded-2xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
      >
        <LogOut size={20} />
        Logout
      </button>

      <p className="text-center text-xs text-slate-300 pt-4">v1.2.0 • Cirqle Inc.</p>
    </div>
  );
};

export default Profile;
