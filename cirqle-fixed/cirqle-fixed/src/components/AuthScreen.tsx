
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (email: string) => void;
  onRegister: (email: string) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('kelechibusinesscontact@gmail.com');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(email);
    } else {
      onRegister(email);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 bg-slate-50"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-10 flex flex-col items-center"
      >
        <div className="w-20 h-20 rounded-full border-[6px] border-cirqle-light border-t-cirqle-primary animate-spin-slow mb-4"></div>
        <h1 className="text-4xl font-bold text-cirqle-dark tracking-tight">CIRQLE</h1>
        <p className="text-slate-500 mt-2">Meet people, not profiles.</p>
      </motion.div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-blue-100/50 p-8">
        <div className="flex mb-8 bg-slate-100 rounded-xl p-1">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${isLogin ? 'bg-white text-cirqle-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${!isLogin ? 'bg-white text-cirqle-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-cirqle-primary" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-cirqle-primary/20 focus:border-cirqle-primary transition-all"
                placeholder="hello@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-cirqle-primary" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-cirqle-primary/20 focus:border-cirqle-primary transition-all"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-cirqle-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 mt-6 transition-all transform active:scale-95 flex items-center justify-center gap-2"
          >
            {isLogin ? 'Welcome Back' : 'Create Account'}
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
      
      <p className="mt-8 text-slate-400 text-sm text-center">
        By continuing, you agree to our Terms & Safety Guidelines.
      </p>
    </motion.div>
  );
};

export default AuthScreen;
