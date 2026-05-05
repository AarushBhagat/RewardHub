import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import PremiumSidebar from '../components/PremiumSidebar';
import { Home, Star, TrendingUp, Users, Calendar, Shield, MessageSquare } from 'lucide-react';
import Topbar from '../components/Topbar';
import PageTransition from '../components/PageTransition';
import { AnimatePresence } from 'framer-motion';

const EmployeeLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const navItems = [
    { name: 'Home', path: '/employee', icon: <Home size={20} /> },
    { name: 'Attendance', path: '/employee/attendance', icon: <Calendar size={20} /> },
    { name: 'Performance', path: '/employee/performance', icon: <TrendingUp size={20} /> },
    { name: 'Rewards', path: '/employee/rewards', icon: <Star size={20} /> },
    { name: 'Badges', path: '/employee/badges', icon: <Shield size={20} /> },
    { name: 'Feedback', path: '/employee/feedback', icon: <MessageSquare size={20} /> },
    { name: 'Leaderboard', path: '/employee/leaderboard', icon: <Users size={20} /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-transparent">
      <PremiumSidebar navItems={navItems} onExpandChange={setIsSidebarExpanded} />
      
      <div className={`flex-1 flex flex-col overflow-hidden relative transition-all duration-300 ${isSidebarExpanded ? 'ml-[280px]' : 'ml-[104px]'}`}>
        <Topbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto custom-scrollbar p-8 relative z-10">
          <AnimatePresence mode="wait">
            <PageTransition>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
