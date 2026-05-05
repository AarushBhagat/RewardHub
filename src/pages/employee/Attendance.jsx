import React from 'react';
import { Calendar, AlertCircle } from 'lucide-react';

const Attendance = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Attendance</h1>
        <p className="text-slate-500 mt-1">View your monthly attendance record.</p>
      </div>

      <div className="glass-card">
        <div className="flex items-center gap-3 mb-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
          <AlertCircle className="text-blue-500" />
          <p className="text-sm text-blue-800 dark:text-blue-200">You have a perfect 100% attendance rate this month. Keep it up to earn 50 bonus points!</p>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="font-bold text-slate-500">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 30 }).map((_, i) => (
            <div 
              key={i} 
              className={`aspect-square flex flex-col items-center justify-center rounded-lg border
                ${i < 20 ? (i % 7 > 4 ? 'bg-slate-100 dark:bg-slate-800 border-transparent text-slate-400' : 'bg-green-50 dark:bg-green-900/20 border-green-200 text-green-700') : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-800 dark:text-white'}
              `}
            >
              <span className="font-bold">{i + 1}</span>
              {i < 20 && i % 7 <= 4 && <span className="text-[10px] text-green-500">Present</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
