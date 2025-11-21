import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 rounded-full border-[3px] border-cirqle-primary border-r-transparent transform -rotate-45"></div>
          <span className="text-2xl font-bold text-cirqle-dark tracking-tight">CIRQLE</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['Mission', 'Features', 'Demo', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-slate-600 hover:text-cirqle-primary font-medium transition-colors"
            >
              {item}
            </button>
          ))}
          <button className="bg-cirqle-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20">
            Get Early Access
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg py-4 flex flex-col items-center gap-4 animate-in slide-in-from-top-5">
          {['Mission', 'Features', 'Demo', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-slate-600 hover:text-cirqle-primary font-medium text-lg py-2"
            >
              {item}
            </button>
          ))}
          <button className="bg-cirqle-primary text-white px-8 py-3 rounded-full font-medium w-11/12 mt-2">
            Get Early Access
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;