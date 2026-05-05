import React, { useState, useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar, Legend, ComposedChart, Line
} from 'recharts';
import { 
  Download, FileText, Calendar, Filter, TrendingUp, BarChart3, 
  PieChart as PieIcon, ShieldCheck, Share2, Users, DollarSign, Trophy, 
  Search, ChevronDown, ArrowUpRight, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { employees } from '../../data/employees';
import { rewards } from '../../data/rewards';
import { bonuses } from '../../data/bonuses';

const Reports = () => {
  // ─── State & Filters ──────────────────────────────────────────────────────
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [rewardTypeFilter, setRewardTypeFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // ─── Data Normalization ──────────────────────────────────────────────────
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
      amount: r.points * 10, // Convert points to nominal value for visualization
      date: r.date,
      reason: r.reason,
      name: employees.find(e => e.id === r.employeeId)?.name || 'Unknown',
      dept: employees.find(e => e.id === r.employeeId)?.department || 'Unknown',
    }));

    return [...bonusData, ...rewardData];
  }, []);

  // ─── Filtering Logic ─────────────────────────────────────────────────────
  const filteredData = useMemo(() => {
    return allRewards.filter(item => {
      const matchDept = selectedDept === 'All' || item.dept === selectedDept;
      const matchMonth = selectedMonth === 'All' || item.date.startsWith(selectedMonth);
      const matchType = rewardTypeFilter === 'All' || item.type === rewardTypeFilter;
      const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.reason.toLowerCase().includes(searchTerm.toLowerCase());
      return matchDept && matchMonth && matchType && matchSearch;
    });
  }, [allRewards, selectedDept, selectedMonth, rewardTypeFilter, searchTerm]);

  // ─── KPI Calculations ───────────────────────────────────────────────────
  const kpis = useMemo(() => {
    const totalAmount = filteredData.reduce((sum, item) => sum + item.amount, 0);
    const uniqueEmployees = new Set(filteredData.map(item => item.employeeId)).size;
    const avgReward = uniqueEmployees > 0 ? totalAmount / uniqueEmployees : 0;
    
    // Top Performer
    const employeeTotals = {};
    filteredData.forEach(item => {
      employeeTotals[item.name] = (employeeTotals[item.name] || 0) + item.amount;
    });
    const topPerformer = Object.entries(employeeTotals).sort((a,b) => b[1] - a[1])[0]?.[0] || 'N/A';

    return [
      { label: 'Total Rewards Given', value: `$${totalAmount.toLocaleString()}`, icon: <DollarSign />, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
      { label: 'Employees Rewarded', value: uniqueEmployees, icon: <Users />, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
      { label: 'Avg Reward / Employee', value: `$${Math.round(avgReward).toLocaleString()}`, icon: <TrendingUp />, color: 'text-amber-500', bg: 'bg-amber-500/10' },
      { label: 'Top Performer', value: topPerformer, icon: <Trophy />, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    ];
  }, [filteredData]);

  // ─── Chart Data ──────────────────────────────────────────────────────────
  
  // A. Rewards by Department
  const deptChartData = useMemo(() => {
    const depts = [...new Set(allRewards.map(r => r.dept))];
    return depts.map(d => ({
      name: d,
      total: filteredData.filter(r => r.dept === d).reduce((s, r) => s + r.amount, 0)
    })).sort((a,b) => b.total - a.total);
  }, [filteredData, allRewards]);

  // B. Rewards Over Time
  const timelineData = useMemo(() => {
    const months = {};
    filteredData.forEach(r => {
      const month = r.date.substring(0, 7);
      months[month] = (months[month] || 0) + r.amount;
    });
    return Object.entries(months).map(([name, total]) => ({ name, total })).sort((a,b) => a.name.localeCompare(b.name));
  }, [filteredData]);

  // C. Reward Type Distribution
  const typeData = useMemo(() => {
    const types = {};
    filteredData.forEach(r => {
      types[r.type] = (types[r.type] || 0) + 1;
    });
    return Object.entries(types).map(([name, value]) => ({ name, value }));
  }, [filteredData]);

  // D. Top Employees
  const topEmployeesData = useMemo(() => {
    const totals = {};
    filteredData.forEach(r => {
      totals[r.name] = (totals[r.name] || 0) + r.amount;
    });
    return Object.entries(totals)
      .map(([name, total]) => ({ name, total }))
      .sort((a,b) => b.total - a.total)
      .slice(0, 10);
  }, [filteredData]);

  const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6 pb-12 bg-slate-50/50 dark:bg-slate-950/20 min-h-screen p-4 md:p-8">
      
      {/* ── 5. TITLE + CONTEXT ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white font-display tracking-tight">
            Employee Reward Management Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Analysis of employee rewards, performance, and trends
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">
            <Share2 size={16} /> Share
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-colors">
            <Download size={16} /> Export PDF
          </button>
        </div>
      </div>

      {/* ── 2. FILTERS (Slicers) ── */}
      <div className="glass-card p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
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

      {/* ── 1. TOP SECTION — KPI CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.1 }}
            className="glass-card group overflow-hidden p-6 relative bg-white dark:bg-slate-900/50"
          >
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-opacity ${kpi.bg}`} />
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-2xl ${kpi.bg} ${kpi.color}`}>
                {kpi.icon}
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{kpi.label}</p>
            </div>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white font-display truncate">
                {kpi.value}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── 3. MAIN VISUALS (Core Insights) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* A. Rewards by Department */}
        <div className="lg:col-span-8 glass-card p-6 bg-white dark:bg-slate-900/50">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="text-indigo-500" /> Rewards by Department
            </h4>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.3} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
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

        {/* B. Rewards Over Time */}
        <div className="lg:col-span-4 glass-card p-6 bg-white dark:bg-slate-900/50">
          <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 mb-8">
            <TrendingUp className="text-emerald-500" /> Reward Trends
          </h4>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.3} />
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="total" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* C. Reward Type Distribution */}
        <div className="lg:col-span-4 glass-card p-6 bg-white dark:bg-slate-900/50">
          <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 mb-8">
            <PieIcon className="text-amber-500" /> Type Distribution
          </h4>
          <div className="h-[300px] relative">
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
                <Tooltip />
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

        {/* D. Top Employees */}
        <div className="lg:col-span-8 glass-card p-6 bg-white dark:bg-slate-900/50">
          <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 mb-6">
            <Award className="text-purple-500" /> Top Performer Leaderboard
          </h4>
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {topEmployeesData.length === 0 && <div className="text-slate-400 text-sm mt-4">No top employees in selection.</div>}
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
                    animate={{ width: `${(emp.total / topEmployeesData[0].total) * 100}%` }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. DETAIL TABLE (Bottom Section) ── */}
      <div className="glass-card overflow-hidden bg-white dark:bg-slate-900/50">
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
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">Reward Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right border-b border-slate-200 dark:border-slate-800">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right border-b border-slate-200 dark:border-slate-800">Date</th>
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
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${
                        row.type === 'Bonus' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-indigo-500/10 text-indigo-500'
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
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500 text-sm">
                      No data matches the selected filters.
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
