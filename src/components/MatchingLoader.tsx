
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Zap } from 'lucide-react';

interface MatchingLoaderProps {
  onComplete: () => void;
}

const MatchingLoader: React.FC<MatchingLoaderProps> = ({ onComplete }) => {
  const [status, setStatus] = useState("Checking nearby location...");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 40); // Total ~4 seconds

    const timeouts = [
      setTimeout(() => setStatus("Analyzing interests compatibility..."), 1000),
      setTimeout(() => setStatus("Checking group vibe..."), 2500),
      setTimeout(() => setStatus("Curating activity suggestions..."), 3500),
      setTimeout(() => onComplete(), 4500),
    ];

    return () => {
      clearInterval(timer);
      timeouts.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative mb-12">
        <motion.div
          className="w-40 h-40 border-4 border-slate-100 rounded-full"
        />
        <motion.div
          className="absolute top-0 left-0 w-40 h-40 border-4 border-cirqle-primary rounded-full border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-cirqle-primary">{progress}%</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">Curating Your Circle</h2>
      
      <motion.div 
        key={status}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-8 flex items-center gap-2 text-slate-500"
      >
         {progress < 30 && <MapPin size={18} />}
         {progress >= 30 && progress < 70 && <Users size={18} />}
         {progress >= 70 && <Zap size={18} />}
         <span className="font-medium">{status}</span>
      </motion.div>

      <div className="mt-12 w-full max-w-xs bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-cirqle-primary"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
};

export default MatchingLoader;
