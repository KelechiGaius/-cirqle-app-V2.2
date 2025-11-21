
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';

interface InterestSelectionProps {
  onComplete: (interests: string[]) => void;
}

const INTEREST_OPTIONS = [
  "Fitness", "Café / Brunch", "Walking", "Study Sessions", 
  "Art & Museums", "Running", "Cooking", "Nightlife", 
  "Language Exchange", "Photography", "Board Games", "Live Music"
];

const InterestSelection: React.FC<InterestSelectionProps> = ({ onComplete }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    if (selected.includes(interest)) {
      setSelected(selected.filter(i => i !== interest));
    } else {
      if (selected.length < 8) {
        setSelected([...selected, interest]);
      }
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
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Your Vibe?</h2>
        <p className="text-slate-500 mb-8">Select 3-8 interests to find your people.</p>

        <div className="flex-grow grid grid-cols-2 gap-3 content-start">
          {INTEREST_OPTIONS.map((interest) => {
            const isSelected = selected.includes(interest);
            return (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`p-4 rounded-xl border-2 text-left font-medium transition-all duration-200 relative overflow-hidden ${
                  isSelected 
                    ? 'border-cirqle-primary bg-blue-50 text-cirqle-primary shadow-sm' 
                    : 'border-slate-100 bg-white text-slate-600 hover:border-blue-100'
                }`}
              >
                {interest}
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-cirqle-primary text-white rounded-full p-0.5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="pt-6">
          <div className="text-center text-sm text-slate-400 mb-4">
            {selected.length} selected (Min. 3)
          </div>
          <button 
            onClick={() => onComplete(selected)}
            disabled={selected.length < 3}
            className="w-full bg-cirqle-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:shadow-none transition-all"
          >
            Find My Cirqle <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default InterestSelection;
