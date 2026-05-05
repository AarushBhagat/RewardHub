import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, FileText, Calendar, Filter, TrendingUp, BarChart3, PieChart as PieIcon, ShieldCheck, ArrowDownToLine, Share2, Printer } from 'lucide-react';
import { motion } from 'framer-motion';
import { employees } from '../../data/employees';
import { rewards } from '../../data/rewards';
import { bonuses } from '../../data/bonuses';

const Reports = () => {
  const [dateRange, setDateRange] = useState('Last 30 Days');

  // ─── Data Processing ──────────────────────────────────────────────────────
  const deptData = [
    { name: 'Engineering', value: employees.filter(e => e.department === 'Engineering').length, color: '#6366F1' },
    { name: 'Marketing', value: employees.filter(e => e.department === 'Marketing').length, color: '#10B981' },
    { name: 'Sales', value: employees.filter(e => e.department === 'Sales').length, color: '#F59E0B' },
    { name: 'HR', value: employees.filter(e => e.department === 'HR').length, color: '#EF4444' },
    { name: 'Design', value: employees.filter(e => e.department === 'Design').length, color: '#8B5CF6' },
  ];

  const trendData = [
    { name: 'Week 1', points: 400, bonus: 240 },
    { name: 'Week 2', points: 700, bonus: 190 },
    { name: 'Week 3', points: 600, bonus: 380 },
    { name: 'Week 4', points: 900, bonus: 420 },
    { name: 'Week 5', points: 1100, bonus: 350 },
    { name: 'Week 6', points: 1300, bonus: 500 },
  ];

  const reportFiles = [
    { id: 1, title: 'Q1 Performance Audit', type: 'PDF', size: '2.4 MB', date: 'Oct 24, 2023', category: 'Performance' },
    { id: 2, title: 'Annual Reward Distribution', type: 'XLSX', size: '1.1 MB', date: 'Oct 20, 2023', category: 'Finance' },
    { id: 3, title: 'Employee Growth Metrics', type: 'PDF', size: '4.7 MB', date: 'Oct 15, 2023', category: 'HR' },
    { id: 4, title: 'Departmental Budgeting', type: 'PDF', size: '1.8 MB', date: 'Oct 05, 2023', category: 'Operations' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-3 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <p className="text-white text-sm font-bold">
                {entry.name}: <span className="text-slate-300 font-medium">{entry.value.toLocaleString()}</span>
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* ── Header Section ── */}
      <div className="relative overflow-hidden glass-card border-none bg-slate-950 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white font-display tracking-tight">Intelligence Reports</h1>
          <p className="text-slate-400 mt-2 max-w-md">Access detailed analytics, growth metrics, and institutional data exports across all departments.</p>
          <div className="flex gap-4 mt-6">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl">
              <Calendar size={14} className="text-primary" /> {dateRange}
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl">
              <Filter size={14} className="text-primary" /> All Departments
            </div>
          </div>
        </div>

        <div className="flex gap-3 relative z-10">
          <button className="btn bg-white/10 text-white hover:bg-white/20 border border-white/10">
            <Share2 size={18} />
          </button>
          <button className="btn-primary">
            <Download size={18} /> Export Master PDF
          </button>
        </div>
      </div>

      {/* ── KPI Grid ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Generated Reports', value: '142', sub: '+12 this week', icon: <FileText />, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Data Points', value: '1.2M', sub: 'Verified active', icon: <TrendingUp />, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Active Audits', value: '24', sub: '3 Pending review', icon: <ShieldCheck />, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Storage Used', value: '8.4GB', sub: 'Cloud optimized', icon: <BarChart3 />, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        ].map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card group cursor-pointer overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-30 transition-opacity">
              <div className={kpi.color}>{kpi.icon}</div>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{kpi.label}</p>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white font-display mb-1">{kpi.value}</h3>
            <p className="text-[10px] font-medium text-slate-400">{kpi.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Main Analytics Section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Growth Trend Chart */}
        <div className="lg:col-span-2 glass-card space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
              <TrendingUp size={20} className="text-primary" /> Recognition Trends
            </h3>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              {['Points', 'Bonuses'].map(tab => (
                <button key={tab} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${tab==='Points'?'bg-white dark:bg-slate-700 shadow-sm text-primary':'text-slate-500 hover:text-slate-700'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBonus" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tick={{dy: 10}} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="points" name="Reward Points" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorPoints)" />
                <Area type="monotone" dataKey="bonus" name="Bonus Payouts" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorBonus)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Pie */}
        <div className="glass-card flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display flex items-center gap-2 mb-6">
            <PieIcon size={20} className="text-secondary" /> Dept Allocation
          </h3>
          <div className="h-[240px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={deptData} innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value" stroke="none">
                  {deptData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-slate-900 dark:text-white font-display">{employees.length}</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Staff</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {deptData.map(d => (
              <div key={d.name} className="flex items-center justify-between group cursor-default">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{d.name}</span>
                </div>
                <span className="text-xs font-black text-slate-900 dark:text-white">{d.value} <span className="text-[10px] text-slate-400 font-medium">({Math.round(d.value/employees.length*100)}%)</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Report Downloads ── */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-900 dark:text-white font-display tracking-tight">Available Documents</h3>
          <button className="text-sm font-bold text-primary hover:underline flex items-center gap-1.5">
            Browse Archive <ArrowDownToLine size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportFiles.map((report, i) => (
            <motion.div key={report.id} whileHover={{ scale: 1.01 }} className="glass-card flex items-center justify-between p-5 group hover:border-primary/40">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white leading-tight group-hover:text-primary transition-colors">{report.title}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{report.category} • {report.date} • {report.size}</p>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary hover:bg-primary/10 transition-all shadow-sm">
                  <Printer size={18} />
                </button>
                <button className="p-2.5 rounded-xl bg-primary text-white hover:bg-indigo-600 transition-all shadow-lg shadow-primary/25">
                  <ArrowDownToLine size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Reports;
