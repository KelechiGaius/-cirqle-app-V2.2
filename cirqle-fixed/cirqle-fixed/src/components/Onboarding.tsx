
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '../types';
import { Camera, MapPin, Plus, X, ChevronRight } from 'lucide-react';

interface OnboardingProps {
  user: User;
  onComplete: (user: User) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ user, onComplete }) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');

  const handleAddTag = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (customTag.trim() && !interests.includes(customTag.trim())) {
      setInterests([...interests, customTag.trim()]);
      setCustomTag('');
    }
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      onComplete({
        ...user,
        name,
        location,
        interests,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}` // Auto-generate avatar for demo
      });
    }
  };

  const steps = [
    // Step 1: Basic Info
    <div key="step1" className="space-y-6">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4 relative group cursor-pointer border-4 border-white shadow-lg">
          <Camera className="text-cirqle-primary" size={32} />
          <div className="absolute bottom-0 right-0 bg-cirqle-primary w-8 h-8 rounded-full flex items-center justify-center text-white border-2 border-white">
            <Plus size={16} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Who are you?</h2>
        <p className="text-slate-500">Let's start with the basics.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-cirqle-primary/50 outline-none"
            placeholder="e.g. Sarah Miller"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-4 pl-12 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-cirqle-primary/50 outline-none"
              placeholder="e.g. Berlin"
            />
          </div>
        </div>
      </div>
    </div>,

    // Step 2: Interests
    <div key="step2" className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">What are you into?</h2>
        <p className="text-slate-500">Be specific! "Vegan Cooking" is better than "Food".</p>
      </div>

      <form onSubmit={handleAddTag} className="relative">
        <input 
          type="text" 
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          className="w-full p-4 pr-12 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-cirqle-primary/50 outline-none"
          placeholder="Add an interest (e.g. Bouldering)..."
        />
        <button 
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white p-2 rounded-lg hover:bg-slate-700 transition-colors"
        >
          <Plus size={18} />
        </button>
      </form>

      <div className="flex flex-wrap gap-2 min-h-[100px]">
        {interests.length === 0 && (
          <p className="text-slate-400 text-sm italic w-full text-center py-4">No interests added yet.</p>
        )}
        {interests.map((tag, idx) => (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={idx} 
            className="bg-blue-50 text-cirqle-primary px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 border border-blue-100"
          >
            {tag}
            <button onClick={() => setInterests(interests.filter(i => i !== tag))}>
              <X size={14} />
            </button>
          </motion.span>
        ))}
      </div>

      <div className="pt-4">
        <p className="text-xs text-slate-400 uppercase font-bold mb-3">Popular Tags</p>
        <div className="flex flex-wrap gap-2">
          {['Photography', 'Indie Music', 'Hiking', 'Specialty Coffee', 'Board Games'].map(tag => (
             <button 
               key={tag}
               onClick={() => !interests.includes(tag) && setInterests([...interests, tag])}
               className="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full hover:border-cirqle-primary hover:text-cirqle-primary transition-colors"
             >
               + {tag}
             </button>
          ))}
        </div>
      </div>
    </div>,

    // Step 3: Ready
    <div key="step3" className="text-center space-y-6 py-10">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-32 h-32 bg-green-100 rounded-full mx-auto flex items-center justify-center text-green-600 mb-6"
      >
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30">
            <Plus size={40} />
        </div>
      </motion.div>
      <h2 className="text-3xl font-bold text-slate-900">You're all set!</h2>
      <p className="text-slate-500 max-w-xs mx-auto">
        We've created your profile. Now let's find your circle based on <strong>{interests.length} interests</strong>.
      </p>
    </div>
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Progress Bar */}
      <div className="h-2 bg-slate-200 w-full">
        <motion.div 
          className="h-full bg-cirqle-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((step + 1) / 3) * 100}%` }}
        />
      </div>

      <div className="flex-grow flex items-center justify-center px-6 pb-20">
        <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {steps[step]}
                </motion.div>
            </AnimatePresence>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white p-6 border-t border-slate-100">
        <div className="max-w-md mx-auto flex justify-between items-center">
            <button 
                onClick={() => step > 0 && setStep(step - 1)}
                className={`text-slate-400 font-medium ${step === 0 ? 'invisible' : ''}`}
            >
                Back
            </button>
            <button 
                onClick={handleNext}
                disabled={step === 0 && name.length < 2}
                className="bg-cirqle-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-500/30 flex items-center gap-2 disabled:opacity-50 disabled:shadow-none transition-all"
            >
                {step === 2 ? 'Start Exploring' : 'Next'}
                <ChevronRight size={18} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
