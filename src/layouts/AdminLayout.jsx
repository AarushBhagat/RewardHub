import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import PremiumSidebar from '../components/PremiumSidebar';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  TrendingUp, 
  Gift, 
  Award, 
  MessageSquare, 
  IndianRupee,
  FileText,
  Sparkles,
  Trophy
} from 'lucide-react';
import Topbar from '../components/Topbar';
import PageTransition from '../components/PageTransition';
import { AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  useEffect(() => {
    // Check local storage or system preference
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
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { name: 'Employees', icon: <Users size={20} />, path: '/admin/employees' },
    { name: 'Attendance', icon: <CalendarCheck size={20} />, path: '/admin/attendance' },
    { name: 'Performance', icon: <TrendingUp size={20} />, path: '/admin/performance' },
    { name: 'Rewards', icon: <Gift size={20} />, path: '/admin/rewards' },
    { name: 'Badges', icon: <Award size={20} />, path: '/admin/badges' },
    { name: 'Feedback', icon: <MessageSquare size={20} />, path: '/admin/feedback' },
    { name: 'Bonuses', icon: <IndianRupee size={20} />, path: '/admin/bonuses' },
    { name: 'Reports', icon: <FileText size={20} />, path: '/admin/reports' },
    { name: 'Leaderboard', icon: <Trophy size={20} />, path: '/admin/leaderboard' },
    { name: 'AI Engine', icon: <Sparkles size={20} />, path: '/admin/ai-engine' },
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

export default AdminLayout;
