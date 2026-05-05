import React from 'react';
import { rewards } from '../../data/rewards';
import { useAuth } from '../../context/AuthContext';
import { Gift, ArrowUpRight, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Rewards = () => {
  const { currentUser } = useAuth();
  // Filter for demo employee EMP001
  const myRewards = rewards.filter(r => r.employeeId === 'EMP001');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Rewards</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">View your earned points and redeem gifts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-card">
          <h2 className="font-semibold text-slate-800 dark:text-white mb-4">Points History</h2>
          <div className="space-y-4">
            {myRewards.map((reward, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="flex justify-between items-center p-4 border border-slate-100 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800/50"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900 dark:text-white">{reward.reason}</span>
                  <span className="text-xs text-slate-500">{reward.date} • {reward.type}</span>
                </div>
                <div className="flex items-center gap-1 text-green-500 font-bold bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-lg">
                  <ArrowUpRight size={16} /> {reward.points} pts
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20 text-center py-8">
            <Award className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h3 className="font-bold text-slate-900 dark:text-white text-xl">Silver Tier</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-[200px] mx-auto">
              You are in the top 30% of earners! Reach 1000 pts for Gold.
            </p>
          </div>

          <div className="glass-card">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <Gift className="text-primary" size={18} /> Redeem Points
            </h3>
            <button className="w-full btn-secondary mb-2 opacity-50 cursor-not-allowed">
              Amazon $50 Gift Card (500 pts)
            </button>
            <button className="w-full btn-secondary mb-2 opacity-50 cursor-not-allowed">
              Extra Day Off (800 pts)
            </button>
            <button className="w-full btn-primary bg-gradient-to-r from-amber-500 to-orange-500 border-none">
              View Full Catalogue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
