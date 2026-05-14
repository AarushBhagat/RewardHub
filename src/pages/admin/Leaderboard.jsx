import React from 'react';
import { employees } from '../../data/employees';
import { Trophy, Medal, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLeaderboard = () => {
  // Sort employees by points
  const sortedEmployees = [...employees].sort((a, b) => b.points - a.points);
  
  // Top 3
  const top3 = sortedEmployees.slice(0, 3);
  // Rest
  const rest = sortedEmployees.slice(3);

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white flex justify-center items-center gap-3 mb-2">
          <Trophy className="text-amber-500" size={32} />
          Company Leaderboard
          <Trophy className="text-amber-500" size={32} />
        </h1>
        <p className="text-slate-500 dark:text-slate-400">Overview of all employees ranked by their total reward points.</p>
      </div>

      {/* Top 3 Podium */}
      <div className="flex flex-col md:flex-row justify-center items-end gap-4 md:gap-8 pt-8 pb-4">
        {/* 2nd Place */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="order-2 md:order-1 flex flex-col items-center">
          <div className="relative mb-4">
            <img src={top3[1]?.avatar} alt="" className="w-20 h-20 rounded-full border-4 border-slate-300 shadow-lg" />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-300 text-slate-800 w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-white dark:border-slate-900">
              2
            </div>
          </div>
          <div className="text-center bg-white dark:bg-slate-800 p-4 rounded-t-2xl shadow-md border border-b-0 border-slate-200 dark:border-slate-700 w-32 h-32 flex flex-col justify-end pb-6">
            <p className="font-bold text-slate-900 dark:text-white text-sm truncate w-full">{top3[1]?.name}</p>
            <p className="text-primary font-bold mt-1">{top3[1]?.points} pts</p>
          </div>
        </motion.div>

        {/* 1st Place */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="order-1 md:order-2 flex flex-col items-center z-10">
          <div className="relative mb-4">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-amber-500">
              <Medal size={32} />
            </div>
            <img src={top3[0]?.avatar} alt="" className="w-28 h-28 rounded-full border-4 border-amber-400 shadow-xl" />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-amber-400 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-2 border-white dark:border-slate-900">
              1
            </div>
          </div>
          <div className="text-center bg-gradient-to-t from-amber-500/20 to-white dark:to-slate-800 p-4 rounded-t-2xl shadow-xl border border-b-0 border-amber-200 dark:border-amber-500/30 w-40 h-40 flex flex-col justify-end pb-8">
            <p className="font-bold text-slate-900 dark:text-white text-lg truncate w-full">{top3[0]?.name}</p>
            <p className="text-amber-500 font-black text-xl mt-1">{top3[0]?.points} pts</p>
          </div>
        </motion.div>

        {/* 3rd Place */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="order-3 flex flex-col items-center">
          <div className="relative mb-4">
            <img src={top3[2]?.avatar} alt="" className="w-20 h-20 rounded-full border-4 border-orange-400 shadow-lg" />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-orange-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-white dark:border-slate-900">
              3
            </div>
          </div>
          <div className="text-center bg-white dark:bg-slate-800 p-4 rounded-t-2xl shadow-md border border-b-0 border-slate-200 dark:border-slate-700 w-32 h-28 flex flex-col justify-end pb-6">
            <p className="font-bold text-slate-900 dark:text-white text-sm truncate w-full">{top3[2]?.name}</p>
            <p className="text-primary font-bold mt-1">{top3[2]?.points} pts</p>
          </div>
        </motion.div>
      </div>

      {/* Rest of the leaderboard */}
      <div className="glass-card max-w-3xl mx-auto p-0 overflow-hidden">
        <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
          {rest.map((emp, i) => {
            const rank = i + 4;
            
            return (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (i * 0.05) }}
                key={emp.id} 
                className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 text-center font-bold text-slate-400">
                    #{rank}
                  </div>
                  <img src={emp.avatar} alt="" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      {emp.name}
                    </p>
                    <p className="text-xs text-slate-500">{emp.department}</p>
                  </div>
                </div>
                <div className="font-bold text-primary">
                  {emp.points} pts
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminLeaderboard;
