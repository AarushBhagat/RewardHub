import React, { useState } from 'react';
import { Calendar as CalendarIcon, AlertCircle, Clock, CheckCircle2, XCircle, TrendingUp, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const dataCurrentMonth = [
  { name: 'Week 1', present: 5, absent: 0 },
  { name: 'Week 2', present: 4, absent: 1 },
  { name: 'Week 3', present: 5, absent: 0 },
  { name: 'Week 4', present: 4, absent: 0 },
];

const dataPreviousMonth = [
  { name: 'Week 1', present: 4, absent: 1 },
  { name: 'Week 2', present: 5, absent: 0 },
  { name: 'Week 3', present: 3, absent: 2 },
  { name: 'Week 4', present: 5, absent: 0 },
];

const leaveDataCurrent = [
  { name: 'Sick Leave', value: 2, color: '#ef4444' },
  { name: 'Casual Leave', value: 3, color: '#f59e0b' },
  { name: 'Earned Leave', value: 1, color: '#3b82f6' },
];

const leaveDataPrevious = [
  { name: 'Sick Leave', value: 4, color: '#ef4444' },
  { name: 'Casual Leave', value: 1, color: '#f59e0b' },
  { name: 'Earned Leave', value: 2, color: '#3b82f6' },
];

const Attendance = () => {
  const navigate = useNavigate();
  const [isPreviousMonth, setIsPreviousMonth] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  // Toggle between mock data based on month selection
  const attendanceData = isPreviousMonth ? dataPreviousMonth : dataCurrentMonth;
  const leaveData = isPreviousMonth ? leaveDataPrevious : leaveDataCurrent;

  const daysInMonth = isPreviousMonth ? 31 : 30; // e.g., Sept vs Oct
  const currentDay = isPreviousMonth ? 32 : 22; // If previous month, show all days as passed

  const monthLabel = isPreviousMonth ? 'September 2026' : 'October 2026';
  const attendanceRate = isPreviousMonth ? '85%' : '96%';
  const daysPresent = isPreviousMonth ? '17' : '18';
  const daysAbsent = isPreviousMonth ? '3' : '1';

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Attendance</h1>
          <p className="text-slate-500 mt-1">Comprehensive overview of your presence and leaves.</p>
        </div>
        <div className="flex gap-2">
          <button
            className="btn-secondary"
            onClick={() => setIsPreviousMonth(!isPreviousMonth)}
          >
            <CalendarIcon className="w-4 h-4" />
            {isPreviousMonth ? 'Current Month' : 'Previous Month'}
          </button>
          <button
            className="btn-primary"
            onClick={() => setShowLeaveModal(true)}
          >
            Apply Leave
          </button>
        </div>
      </div>

      {/* Simple Leave Application Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-800"
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Apply for Leave</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Leave Type</label>
                <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary">
                  <option>Sick Leave</option>
                  <option>Casual Leave</option>
                  <option>Earned Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Start Date</label>
                  <input type="date" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">End Date</label>
                  <input type="date" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Reason</label>
                <textarea rows="3" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary" placeholder="Briefly explain your reason..."></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button className="btn-secondary" onClick={() => setShowLeaveModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => {
                alert("Leave request submitted successfully!");
                setShowLeaveModal(false);
              }}>Submit Request</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          key={`rate-${isPreviousMonth}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card flex items-center gap-4"
        >
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Attendance Rate</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{attendanceRate}</p>
          </div>
        </motion.div>

        <motion.div
          key={`present-${isPreviousMonth}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass-card flex items-center gap-4"
        >
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Days Present</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{daysPresent} <span className="text-sm font-normal text-slate-500">/ {daysInMonth === 31 ? 22 : 22}</span></p>
          </div>
        </motion.div>

        <motion.div
          key={`absent-${isPreviousMonth}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-card flex items-center gap-4"
        >
          <div className="p-3 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl">
            <XCircle className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Days Absent</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{daysAbsent} <span className="text-sm font-normal text-slate-500">/ 22</span></p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="glass-card flex items-center gap-4"
        >
          <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl">
            <CalendarDays className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Leaves Left</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">12 <span className="text-sm font-normal text-slate-500">/ 18</span></p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: Charts (takes 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-card"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Attendance Trend</h2>
              <span className="text-xs font-medium px-2.5 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-full">{isPreviousMonth ? 'Last Month' : 'This Month'}</span>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="present" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorPresent)" activeDot={{ r: 6, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card"
            >
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Leave Distribution</h2>
              <div className="h-48 w-full flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={leaveData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {leaveData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`glass-card flex flex-col justify-center border-none !text-white ${isPreviousMonth ? 'bg-gradient-to-br from-slate-600 to-slate-800' : 'bg-gradient-to-br from-indigo-500 to-purple-600'}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <AlertCircle className="text-white w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg">{isPreviousMonth ? 'Good Effort!' : 'Perfect Streak!'}</h3>
              </div>
              <p className={`${isPreviousMonth ? 'text-slate-200' : 'text-indigo-100'} text-sm mb-4`}>
                {isPreviousMonth ? 'You maintained a decent attendance rate last month.' : 'You have a perfect 100% attendance rate this week. Keep it up to earn 50 bonus points at the end of the month!'}
              </p>
              <button
                onClick={() => navigate('/employee/rewards')}
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-bold text-sm w-fit hover:bg-indigo-50 transition-colors shadow-lg shadow-black/10"
              >
                View Rewards
              </button>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Calendar & Upcoming (takes 1 col) */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-5"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{monthLabel}</h2>
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              </div>
            </div>

            {/* Compact Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                <div key={day} className="font-bold text-slate-400">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {/* Padding for start of month (assuming starts on Thu) */}
              <div className="aspect-square"></div>
              <div className="aspect-square"></div>
              <div className="aspect-square"></div>

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                // Mock logic for attendance colors
                let dayClass = 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800';

                if (day < currentDay) {
                  // Weekends
                  if ((day + 3) % 7 === 6 || (day + 3) % 7 === 0) {
                    dayClass = 'text-slate-400 bg-slate-50 dark:bg-slate-800/50';
                  }
                  // Absent mock
                  else if (day === 12 || (isPreviousMonth && day === 18) || (isPreviousMonth && day === 19)) {
                    dayClass = 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 font-bold';
                  }
                  // Present
                  else {
                    dayClass = 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 font-medium';
                  }
                } else if (day === currentDay && !isPreviousMonth) {
                  // Today
                  dayClass = 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-600 ring-offset-2 dark:ring-offset-slate-900';
                }

                return (
                  <div
                    key={i}
                    className={`aspect-square flex items-center justify-center rounded-md text-sm cursor-pointer transition-colors ${dayClass}`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-xs justify-center pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800"></div> <span className="text-slate-500">Present</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-rose-100 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800"></div> <span className="text-slate-500">Absent</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800"></div> <span className="text-slate-500">Leave</span></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card"
          >
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Upcoming Time Off</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                <div className="p-2 bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 rounded-lg">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Diwali Holiday</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Oct 31, 2026</p>
                </div>
                <div className="ml-auto">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-1 rounded-full">Approved</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                <div className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Annual Leave</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Nov 15 - Nov 20, 2026</p>
                </div>
                <div className="ml-auto">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-1 rounded-full">Pending</span>
                </div>
              </div>
            </div>

            <button className="w-full mt-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 rounded-lg transition-colors">
              View All History
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
