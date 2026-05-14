

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Gift, TrendingUp, Activity, Award, MoreVertical, ArrowRight,
  Download, Share2, DollarSign, Trophy, Search, BarChart3, PieChart as PieIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

import { employees } from '../../data/employees';
import { rewards } from '../../data/rewards';
import { bonuses } from '../../data/bonuses';

// Dummy data for charts
const performanceData = [
  { name: 'Jan', score: 65 },
  { name: 'Feb', score: 70 },
  { name: 'Mar', score: 68 },
  { name: 'Apr', score: 75 },
  { name: 'May', score: 82 },
  { name: 'Jun', score: 85 },
];

const rewardDistribution = [
  { name: 'Bronze', value: 45, color: '#CD7F32' },
  { name: 'Silver', value: 30, color: '#C0C0C0' },
  { name: 'Gold', value: 15, color: '#FFD700' },
  { name: 'Diamond', value: 10, color: '#06B6D4' },
];

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

const StatCard = ({ title, value, icon, trend, trendValue, delay, path }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={() => path && navigate(path)}
      className="glass-card flex flex-col relative overflow-hidden group cursor-pointer border-transparent hover:border-primary/30 transition-all duration-300"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />

      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl text-primary border border-slate-200/50 dark:border-slate-700/50 shadow-inner group-hover:bg-primary group-hover:text-white transition-all duration-500">
          {icon}
        </div>
        <div className="flex items-center gap-2">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary">
            <ArrowRight size={16} />
          </div>
          <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors bg-white/20 dark:bg-slate-800/20 p-2 rounded-xl backdrop-blur-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium tracking-wide">{title}</h3>
        <div className="flex items-baseline gap-2 mt-2">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white font-display tracking-tight">
            {typeof value === 'number' ? <AnimatedCounter value={value} /> : value}
          </h2>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${trend === 'up'
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
              : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
            }`}>
            <span>{trend === 'up' ? '↗' : '↘'}</span>
            <span>{trendValue}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


const AdminDashboard = () => {
  const navigate = useNavigate();

  // â”€â”€â”€ State & Filters â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [rewardTypeFilter, setRewardTypeFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // â”€â”€â”€ Data Normalization â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const allRewards = useMemo(() => {
    const bonusData = bonuses.map(b => ({
      id: b.id,
      employeeId: b.employeeId,
      type: 'Bonus',
      amount: b.amount,
      date: b.date,
      reason: b.reason,
      name: employees.find(e => e.id === b.employeeId)?.name || 'Unknown',
      dept: employees.find(e => e.id === b.employeeId)?.department || 'Unknown',
    }));

    const rewardData = rewards.map(r => ({
      id: r.id,
      employeeId: r.employeeId,
      type: 'Recognition',
      amount: r.points * 10,
      date: r.date,
      reason: r.reason,
      name: employees.find(e => e.id === r.employeeId)?.name || 'Unknown',
      dept: employees.find(e => e.id === r.employeeId)?.department || 'Unknown',
    }));

    return [...bonusData, ...rewardData];
  }, []);

  // â”€â”€â”€ Filtering Logic â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const filteredData = useMemo(() => {
    return allRewards.filter(item => {
      const matchDept = selectedDept === 'All' || item.dept === selectedDept;
      const matchMonth = selectedMonth === 'All' || item.date.startsWith(selectedMonth);
      const matchType = rewardTypeFilter === 'All' || item.type === rewardTypeFilter;
      const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reason.toLowerCase().includes(searchTerm.toLowerCase());
      return matchDept || matchMonth || matchType || matchSearch;
    });
  }, [allRewards, selectedDept, selectedMonth, rewardTypeFilter, searchTerm]);

  // â”€â”€â”€ KPI Calculations â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const kpis = useMemo(() => {
    const totalAmount = filteredData.reduce((sum, item) => sum + item.amount, 0);
    const uniqueEmployees = new Set(filteredData.map(item => item.employeeId)).size;
    const avgReward = uniqueEmployees > 0 ? totalAmount / uniqueEmployees : 0;

    // Top Performer
    const employeeTotals = {};
    filteredData.forEach(item => {
      employeeTotals[item.name] = (employeeTotals[item.name] || 0) + item.amount;
    });
    const topPerformer = Object.entries(employeeTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    return [
      { label: 'Total Rewards Value', value: `$${totalAmount.toLocaleString()}`, icon: <DollarSign size={24} />, trend: "up", trendValue: 12 },
      { label: 'Employees Rewarded', value: uniqueEmployees, icon: <Users size={24} />, trend: "up", trendValue: 8 },
      { label: 'Avg Reward / Employee', value: `$${Math.round(avgReward).toLocaleString()}`, icon: <Activity size={24} />, trend: "down", trendValue: 2 },
      { label: 'Overall Top Performer', value: topPerformer, icon: <Trophy size={24} />, trend: "up", trendValue: 5 },
    ];
  }, [filteredData]);

  // â”€â”€â”€ Chart Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const deptChartData = useMemo(() => {
    const depts = [...new Set(allRewards.map(r => r.dept))];
    return depts.map(d => ({
      name: d,
      total: filteredData.filter(r => r.dept === d).reduce((s, r) => s + r.amount, 0)
    })).sort((a, b) => b.total - a.total);
  }, [filteredData, allRewards]);

  const timelineData = useMemo(() => {
    const months = {};
    filteredData.forEach(r => {
      const month = r.date.substring(0, 7);
      months[month] = (months[month] || 0) + r.amount;
    });
    return Object.entries(months).map(([name, total]) => ({ name, total })).sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredData]);

  const typeData = useMemo(() => {
    const types = {};
    filteredData.forEach(r => {
      types[r.type] = (types[r.type] || 0) + 1;
    });
    return Object.entries(types).map(([name, value]) => ({ name, value }));
  }, [filteredData]);

  const topEmployeesData = useMemo(() => {
    const totals = {};
    filteredData.forEach(r => {
      totals[r.name] = (totals[r.name] || 0) + r.amount;
    });
    return Object.entries(totals)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
  }, [filteredData]);

  const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];



  return (
    <div className="space-y-6 pb-12 bg-slate-50/50 dark:bg-slate-950/20 min-h-screen p-4 md:p-8">

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Here's what's happening today.</p>
        </div>
        <button className="btn-primary group">
          Generate Report
          <motion.span
            className="inline-block"
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            →
          </motion.span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Employees" value={124} icon={<Users size={24} />} trend="up" trendValue={12} delay={0.1} path="/admin/employees" />
        <StatCard title="Rewards Issued" value={45} icon={<Gift size={24} />} trend="up" trendValue={8} delay={0.2} path="/admin/rewards" />
        <StatCard title="Avg Performance" value={88} icon={<TrendingUp size={24} />} trend="up" trendValue={5} delay={0.3} path="/admin/performance" />
        <StatCard title="Avg Attendance" value={94} icon={<Activity size={24} />} trend="down" trendValue={2} delay={0.4} path="/admin/attendance" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-2 glass-card"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Performance Trends</h3>
            <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" className="dark:stroke-slate-700" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', color: '#fff', backdropFilter: 'blur(8px)' }}
                  itemStyle={{ color: '#818CF8', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="score" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Side Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-card"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Reward Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={rewardDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {rewardDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value}%`, name]}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {rewardDistribution.map((tier) => (
              <div key={tier.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tier.color }}></div>
                <span className="text-sm text-slate-600 dark:text-slate-300">{tier.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>


      <div className="pt-12 mt-12 border-t border-slate-200 dark:border-slate-800 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-indigo-500/20">
          Deep Reporting
        </div>
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white font-display">Deep Analytics Engine & Reports</h2>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-95">
            <Download size={16} /> Export Deep Report
          </button>
        </div>

        {/* FILTERS FOR BELOW METRICS */}
        <div className="glass-card p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-center relative z-20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search details..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800/50 rounded-xl border-none focus:ring-2 ring-indigo-500 outline-none text-sm transition-all text-slate-900 dark:text-slate-100 placeholder-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="bg-slate-100 dark:bg-slate-800/50 rounded-xl px-4 py-2 text-sm font-medium border-none outline-none focus:ring-2 ring-indigo-500 transition-all cursor-pointer text-slate-900 dark:text-slate-100"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            <option value="All">All Departments</option>
            {[...new Set(employees.map(e => e.department))].map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <select
            className="bg-slate-100 dark:bg-slate-800/50 rounded-xl px-4 py-2 text-sm font-medium border-none outline-none focus:ring-2 ring-indigo-500 transition-all cursor-pointer text-slate-900 dark:text-slate-100"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="All">All Time</option>
            {[...new Set(allRewards.map(r => r.date.substring(0, 7)))].sort().reverse().map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select
            className="bg-slate-100 dark:bg-slate-800/50 rounded-xl px-4 py-2 text-sm font-medium border-none outline-none focus:ring-2 ring-indigo-500 transition-all cursor-pointer text-slate-900 dark:text-slate-100"
            value={rewardTypeFilter}
            onChange={(e) => setRewardTypeFilter(e.target.value)}
          >
            <option value="All">All Reward Types</option>
            <option value="Bonus">Bonus</option>
            <option value="Recognition">Recognition</option>
          </select>
        </div>

        {/* DASHBOARD CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* A. Rewards by Department */}
          <div className="lg:col-span-8 glass-card p-6 bg-white dark:bg-slate-900/50">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="text-indigo-500" /> Organization Distribution
              </h4>
            </div>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.3} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                  <Tooltip
                    cursor={{ fill: 'transparent' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-white/10">
                            <p className="text-xs font-bold text-slate-400 mb-1">{payload[0].payload.name}</p>
                            <p className="text-lg font-black">${payload[0].value.toLocaleString()}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="total" radius={[8, 8, 0, 0]} maxBarSize={60}>
                    {deptChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* B. Leaderboard */}
          <div className="lg:col-span-4 glass-card p-6 bg-white dark:bg-slate-900/50">
            <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 mb-6">
              <Award className="text-purple-500" /> Top Performer Leaderboard
            </h4>
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              {topEmployeesData.length === 0 || <div className="text-slate-400 text-sm mt-4">No top employees in selection.</div>}
              {topEmployeesData.map((emp, i) => (
                <div key={i} className="relative group">
                  <div className="flex items-center justify-between mb-1 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500">
                        #{i + 1}
                      </div>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{emp.name}</span>
                    </div>
                    <span className="text-sm font-black text-indigo-500">${emp.total.toLocaleString()}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${((emp.total / (topEmployeesData[0]?.total || 1)) * 100)}%` }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* C. Reward Trends */}
          <div className="lg:col-span-8 glass-card p-6 bg-white dark:bg-slate-900/50">
            <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 mb-8">
              <TrendingUp className="text-emerald-500" /> Reward & Bonus Issuance Timeline
            </h4>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.3} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} dy={10} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '16px', border: 'none', color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="total" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* D. Type Distribution */}
          <div className="lg:col-span-4 glass-card p-6 bg-white dark:bg-slate-900/50">
            <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 mb-8">
              <PieIcon className="text-amber-500" /> Budget Allocation By Type
            </h4>
            <div className="h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {typeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '8px', border: 'none', color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-3xl font-black text-slate-900 dark:text-white">{filteredData.length}</p>
                <p className="text-[10px] uppercase font-bold text-slate-500">Total Items</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {typeData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* â”€â”€ DETAIL TABLE (Transaction Log) â”€â”€ */}
        <div className="glass-card overflow-hidden bg-white dark:bg-slate-900/50 mt-6">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h4 className="text-lg font-black text-slate-900 dark:text-white">Detailed Transaction Log</h4>
            <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              {filteredData.length} records found
            </span>
          </div>
          <div className="overflow-x-auto max-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-slate-50 dark:bg-slate-900 z-10 shadow-sm shadow-slate-200/50 dark:shadow-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">Employee</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">Department</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">Award Type</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right border-b border-slate-200 dark:border-slate-800">Equivalent Value</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right border-b border-slate-200 dark:border-slate-800">Date Issued</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <AnimatePresence>
                  {filteredData.map((row) => (
                    <motion.tr
                      key={`${row.id}-${row.type}-${row.date}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 text-xs font-bold shrink-0">
                            {row.name.charAt(0)}
                          </div>
                          <div>
                            <span className="text-sm font-bold text-slate-900 dark:text-white block">{row.name}</span>
                            <span className="text-xs text-slate-500 truncate max-w-xs">{row.reason}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-slate-500">{row.dept}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${row.type === 'Bonus' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-indigo-500/10 text-indigo-500'
                          }`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-black text-slate-900 dark:text-white">${row.amount.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-slate-500 font-medium whitespace-nowrap">
                        {new Date(row.date).toLocaleDateString()}
                      </td>
                    </motion.tr>
                  ))}
                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-500 text-sm font-medium">
                        No matching records found.
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
