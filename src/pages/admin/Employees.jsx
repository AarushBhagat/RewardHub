import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Plus, Edit, Trash2, X, User, Users, Mail, Building, Briefcase, Award, IndianRupee, CheckCircle, Clock, Star, MessageSquare, ChevronRight, Shield, TrendingUp } from 'lucide-react';
import { employees as initialEmployees } from '../../data/employees';
import { rewards } from '../../data/rewards';
import { bonuses } from '../../data/bonuses';
import { attendance } from '../../data/attendance';
import { performance } from '../../data/performance';
import { badges } from '../../data/badges';
import { feedback } from '../../data/feedback';
import toast from 'react-hot-toast';

const DEPARTMENTS = ['Engineering', 'Marketing', 'Design', 'HR', 'Sales', 'Finance', 'Operations'];
const TIERS = ['Bronze', 'Silver', 'Gold', 'Diamond'];

const AddEmployeeModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    department: 'Engineering',
    role: '',
    tier: 'Bronze',
    points: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.role) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);
    // Simulate a brief async action
    setTimeout(() => {
      const newEmployee = {
        ...form,
        id: `EMP${String(Math.floor(Math.random() * 900) + 100)}`,
        points: parseInt(form.points) || 0,
        avatar: `https://i.pravatar.cc/150?u=${form.email}`,
      };
      onAdd(newEmployee);
      toast.success(`${form.name} has been added successfully!`);
      onClose();
    }, 500);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm";
  const labelClass = "block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-primary/5 to-secondary/5">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">Add New Employee</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Fill in the details to onboard a new team member.</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className={labelClass}>Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Priya Sharma" className={`${inputClass} pl-10`} required />
                </div>
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <label className={labelClass}>Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="priya@company.com" className={`${inputClass} pl-10`} required />
                </div>
              </div>

              {/* Department */}
              <div>
                <label className={labelClass}>Department *</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select name="department" value={form.department} onChange={handleChange} className={`${inputClass} pl-10 appearance-none`}>
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              {/* Role */}
              <div>
                <label className={labelClass}>Job Role *</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input name="role" value={form.role} onChange={handleChange} placeholder="e.g. Senior Developer" className={`${inputClass} pl-10`} required />
                </div>
              </div>

              {/* Tier */}
              <div>
                <label className={labelClass}>Reward Tier</label>
                <select name="tier" value={form.tier} onChange={handleChange} className={`${inputClass} appearance-none`}>
                  {TIERS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Starting Points */}
              <div>
                <label className={labelClass}>Starting Points</label>
                <input name="points" type="number" min="0" value={form.points} onChange={handleChange} placeholder="0" className={inputClass} />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 mt-4">
              <button type="button" onClick={onClose} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-70 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Adding...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Plus size={16} />
                    Add Employee
                  </div>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Employee Detail Panel ────────────────────────────────────────────────────
const EmployeeDetailPanel = ({ emp, onClose }) => {
  const empRewards = rewards.filter(r => r.employeeId === emp.id);
  const empBonuses = bonuses.filter(b => b.employeeId === emp.id);
  const empAttendance = attendance.filter(a => a.employeeId === emp.id);
  const empPerf = performance.filter(p => p.employeeId === emp.id);
  const empBadges = badges.filter(b => b.earnedBy.includes(emp.id));
  const empFeedback = feedback.filter(f => f.toId === emp.id);
  const latestPerf = empPerf[empPerf.length - 1];
  const approvedBonus = empBonuses.filter(b => b.status === 'Approved').reduce((s, b) => s + b.amount, 0);
  const attendRate = empAttendance.length > 0 ? Math.round(empAttendance.filter(a => a.status === 'Present' || a.status === 'Remote').length / empAttendance.length * 100) : 0;
  const avgRating = empFeedback.length > 0 ? (empFeedback.reduce((s, f) => s + f.rating, 0) / empFeedback.length).toFixed(1) : '0.0';

  const TIER = { Diamond: 'from-cyan-500 to-blue-500 shadow-cyan-500/20', Gold: 'from-amber-400 to-orange-500 shadow-amber-500/20', Silver: 'from-slate-300 to-slate-500 shadow-slate-500/20', Bronze: 'from-orange-400 to-red-500 shadow-orange-500/20' };

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      className="glass-card space-y-6 relative overflow-hidden lg:sticky lg:top-24 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar p-6">
      
      {/* Glow Effects */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Header Section */}
      <div className="flex items-center justify-between relative z-20">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <img src={emp.avatar} alt={emp.name} className="w-20 h-20 rounded-[24px] border-4 border-white dark:border-slate-800 object-cover shadow-2xl transition-transform group-hover:scale-105" />
            <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-gradient-to-br ${TIER[emp.tier]} flex items-center justify-center text-white shadow-lg border-2 border-white dark:border-slate-900`}>
              <Award size={14} />
            </div>
          </div>
          <div>
            <h3 className="font-black text-slate-900 dark:text-white font-display text-2xl tracking-tight">{emp.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500">{emp.id}</span>
              <span className="text-sm font-medium text-slate-400">{emp.department} • {emp.role}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5"><Mail size={12} /> {emp.email}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2.5 rounded-2xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
          <X size={20} />
        </button>
      </div>

      {/* Hero Stats Card - Attendance Style */}
      <div className="bg-slate-950/40 dark:bg-slate-900/40 border border-white/5 rounded-[32px] p-6 relative overflow-hidden backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="text-center md:text-left flex-1">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Rewards</p>
            <div className="flex items-baseline gap-1">
              <span className="text-6xl font-black text-primary font-display tracking-tighter">{emp.points.toLocaleString()}</span>
              <span className="text-xl font-bold text-slate-500">pts</span>
            </div>
          </div>
          
          <div className="w-px h-16 bg-slate-800 hidden md:block" />
          
          <div className="grid grid-cols-2 gap-3 flex-1 w-full">
            <div className="bg-emerald-500/10 border border-emerald-500/10 rounded-2xl p-3 text-center transition-all hover:bg-emerald-500/15">
              <p className="text-xl font-black text-emerald-500 font-display">{attendRate}%</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Attendance</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/10 rounded-2xl p-3 text-center transition-all hover:bg-amber-500/15">
              <p className="text-xl font-black text-amber-500 font-display">{latestPerf?.score || '—'}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Perf Score</p>
            </div>
            <div className="bg-primary/10 border border-primary/10 rounded-2xl p-3 text-center transition-all hover:bg-primary/15">
              <p className="text-lg font-black text-primary font-display">₹{(approvedBonus/1000).toFixed(0)}k</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Bonuses</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/10 rounded-2xl p-3 text-center transition-all hover:bg-blue-500/15">
              <p className="text-xl font-black text-blue-500 font-display">{empBadges.length}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Badges</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Summary Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <TrendingUp size={16} className="text-primary" /> Performance Overview
          </h4>
          <span className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary rounded-full">Updated Today</span>
        </div>
        
        {/* Badges Carousel Style */}
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {empBadges.map(b => (
            <div key={b.id} className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60 rounded-xl shrink-0 transition-all hover:border-primary/30">
              <span className="text-xl">{b.icon}</span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{b.name}</span>
            </div>
          ))}
          {empBadges.length === 0 && <p className="text-xs text-slate-400 italic">No badges earned yet.</p>}
        </div>
      </div>

      {/* History Sections - Polished List Style */}
      <div className="space-y-6">
        
        {/* Bonus Records */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <IndianRupee size={12} /> Bonus History
            </h4>
            <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg text-slate-500">{empBonuses.length} ENTRIES</span>
          </div>
          <div className="space-y-2">
            {empBonuses.slice(0, 3).map(b => (
              <div key={b.id} className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-700/50 hover:border-primary/20 transition-all group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${b.status==='Approved'?'bg-emerald-500/10 text-emerald-500':'bg-amber-500/10 text-amber-500'}`}>
                  {b.status === 'Approved' ? <CheckCircle size={18} /> : <Clock size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{b.type}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{b.date} • {b.reason}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-primary font-display">₹{b.amount.toLocaleString()}</p>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${b.status==='Approved'?'text-emerald-500':'text-amber-500'}`}>{b.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feedback Section */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <MessageSquare size={12} /> Peer Feedback
            </h4>
            <div className="flex items-center gap-1">
              <Star size={10} className="text-amber-400 fill-amber-400" />
              <span className="text-xs font-black text-slate-800 dark:text-white">{avgRating}</span>
            </div>
          </div>
          <div className="space-y-3">
            {empFeedback.map(f => (
              <div key={f.id} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-700/30 space-y-2 relative overflow-hidden group">
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px]">{f.fromName[0]}</div>
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">From {f.fromName}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_,i)=><Star key={i} size={10} className={i<f.rating?'text-amber-400 fill-amber-400':'text-slate-300 dark:text-slate-600'}/>)}
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">"{f.comment}"</p>
                <p className="text-[10px] text-slate-400">{f.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reward History */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <Award size={12} /> Reward Logs
            </h4>
            <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg text-slate-500">{empRewards.length} ENTRIES</span>
          </div>
          <div className="space-y-2">
            {empRewards.slice(0, 5).map(r => (
              <div key={r.id} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-700/50 hover:border-primary/20 transition-all">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{r.reason}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{r.date} • Issued by {r.issuedBy}</p>
                </div>
                <span className="text-sm font-black text-emerald-500">+{r.points} pts</span>
              </div>
            ))}
          </div>
        </section>

        {/* Attendance History */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <CheckCircle size={12} /> Recent Presence
            </h4>
            <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg text-slate-500">{empAttendance.length} RECORDS</span>
          </div>
          <div className="space-y-2 pb-4">
            {empAttendance.slice(0, 5).map((a, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-700/50 hover:border-primary/20 transition-all">
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800 dark:text-white">{a.date}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{a.checkIn ? `Checked in at ${a.checkIn}` : 'Remote/No Check-in'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider ${a.status==='Present'?'bg-emerald-500/10 text-emerald-500':a.status==='Late'?'bg-amber-500/10 text-amber-500':a.status==='Remote'?'bg-primary/10 text-primary':'bg-red-500/10 text-red-500'}`}>{a.status}</span>
                  <span className={`text-xs font-bold ${a.scoreImpact >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>{a.scoreImpact >= 0 ? '+' : ''}{a.scoreImpact}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </motion.div>
  );
};

const Employees = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = (newEmp) => {
    setEmployees(prev => [...prev, newEmp]);
  };

  const handleDelete = (id) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
    toast.success('Employee removed.');
  };

  return (
    <div className="space-y-6">
      <AnimatePresence>{showModal && <AddEmployeeModal onClose={() => setShowModal(false)} onAdd={handleAddEmployee} />}</AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white font-display">Employee Directory</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Manage your team and view comprehensive performance profiles.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary shadow-lg shadow-primary/25">
          <Plus size={18} />
          Add Employee
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card flex items-center gap-4 border-l-4 border-l-primary">
          <div className="p-3 bg-primary/10 text-primary rounded-xl"><Users size={20} /></div>
          <div><p className="text-xs text-slate-500">Total Team</p><p className="text-xl font-bold text-slate-900 dark:text-white">{employees.length}</p></div>
        </div>
        <div className="glass-card flex items-center gap-4 border-l-4 border-l-cyan-500">
          <div className="p-3 bg-cyan-500/10 text-cyan-500 rounded-xl"><Award size={20} /></div>
          <div><p className="text-xs text-slate-500">Diamond Tier</p><p className="text-xl font-bold text-slate-900 dark:text-white">{employees.filter(e=>e.tier==='Diamond').length}</p></div>
        </div>
        <div className="glass-card flex items-center gap-4 border-l-4 border-l-emerald-500">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl"><TrendingUp size={20} /></div>
          <div><p className="text-xs text-slate-500">Top Dept</p><p className="text-xl font-bold text-slate-900 dark:text-white">Eng.</p></div>
        </div>
        <div className="glass-card flex items-center gap-4 border-l-4 border-l-amber-500">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl"><IndianRupee size={20} /></div>
          <div><p className="text-xs text-slate-500">Avg Points</p><p className="text-xl font-bold text-slate-900 dark:text-white">{(employees.reduce((s,e)=>s+e.points,0)/employees.length).toFixed(0)}</p></div>
        </div>
      </div>

      <div className={`grid gap-6 transition-all duration-300 items-start ${selectedEmp ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
      <div className="glass-card p-0 overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg leading-5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all sm:text-sm"
              placeholder="Search by name or department..."
            />
          </div>
          <button className="btn-secondary whitespace-nowrap">
            <Filter size={18} />
            Filter
          </button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {filteredEmployees.map((emp, index) => {
            const isSelected = selectedEmp?.id === emp.id;
            return (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
                key={emp.id}
                className={`flex items-center gap-4 px-5 py-4 transition-all duration-200 group relative
                  ${isSelected ? 'bg-primary/5 border-l-[4px] border-primary' : 'hover:bg-slate-50 dark:hover:bg-slate-800/30 border-l-[4px] border-transparent'}`}
              >
                {/* Click Area */}
                <div 
                  onClick={() => setSelectedEmp(prev => prev?.id === emp.id ? null : emp)}
                  className="flex-1 flex items-center gap-4 cursor-pointer min-w-0"
                >
                  <div className="relative shrink-0">
                    <img className={`h-12 w-12 rounded-2xl border-2 transition-all object-cover ${isSelected ? 'border-primary shadow-lg shadow-primary/20' : 'border-slate-200 dark:border-slate-700'}`} src={emp.avatar} alt="" />
                    <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 
                      ${emp.tier === 'Diamond' ? 'bg-cyan-400' : emp.tier === 'Gold' ? 'bg-amber-400' : emp.tier === 'Silver' ? 'bg-slate-300' : 'bg-orange-400'}`} 
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base font-display truncate">{emp.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="truncate">{emp.role}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                      <span className="truncate">{emp.department}</span>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-6 shrink-0 ml-4">
                    <div className="text-right">
                      <p className="font-black text-primary text-sm font-display">{emp.points.toLocaleString()}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-tighter">Points</p>
                    </div>
                    <ChevronRight size={16} className={`text-slate-300 transition-all ${isSelected ? 'rotate-90 text-primary' : 'group-hover:translate-x-1'}`} />
                  </div>
                </div>

                {/* Actions (Always visible on hover, or in a specific area) */}
                <div className="flex items-center gap-1.5 ml-2">
                  <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all">
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(emp.id); }}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-xl transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            );
          })}

          {filteredEmployees.length === 0 && (
            <div className="p-12 text-center">
              <User className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500 dark:text-slate-400 font-medium">No employees found</p>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Try a different search or add a new employee.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-sm text-slate-500">
          <span>Showing {filteredEmployees.length} of {employees.length} employees</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md bg-primary text-white">1</button>
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>

      {/* Employee Detail Panel */}
      <AnimatePresence>
        {selectedEmp && <EmployeeDetailPanel emp={selectedEmp} onClose={() => setSelectedEmp(null)} />}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default Employees;
