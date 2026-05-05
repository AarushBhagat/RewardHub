import React, { useState, useMemo } from 'react';
import { attendance } from '../../data/attendance';
import { employees } from '../../data/employees';
import { CheckCircle, XCircle, Clock, Calendar, ChevronRight, X, TrendingUp, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  Present: { color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300', icon: <CheckCircle size={14} />, bar: '#10B981' },
  Late:    { color: 'text-amber-500',   bg: 'bg-amber-50 dark:bg-amber-900/20',   badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',   icon: <Clock size={14} />,        bar: '#F59E0B' },
  Absent:  { color: 'text-red-500',     bg: 'bg-red-50 dark:bg-red-900/20',       badge: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',           icon: <XCircle size={14} />,      bar: '#EF4444' },
  Remote:  { color: 'text-primary',     bg: 'bg-primary/5',                        badge: 'bg-primary/10 text-primary dark:bg-primary/20',                          icon: <Wifi size={14} />,         bar: '#6366F1' },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 shadow-2xl text-sm">
        <p className="text-slate-400 mb-1 font-medium">{label}</p>
        {payload.map(p => (
          <p key={p.name} style={{ color: p.fill }} className="font-semibold">{p.name}: <span className="text-white">{p.value}</span></p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Employee Detail Panel ────────────────────────────────────────────────────
const AttendanceDetailPanel = ({ emp, onClose }) => {
  const empRecords = attendance.filter(r => r.employeeId === emp.id);
  const total = empRecords.length;
  const counts = {
    Present: empRecords.filter(r => r.status === 'Present').length,
    Late:    empRecords.filter(r => r.status === 'Late').length,
    Absent:  empRecords.filter(r => r.status === 'Absent').length,
    Remote:  empRecords.filter(r => r.status === 'Remote').length,
  };
  const presentRate = total > 0 ? Math.round(((counts.Present + counts.Remote) / total) * 100) : 0;

  const chartData = Object.entries(counts).map(([status, count]) => ({
    status, count, fill: STATUS_CONFIG[status].bar
  }));

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      className="glass-card space-y-5 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <img src={emp.avatar} alt={emp.name} className="w-14 h-14 rounded-2xl border-2 border-primary/30 object-cover shadow-lg" />
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white font-display text-lg">{emp.name}</h3>
            <p className="text-xs text-slate-500">{emp.id} · {emp.department}</p>
            <span className="inline-block mt-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">{emp.role}</span>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* Attendance Rate */}
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/15 rounded-2xl p-4 flex items-center gap-4">
        <div className="text-center flex-1">
          <p className="text-xs text-slate-500 mb-1 font-medium">Attendance Rate</p>
          <p className="text-5xl font-black text-primary font-display">{presentRate}<span className="text-xl font-normal text-slate-400">%</span></p>
        </div>
        <div className="w-px h-16 bg-slate-200 dark:bg-slate-700" />
        <div className="flex-1 grid grid-cols-2 gap-2">
          {Object.entries(counts).map(([status, count]) => {
            const cfg = STATUS_CONFIG[status];
            return (
              <div key={status} className={`${cfg.bg} rounded-xl p-2 text-center`}>
                <p className={`text-lg font-bold ${cfg.color}`}>{count}</p>
                <p className="text-xs text-slate-500">{status}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bar Chart */}
      <div>
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
          <TrendingUp size={14} className="text-primary" /> Status Breakdown
        </h4>
        <ResponsiveContainer width="100%" height={130}>
          <BarChart data={chartData} margin={{ left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
            <XAxis dataKey="status" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" name="Days" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Individual Records */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={14} className="text-primary" />
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Daily Records</h4>
          <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{total} entries</span>
        </div>
        {empRecords.length === 0 ? (
          <div className="text-center py-6 text-slate-400">
            <Calendar size={28} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">No attendance records found</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-52 overflow-y-auto custom-scrollbar pr-1">
            {empRecords.map((r, i) => {
              const cfg = STATUS_CONFIG[r.status] || STATUS_CONFIG.Present;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/40 hover:border-primary/20 transition-colors">
                  <div className={`w-8 h-8 ${cfg.bg} rounded-lg flex items-center justify-center shrink-0 ${cfg.color}`}>
                    {cfg.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 dark:text-white">{r.date}</p>
                    <p className="text-xs text-slate-500">Check-in: {r.checkIn || '—'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${cfg.badge}`}>{r.status}</span>
                    <span className={`text-xs font-bold ${r.scoreImpact > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                      {r.scoreImpact > 0 ? '+' : ''}{r.scoreImpact} pts
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const Attendance = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const summary = useMemo(() => {
    const total = attendance.length;
    return {
      present: Math.round((attendance.filter(r => r.status === 'Present').length / total) * 100),
      absent:  Math.round((attendance.filter(r => r.status === 'Absent').length / total) * 100),
      late:    Math.round((attendance.filter(r => r.status === 'Late').length / total) * 100),
      remote:  Math.round((attendance.filter(r => r.status === 'Remote').length / total) * 100),
    };
  }, []);

  const summaryCards = [
    { label: 'Present', value: `${summary.present}%`, icon: <CheckCircle size={22} />, border: 'border-l-emerald-500', iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' },
    { label: 'Absent',  value: `${summary.absent}%`,  icon: <XCircle size={22} />,     border: 'border-l-red-500',     iconBg: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
    { label: 'Late',    value: `${summary.late}%`,    icon: <Clock size={22} />,        border: 'border-l-amber-500',   iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' },
    { label: 'Remote',  value: `${summary.remote}%`,  icon: <Wifi size={22} />,         border: 'border-l-primary',     iconBg: 'bg-primary/10 text-primary' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Attendance Tracking</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Monitor daily attendance and calculate scores.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryCards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className={`glass-card flex items-center gap-4 border-l-4 ${card.border}`}>
            <div className={`p-3 ${card.iconBg} rounded-xl`}>{card.icon}</div>
            <div>
              <p className="text-sm text-slate-500">{card.label}</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className={`grid gap-6 transition-all duration-300 ${selectedEmployee ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>

        {/* Left: Employee list + full records table */}
        <div className="space-y-5">

          {/* Clickable Employee List */}
          <div className="glass-card p-0 overflow-hidden">
            <div className="p-5 border-b border-slate-200 dark:border-slate-700/60">
              <h2 className="font-bold text-slate-900 dark:text-white">Employee Overview</h2>
              <p className="text-xs text-slate-500 mt-0.5">Click an employee to view their individual attendance</p>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {employees.map((emp, i) => {
                const empRecords = attendance.filter(r => r.employeeId === emp.id);
                const rate = empRecords.length > 0
                  ? Math.round(((empRecords.filter(r => r.status === 'Present' || r.status === 'Remote').length) / empRecords.length) * 100)
                  : 0;
                const isSelected = selectedEmployee?.id === emp.id;
                const rateColor = rate >= 90 ? 'text-emerald-500' : rate >= 70 ? 'text-amber-500' : 'text-red-500';
                return (
                  <motion.button key={emp.id}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                    onClick={() => setSelectedEmployee(prev => prev?.id === emp.id ? null : emp)}
                    className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-200 group
                      ${isSelected
                        ? 'bg-primary/8 border-l-[3px] border-primary'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/30 border-l-[3px] border-transparent'
                      }`}>
                    <img src={emp.avatar} alt={emp.name} className={`w-11 h-11 rounded-xl object-cover border-2 transition-all ${isSelected ? 'border-primary/40 ring-2 ring-primary/30' : 'border-slate-200 dark:border-slate-700'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 dark:text-white text-sm">{emp.name}</p>
                      <p className="text-xs text-slate-500">{emp.id} · {emp.department}</p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <p className={`font-black text-lg font-display ${rateColor}`}>{rate}%</p>
                        <p className="text-xs text-slate-400">rate</p>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="font-bold text-slate-700 dark:text-slate-300">{empRecords.length}</p>
                        <p className="text-xs text-slate-400">records</p>
                      </div>
                      <ChevronRight size={16}
                        className={`text-slate-400 transition-all duration-200 ${isSelected ? 'rotate-90 text-primary' : 'group-hover:translate-x-0.5'}`} />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* All Records Table */}
          <div className="glass-card p-0 overflow-hidden">
            <div className="p-5 border-b border-slate-200 dark:border-slate-700/60">
              <h2 className="font-bold text-slate-900 dark:text-white">Recent Records</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Employee</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Check In</th>
                    <th className="px-5 py-3">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {attendance.map((record, i) => {
                    const emp = employees.find(e => e.id === record.employeeId);
                    const cfg = STATUS_CONFIG[record.status] || STATUS_CONFIG.Present;
                    return (
                      <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                        <td className="px-5 py-3 text-sm font-medium text-slate-900 dark:text-white">{record.date}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            {emp && <img src={emp.avatar} className="w-7 h-7 rounded-lg object-cover" alt="" />}
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{record.employeeId}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1 w-fit ${cfg.badge}`}>
                            {cfg.icon} {record.status}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-sm text-slate-500 dark:text-slate-400">{record.checkIn || '—'}</td>
                        <td className={`px-5 py-3 text-sm font-bold ${record.scoreImpact > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                          {record.scoreImpact > 0 ? '+' : ''}{record.scoreImpact} pts
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Detail Panel */}
        <AnimatePresence>
          {selectedEmployee && (
            <AttendanceDetailPanel emp={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Attendance;
