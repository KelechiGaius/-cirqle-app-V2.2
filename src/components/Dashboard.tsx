
import React, { useState, useEffect } from 'react';
import { User, AppTab, ActivitySuggestion } from '../types';
import { ChevronRight, MapPin, Zap, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface DashboardProps {
  user: User;
  onChangeTab: (tab: AppTab) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onChangeTab }) => {
  const [suggestions, setSuggestions] = useState<ActivitySuggestion[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoadingSuggestions(true);
      try {
        // Check for API Key availability
        if (!import.meta.env.VITE_GEMINI_API_KEY) {
          // Fallback data if no key is available
          setSuggestions([
            { id: '1', title: "Indie Coffee Crawl", description: "Visit 3 top-rated local roasters.", location: "Downtown", icon: "Coffee" },
            { id: '2', title: "Sunset Photography Walk", description: "Capture the golden hour at the harbor.", location: "Riverfront", icon: "Camera" },
            { id: '3', title: "Vinyl Listening Session", description: "Share your favorite records.", location: "Audio Cafe", icon: "Music" }
          ]);
        } else {
          const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
          const prompt = `Generate 3 distinct, fun social activity ideas for a group of friends in ${user.location || 'a city'} who are interested in ${user.interests.join(', ')}. 
          Return valid JSON array where each item has keys: id (unique string), title, description, location, icon (use standard lucide icon names like Coffee, Camera, Music, Mountain).`;
          
          const response = await ai.models.generateContent({
             model: 'gemini-2.5-flash',
             contents: prompt,
             config: { responseMimeType: 'application/json' }
          });
          
          const text = response.text;
          if (text) {
            const data = JSON.parse(text);
            // Ensure IDs exist if the model returns data without them
            const suggestionsWithIds = Array.isArray(data) ? data.map((item: any, index: number) => ({
                ...item,
                id: item.id || `gen-${index}`
            })) : [];
            setSuggestions(suggestionsWithIds);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    if (user.interests.length > 0) {
      fetchSuggestions();
    }
  }, [user.interests, user.location]);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center pt-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome, {user.name.split(' ')[0]}!</h1>
          <p className="text-slate-500">Ready to connect today?</p>
        </div>
        <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover" />
      </div>

      {/* Active Circle Card */}
      <div 
        onClick={() => onChangeTab('circle')}
        className="bg-white rounded-3xl p-6 shadow-xl shadow-blue-500/10 border border-blue-50 relative overflow-hidden cursor-pointer hover:shadow-blue-500/20 transition-all group"
      >
        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-bl-2xl">
          ACTIVE
        </div>
        
        <h2 className="text-lg font-bold text-slate-900 mb-1">Your Active Circle</h2>
        <p className="text-slate-500 text-sm mb-4 flex items-center gap-1">
          <MapPin size={14} /> {user.location || 'Local'} • {user.interests[0] || 'General'}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-3">
             {[1,2,3,4].map(i => (
               <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                 <img src={`https://picsum.photos/seed/${i + 45}/200`} alt="member" className="w-full h-full object-cover" />
               </div>
             ))}
             <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-bold">
               +2
             </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-cirqle-primary/10 flex items-center justify-center text-cirqle-primary group-hover:bg-cirqle-primary group-hover:text-white transition-colors">
            <ChevronRight size={20} />
          </div>
        </div>
        
        {/* Progress Bar for "Matching" feel */}
        <div className="mt-5">
          <div className="flex justify-between text-xs mb-1 font-medium text-slate-500">
            <span>Circle Members</span>
            <span className="text-cirqle-primary">4/6 Matched</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-cirqle-primary w-2/3 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* AI Suggestions */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-amber-400" size={20} />
          <h3 className="text-lg font-bold text-slate-900">Suggested Activities</h3>
        </div>
        
        {loadingSuggestions ? (
          <div className="space-y-3">
             {[1,2,3].map(i => (
               <div key={i} className="h-24 bg-white rounded-2xl animate-pulse"></div>
             ))}
          </div>
        ) : (
          <div className="space-y-4">
            {suggestions.map((activity, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-start hover:border-cirqle-primary/30 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                   <Zap size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{activity.title}</h4>
                  <p className="text-sm text-slate-500 leading-snug mt-1">{activity.description}</p>
                  <p className="text-xs text-slate-400 mt-2 font-medium uppercase tracking-wide">{activity.location}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
