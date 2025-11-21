import React from 'react';
import { Mail, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16">
          
          <div className="mb-10 md:mb-0 max-w-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full border-[3px] border-blue-500 border-r-transparent transform -rotate-45"></div>
              <span className="text-2xl font-bold tracking-tight">CIRQLE</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Building a world where meeting new people is easy, safe, and exciting again. Join the circle.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h5 className="font-bold text-lg mb-4">Company</h5>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-lg mb-4">Legal</h5>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Safety</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Cirqle Inc. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="mailto:kelechibusinesscontact@gmail.com" className="text-slate-400 hover:text-white transition-colors">
                <Mail size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;