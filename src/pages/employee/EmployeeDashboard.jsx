import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  Award, Target, Trophy, Flame, ChevronRight, ArrowRight, 
  Star, TrendingUp, BarChart3, Medal, Calendar 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

import { badges } from '../../data/badges';
import { performance } from '../../data/performance';
import { rewards } from '../../data/rewards';
import { bonuses } from '../../data/bonuses';

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  return <span>{count}</span>;
};

const EmployeeDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Mock employee context or real mapped context
  const empId = currentUser?.id || "EMP001";
  
  // Aggregate Employee Metrics
  const myBadges = badges.filter(b => b.earnedBy.includes(empId));
  const myPerformance = performance.filter(p => p.employeeId === empId).slice(-6); // last 6 months
  const myRewards = rewards.filter(r => r.employeeId === empId);
  const myBonuses = bonuses.filter(b => b.employeeId === empId);

  const currentPoints = myRewards.reduce((sum, r) => sum + r.points, 0) + 750; // Add base to mock reality
  const totalBonusValue = myBonuses.reduce((sum, b) => sum + b.amount, 0);
  const latestScore = myPerformance.length > 0 ? myPerformance[myPerformance.length - 1].score : 0;

  const nextTierPoints = 1000;
  const progressPercent = Math.min((currentPoints / nextTierPoints) * 100, 100);
  const rank = 4;
  
  return (
    <div className="space-y-6 pb-16 md:pb-0 min-h-screen bg-slate-50/50 dark:bg-slate-950/20 p-4 md:p-6 lg:p-8">
      
      {/* ── Welcome Banner ── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card relative overflow-hidden bg-gradient-to-r from-primary/10 to-indigo-500/10 border-none shadow-sm"
      >
        <div className="absolute right-[-10%] top-[-50%] w-80 h-80 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 p-6 md:p-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-colors duration-500"></div>
            <img src={currentUser?.avatar || 'https://i.pravatar.cc/150?img=11'} alt="Profile" className="relative w-28 h-28 rounded-full border-4 border-white dark:border-slate-800 shadow-xl object-cover" />
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-slate-200 to-slate-300 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full border-2 border-white shadow-lg flex items-center gap-1.5 z-20">
              <Trophy size={14} className="text-amber-600" /> Silver
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 font-display">
              Welcome back, {currentUser?.name}! 👋
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base font-medium max-w-xl">
              "Success is the sum of small efforts repeated day in and day out." Let's crush your goals this week.
            </p>
          </div>
          
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-center min-w-[160px] shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mb-1">Company Rank</p>
            <div className="flex items-center justify-center gap-2 relative z-10">
              <Award className="text-amber-500" size={28} />
              <span className="text-4xl font-black text-slate-900 dark:text-white font-display">#{rank}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Core Metrics Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Points Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
          onClick={() => navigate('/employee/rewards')}
          className="glass-card p-6 cursor-pointer group hover:border-primary/30 transition-all duration-300 relative overflow-hidden bg-white dark:bg-slate-900/50"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary"><Target size={24} /></div>
            <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
          </div>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white font-display">
            <AnimatedCounter value={currentPoints} />
          </h3>
          <p className="text-sm font-bold text-slate-500 mt-1">Reward Points Earned</p>
        </motion.div>

        {/* Latest Score Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
          onClick={() => navigate('/employee/performance')}
          className="glass-card p-6 cursor-pointer group hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden bg-white dark:bg-slate-900/50"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500"><TrendingUp size={24} /></div>
            <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500" />
          </div>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white font-display">{latestScore}%</h3>
          <p className="text-sm font-bold text-slate-500 mt-1">Latest Perf. Score</p>
        </motion.div>

        {/* Total Bonus Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
          className="glass-card p-6 relative overflow-hidden bg-white dark:bg-slate-900/50"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full -mr-10 -mt-10" />
          <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500 w-max mb-4"><Star size={24} /></div>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white font-display">
            $<AnimatedCounter value={totalBonusValue} />
          </h3>
          <p className="text-sm font-bold text-slate-500 mt-1">Total Cash Bonuses</p>
        </motion.div>

        {/* Badges Count Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
          onClick={() => navigate('/employee/badges')}
          className="glass-card p-6 cursor-pointer group hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden bg-white dark:bg-slate-900/50"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500"><Medal size={24} /></div>
            <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-500" />
          </div>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white font-display">{myBadges.length}</h3>
          <p className="text-sm font-bold text-slate-500 mt-1">Unlocked Badges</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ── Main Performance Chart ── */}
        <div className="lg:col-span-8 glass-card p-6 bg-white dark:bg-slate-900/50">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="text-indigo-500" /> Performance History
            </h3>
            <span className="text-xs font-bold text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-lg">Last 6 Months</span>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={myPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.3} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} domain={[60, 100]} />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-white/10">
                          <p className="text-xs font-bold text-slate-400 mb-1">{payload[0].payload.month}</p>
                          <p className="text-lg font-black">{payload[0].value}% Score</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#6366F1" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#scoreColor)" 
                  activeDot={{ r: 8, fill: '#6366F1', stroke: '#fff', strokeWidth: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Right Column: Badges & Next Tier ── */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Progress Tracker Widget */}
          <div className="glass-card p-6 bg-white dark:bg-slate-900/50">
            <h3 className="font-black text-slate-900 dark:text-white flex items-center gap-2 mb-6">
              <Trophy className="text-amber-500" size={18} /> Level Progress
            </h3>
            <div className="flex justify-between text-sm font-black mb-2">
              <span className="text-slate-800 dark:text-white">Silver</span>
              <span className="text-amber-500">Gold</span>
            </div>
            <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner mb-3">
              <motion.div 
                initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                className="h-full bg-gradient-to-r from-primary to-indigo-400 relative"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse" />
              </motion.div>
            </div>
            <p className="text-xs font-bold text-slate-500 text-right">
              {nextTierPoints - currentPoints} pts away from Gold Tier!
            </p>
          </div>

          {/* Recent Badges Widget */}
          <div className="glass-card p-6 bg-white dark:bg-slate-900/50 flex flex-col h-[calc(100%-160px)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Medal className="text-purple-500" size={18} /> Digital Badges
              </h3>
              <button 
                onClick={() => navigate('/employee/badges')}
                className="text-xs font-bold text-indigo-500 hover:text-indigo-600 flex items-center"
              >
                View Map <ChevronRight size={14} />
              </button>
            </div>
            
            <div className="flex-1 space-y-4">
              {myBadges.length > 0 ? (
                 myBadges.slice(0, 3).map(badge => (
                  <div key={badge.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <div className="text-3xl bg-white dark:bg-slate-900 w-12 h-12 rounded-full flex items-center justify-center shadow-sm">
                      {badge.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{badge.name}</h4>
                      <p className="text-[10px] uppercase font-bold text-indigo-500 mt-0.5">+{badge.bonusPoints} Points</p>
                    </div>
                  </div>
                 ))
              ) : (
                <div className="text-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl h-full flex flex-col justify-center">
                  <p className="text-sm text-slate-500 font-medium">Keep up the great work to earn your first digital badge!</p>
                </div>
              )}
            </div>
            
            {/* AI Insight Mini */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="mt-4 p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 flex gap-3"
            >
              <div className="text-amber-500 mt-0.5"><Flame size={20} /></div>
              <div>
                <p className="text-xs font-bold text-amber-600 dark:text-amber-500 mb-1">AI Performance Tip</p>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                  You're on a top trajectory! Complete next week's goals early to secure the <span className="font-bold">Star Performer</span> badge.
                </p>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
