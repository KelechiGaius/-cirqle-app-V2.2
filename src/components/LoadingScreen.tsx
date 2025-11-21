import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50"
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative flex flex-col items-center">
        {/* Outer rotating ring */}
        <motion.div
          className="w-32 h-32 border-4 border-cirqle-light rounded-full border-t-cirqle-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner pulsing circle */}
        <motion.div
          className="absolute top-0 left-0 w-32 h-32 rounded-full bg-cirqle-primary/10"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Logo Text Animation */}
        <motion.div
          className="absolute mt-40 text-4xl font-bold text-cirqle-dark tracking-tighter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          CIRQLE
        </motion.div>

        <motion.p
          className="absolute mt-52 text-sm text-cirqle-accent font-medium uppercase tracking-widest"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Curating your circle
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;