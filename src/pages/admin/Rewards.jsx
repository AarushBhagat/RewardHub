import React, { useState } from 'react';
import { rewards as initialRewards } from '../../data/rewards';
import { employees } from '../../data/employees';
import { Award, Plus, Search, X, ArrowUpRight, Zap, ChevronRight, TrendingUp, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// ─── Tier Config ─────────────────────────────────────────────────────────────
const TIER_CONFIG = {
  Diamond: {
    icon: '💎', gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    ring: 'ring-cyan-400/50', glow: 'shadow-cyan-500/20',
    badge: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300',
    color: 'text-cyan-400', next: null, nextPts: 0
  },
  Gold: {
    icon: '🥇', gradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
    ring: 'ring-amber-400/50', glow: 'shadow-amber-500/20',
    badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    color: 'text-amber-400', next: 'Diamond', nextPts: 2000
  },
  Silver: {
    icon: '🥈', gradient: 'from-slate-400/20 via-slate-300/10 to-transparent',
    ring: 'ring-slate-400/50', glow: 'shadow-slate-500/20',
    badge: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
    color: 'text-slate-400', next: 'Gold', nextPts: 1000
  },
  Bronze: {
    icon: '🥉', gradient: 'from-orange-500/20 via-amber-400/10 to-transparent',
    ring: 'ring-orange-400/50', glow: 'shadow-orange-500/20',
    badge: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
    color: 'text-orange-400', next: 'Silver', nextPts: 500
  },
};

// ─── Issue Points Modal ───────────────────────────────────────────────────────
const IssuePointsModal = ({ onClose, onIssue }) => {
  const [form, setForm] = useState({ employeeId: '', points: '', reason: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.employeeId || !form.points || !form.reason) { toast.error('Please fill in all fields.'); return; }
    setIsSubmitting(true);
    setTimeout(() => {
      onIssue({ id: `REW${Date.now()}`, employeeId: form.employeeId, points: parseInt(form.points), reason: form.reason, date: new Date().toISOString().split('T')[0], issuedBy: 'Admin', type: 'Manual' });
      const emp = employees.find(e => e.id === form.employeeId);
      toast.success(`${form.points} pts issued to ${emp?.name}!`);
      onClose();
    }, 500);
  };

  const inp = "w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all";
  const lbl = "block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ opacity: 0, scale: 0.92, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-primary/10 to-secondary/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="text-white" size={18} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">Issue Reward Points</h2>
                <p className="text-xs text-slate-500">Manually award points to a team member</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"><X size={18} /></button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className={lbl}>Select Employee *</label>
            <select value={form.employeeId} onChange={e => setForm(p => ({ ...p, employeeId: e.target.value }))} className={`${inp} appearance-none`} required>
              <option value="">— Choose Employee —</option>
              {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name} ({emp.id})</option>)}
            </select>
          </div>
          <div>
            <label className={lbl}>Points to Award *</label>
            <input type="number" min="1" max="1000" value={form.points} onChange={e => setForm(p => ({ ...p, points: e.target.value }))} placeholder="e.g. 50" className={inp} required />
          </div>
          <div>
            <label className={lbl}>Reason *</label>
            <textarea value={form.reason} onChange={e => setForm(p => ({ ...p, reason: e.target.value }))} placeholder="e.g. Outstanding performance in Q1..." className={`${inp} resize-none h-24`} required />
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-70">
              {isSubmitting ? <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Issuing...</span>
                : <span className="flex items-center gap-2"><Zap size={16} />Issue Points</span>}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// ─── Employee Detail Panel ────────────────────────────────────────────────────
const EmployeeDetailPanel = ({ emp, rewards, onClose }) => {
  const empRewards = rewards.filter(r => r.employeeId === emp.id);
  const t = TIER_CONFIG[emp.tier] || TIER_CONFIG.Bronze;
  const progress = t.nextPts ? Math.min((emp.points / t.nextPts) * 100, 100) : 100;

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      className="glass-card space-y-5 relative overflow-hidden">

      {/* Decorative glow */}
      <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${t.gradient} rounded-full blur-2xl pointer-events-none`} />

      {/* Header */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={emp.avatar} alt={emp.name} className={`w-14 h-14 rounded-2xl border-2 ${t.ring} ring-2 object-cover shadow-lg`} />
            <span className="absolute -bottom-1.5 -right-1.5 text-xl">{t.icon}</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white font-display text-lg">{emp.name}</h3>
            <p className="text-xs text-slate-500">{emp.id} · {emp.department}</p>
            <span className={`inline-block mt-1 text-xs font-bold px-2.5 py-0.5 rounded-full ${t.badge}`}>{emp.tier} Tier</span>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative z-10">
          <X size={18} />
        </button>
      </div>

      {/* Points & Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/15 rounded-2xl p-4 text-center">
          <p className="text-xs text-slate-500 mb-1 font-medium">Total Points</p>
          <p className="text-4xl font-black text-primary font-display">{emp.points.toLocaleString()}</p>
          <p className="text-xs text-slate-400 mt-1">lifetime earned</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/15 rounded-2xl p-4 text-center">
          <p className="text-xs text-slate-500 mb-1 font-medium">Transactions</p>
          <p className="text-4xl font-black text-emerald-500 font-display">{empRewards.length}</p>
          <p className="text-xs text-slate-400 mt-1">reward entries</p>
        </div>
      </div>

      {/* Tier Progress */}
      {t.next && (
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between text-xs font-medium mb-1">
            <span className={t.color}>{t.icon} {emp.tier}</span>
            <span className="text-slate-400">{TIER_CONFIG[t.next].icon} {t.next} — {t.nextPts.toLocaleString()} pts</span>
          </div>
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative">
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
            </motion.div>
          </div>
          <p className="text-xs text-slate-500 text-right">{(t.nextPts - emp.points).toLocaleString()} pts to {t.next}</p>
        </div>
      )}

      {/* Reward History */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={14} className="text-primary" />
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Point History</h4>
          <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{empRewards.length} entries</span>
        </div>
        {empRewards.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <Award size={28} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">No reward entries yet</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar pr-1">
            {empRewards.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/40 hover:border-primary/20 transition-colors">
                <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <ArrowUpRight size={14} className="text-emerald-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 dark:text-white truncate">{r.reason}</p>
                  <p className="text-xs text-slate-500">{r.date} · by {r.issuedBy}</p>
                </div>
                <span className="text-emerald-500 font-bold text-sm shrink-0 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-lg">+{r.points}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const Rewards = () => {
  const [rewards, setRewards] = useState(initialRewards);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [tierFilter, setTierFilter] = useState(null);

  const handleIssuePoints = (newReward) => setRewards(prev => [newReward, ...prev]);

  const filteredRewards = rewards.filter(r =>
    r.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleEmployees = employees.filter(e => !tierFilter || e.tier === tierFilter);
  const totalPoints = employees.reduce((s, e) => s + e.points, 0);

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {showModal && <IssuePointsModal onClose={() => setShowModal(false)} onIssue={handleIssuePoints} />}
      </AnimatePresence>

      {/* ── Hero Header ── */}
      <div className="glass-card relative overflow-hidden bg-gradient-to-r from-primary/10 via-secondary/5 to-transparent border-primary/20">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-4 -bottom-8 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white font-display">Reward Hub</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Track points, manage tiers, and recognize excellence.</p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Users size={12} />
                <span>{employees.length} employees</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-primary font-semibold">
                <Award size={12} />
                <span>{totalPoints.toLocaleString()} total pts issued</span>
              </div>
            </div>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-primary shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow">
            <Zap size={16} /> Issue Points
          </button>
        </div>
      </div>

      {/* ── Tier Filter Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(TIER_CONFIG).map(([tier, cfg], i) => {
          const count = employees.filter(e => e.tier === tier).length;
          const isActive = tierFilter === tier;
          return (
            <motion.button key={tier}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              onClick={() => setTierFilter(prev => prev === tier ? null : tier)}
              className={`relative overflow-hidden rounded-2xl p-5 text-left w-full transition-all duration-300 group border
                ${isActive
                  ? `bg-gradient-to-br ${cfg.gradient} ${cfg.ring} ring-2 shadow-xl ${cfg.glow} border-white/10 scale-105`
                  : 'glass-card hover:scale-102 border-white/5 hover:border-white/20'
                }`}>
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="flex items-start justify-between mb-3">
                <span className="text-4xl">{cfg.icon}</span>
                {isActive && (
                  <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full font-medium">Active</span>
                )}
              </div>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${isActive ? cfg.color : 'text-slate-500'}`}>{tier}</p>
              <p className={`text-3xl font-black font-display ${isActive ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{count}</p>
              <p className={`text-xs mt-1 ${isActive ? 'text-white/70' : 'text-slate-500'}`}>employees</p>
            </motion.button>
          );
        })}
      </div>

      {/* ── Main Grid: Employee List + Detail Panel ── */}
      <div className={`grid gap-6 transition-all duration-300 ${selectedEmployee ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>

        {/* Employee List Card */}
        <div className="glass-card p-0 overflow-hidden">

          {/* Search + Filter banner */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900 dark:text-white">Team Overview</h2>
                <p className="text-xs text-slate-500 mt-0.5">Click any employee to view their point details</p>
              </div>
              {tierFilter && (
                <button onClick={() => setTierFilter(null)}
                  className="flex items-center gap-1.5 text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors font-medium">
                  <X size={12} /> {tierFilter} only
                </button>
              )}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search employees or reasons..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
            </div>
          </div>

          {/* Employee Rows */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {visibleEmployees.map((emp, i) => {
              const cfg = TIER_CONFIG[emp.tier] || TIER_CONFIG.Bronze;
              const isSelected = selectedEmployee?.id === emp.id;
              return (
                <motion.button key={emp.id}
                  initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  onClick={() => setSelectedEmployee(prev => prev?.id === emp.id ? null : emp)}
                  className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-200 group
                    ${isSelected
                      ? 'bg-primary/8 border-l-[3px] border-primary'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/30 border-l-[3px] border-transparent'
                    }`}>

                  {/* Rank number */}
                  <span className="text-xs text-slate-400 font-mono w-4 shrink-0">{i + 1}</span>

                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <img src={emp.avatar} alt={emp.name}
                      className={`w-11 h-11 rounded-xl object-cover border-2 transition-all ${isSelected ? `${cfg.ring} ring-2` : 'border-slate-200 dark:border-slate-700'}`} />
                    <span className="absolute -bottom-1.5 -right-1.5 text-base">{cfg.icon}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-white text-sm truncate">{emp.name}</p>
                    <p className="text-xs text-slate-500 truncate">{emp.id} · {emp.department} · {emp.role}</p>
                  </div>

                  {/* Points + Tier */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <p className={`font-black text-base font-display ${cfg.color}`}>{emp.points.toLocaleString()}</p>
                      <p className="text-xs text-slate-400">points</p>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full hidden sm:block ${cfg.badge}`}>{emp.tier}</span>
                    <ChevronRight size={16}
                      className={`text-slate-400 transition-all duration-200 ${isSelected ? 'rotate-90 text-primary' : 'group-hover:translate-x-0.5'}`} />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Recent Issuances table */}
          <div className="border-t border-slate-200 dark:border-slate-700/60">
            <div className="px-5 py-4 flex items-center gap-2">
              <TrendingUp size={14} className="text-primary" />
              <h3 className="font-semibold text-slate-800 dark:text-white text-sm">Recent Issuances</h3>
              <span className="ml-auto text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full">{filteredRewards.length} records</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                    <th className="px-5 py-3 text-left">Employee</th>
                    <th className="px-5 py-3 text-left">Reason</th>
                    <th className="px-5 py-3 text-left">Points</th>
                    <th className="px-5 py-3 text-left">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {filteredRewards.map((r, i) => {
                    const emp = employees.find(e => e.id === r.employeeId);
                    return (
                      <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            {emp && <img src={emp.avatar} className="w-7 h-7 rounded-lg object-cover" alt="" />}
                            <span className="font-medium text-slate-800 dark:text-white text-xs">{r.employeeId}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-slate-500 dark:text-slate-400 max-w-[180px] truncate text-xs">{r.reason}</td>
                        <td className="px-5 py-3">
                          <span className="text-emerald-500 font-bold text-xs flex items-center gap-0.5">
                            <ArrowUpRight size={12} />+{r.points}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-slate-400 text-xs">{r.date}</td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selectedEmployee && (
            <EmployeeDetailPanel emp={selectedEmployee} rewards={rewards} onClose={() => setSelectedEmployee(null)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Rewards;
