import React, { useState, useMemo } from 'react';
import { bonuses as initialBonuses } from '../../data/bonuses';
import { employees } from '../../data/employees';
import { IndianRupee, CheckCircle, XCircle, Clock, ChevronRight, X, TrendingUp, Users, Filter, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const getEmployee = (id) => employees.find(e => e.id === id);

const STATUS = {
  Approved: { color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300', icon: <CheckCircle size={14} /> },
  Pending:  { color: 'text-amber-500',   bg: 'bg-amber-50 dark:bg-amber-900/20',   badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',   icon: <Clock size={14} /> },
  Rejected: { color: 'text-red-500',     bg: 'bg-red-50 dark:bg-red-900/20',       badge: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',           icon: <XCircle size={14} /> },
};

// ─── Add Bonus Modal ──────────────────────────────────────────────────────────
const AddBonusModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({ employeeId: '', type: 'Performance Bonus', amount: '', reason: '' });
  const [sub, setSub] = useState(false);
  const types = ['Performance Bonus','Project Completion Bonus','Referral Bonus','Annual Retention Bonus','Innovation Bonus','Spot Bonus'];
  const inp = "w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all";
  const lbl = "block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5";

  const handle = (e) => {
    e.preventDefault();
    if (!form.employeeId || !form.amount || !form.reason) { toast.error('Fill all fields.'); return; }
    setSub(true);
    setTimeout(() => {
      onAdd({ id: `BON${Date.now()}`, ...form, amount: parseInt(form.amount), status: 'Pending', date: new Date().toISOString().split('T')[0], reviewedBy: null, reviewedOn: null });
      toast.success('Bonus request created!');
      onClose();
    }, 400);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ opacity: 0, scale: 0.93, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-primary/10 to-secondary/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg"><IndianRupee className="text-white" size={18} /></div>
              <div><h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">New Bonus Request</h2><p className="text-xs text-slate-500">Create a pending bonus for review</p></div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"><X size={18} /></button>
          </div>
        </div>
        <form onSubmit={handle} className="p-6 space-y-4">
          <div><label className={lbl}>Employee *</label>
            <select value={form.employeeId} onChange={e => setForm(p => ({...p, employeeId: e.target.value}))} className={`${inp} appearance-none`} required>
              <option value="">— Choose —</option>
              {employees.map(e => <option key={e.id} value={e.id}>{e.name} ({e.id})</option>)}
            </select>
          </div>
          <div><label className={lbl}>Bonus Type *</label>
            <select value={form.type} onChange={e => setForm(p => ({...p, type: e.target.value}))} className={`${inp} appearance-none`}>
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div><label className={lbl}>Amount (₹) *</label>
            <input type="number" min="1" value={form.amount} onChange={e => setForm(p => ({...p, amount: e.target.value}))} placeholder="e.g. 10000" className={inp} required />
          </div>
          <div><label className={lbl}>Reason *</label>
            <textarea value={form.reason} onChange={e => setForm(p => ({...p, reason: e.target.value}))} placeholder="Why this bonus?" className={`${inp} resize-none h-20`} required />
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={sub} className="btn-primary disabled:opacity-70">
              {sub ? <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>Creating...</span>
                : <span className="flex items-center gap-2"><Plus size={16}/>Create Request</span>}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// ─── Employee Detail Panel ────────────────────────────────────────────────────
const EmployeePanel = ({ emp, bonuses, onClose }) => {
  const empBonuses = bonuses.filter(b => b.employeeId === emp.id);
  const approved = empBonuses.filter(b => b.status === 'Approved');
  const totalApproved = approved.reduce((s, b) => s + b.amount, 0);

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      className="glass-card space-y-5 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <img src={emp.avatar} alt={emp.name} className="w-14 h-14 rounded-2xl border-2 border-primary/30 object-cover shadow-lg" />
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white font-display text-lg">{emp.name}</h3>
            <p className="text-xs text-slate-500">{emp.id} · {emp.department}</p>
            <p className="text-xs text-slate-400">{emp.role}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><X size={18} /></button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-emerald-500/10 border border-emerald-500/15 rounded-2xl p-3 text-center">
          <p className="text-2xl font-black text-emerald-500 font-display">₹{(totalApproved/1000).toFixed(0)}k</p>
          <p className="text-xs text-slate-500">Approved</p>
        </div>
        <div className="bg-primary/10 border border-primary/15 rounded-2xl p-3 text-center">
          <p className="text-2xl font-black text-primary font-display">{empBonuses.length}</p>
          <p className="text-xs text-slate-500">Total</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/15 rounded-2xl p-3 text-center">
          <p className="text-2xl font-black text-amber-500 font-display">{empBonuses.filter(b=>b.status==='Pending').length}</p>
          <p className="text-xs text-slate-500">Pending</p>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <IndianRupee size={14} className="text-primary" />
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Bonus History</h4>
          <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{empBonuses.length}</span>
        </div>
        {empBonuses.length === 0 ? (
          <div className="text-center py-6 text-slate-400"><IndianRupee size={28} className="mx-auto mb-2 opacity-40" /><p className="text-sm">No bonus records</p></div>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-1">
            {empBonuses.map((b, i) => {
              const s = STATUS[b.status];
              return (
                <motion.div key={b.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-800 dark:text-white">{b.type}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${s.badge}`}>{s.icon}{b.status}</span>
                  </div>
                  <p className="text-xs text-slate-500">{b.reason}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-primary">₹{b.amount.toLocaleString()}</span>
                    <span className="text-xs text-slate-400">{b.date}</span>
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
const Bonus = () => {
  const [bonuses, setBonuses] = useState(initialBonuses);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);

  const handleApprove = (id) => {
    setBonuses(prev => prev.map(b => b.id === id ? { ...b, status: 'Approved', reviewedBy: 'Admin', reviewedOn: new Date().toISOString().split('T')[0] } : b));
    toast.success('Bonus approved!');
  };
  const handleReject = (id) => {
    setBonuses(prev => prev.map(b => b.id === id ? { ...b, status: 'Rejected', reviewedBy: 'Admin', reviewedOn: new Date().toISOString().split('T')[0] } : b));
    toast.error('Bonus rejected.');
  };
  const handleAdd = (b) => setBonuses(prev => [b, ...prev]);

  const filtered = useMemo(() => bonuses.filter(b => statusFilter === 'all' || b.status === statusFilter), [bonuses, statusFilter]);

  const stats = useMemo(() => ({
    total: bonuses.reduce((s, b) => s + b.amount, 0),
    approved: bonuses.filter(b => b.status === 'Approved').reduce((s, b) => s + b.amount, 0),
    pending: bonuses.filter(b => b.status === 'Pending').length,
  }), [bonuses]);

  return (
    <div className="space-y-6">
      <AnimatePresence>{showModal && <AddBonusModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}</AnimatePresence>

      {/* Header */}
      <div className="glass-card relative overflow-hidden bg-gradient-to-r from-primary/10 via-secondary/5 to-transparent border-primary/20">
        <div className="absolute -right-10 -top-10 w-44 h-44 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white font-display">Bonus Management</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Review, approve, and track employee bonus requests.</p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-primary shadow-lg shadow-primary/25"><Plus size={16} /> New Bonus</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card flex items-center gap-4 py-4">
          <div className="p-3 bg-primary/10 text-primary rounded-xl"><IndianRupee size={22} /></div>
          <div><p className="text-xs text-slate-500">Total Value</p><p className="text-2xl font-bold text-slate-900 dark:text-white">₹{(stats.total/1000).toFixed(0)}k</p></div>
        </div>
        <div className="glass-card flex items-center gap-4 py-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl"><CheckCircle size={22} /></div>
          <div><p className="text-xs text-slate-500">Approved</p><p className="text-2xl font-bold text-slate-900 dark:text-white">₹{(stats.approved/1000).toFixed(0)}k</p></div>
        </div>
        <div className="glass-card flex items-center gap-4 py-4">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl"><Clock size={22} /></div>
          <div><p className="text-xs text-slate-500">Pending</p><p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.pending}</p></div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {[['all','All'],['Pending','Pending'],['Approved','Approved'],['Rejected','Rejected']].map(([val,label]) => (
          <button key={val} onClick={() => setStatusFilter(val)}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all
              ${statusFilter===val ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-primary/40'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className={`grid gap-6 ${selectedEmp ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>

        {/* Bonus Table */}
        <div className="glass-card p-0 overflow-hidden">
          <div className="p-5 border-b border-slate-200 dark:border-slate-700/60">
            <h2 className="font-bold text-slate-900 dark:text-white">Bonus Requests</h2>
            <p className="text-xs text-slate-500 mt-0.5">Click an employee avatar to view their full bonus history</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead><tr className="bg-slate-50/50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-5 py-3">Employee</th><th className="px-5 py-3">Type</th><th className="px-5 py-3">Amount</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Date</th><th className="px-5 py-3 text-right">Actions</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {filtered.map((b, i) => {
                  const emp = getEmployee(b.employeeId);
                  const s = STATUS[b.status];
                  const isSelected = selectedEmp?.id === b.employeeId;
                  return (
                    <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                      className={`transition-colors ${isSelected ? 'bg-primary/5' : 'hover:bg-slate-50 dark:hover:bg-slate-800/20'}`}>
                      <td className="px-5 py-3">
                        <button onClick={() => setSelectedEmp(prev => prev?.id === b.employeeId ? null : emp)}
                          className="flex items-center gap-2.5 group">
                          {emp && <img src={emp.avatar} className={`w-9 h-9 rounded-xl object-cover border-2 transition-all ${isSelected ? 'border-primary ring-2 ring-primary/30' : 'border-slate-200 dark:border-slate-700 group-hover:border-primary/40'}`} alt="" />}
                          <div className="text-left">
                            <p className="font-semibold text-slate-900 dark:text-white text-xs">{emp?.name}</p>
                            <p className="text-xs text-slate-400">{b.employeeId}</p>
                          </div>
                        </button>
                      </td>
                      <td className="px-5 py-3 text-slate-600 dark:text-slate-400 text-xs max-w-[140px]">
                        <p className="font-medium">{b.type}</p>
                        <p className="text-slate-400 truncate text-xs">{b.reason}</p>
                      </td>
                      <td className="px-5 py-3 font-bold text-primary">₹{b.amount.toLocaleString()}</td>
                      <td className="px-5 py-3">
                        <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full w-fit ${s.badge}`}>{s.icon}{b.status}</span>
                      </td>
                      <td className="px-5 py-3 text-xs text-slate-400">{b.date}</td>
                      <td className="px-5 py-3 text-right">
                        {b.status === 'Pending' ? (
                          <div className="flex justify-end gap-1.5">
                            <button onClick={() => handleApprove(b.id)}
                              className="p-1.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/10 dark:hover:bg-emerald-900/30 text-emerald-500 hover:text-emerald-600 rounded-lg transition-colors" title="Approve">
                              <CheckCircle size={16} />
                            </button>
                            <button onClick={() => handleReject(b.id)}
                              className="p-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/10 dark:hover:bg-red-900/30 text-red-500 hover:text-red-600 rounded-lg transition-colors" title="Reject">
                              <XCircle size={16} />
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">{b.reviewedOn || '—'}</span>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-slate-400"><IndianRupee size={28} className="mx-auto mb-2 opacity-40" /><p className="text-sm">No bonus records found</p></div>
          )}
        </div>

        {/* Employee Detail Panel */}
        <AnimatePresence>
          {selectedEmp && <EmployeePanel emp={selectedEmp} bonuses={bonuses} onClose={() => setSelectedEmp(null)} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Bonus;
