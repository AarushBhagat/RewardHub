import React from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, Cell
} from 'recharts';
import { Brain, Target, TrendingUp, Award, CheckCircle2, Star, MessageSquare } from 'lucide-react';

const performanceTrendData = [
  { month: 'Jan', score: 82 },
  { month: 'Feb', score: 85 },
  { month: 'Mar', score: 84 },
  { month: 'Apr', score: 89 },
  { month: 'May', score: 92 },
  { month: 'Jun', score: 95 },
];

const skillsData = [
  { subject: 'Technical', A: 90, fullMark: 100 },
  { subject: 'Communication', A: 85, fullMark: 100 },
  { subject: 'Leadership', A: 75, fullMark: 100 },
  { subject: 'Teamwork', A: 95, fullMark: 100 },
  { subject: 'Punctuality', A: 88, fullMark: 100 },
  { subject: 'Problem Solving', A: 92, fullMark: 100 },
];

const goalsData = [
  { id: 1, title: 'Complete Frontend Module', progress: 100, status: 'Completed' },
  { id: 2, title: 'Improve API Response Time', progress: 75, status: 'In Progress' },
  { id: 3, title: 'Mentorship Sessions (3/5)', progress: 60, status: 'In Progress' },
];

const Performance = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Performance Analytics</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Deep dive into your skills, growth, and feedback.</p>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card flex items-center justify-between p-5">
          <div>
            <p className="text-sm text-slate-500 font-medium">Overall Score</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">95<span className="text-sm text-slate-500 font-normal">/100</span></p>
          </div>
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
            <Award size={24} />
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card flex items-center justify-between p-5">
          <div>
            <p className="text-sm text-slate-500 font-medium">Goal Completion</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">78<span className="text-sm text-slate-500 font-normal">%</span></p>
          </div>
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
            <Target size={24} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card flex items-center justify-between p-5">
          <div>
            <p className="text-sm text-slate-500 font-medium">Tasks Delivered</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">124</p>
          </div>
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <CheckCircle2 size={24} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card flex items-center justify-between p-5">
          <div>
            <p className="text-sm text-slate-500 font-medium">Peer Rating</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">4.8<span className="text-sm text-slate-500 font-normal">/5</span></p>
          </div>
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
            <Star size={24} />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Charts */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Performance Trend (6 Months)</h2>
              <span className="flex items-center gap-1 text-sm text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full"><TrendingUp size={14}/> +15%</span>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis domain={['dataMin - 5', 100]} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="glass-card">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Skills Radar</h2>
              <p className="text-xs text-slate-500 mb-4">Your proficiency across core competencies.</p>
              <div className="h-64 w-full flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillsData}>
                    <PolarGrid stroke="#334155" opacity={0.3} />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="My Skills" dataKey="A" stroke="#3b82f6" strokeWidth={2} fill="#3b82f6" fillOpacity={0.4} />
                    <RechartsTooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }}/>
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="glass-card flex flex-col h-full">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2"><Target size={20} className="text-primary"/> Current Goals</h2>
              <div className="space-y-5 flex-1">
                {goalsData.map(goal => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-800 dark:text-slate-200">{goal.title}</span>
                      <span className="text-slate-500 font-bold">{goal.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${goal.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full rounded-full ${goal.progress === 100 ? 'bg-emerald-500' : 'bg-primary'}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm font-bold text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors">Manage Goals</button>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Insights & Feedback */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="glass-card bg-gradient-to-br from-indigo-500 to-purple-600 border-none !text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Brain size={100} /></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm"><Brain size={20} /></div>
                <h3 className="font-bold text-lg">AI Performance Insight</h3>
              </div>
              <p className="text-indigo-50 text-sm leading-relaxed mb-4">
                "Excellent trajectory this quarter! Your technical delivery is top-tier (90%). To reach the next level, focus on Leadership opportunities. Consider volunteering to lead the upcoming sprint planning."
              </p>
              <div className="bg-black/20 p-3 rounded-lg backdrop-blur-md">
                <p className="text-xs text-indigo-200 uppercase tracking-wider font-bold mb-1">Recommended Action</p>
                <p className="text-sm font-medium">Lead a technical knowledge-sharing session.</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="glass-card">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2"><MessageSquare size={20} className="text-slate-400"/> Recent Feedback</h2>
            <div className="space-y-4">
              <div className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-800/30 relative">
                <div className="absolute -left-1.5 -top-1.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
                <p className="text-sm text-slate-700 dark:text-slate-300 italic">"Nirbhay's work on the new dashboard was exceptional. Delivered ahead of schedule!"</p>
                <p className="text-xs text-slate-500 mt-2 font-medium">— Sarah J., Product Manager</p>
              </div>
              <div className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-800/30 relative">
                <div className="absolute -left-1.5 -top-1.5 w-4 h-4 bg-blue-500 rounded-full border-2 border-white dark:border-slate-900" />
                <p className="text-sm text-slate-700 dark:text-slate-300 italic">"Great teamwork resolving the critical bug over the weekend."</p>
                <p className="text-xs text-slate-500 mt-2 font-medium">— Tech Lead</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
