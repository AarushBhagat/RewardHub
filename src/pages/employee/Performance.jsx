import React from 'react';
import { performance } from '../../data/performance';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, Target, TrendingUp } from 'lucide-react';

const Performance = () => {
  // Filter for demo employee EMP001
  const myPerformance = performance.filter(p => p.employeeId === 'EMP001' || p.employeeId.includes('Avg')).map(p => ({
    month: p.month,
    score: p.employeeId === 'EMP001' ? p.score : 85, // Mock baseline
  })).slice(0, 6);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Performance</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Track your growth and view AI insights.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card h-96">
          <h2 className="font-semibold text-slate-800 dark:text-white mb-4">Performance Trend</h2>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={myPerformance}>
              <defs>
                <linearGradient id="colorMyScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis domain={[0, 100]} stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }}
              />
              <Area type="monotone" dataKey="score" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorMyScore)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-6">
          <div className="glass-card bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-indigo-900/20 border border-indigo-100 dark:border-indigo-900/30">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="text-indigo-500" />
              <h3 className="font-bold text-slate-900 dark:text-white">AI Analysis</h3>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              "Your performance has shown a steady 5% upward trend over the last quarter. You excel in task completion but could improve in cross-department collaboration."
            </p>
            <div className="bg-white/50 dark:bg-slate-900/50 p-3 rounded-lg text-sm text-indigo-700 dark:text-indigo-400 font-medium flex items-start gap-2">
              <Target size={16} className="mt-0.5 shrink-0" />
              <span>Goal: Participate in 2 cross-functional meetings this month.</span>
            </div>
          </div>
          
          <div className="glass-card flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 mb-1">Current Score</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                92 <TrendingUp className="text-green-500" size={20} />
              </p>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center font-bold text-green-500 bg-green-50 dark:bg-green-900/20">
              A
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
