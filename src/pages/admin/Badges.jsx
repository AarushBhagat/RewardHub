import React, { useState } from 'react';
import { badges as initialBadges } from '../../data/badges';
import { employees } from '../../data/employees';
import { Shield, Plus, Edit2, X, Trash2, Users, Award, Zap, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// ─── Emoji options for badge picker ──────────────────────────────────────────
const EMOJI_OPTIONS = ['🌟','📅','🤝','💡','🚀','🏆','🎯','💎','🔥','⚡','🎖️','👑','🦁','🎪','🌈','💪','🧠','🏅'];

// ─── Badge Form Modal (Create / Edit) ────────────────────────────────────────
const BadgeModal = ({ badge, onClose, onSave }) => {
  const isEdit = !!badge;
  const [form, setForm] = useState({
    name: badge?.name || '',
    description: badge?.description || '',
    icon: badge?.icon || '🌟',
    bonusPoints: badge?.bonusPoints || 50,
    triggerRule: badge?.triggerRule || '',
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.triggerRule) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      onSave({ ...form, bonusPoints: parseInt(form.bonusPoints) });
      toast.success(isEdit ? `"${form.name}" updated!` : `"${form.name}" badge created!`);
      onClose();
    }, 400);
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

        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-primary/10 to-secondary/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg text-xl">
                {form.icon}
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                  {isEdit ? 'Edit Badge' : 'Create New Badge'}
                </h2>
                <p className="text-xs text-slate-500">{isEdit ? 'Update badge details' : 'Design a new achievement badge'}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <X size={18} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Icon Picker */}
          <div>
            <label className={lbl}>Badge Icon *</label>
            <div className="relative">
              <button type="button" onClick={() => setShowEmojiPicker(p => !p)}
                className={`${inp} flex items-center gap-3 cursor-pointer`}>
                <span className="text-2xl">{form.icon}</span>
                <span className="text-slate-500">Click to change icon</span>
              </button>
              <AnimatePresence>
                {showEmojiPicker && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    className="absolute top-full mt-2 left-0 z-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-xl grid grid-cols-6 gap-2 w-full">
                    {EMOJI_OPTIONS.map(emoji => (
                      <button key={emoji} type="button"
                        onClick={() => { setForm(p => ({ ...p, icon: emoji })); setShowEmojiPicker(false); }}
                        className={`text-2xl p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-center
                          ${form.icon === emoji ? 'bg-primary/10 ring-2 ring-primary' : ''}`}>
                        {emoji}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className={lbl}>Badge Name *</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Star Performer" className={inp} required />
          </div>

          {/* Description */}
          <div>
            <label className={lbl}>Description *</label>
            <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              placeholder="When is this badge awarded?" className={`${inp} resize-none h-20`} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Bonus Points */}
            <div>
              <label className={lbl}>Bonus Points *</label>
              <input type="number" min="1" max="500" value={form.bonusPoints}
                onChange={e => setForm(p => ({ ...p, bonusPoints: e.target.value }))}
                placeholder="50" className={inp} required />
            </div>
            {/* Trigger Rule */}
            <div>
              <label className={lbl}>Trigger Rule *</label>
              <input value={form.triggerRule} onChange={e => setForm(p => ({ ...p, triggerRule: e.target.value }))}
                placeholder="e.g. Top monthly score" className={inp} required />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-70">
              {isSubmitting
                ? <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving...</span>
                : <span className="flex items-center gap-2">{isEdit ? <><Check size={16} />Save Changes</> : <><Plus size={16} />Create Badge</>}</span>
              }
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// ─── Badge Detail Panel ───────────────────────────────────────────────────────
const BadgeDetailPanel = ({ badge, onClose, onEdit, onDelete }) => {
  const holders = employees.filter(e => badge.earnedBy.includes(e.id));

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      className="glass-card space-y-5 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute -top-10 -right-10 w-44 h-44 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform">
            {badge.icon}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white font-display text-xl">{badge.name}</h3>
            <span className="inline-block mt-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
              +{badge.bonusPoints} pts
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => onEdit(badge)}
            className="p-2 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors">
            <Edit2 size={16} />
          </button>
          <button onClick={() => { onDelete(badge.id); onClose(); }}
            className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            <Trash2 size={16} />
          </button>
          <button onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed relative z-10">{badge.description}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/15 rounded-2xl p-4 text-center">
          <p className="text-xs text-slate-500 mb-1 font-medium">Bonus Points</p>
          <p className="text-3xl font-black text-primary font-display">+{badge.bonusPoints}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/15 rounded-2xl p-4 text-center">
          <p className="text-xs text-slate-500 mb-1 font-medium">Times Awarded</p>
          <p className="text-3xl font-black text-emerald-500 font-display">{badge.earnedBy.length}</p>
        </div>
      </div>

      {/* Trigger Rule */}
      <div className="flex items-center gap-3 p-3.5 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/30 rounded-xl">
        <Zap size={16} className="text-amber-500 shrink-0" />
        <div>
          <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider">Trigger Rule</p>
          <p className="text-sm text-slate-700 dark:text-slate-300 font-medium mt-0.5">{badge.triggerRule}</p>
        </div>
      </div>

      {/* Employees who earned it */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Users size={14} className="text-primary" />
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Awarded To</h4>
          <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
            {holders.length} employee{holders.length !== 1 ? 's' : ''}
          </span>
        </div>

        {holders.length === 0 ? (
          <div className="text-center py-8">
            <Award size={30} className="mx-auto mb-2 text-slate-300 dark:text-slate-600" />
            <p className="text-sm text-slate-400">No one has earned this badge yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {holders.map((emp, i) => (
              <motion.div key={emp.id}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/40 hover:border-primary/20 transition-colors">
                <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-xl object-cover border-2 border-slate-200 dark:border-slate-700" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">{emp.name}</p>
                  <p className="text-xs text-slate-500">{emp.id} · {emp.department}</p>
                </div>
                <span className="text-xl" title={`${emp.name} has this badge`}>{badge.icon}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const Badges = () => {
  const [badges, setBadges] = useState(initialBadges);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [modalState, setModalState] = useState(null); // null | { mode: 'create' | 'edit', badge?: obj }

  const handleSave = (formData) => {
    if (modalState.mode === 'edit') {
      setBadges(prev => prev.map(b => b.id === modalState.badge.id ? { ...b, ...formData } : b));
      if (selectedBadge?.id === modalState.badge.id) setSelectedBadge(prev => ({ ...prev, ...formData }));
    } else {
      const newBadge = { ...formData, id: `B${Date.now()}`, earnedBy: [] };
      setBadges(prev => [...prev, newBadge]);
    }
    setModalState(null);
  };

  const handleDelete = (id) => {
    setBadges(prev => prev.filter(b => b.id !== id));
    toast.success('Badge deleted.');
  };

  const handleBadgeClick = (badge) => {
    setSelectedBadge(prev => prev?.id === badge.id ? null : badge);
  };

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {modalState && (
          <BadgeModal
            badge={modalState.badge}
            onClose={() => setModalState(null)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Badge Management</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Create, edit, and assign achievement badges. Click a badge to see who earned it.</p>
        </div>
        <button onClick={() => setModalState({ mode: 'create' })} className="btn-primary shadow-lg shadow-primary/20">
          <Plus size={18} /> Create New Badge
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card flex items-center gap-4 py-4">
          <div className="p-3 bg-primary/10 text-primary rounded-xl"><Shield size={22} /></div>
          <div>
            <p className="text-xs text-slate-500">Total Badges</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{badges.length}</p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-4 py-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl"><Award size={22} /></div>
          <div>
            <p className="text-xs text-slate-500">Total Awards</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {badges.reduce((sum, b) => sum + b.earnedBy.length, 0)}
            </p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-4 py-4">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl"><Zap size={22} /></div>
          <div>
            <p className="text-xs text-slate-500">Max Bonus</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              +{Math.max(...badges.map(b => b.bonusPoints))} pts
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className={`grid gap-6 transition-all duration-300 ${selectedBadge ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>

        {/* Badge Cards Grid */}
        <div className={`grid gap-4 ${selectedBadge ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
          {badges.map((badge, i) => {
            const isSelected = selectedBadge?.id === badge.id;
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handleBadgeClick(badge)}
                className={`glass-card flex flex-col items-center text-center relative overflow-hidden group cursor-pointer transition-all duration-200
                  ${isSelected
                    ? 'ring-2 ring-primary shadow-xl shadow-primary/20 scale-[1.02]'
                    : 'hover:border-primary/30 hover:shadow-lg hover:scale-[1.01]'
                  }`}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Edit button */}
                <button
                  onClick={e => { e.stopPropagation(); setModalState({ mode: 'edit', badge }); }}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-primary hover:bg-primary/10 opacity-0 group-hover:opacity-100 transition-all z-10"
                >
                  <Edit2 size={14} />
                </button>

                {isSelected && (
                  <div className="absolute top-3 left-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center z-10">
                    <Check size={11} className="text-white" />
                  </div>
                )}

                <div className={`w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-4xl mb-4 shadow-inner relative z-10 transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {badge.icon}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white relative z-10">{badge.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 relative z-10 px-2">
                  {badge.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/50 w-full flex justify-between items-center relative z-10">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                    +{badge.bonusPoints} pts
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Users size={12} /> {badge.earnedBy.length}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selectedBadge && (
            <BadgeDetailPanel
              badge={selectedBadge}
              onClose={() => setSelectedBadge(null)}
              onEdit={badge => setModalState({ mode: 'edit', badge })}
              onDelete={handleDelete}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Badges;
