import React, { useState, useMemo } from 'react';
import { feedback as initialFeedback } from '../../data/feedback';
import { employees } from '../../data/employees';
import { MessageSquare, Star, Plus, X, Search, ChevronRight, Users, Shield, ArrowRight, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getEmployee = (id) => employees.find(e => e.id === id);

const StarRating = ({ value, onChange }) => (
  <div className="flex gap-1">
    {[1,2,3,4,5].map(n => (
      <button key={n} type={onChange ? 'button' : undefined}
        onClick={() => onChange && onChange(n)}
        className={`transition-transform ${onChange ? 'hover:scale-125 cursor-pointer' : 'cursor-default'}`}>
        <Star size={20}
          className={n <= value ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'}
        />
      </button>
    ))}
  </div>
);

// ─── Give Review Modal ────────────────────────────────────────────────────────
const GiveReviewModal = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({ toId: '', rating: 0, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.toId || form.rating === 0 || !form.comment) {
      toast.error('Please fill in all fields and give a star rating.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const emp = getEmployee(form.toId);
      onSubmit({
        id: `F${Date.now()}`,
        fromId: 'Admin',
        fromName: 'Admin',
        toId: form.toId,
        rating: form.rating,
        comment: form.comment,
        date: new Date().toISOString().split('T')[0],
        type: 'admin'
      });
      toast.success(`Review submitted for ${emp?.name}!`);
      onClose();
    }, 500);
  };

  const inp = "w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all";
  const lbl = "block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ opacity: 0, scale: 0.93, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 20 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">

        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-primary/10 to-secondary/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <MessageSquare className="text-white" size={18} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">Give a Review</h2>
                <p className="text-xs text-slate-500">Submit feedback visible to the employee</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <X size={18} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className={lbl}>For Employee *</label>
            <select value={form.toId} onChange={e => setForm(p => ({ ...p, toId: e.target.value }))}
              className={`${inp} appearance-none`} required>
              <option value="">— Choose Employee —</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name} ({emp.id})</option>
              ))}
            </select>
          </div>

          {form.toId && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/10 rounded-xl">
              {(() => { const e = getEmployee(form.toId); return e ? (
                <>
                  <img src={e.avatar} className="w-10 h-10 rounded-xl object-cover border border-primary/20" alt="" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{e.name}</p>
                    <p className="text-xs text-slate-500">{e.department} · {e.role}</p>
                  </div>
                </>
              ) : null; })()}
            </motion.div>
          )}

          <div>
            <label className={lbl}>Star Rating *</label>
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <StarRating value={form.rating} onChange={r => setForm(p => ({ ...p, rating: r }))} />
              <span className="text-sm text-slate-500 ml-2">
                {form.rating === 0 ? 'Click to rate' : ['','Poor','Fair','Good','Great','Excellent'][form.rating]}
              </span>
            </div>
          </div>

          <div>
            <label className={lbl}>Your Feedback *</label>
            <textarea value={form.comment} onChange={e => setForm(p => ({ ...p, comment: e.target.value }))}
              placeholder="Share your honest and constructive feedback..."
              className={`${inp} resize-none h-28`} required />
            <p className="text-xs text-slate-400 mt-1">This review will be visible to {form.toId ? getEmployee(form.toId)?.name : 'the employee'}.</p>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-70">
              {isSubmitting
                ? <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Submitting...</span>
                : <span className="flex items-center gap-2"><MessageSquare size={15} />Submit Review</span>}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// ─── Feedback Card ────────────────────────────────────────────────────────────
const FeedbackCard = ({ item, onClick, isSelected }) => {
  const toEmp = getEmployee(item.toId);
  const fromEmp = item.fromId !== 'Admin' ? getEmployee(item.fromId) : null;
  const isPeer = item.type === 'peer';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      onClick={() => onClick(item)}
      className={`glass-card cursor-pointer transition-all duration-200 group relative overflow-hidden
        ${isSelected ? 'ring-2 ring-primary shadow-lg shadow-primary/15 scale-[1.01]' : 'hover:border-primary/30 hover:shadow-md hover:scale-[1.005]'}`}>

      {/* Peer / Admin badge */}
      <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-0.5 rounded-full
        ${isPeer ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-primary/10 text-primary'}`}>
        {isPeer ? '🤝 Peer' : '🛡️ Admin'}
      </span>

      {/* From → To */}
      <div className="flex items-center gap-2 mb-4 pr-20">
        {fromEmp ? (
          <img src={fromEmp.avatar} className="w-8 h-8 rounded-lg object-cover border border-slate-200 dark:border-slate-700" alt="" />
        ) : (
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield size={14} className="text-primary" />
          </div>
        )}
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{item.fromName}</span>
        <ArrowRight size={12} className="text-slate-400 shrink-0" />
        {toEmp && <img src={toEmp.avatar} className="w-8 h-8 rounded-lg object-cover border border-slate-200 dark:border-slate-700" alt="" />}
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 truncate">{toEmp?.name}</span>
      </div>

      {/* Stars */}
      <StarRating value={item.rating} />

      {/* Comment */}
      <div className="mt-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/40 rounded-xl p-3">
        <p className="text-sm text-slate-600 dark:text-slate-300 italic line-clamp-3">"{item.comment}"</p>
      </div>

      <p className="text-xs text-slate-400 mt-3">{item.date}</p>
    </motion.div>
  );
};

// ─── Employee Detail Panel ────────────────────────────────────────────────────
const EmployeeDetailPanel = ({ emp, allFeedback, onClose }) => {
  const received = allFeedback.filter(f => f.toId === emp.id);
  const given    = allFeedback.filter(f => f.fromId === emp.id);
  const avgRating = received.length > 0
    ? (received.reduce((s, f) => s + f.rating, 0) / received.length).toFixed(1)
    : '—';

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      className="glass-card space-y-5 relative overflow-hidden">

      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <img src={emp.avatar} alt={emp.name} className="w-14 h-14 rounded-2xl border-2 border-primary/30 object-cover shadow-lg" />
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white font-display text-lg">{emp.name}</h3>
            <p className="text-xs text-slate-500">{emp.id} · {emp.department}</p>
            <p className="text-xs text-slate-400 mt-0.5">{emp.role}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-amber-500/10 border border-amber-500/15 rounded-2xl p-3 text-center">
          <p className="text-2xl font-black text-amber-500 font-display">{avgRating}</p>
          <p className="text-xs text-slate-500 mt-0.5">Avg Rating</p>
        </div>
        <div className="bg-primary/10 border border-primary/15 rounded-2xl p-3 text-center">
          <p className="text-2xl font-black text-primary font-display">{received.length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Received</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/15 rounded-2xl p-3 text-center">
          <p className="text-2xl font-black text-emerald-500 font-display">{given.length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Given</p>
        </div>
      </div>

      {/* Reviews Received */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare size={14} className="text-primary" />
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Reviews Received</h4>
          <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{received.length}</span>
        </div>
        {received.length === 0 ? (
          <p className="text-sm text-slate-400 italic text-center py-4">No reviews yet.</p>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
            {received.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {f.fromId !== 'Admin' ? (
                      <img src={getEmployee(f.fromId)?.avatar} className="w-6 h-6 rounded-lg object-cover" alt="" />
                    ) : (
                      <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Shield size={10} className="text-primary" />
                      </div>
                    )}
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{f.fromName}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium
                      ${f.type === 'peer' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-primary/10 text-primary'}`}>
                      {f.type === 'peer' ? 'Peer' : 'Admin'}
                    </span>
                  </div>
                  <StarRating value={f.rating} />
                </div>
                <p className="text-xs text-slate-500 italic">"{f.comment}"</p>
                <p className="text-xs text-slate-400">{f.date}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Reviews Given */}
      {given.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ArrowRight size={14} className="text-emerald-500" />
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Reviews Given</h4>
            <span className="ml-auto text-xs bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full font-medium">{given.length}</span>
          </div>
          <div className="space-y-2 max-h-36 overflow-y-auto custom-scrollbar pr-1">
            {given.map((f, i) => {
              const toEmp = getEmployee(f.toId);
              return (
                <div key={i} className="flex items-center gap-3 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/40">
                  {toEmp && <img src={toEmp.avatar} className="w-8 h-8 rounded-lg object-cover" alt="" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 dark:text-white">{toEmp?.name}</p>
                    <p className="text-xs text-slate-500 truncate">"{f.comment}"</p>
                  </div>
                  <StarRating value={f.rating} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState(initialFeedback);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'peer' | 'admin'
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const handleSubmit = (newFeedback) => setFeedbackList(prev => [newFeedback, ...prev]);

  const filtered = useMemo(() => feedbackList.filter(f => {
    const matchType = typeFilter === 'all' || f.type === typeFilter;
    const q = searchTerm.toLowerCase();
    const toEmp = getEmployee(f.toId);
    const matchSearch = !searchTerm
      || f.fromName.toLowerCase().includes(q)
      || toEmp?.name.toLowerCase().includes(q)
      || f.comment.toLowerCase().includes(q);
    return matchType && matchSearch;
  }), [feedbackList, typeFilter, searchTerm]);

  const avgRating = feedbackList.length
    ? (feedbackList.reduce((s, f) => s + f.rating, 0) / feedbackList.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {showModal && <GiveReviewModal onClose={() => setShowModal(false)} onSubmit={handleSubmit} />}
      </AnimatePresence>

      {/* Header */}
      <div className="glass-card relative overflow-hidden bg-gradient-to-r from-primary/10 via-secondary/5 to-transparent border-primary/20">
        <div className="absolute -right-10 -top-10 w-44 h-44 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white font-display">Feedback System</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Peer-to-peer and admin reviews — visible to each employee.</p>
            <div className="flex items-center gap-4 mt-3">
              <span className="flex items-center gap-1.5 text-xs text-slate-500"><MessageSquare size={12} />{feedbackList.length} reviews</span>
              <span className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold"><Star size={12} fill="currentColor" />{avgRating} avg rating</span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-semibold"><Users size={12} />{feedbackList.filter(f=>f.type==='peer').length} peer reviews</span>
            </div>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-primary shadow-lg shadow-primary/25">
            <Plus size={16} /> Give a Review
          </button>
        </div>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by name, comment..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
        </div>
        <div className="flex gap-2">
          {[['all','All'],['peer','Peer'],['admin','Admin']].map(([val, label]) => (
            <button key={val} onClick={() => setTypeFilter(val)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all border
                ${typeFilter === val
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-primary/40'
                }`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Employee Quick-Select */}
      <div className="glass-card p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700/60">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Filter by Employee — click to see their reviews</p>
        </div>
        <div className="flex gap-3 p-4 overflow-x-auto custom-scrollbar pb-4">
          {employees.map(emp => {
            const count = feedbackList.filter(f => f.toId === emp.id).length;
            const isActive = selectedEmployee?.id === emp.id;
            return (
              <button key={emp.id}
                onClick={() => setSelectedEmployee(prev => prev?.id === emp.id ? null : emp)}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all duration-200 shrink-0 min-w-[80px]
                  ${isActive ? 'bg-primary/10 border-primary/40 ring-2 ring-primary/30 scale-105' : 'border-slate-200 dark:border-slate-700 hover:border-primary/20 hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}>
                <div className="relative">
                  <img src={emp.avatar} alt={emp.name} className="w-12 h-12 rounded-xl object-cover" />
                  {count > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">{count}</span>
                  )}
                </div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 text-center leading-tight max-w-[72px] truncate">{emp.name.split(' ')[0]}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className={`grid gap-6 ${selectedEmployee ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>

        {/* Feedback Cards */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="glass-card text-center py-12">
              <MessageSquare size={32} className="mx-auto mb-3 text-slate-300 dark:text-slate-600" />
              <p className="text-slate-500 font-medium">No feedback found</p>
              <p className="text-sm text-slate-400 mt-1">Try changing filters or submit the first review.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((item, i) => (
                <FeedbackCard key={item.id} item={item}
                  onClick={() => {}}
                  isSelected={false} />
              ))}
            </div>
          )}
        </div>

        {/* Employee Detail Panel */}
        <AnimatePresence>
          {selectedEmployee && (
            <EmployeeDetailPanel
              emp={selectedEmployee}
              allFeedback={feedbackList}
              onClose={() => setSelectedEmployee(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Feedback;
