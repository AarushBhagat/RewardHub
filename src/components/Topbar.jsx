import React from 'react';
import { Bell, Search, Sun, Moon } from 'lucide-react';

const Topbar = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <header className="h-24 bg-transparent sticky top-0 z-10 px-8 flex items-center transition-colors duration-300">
      
      {/* Centered Search Bar */}
      <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-xl hidden md:block z-0">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-3 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl leading-5 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-primary/50 shadow-sm transition-all sm:text-sm"
            placeholder="Search employees, rewards, or badges..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto relative z-10">
        {/* Dark Mode Toggle */}
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border border-white dark:border-slate-900"></span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
