import React from 'react';
import { Compass, Users, Lock, Coffee, CalendarCheck, MessageCircle } from 'lucide-react';

const features = [
  {
    id: 1,
    title: "Smart Matching",
    description: "We group you with 5 others based on deep compatibility, interests, and schedule overlap.",
    icon: Users,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: 2,
    title: "Local Discovery",
    description: "Discover hidden gems in your city. We partner with local spots for exclusive circle meetups.",
    icon: Compass,
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    id: 3,
    title: "Safety First",
    description: "Every profile is verified. We prioritize community safety so you can meet with peace of mind.",
    icon: Lock,
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    id: 4,
    title: "Real Experiences",
    description: "From coffee tasting to hiking, our groups are built around doing, not just chatting.",
    icon: Coffee,
    color: "bg-orange-100 text-orange-600"
  },
  {
    id: 5,
    title: "Instant Plans",
    description: "Skip the 'when are we free?' dance. Circles are formed based on pre-selected availability.",
    icon: CalendarCheck,
    color: "bg-pink-100 text-pink-600"
  },
  {
    id: 6,
    title: "Group Chat 2.0",
    description: "Dedicated group spaces with built-in icebreakers and event planning tools.",
    icon: MessageCircle,
    color: "bg-cyan-100 text-cyan-600"
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-cirqle-primary tracking-widest uppercase mb-2">Our Solutions</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Designed for Real Connection</h3>
          <p className="text-slate-600 text-lg">We've removed the friction from meeting new people. Here is how we make awkward hellos a thing of the past.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="group p-8 rounded-2xl border border-gray-100 bg-white hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={28} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
              <p className="text-slate-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;