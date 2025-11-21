
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from '../types';
import { Camera, MapPin, ChevronRight, Upload } from 'lucide-react';

interface ProfileSetupProps {
  user: User;
  onComplete: (user: User) => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ user, onComplete }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [avatar, setAvatar] = useState<string>('');
  
  // Simulated Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (name && age && city && avatar) {
      onComplete({
        ...user,
        name,
        age,
        location: city,
        avatar
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col min-h-screen bg-white p-6 pt-10"
    >
      <div className="max-w-md mx-auto w-full flex flex-col h-full">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Profile</h2>
        <p className="text-slate-500 mb-8">First, let's put a face to the name.</p>

        {/* Photo Upload */}
        <div className="flex justify-center mb-8">
          <div className="relative group cursor-pointer">
            <div className="w-32 h-32 rounded-full bg-slate-100 border-4 border-slate-50 shadow-inner flex items-center justify-center overflow-hidden">
              {avatar ? (
                <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Camera className="text-slate-400" size={40} />
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-cirqle-primary text-white p-2.5 rounded-full shadow-lg cursor-pointer hover:bg-blue-600 transition-colors">
              <Upload size={18} />
              <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
            </label>
          </div>
        </div>

        <div className="space-y-5 flex-grow">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-cirqle-primary/50 outline-none transition-all"
              placeholder="e.g. Tom"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Age</label>
            <input 
              type="number" 
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-cirqle-primary/50 outline-none transition-all"
              placeholder="e.g. 24"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-4 pl-12 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-cirqle-primary/50 outline-none transition-all"
                placeholder="e.g. Hamburg"
              />
            </div>
          </div>
        </div>

        <button 
          onClick={handleSubmit}
          disabled={!name || !age || !city || !avatar}
          className="w-full bg-cirqle-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/30 mt-8 flex items-center justify-center gap-2 disabled:opacity-50 disabled:shadow-none transition-all"
        >
          Continue <ChevronRight size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileSetup;
