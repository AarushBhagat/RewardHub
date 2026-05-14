import React, { useState, useMemo } from 'react';
import { performance, employeePerformanceSummary } from '../../data/performance';
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Target, TrendingUp, ChevronRight, X, User } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-2xl text-sm">
        <p className="text-slate-400 mb-2 font-medium">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }} className="font-semibold">
            {p.name}: <span className="text-white">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const EmployeeDetailPanel = ({ emp, onClose }) => {
  const empData = performance.filter(p => p.employeeId === emp.employeeId);
  const latest = empData[empData.length - 1];

  const radarData = latest ? [
    { metric: 'Task', value: latest.taskCompletion },
    { metric: 'Quality', value: latest.qualityOfWork },
    { metric: 'Teamwork', value: latest.teamwork },
    { metric: 'Comms', value: latest.communication },
    { metric: 'Innovation', value: latest.innovation },
  ] : [];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className="glass-card space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={emp.avatar} alt={emp.name} className="w-12 h-12 rounded-full border-2 border-primary/40 object-cover" />
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg font-display">{emp.name}</h3>
              <p className="text-xs text-slate-500">{emp.employeeId} • Latest Score:
                <span className="text-primary font-semibold ml-1">{emp.latestScore}/100</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Score Trend Line Chart */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Performance Score Trend</h4>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={empData}>
              <defs>
                <linearGradient id={`grad-${emp.employeeId}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis domain={[60, 100]} stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="score" name="Score" stroke="#6366F1" strokeWidth={2.5} fillOpacity={1} fill={`url(#grad-${emp.employeeId})`} dot={{ fill: '#6366F1', r: 4, strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* KPI Bar Chart */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Latest KPI Breakdown</h4>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={radarData} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.2} />
              <XAxis type="number" domain={[0, 100]} stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis dataKey="metric" type="category" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} width={65} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Score" fill="#10B981" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Score Badge */}
        <div className={`flex items-center justify-between p-4 rounded-xl text-sm font-medium
          ${emp.latestScore >= 90 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
            emp.latestScore >= 75 ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
              'bg-red-500/10 text-red-600 dark:text-red-400'}`}
        >
          <span>Overall Rating</span>
          <span className="font-bold text-base">
            {emp.latestScore >= 90 ? '🌟 Excellent' : emp.latestScore >= 75 ? '👍 Good' : '⚠️ Needs Improvement'}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const Performance = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Company-wide average per month
  const companyTrend = useMemo(() => {
    const months = [...new Set(performance.map(p => p.month))];
    return months.map(month => {
      const records = performance.filter(p => p.month === month);
      const avg = Math.round(records.reduce((sum, r) => sum + r.score, 0) / records.length);
      return { month, score: avg };
    });
  }, []);

  const handleSelect = (emp) => {
    setSelectedEmployee(prev => prev?.employeeId === emp.employeeId ? null : emp);
  };

  const tierColor = (score) => {
    if (score >= 95) return 'text-cyan-400 bg-cyan-500/10';
    if (score >= 88) return 'text-amber-400 bg-amber-500/10';
    if (score >= 75) return 'text-slate-400 bg-slate-500/10';
    return 'text-orange-400 bg-orange-500/10';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Performance Tracking</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Monitor company-wide KPI metrics and team health.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Trend Chart */}
        <div className="lg:col-span-2 glass-card">
          <h2 className="font-semibold text-slate-800 dark:text-white mb-6">Company Average Performance Trend</h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={companyTrend}>
              <defs>
                <linearGradient id="colorCompany" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis domain={[75, 100]} stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="score"
                name="Avg Score"
                stroke="#6366F1"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorCompany)"
                dot={{ fill: '#6366F1', r: 5, strokeWidth: 0 }}
                activeDot={{ r: 7, fill: '#818CF8' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <div className="glass-card bg-gradient-to-br from-primary/10 to-transparent">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Activity className="text-primary" size={20} />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-white">Company Avg</h3>
            </div>
            <p className="text-5xl font-bold text-slate-900 dark:text-white font-display">
              {companyTrend[companyTrend.length - 1]?.score}
              <span className="text-xl text-slate-500 font-normal">/100</span>
            </p>
            <p className="text-sm text-emerald-500 mt-2 font-medium">↑ 2.4% from last month</p>
          </div>

          <div className="glass-card bg-gradient-to-br from-amber-500/10 to-transparent">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-500/10 rounded-xl">
                <Target className="text-amber-500" size={20} />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-white">Top Metric</h3>
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">Task Completion</p>
            <p className="text-sm text-slate-500 mt-1">Average 92% across all departments</p>
          </div>

          <div className="glass-card bg-gradient-to-br from-emerald-500/10 to-transparent">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-500/10 rounded-xl">
                <TrendingUp className="text-emerald-500" size={20} />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-white">Top Performer</h3>
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">Ashwani Kumar</p>
            <p className="text-sm text-slate-500 mt-1">EMP008 • Score: 98/100</p>
          </div>
        </div>
      </div>

      {/* Employee List + Detail Panel */}
      <div className={`grid gap-6 ${selectedEmployee ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {/* Employee List */}
        <div className="glass-card p-0 overflow-hidden">
          <div className="p-5 border-b border-slate-200 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-white">Employee Evaluations</h2>
            <p className="text-xs text-slate-500 mt-0.5">Click a row to view detailed performance analysis</p>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {employeePerformanceSummary.map((emp, i) => (
              <motion.button
                key={emp.employeeId}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handleSelect(emp)}
                className={`w-full flex items-center justify-between px-5 py-4 text-left transition-all duration-200 group
                  ${selectedEmployee?.employeeId === emp.employeeId
                    ? 'bg-primary/10 border-l-4 border-primary'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border-l-4 border-transparent'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={emp.avatar} alt={emp.name} className="w-11 h-11 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700" />
                    <span className="absolute -bottom-1 -right-1 text-xs font-bold bg-slate-700 text-white rounded-full w-5 h-5 flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{emp.name}</p>
                    <p className="text-xs text-slate-500">{emp.employeeId} • Mar 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-slate-500 mb-0.5">Score</p>
                    <p className={`font-bold text-sm px-2 py-0.5 rounded-lg ${tierColor(emp.latestScore)}`}>
                      {emp.latestScore}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 mb-0.5">Trend</p>
                    <p className="font-semibold text-sm text-emerald-500">{emp.trend}</p>
                  </div>
                  <ChevronRight
                    size={16}
                    className={`text-slate-400 transition-transform duration-200
                      ${selectedEmployee?.employeeId === emp.employeeId ? 'rotate-90 text-primary' : 'group-hover:translate-x-1'}`}
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        {selectedEmployee && (
          <EmployeeDetailPanel
            emp={selectedEmployee}
            onClose={() => setSelectedEmployee(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Performance;
