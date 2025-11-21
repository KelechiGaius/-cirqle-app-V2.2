
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ActivitySuggestion } from '../types';
import { Star, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface ActivityVotingProps {
  user: User;
  onComplete: (winner: ActivitySuggestion) => void;
}

const ActivityVoting: React.FC<ActivityVotingProps> = ({ user, onComplete }) => {
  const [activities, setActivities] = useState<ActivitySuggestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      try {
        if (!import.meta.env.VITE_GEMINI_API_KEY) {
          // Fallback
          setActivities([
             { id: '1', title: "Sunset Picnic", description: "Relaxed evening with snacks at the park.", location: "City Park", icon: "Sun" },
             { id: '2', title: "Pottery Workshop", description: "Beginner friendly clay session.", location: "Creative Studio", icon: "Palette" },
             { id: '3', title: "Board Game Night", description: "Strategy and fun at a local cafe.", location: "Dice & Beans", icon: "Dice" },
             { id: '4', title: "Street Food Market", description: "Trying out new local dishes together.", location: "Market Square", icon: "Utensils" }
          ]);
        } else {
          const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
          const prompt = `Generate 4 specific group activity ideas for friends interested in ${user.interests.join(', ')} in ${user.location}.
          Return valid JSON array with keys: id (string), title, description, location, icon (lucide icon name).`;
          
          const response = await ai.models.generateContent({
             model: 'gemini-2.5-flash',
             contents: prompt,
             config: { responseMimeType: 'application/json' }
          });
          
          const text = response.text;
          if (text) {
            setActivities(JSON.parse(text));
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActivities();
  }, [user]);

  const handleRate = (rating: number) => {
    const currentActivity = activities[currentIndex];
    setRatings({ ...ratings, [currentActivity.id]: rating });
    
    if (currentIndex < activities.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Calculate winner (simple logic: last one rated highly, or random high rated)
      const winner = activities.find(a => a.id === currentActivity.id) || activities[0];
      onComplete(winner);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="animate-pulse flex flex-col items-center">
          <Sparkles className="text-cirqle-primary mb-4" size={40} />
          <p className="text-slate-500">Generating activities...</p>
        </div>
      </div>
    );
  }

  const currentActivity = activities[currentIndex];

  return (
    <div className="flex flex-col h-screen bg-slate-50 p-6 relative overflow-hidden">
      {/* Header */}
      <div className="pt-10 pb-6">
        <h1 className="text-2xl font-bold text-slate-900">Vote for Activity</h1>
        <p className="text-slate-500 text-sm">Rate these ideas to decide what your circle does.</p>
        <div className="flex gap-1 mt-4">
          {activities.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1 flex-1 rounded-full ${idx <= currentIndex ? 'bg-cirqle-primary' : 'bg-slate-200'}`}
            />
          ))}
        </div>
      </div>

      {/* Card Area */}
      <div className="flex-grow flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentActivity.id}
            initial={{ x: 300, opacity: 0, rotate: 10 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            exit={{ x: -300, opacity: 0, rotate: -10 }}
            transition={{ type: "spring", damping: 20 }}
            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 h-[60vh] flex flex-col"
          >
            <div className="h-2/3 bg-blue-50 relative flex items-center justify-center p-8">
                {/* Pattern */}
                <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                <div className="text-center relative z-10">
                   <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-cirqle-primary shadow-lg mx-auto mb-6">
                       <Sparkles size={40} />
                   </div>
                   <h2 className="text-3xl font-bold text-slate-900 mb-2 leading-tight">{currentActivity.title}</h2>
                   <div className="inline-flex items-center gap-1 bg-white/60 px-3 py-1 rounded-full text-slate-600 text-xs font-bold uppercase tracking-wide">
                      <MapPin size={12} /> {currentActivity.location}
                   </div>
                </div>
            </div>
            <div className="h-1/3 p-8 flex flex-col justify-between bg-white">
               <p className="text-slate-600 text-center text-lg leading-relaxed">
                 {currentActivity.description}
               </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Voting Controls */}
      <div className="pb-10 pt-6">
         <div className="text-center text-xs font-bold text-slate-400 uppercase mb-4">Rate Activity (1-4)</div>
         <div className="flex justify-center gap-4">
           {[1, 2, 3, 4].map((rating) => (
             <button
               key={rating}
               onClick={() => handleRate(rating)}
               className="w-14 h-14 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center text-xl font-bold text-slate-400 hover:border-cirqle-primary hover:bg-cirqle-primary hover:text-white transition-all shadow-sm hover:scale-110"
             >
               {rating}
             </button>
           ))}
         </div>
      </div>
    </div>
  );
};

export default ActivityVoting;
