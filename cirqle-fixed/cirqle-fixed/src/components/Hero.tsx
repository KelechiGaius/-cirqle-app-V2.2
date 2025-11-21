import React from 'react';
import { ArrowRight, Users, MapPin, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section id="mission" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cirqle-light/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-cirqle-primary text-sm font-bold tracking-wide mb-6 border border-blue-100">
            RECONNECT WITH REALITY
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight mb-8">
            Find Your <span className="text-cirqle-primary">People.</span><br />
            Not Your Next Swipe.
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Cirqle connects you in curated groups of six based on shared interests and local proximity. Authentic friendships, zero dating pressure.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-cirqle-primary hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2">
              Join the Waitlist <ArrowRight size={20} />
            </button>
            <button className="w-full sm:w-auto bg-white hover:bg-gray-50 text-slate-700 border border-gray-200 px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2">
              How it works
            </button>
          </div>
        </motion.div>

        {/* Stats / Trust Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { icon: Users, title: "Groups of 6", desc: "Perfect size for conversation" },
            { icon: Shield, title: "Verified Profiles", desc: "Safety first community" },
            { icon: MapPin, title: "Local & Real", desc: "Meet in your city" },
          ].map((stat, index) => (
            <div key={index} className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-cirqle-primary rounded-full flex items-center justify-center mb-4">
                <stat.icon size={24} />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">{stat.title}</h3>
              <p className="text-sm text-slate-500">{stat.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;