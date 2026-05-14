import React from 'react';
import { motion } from 'framer-motion';
import { Award, Gift, TrendingUp, Medal, Star, Zap, ChevronRight, Download, Target, Brain, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip as RechartsTooltip, Cell, CartesianGrid, YAxis } from 'recharts';

const pointsHistory = [
  { month: 'May', points: 120 },
  { month: 'Jun', points: 180 },
  { month: 'Jul', points: 250 },
  { month: 'Aug', points: 150 },
  { month: 'Sep', points: 300 },
  { month: 'Oct', points: 450 },
];

const allTransactions = [
  { id: 1, type: 'Bonus', title: 'Q3 Performance Bonus', points: +500, date: 'Oct 28, 2026', desc: 'Awarded for exceeding quarterly KPIs by 15%.' },
  { id: 2, type: 'Badge', title: 'Problem Solver Badge', points: +50, date: 'Oct 25, 2026', desc: 'Recognized for resolving a critical production issue.' },
  { id: 3, type: 'Peer', title: 'Shoutout from Sarah', points: +20, date: 'Oct 15, 2026', desc: '"Great help with the new React components!"' },
  { id: 4, type: 'Redemption', title: 'Amazon Gift Card', points: -300, date: 'Sep 30, 2026', desc: 'Redeemed ₹30 Gift Card.' },
  { id: 5, type: 'Bonus', title: 'Perfect Attendance', points: +100, date: 'Sep 01, 2026', desc: 'August perfect attendance reward.' },
];

const badges = [
  { id: 1, name: 'Early Bird', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
  { id: 2, name: 'Team Player', icon: Star, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { id: 3, name: 'Innovator', icon: Brain, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  { id: 4, name: 'Problem Solver', icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
];

const Rewards = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Rewards Hub</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Track your earnings, badges, and redeem your points.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <Download size={16}/> Export History
          </button>
          <button className="btn-primary bg-gradient-to-r from-amber-500 to-orange-500 border-none flex items-center gap-2 text-white">
            <Gift size={16}/> Redeem Points
          </button>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
          <p className="text-sm text-slate-500 font-medium">Available Balance</p>
          <p className="text-3xl font-bold text-amber-500 mt-1 flex items-center gap-2">
            1,240 <span className="text-sm text-slate-500 font-normal">pts</span>
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
          <p className="text-sm text-slate-500 font-medium">Lifetime Earned</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
            4,850 <span className="text-sm text-slate-500 font-normal">pts</span>
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5">
          <p className="text-sm text-slate-500 font-medium">Badges Collected</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
            12
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-5 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
          <p className="text-sm text-slate-500 font-medium">Current Rank</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
            #4 <span className="text-sm text-slate-500 font-normal">in Dept</span>
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Tier & Badges */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Award size={120} className="text-amber-500"/></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Medal className="text-amber-500" size={24}/>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Gold Tier</h2>
                </div>
                <span className="text-xs font-bold bg-amber-500 text-white px-2 py-1 rounded-full uppercase tracking-wider">Active</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                You are in the top 15% of earners company-wide!
              </p>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-700 dark:text-slate-300">Progress to Platinum</span>
                  <span className="text-amber-600 dark:text-amber-400">1240 / 2000 pts</span>
                </div>
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>

              <div className="bg-white/50 dark:bg-slate-900/50 rounded-xl p-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Tier Perks</h4>
                <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500"/> 1.5x Multiplier on Peer Points</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500"/> Priority Leave Approvals</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500"/> Access to Premium Gift Catalog</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="glass-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Badges Showcase</h2>
              <button className="text-sm text-primary font-medium hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {badges.map(badge => (
                <div key={badge.id} className="flex flex-col items-center justify-center p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-800/30 text-center hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${badge.bg} ${badge.color}`}>
                    {React.createElement(badge.icon, { size: 24 })}
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{badge.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Earnings History */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-card">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Earnings Trend</h2>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pointsHistory} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <RechartsTooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }} cursor={{fill: 'transparent'}}/>
                  <Bar dataKey="points" radius={[4, 4, 0, 0]}>
                    {pointsHistory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === pointsHistory.length - 1 ? '#f59e0b' : '#3b82f6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Detailed Transaction History</h2>
              <div className="flex gap-2">
                <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 outline-none">
                  <option>All Types</option>
                  <option>Bonuses</option>
                  <option>Badges</option>
                  <option>Redemptions</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              {allTransactions.map(tx => (
                <div key={tx.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    tx.points > 0 ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' 
                                  : 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
                  }`}>
                    {tx.type === 'Bonus' ? <TrendingUp size={18}/> : 
                     tx.type === 'Badge' ? <Award size={18}/> : 
                     tx.type === 'Peer' ? <Star size={18}/> : <Gift size={18}/>}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{tx.title}</h4>
                      <span className={`font-bold ${tx.points > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {tx.points > 0 ? '+' : ''}{tx.points}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{tx.date} • {tx.type}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{tx.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors flex items-center justify-center gap-2">
              Load More <ChevronRight size={16}/>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
