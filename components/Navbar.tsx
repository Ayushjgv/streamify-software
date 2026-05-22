import React, { useState, useEffect } from 'react';
import { Search, User, Tv } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 z-50 flex w-full items-center justify-between px-4 py-4 md:px-12 transition-colors duration-300 ${
      isScrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5' : 'bg-gradient-to-b from-black/70 to-transparent'
    }`}>
      {/* Left Corner: Brand Logo and Title */}
      <div className="flex items-center gap-2 cursor-pointer group">
        <div className="rounded-xl bg-purple-600 p-2 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)] transition-transform group-hover:scale-105">
          <Tv className="h-5 w-5" />
        </div>
        <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
          STREAMIFY
        </span>
      </div>

      {/* Middle: Modern Contextual Search Bar */}
      <div className="relative hidden w-full max-w-md sm:block mx-4">
        <input
          type="text"
          placeholder="Search anime, genres, studios..."
          className="w-full rounded-full bg-white/5 border border-white/10 px-5 py-2 pl-11 text-sm text-white placeholder-neutral-500 outline-none transition-all focus:bg-white/10 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
        />
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
      </div>

      {/* Right Corner: Profile/Login Trigger */}
      <button className="flex items-center justify-center rounded-full bg-white/10 border border-white/10 p-2.5 text-neutral-200 transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95">
        <User className="h-4 w-4" />
      </button>
    </nav>
  );
};

export default Navbar;