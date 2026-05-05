import React from 'react';
import { badges } from '../../data/badges';
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Badges = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Badges</h1>
        <p className="text-slate-500 mt-1">Achievements you've unlocked and those you can still earn.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {badges.map((badge, i) => {
          // Mock logic: first 2 are earned, rest are locked
          const isEarned = i < 2;
          
          return (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              key={badge.id}
              className={`glass-card flex flex-col items-center text-center relative overflow-hidden ${!isEarned ? 'opacity-70 grayscale hover:grayscale-0 transition-all' : ''}`}
            >
              {!isEarned && (
                <div className="absolute top-2 right-2 text-slate-400">
                  <Lock size={16} />
                </div>
              )}
              
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-4 shadow-inner ${isEarned ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-slate-100 dark:bg-slate-800'}`}>
                {badge.icon}
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{badge.name}</h3>
              <p className="text-sm text-slate-500 mt-2">{badge.description}</p>
              
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 w-full text-center">
                <span className={`text-xs font-semibold px-2 py-1 rounded ${isEarned ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                  {isEarned ? 'Earned' : `Goal: ${badge.triggerRule}`}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Badges;
