import React, { useState } from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { generateIcebreaker } from '../services/geminiService';

const IcebreakerGen: React.FC = () => {
  const [generatedQuestion, setGeneratedQuestion] = useState<string>("Click the button to break the ice!");
  const [loading, setLoading] = useState(false);
  
  // Sample interests that might define a "Circle"
  const sampleInterests = ["Hiking", "Photography", "Indie Music"];

  const handleGenerate = async () => {
    setLoading(true);
    const question = await generateIcebreaker(sampleInterests);
    setGeneratedQuestion(question);
    setLoading(false);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-blue-100 flex flex-col md:flex-row">
          
          {/* Left Side: Visual */}
          <div className="md:w-2/5 bg-cirqle-primary p-8 text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-blue-600/20" style={{backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
             <MessageCircle size={48} className="mb-4 relative z-10" />
             <h3 className="text-2xl font-bold mb-2 relative z-10">AI Assistant</h3>
             <p className="text-blue-100 relative z-10">
               Awkward silence? <br/>Never heard of her.
             </p>
          </div>

          {/* Right Side: Interactive */}
          <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
             <h4 className="text-lg font-semibold text-slate-900 mb-4">Try our Conversation Starter</h4>
             <p className="text-slate-500 mb-6 text-sm">
               Powered by Google Gemini, Cirqle analyzes your group's shared interests (e.g., {sampleInterests.join(', ')}) to suggest the perfect opener.
             </p>

             <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 min-h-[100px] flex items-center justify-center text-center mb-6 relative">
               {loading ? (
                  <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
               ) : (
                 <p className="text-slate-800 font-medium text-lg">"{generatedQuestion}"</p>
               )}
             </div>

             <button 
               onClick={handleGenerate}
               disabled={loading}
               className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-3 px-6 rounded-full font-semibold transition-colors disabled:opacity-70"
             >
               <Sparkles size={18} /> Generate New Icebreaker
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IcebreakerGen;