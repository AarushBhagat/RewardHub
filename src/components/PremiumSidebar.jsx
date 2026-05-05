import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Zap, LogOut } from 'lucide-react';
import logo from './logo.png';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const PremiumSidebar = ({ navItems, onExpandChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsExpanded(true);
    if (onExpandChange) onExpandChange(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
    if (onExpandChange) onExpandChange(false);
  };

  // The prompt asks for a 150ms delay before navigating if collapsed.
  // But since we use hover to expand, it's expanded by the time they click.
  const handleNavClick = (e, path) => {
    e.preventDefault();
    if (!isExpanded) {
      setIsExpanded(true);
      setTimeout(() => {
        navigate(path);
      }, 150);
    } else {
      navigate(path);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 ml-6 my-6 h-[calc(100vh-3rem)] rounded-3xl bg-gradient-to-b from-sidebar via-sidebar to-sidebar-accent border border-sidebar-border/20 shadow-2xl transition-all duration-300 ease-in-out z-50 flex flex-col overflow-hidden whitespace-nowrap
        ${isExpanded ? 'w-[256px]' : 'w-[80px]'}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header Section */}
      <div className="p-4 flex items-center justify-center shrink-0 min-h-[80px]">
        <div className={`flex items-center w-full ${isExpanded ? 'justify-start gap-4 px-2' : 'justify-center'}`}>
          {/* Logo Area */}
          <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shrink-0">
            <img src={logo} alt="Logo" className="w-full h-full object-cover" />
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col"
              >
                <span className="font-semibold text-base text-sidebar-fg tracking-tight font-display">RewardHub</span>
                <span className="text-xs text-sidebar-fg/60">Reward & Recognition</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar py-4 px-3 flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/admin' || item.path === '/employee'}
            onClick={(e) => handleNavClick(e, item.path)}
            className={({ isActive }) => `
              relative group transition-all duration-300 flex items-center shrink-0
              ${isExpanded ? 'w-full px-4 py-3 rounded-xl' : 'w-12 h-12 rounded-full mx-auto justify-center'}
              ${isActive
                ? 'bg-gradient-to-r from-sidebar-primary to-indigo-500 shadow-lg shadow-sidebar-primary/40 scale-105 text-sidebar-primary-fg'
                : 'bg-transparent hover:bg-sidebar-accent/50 text-sidebar-fg/60 hover:text-sidebar-fg'
              }
            `}
          >
            {({ isActive }) => (
              <>
                <div className={`shrink-0 ${isExpanded ? 'mr-4' : ''}`}>
                  {item.icon}
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, w: 0 }}
                      animate={{ opacity: 1, w: 'auto' }}
                      exit={{ opacity: 0, w: 0 }}
                      className="font-medium text-sm truncate"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Active Indicators */}
                {isActive && (
                  <>
                    {!isExpanded ? (
                      <>
                        <div className="absolute inset-0 rounded-full animate-pulse bg-white/20"></div>
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-sidebar-primary rounded-l-full"></div>
                      </>
                    ) : (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-sidebar-primary-foreground rounded-full animate-pulse"></div>
                    )}
                  </>
                )}

                {/* Tooltip for collapsed state */}
                {!isExpanded && (
                  <div className="absolute left-full ml-4 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-50 pointer-events-none">
                    <div className="bg-card/90 backdrop-blur-md border border-white/10 text-card-foreground px-4 py-2 rounded-xl shadow-xl relative whitespace-nowrap">
                      <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-card/90 rotate-45 border-l border-b border-white/10"></div>
                      <p className="font-medium text-sm text-sidebar-primary">{item.name}</p>
                      <p className="text-xs opacity-70 mt-0.5">{item.description || "Navigation"}</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 shrink-0 flex justify-center relative">
        <div className={`flex items-center w-full ${isExpanded ? 'justify-between px-2' : 'justify-center'}`}>
          <div className="relative group cursor-pointer" onClick={logout}>
            {/* Avatar Circle */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sidebar-primary to-indigo-500 shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 border border-white/20 overflow-hidden">
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="font-bold text-white text-sm">LG</span>
              )}
            </div>

            {/* Profile Info Tooltip (Collapsed) or Expanded view */}
            {!isExpanded ? (
              <div className="absolute left-full ml-4 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-50 pointer-events-none bottom-0">
                <div className="bg-card/90 backdrop-blur-md border border-white/10 text-card-foreground px-4 py-2 rounded-xl shadow-xl relative whitespace-nowrap">
                  <div className="absolute bottom-4 -left-1 w-2 h-2 bg-card/90 rotate-45 border-b border-l border-white/10"></div>
                  <p className="font-medium text-sm text-sidebar-primary">{currentUser?.name || "Liam Gallagher"}</p>
                  <p className="text-xs opacity-70 mt-0.5">{currentUser?.role || "System Administrator"}</p>
                </div>
              </div>
            ) : null}
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col flex-1 ml-3"
              >
                <span className="font-medium text-sm text-sidebar-fg truncate">{currentUser?.name || "Liam Gallagher"}</span>
                <span className="text-xs text-sidebar-fg/60 truncate">{currentUser?.role || "Admin"}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isExpanded && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={logout}
                className="p-2 text-sidebar-fg/40 hover:text-danger hover:bg-sidebar-accent/50 rounded-lg transition-colors shrink-0"
              >
                <LogOut size={18} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PremiumSidebar;
