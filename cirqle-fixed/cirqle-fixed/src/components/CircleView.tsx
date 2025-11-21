
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Message, CircleMember, ActivitySuggestion, PollOption } from '../types';
import { Send, MoreVertical, Users, Calendar, Check, MapPin, Star } from 'lucide-react';

interface CircleViewProps {
  user: User;
  winningActivity: ActivitySuggestion | null;
}

const CircleView: React.FC<CircleViewProps> = ({ user, winningActivity }) => {
  const [members, setMembers] = useState<CircleMember[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [showPoll, setShowPoll] = useState(true);
  const [pollOptions, setPollOptions] = useState<PollOption[]>([
    { id: 'p1', label: 'Saturday, 14:00', votes: 1 },
    { id: 'p2', label: 'Saturday, 17:00', votes: 3 },
    { id: 'p3', label: 'Sunday, 11:00', votes: 0 },
    { id: 'p4', label: 'Sunday, 15:00', votes: 2 },
  ]);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial members
    setMembers([
      { id: user.id, name: user.name, avatar: user.avatar },
      { id: 'u2', name: 'Sarah', avatar: 'https://picsum.photos/seed/sarah/100' },
      { id: 'u3', name: 'Mike', avatar: 'https://picsum.photos/seed/mike/100' },
      { id: 'u4', name: 'Jessica', avatar: 'https://picsum.photos/seed/jess/100' },
      { id: 'u5', name: 'Alex', avatar: 'https://picsum.photos/seed/alex/100' },
      { id: 'u6', name: 'Davide', avatar: 'https://picsum.photos/seed/davide/100' }
    ]);

    // Initial Chat Messages
    setMessages([
        { id: '1', senderId: 'sys', senderName: 'System', text: `Voting complete! The circle decided on: ${winningActivity?.title || 'Activity'}.`, timestamp: new Date(), isSystem: true },
        { id: '2', senderId: 'u2', senderName: 'Sarah', text: 'This looks awesome! Saturday works best for me.', timestamp: new Date() }
    ]);
  }, [user, winningActivity]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.name,
      text: inputText,
      timestamp: new Date()
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const handleVotePoll = (optionId: string) => {
      setPollOptions(prev => prev.map(opt => {
          if (opt.id === optionId) {
              return { ...opt, votes: opt.votedByMe ? opt.votes - 1 : opt.votes + 1, votedByMe: !opt.votedByMe };
          }
          // Logic to unvote others if single choice, but keeping multi-choice for now
          return opt;
      }));
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white">
      
      {/* Top Section: Winning Activity & Members */}
      <div className="bg-white z-10 shadow-sm">
          {/* Winning Activity Card */}
          {winningActivity && (
              <div className="bg-gradient-to-r from-cirqle-primary to-blue-600 text-white p-6 rounded-b-[2rem] shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                  <div className="flex justify-between items-start mb-4">
                      <div>
                          <div className="flex items-center gap-1 text-blue-200 text-xs font-bold uppercase tracking-wider mb-1">
                             <Star size={12} fill="currentColor" />
                             Top Rated Activity
                          </div>
                          <h2 className="text-2xl font-bold leading-none">{winningActivity.title}</h2>
                      </div>
                      <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                         <MapPin size={20} />
                      </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-50 opacity-90 mb-4">
                      <MapPin size={14} /> {winningActivity.location}
                  </div>
                  
                  {/* Members Preview */}
                  <div className="flex items-center justify-between border-t border-white/20 pt-4">
                      <div className="flex -space-x-2">
                          {members.map(m => (
                              <img key={m.id} src={m.avatar} className="w-8 h-8 rounded-full border-2 border-blue-500" />
                          ))}
                      </div>
                      <span className="text-xs font-bold text-blue-100">Circle #8492</span>
                  </div>
              </div>
          )}
      </div>

      {/* Chat Section */}
      <div className="flex-grow flex flex-col bg-slate-50 overflow-hidden relative">
        <div className="flex-grow overflow-y-auto p-4 space-y-4 no-scrollbar pb-24">
          
          {/* Schedule Poll Widget in Chat */}
          {showPoll && (
              <div className="mx-4 bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-3 border-b border-slate-50 pb-3">
                      <Calendar className="text-cirqle-primary" size={20} />
                      <h3 className="font-bold text-slate-800">When are we meeting?</h3>
                  </div>
                  <div className="space-y-2">
                      {pollOptions.map(opt => (
                          <button 
                            key={opt.id}
                            onClick={() => handleVotePoll(opt.id)}
                            className={`w-full flex justify-between items-center p-3 rounded-xl text-sm font-medium transition-all ${
                                opt.votedByMe ? 'bg-blue-50 border border-blue-200 text-cirqle-primary' : 'bg-slate-50 border border-transparent hover:bg-slate-100 text-slate-600'
                            }`}
                          >
                              <span>{opt.label}</span>
                              <div className="flex items-center gap-2">
                                  <div className="flex -space-x-1">
                                      {[...Array(Math.min(opt.votes, 3))].map((_, i) => (
                                          <div key={i} className="w-5 h-5 rounded-full bg-slate-300 border-2 border-white"></div>
                                      ))}
                                  </div>
                                  <span className="text-xs font-bold ml-1">{opt.votes}</span>
                                  {opt.votedByMe && <Check size={14} />}
                              </div>
                          </button>
                      ))}
                  </div>
              </div>
          )}

          {/* Messages */}
          {messages.map((msg) => {
            if (msg.isSystem) {
                return (
                    <div key={msg.id} className="flex justify-center my-4">
                        <span className="bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">{msg.text}</span>
                    </div>
                )
            }
            const isMe = msg.senderId === user.id;
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                  isMe 
                    ? 'bg-cirqle-primary text-white rounded-br-none' 
                    : 'bg-white text-slate-800 rounded-bl-none border border-slate-100'
                }`}>
                   {!isMe && <p className="text-[10px] opacity-50 mb-1 font-bold uppercase text-slate-400">{msg.senderName}</p>}
                   <p className="text-sm leading-relaxed">{msg.text}</p>
                   <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-blue-200' : 'text-slate-300'}`}>
                     {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                   </p>
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t border-slate-100">
           <form onSubmit={handleSend} className="flex items-center gap-2">
              <button type="button" className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center hover:bg-slate-200 transition-colors">
                  <Calendar size={20} />
              </button>
              <input 
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow bg-slate-50 border border-slate-200 rounded-full px-4 py-3 focus:outline-none focus:border-cirqle-primary focus:ring-1 focus:ring-cirqle-primary transition-all"
              />
              <button 
                type="submit"
                disabled={!inputText.trim()}
                className="w-12 h-12 bg-cirqle-primary text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-md disabled:opacity-50 disabled:shadow-none"
              >
                 <Send size={20} />
              </button>
           </form>
        </div>
      </div>
    </div>
  );
};

export default CircleView;
