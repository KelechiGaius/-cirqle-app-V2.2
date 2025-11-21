import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Search, User, Coffee, Music, BookOpen, Utensils, Dumbbell, Plane } from 'lucide-react';

const INTERESTS = [
  { label: 'Coffee', icon: Coffee },
  { label: 'Music', icon: Music },
  { label: 'Reading', icon: BookOpen },
  { label: 'Foodie', icon: Utensils },
  { label: 'Fitness', icon: Dumbbell },
  { label: 'Travel', icon: Plane },
];

const MATCHES = [
  { id: 1, name: 'Alex', img: 'https://picsum.photos/100/100?random=1' },
  { id: 2, name: 'Sarah', img: 'https://picsum.photos/100/100?random=2' },
  { id: 3, name: 'Jordan', img: 'https://picsum.photos/100/100?random=3' },
  { id: 4, name: 'Mia', img: 'https://picsum.photos/100/100?random=4' },
  { id: 5, name: 'Leo', img: 'https://picsum.photos/100/100?random=5' },
];

const MatchingDemo: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'searching' | 'matched'>('idle');
  const [foundCount, setFoundCount] = useState(0);

  const startSimulation = () => {
    setStatus('searching');
    setFoundCount(0);
  };

  useEffect(() => {
    if (status === 'searching') {
      let count = 0;
      const interval = setInterval(() => {
        count++;
        setFoundCount(count);
        if (count >= 5) {
          clearInterval(interval);
          setTimeout(() => setStatus('matched'), 500);
        }
      }, 800); // Find one person every 800ms
      return () => clearInterval(interval);
    }
  }, [status]);

  return (
    <section id="demo" className="py-20 bg-slate-900 text-white overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#60a5fa 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Text Side */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
            The Magic of the Circle
          </h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            Our algorithm doesn't just find people nearby. It curates a balanced group of 6 individuals who share your specific vibe. No endless scrolling, just instant connection.
          </p>
          
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
            {INTERESTS.map((item, idx) => (
              <span key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm border border-white/10">
                <item.icon size={14} className="text-blue-400" /> {item.label}
              </span>
            ))}
          </div>

          {status === 'idle' && (
            <button 
              onClick={startSimulation}
              className="bg-cirqle-primary hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-500/50 transition-all transform hover:scale-105 active:scale-95"
            >
              Find My Circle
            </button>
          )}
           {status === 'matched' && (
            <button 
              onClick={() => setStatus('idle')}
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-bold transition-all"
            >
              Reset Simulation
            </button>
          )}
        </div>

        {/* Animation Side */}
        <div className="lg:w-1/2 flex items-center justify-center h-[400px] w-full relative">
          <div className="relative w-[300px] h-[300px] flex items-center justify-center">
            
            {/* Center User (You) */}
            <div className="absolute z-20 w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 border-4 border-slate-900 shadow-2xl flex items-center justify-center">
              <span className="font-bold text-white">YOU</span>
            </div>

            {/* Searching Pulse Rings */}
            <AnimatePresence>
              {status === 'searching' && (
                <>
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0.8 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute w-full h-full rounded-full border border-blue-500/50"
                  />
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0.8 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    className="absolute w-full h-full rounded-full border border-blue-400/30"
                  />
                </>
              )}
            </AnimatePresence>

            {/* Matches */}
            {MATCHES.map((match, index) => {
              // Calculate position in a circle (6 points total, index 0 is top right)
              const angle = (index * (360 / 6)) - 30; // spacing for 6 items but we only place 5 around center
              // Let's distribute 5 items around the remaining 300 degrees or evenly in a hexagon excluding center
              // Hexagon angles: 0, 60, 120, 180, 240, 300. Center is implicit.
              // Let's place them at 0, 72, 144, 216, 288 for 5 people surrounding 1?
              // No, cirqle is 6 people TOTAL. So 1 center + 5 surrounding makes a nice shape.
              const finalAngle = index * 72; 
              const radius = 120;
              const x = radius * Math.cos((finalAngle * Math.PI) / 180);
              const y = radius * Math.sin((finalAngle * Math.PI) / 180);

              return (
                <React.Fragment key={match.id}>
                  {/* Connecting Line */}
                  <AnimatePresence>
                    {foundCount > index && (
                      <motion.div
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      >
                        <svg className="w-full h-full visible overflow-visible">
                          <motion.line
                            x1="50%"
                            y1="50%"
                            x2={`calc(50% + ${x}px)`}
                            y2={`calc(50% + ${y}px)`}
                            stroke="#60a5fa"
                            strokeWidth="2"
                            strokeDasharray="5 5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5 }}
                          />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Avatar Bubble */}
                  <AnimatePresence>
                    {foundCount > index && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute w-14 h-14 rounded-full border-2 border-white overflow-hidden shadow-lg bg-slate-800"
                        style={{ 
                          transform: `translate(${x}px, ${y}px)`,
                          top: 'calc(50% - 28px)', 
                          left: 'calc(50% - 28px)' 
                        }}
                      >
                        <img src={match.img} alt={match.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-blue-500/20"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              );
            })}
            
            {/* Success Text */}
            <AnimatePresence>
                {status === 'matched' && (
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 180, opacity: 1 }}
                        className="absolute whitespace-nowrap bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2"
                    >
                        <Check size={14} /> Circle Formed!
                    </motion.div>
                )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
};

export default MatchingDemo;