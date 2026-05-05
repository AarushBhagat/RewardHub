import React from 'react';
import { Bell, Gift, Award, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const Notifications = () => {
  const notifications = [
    { id: 1, type: 'reward', title: 'Points Received!', message: 'You earned 50 points for 100% attendance this month.', time: '2 hours ago', read: false },
    { id: 2, type: 'badge', title: 'New Badge Unlocked', message: 'Congratulations! You earned the "Team Player" badge.', time: '1 day ago', read: true },
    { id: 3, type: 'feedback', title: 'New Feedback', message: 'An anonymous peer submitted feedback for you.', time: '3 days ago', read: true },
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Notifications</h1>
          <p className="text-slate-500 mt-1">Stay updated on your achievements and alerts.</p>
        </div>
        <button className="text-sm text-primary hover:underline">Mark all as read</button>
      </div>

      <div className="glass-card p-0 overflow-hidden divide-y divide-slate-100 dark:divide-slate-700/50">
        {notifications.map((notif, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={notif.id} 
            className={`p-4 flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer ${notif.read ? 'opacity-60' : 'bg-primary/5'}`}
          >
            <div className={`mt-1 p-2 rounded-full h-fit
              ${notif.type === 'reward' ? 'bg-green-100 text-green-600' :
                notif.type === 'badge' ? 'bg-amber-100 text-amber-600' :
                'bg-blue-100 text-blue-600'}
            `}>
              {notif.type === 'reward' && <Gift size={18} />}
              {notif.type === 'badge' && <Award size={18} />}
              {notif.type === 'feedback' && <MessageSquare size={18} />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className={`font-semibold ${notif.read ? 'text-slate-700 dark:text-slate-300' : 'text-slate-900 dark:text-white'}`}>
                  {notif.title}
                </h3>
                <span className="text-xs text-slate-400">{notif.time}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{notif.message}</p>
            </div>
            {!notif.read && <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
