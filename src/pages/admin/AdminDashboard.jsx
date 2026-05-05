import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Gift, 
  TrendingUp, 
  Activity,
  Award,
  MoreVertical,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Dummy data for charts
const performanceData = [
  { name: 'Jan', score: 65 },
  { name: 'Feb', score: 70 },
  { name: 'Mar', score: 68 },
  { name: 'Apr', score: 75 },
  { name: 'May', score: 82 },
  { name: 'Jun', score: 85 },
];

const attendanceData = [
  { name: 'Eng', present: 95, remote: 4, absent: 1 },
  { name: 'Sales', present: 88, remote: 10, absent: 2 },
  { name: 'Mktg', present: 92, remote: 5, absent: 3 },
  { name: 'HR', present: 98, remote: 2, absent: 0 },
];

const rewardDistribution = [
  { name: 'Bronze', value: 45, color: '#CD7F32' },
  { name: 'Silver', value: 30, color: '#C0C0C0' },
  { name: 'Gold', value: 15, color: '#FFD700' },
  { name: 'Diamond', value: 10, color: '#06B6D4' },
];

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  return <span>{count}</span>;
};

const StatCard = ({ title, value, icon, trend, trendValue, delay, path }) => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={() => path && navigate(path)}
      className={`glass-card flex flex-col relative overflow-hidden group cursor-pointer border-transparent hover:border-primary/30 transition-all duration-300`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
      
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl text-primary border border-slate-200/50 dark:border-slate-700/50 shadow-inner group-hover:bg-primary group-hover:text-white transition-all duration-500">
          {icon}
        </div>
        <div className="flex items-center gap-2">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary">
            <ArrowRight size={16} />
          </div>
          <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors bg-white/20 dark:bg-slate-800/20 p-2 rounded-xl backdrop-blur-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>
      
      <div>
        <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium tracking-wide">{title}</h3>
        <div className="flex items-baseline gap-2 mt-2">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white font-display tracking-tight">
            <AnimatedCounter value={value} />
          </h2>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
            trend === 'up' 
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
              : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
          }`}>
            <span>{trend === 'up' ? '↗' : '↘'}</span>
            <span>{trendValue}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Here's what's happening today.</p>
        </div>
        <button className="btn-primary group">
          Generate Report
          <motion.span
            className="inline-block"
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            →
          </motion.span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Employees" value={124} icon={<Users size={24} />} trend="up" trendValue={12} delay={0.1} path="/admin/employees" />
        <StatCard title="Rewards Issued" value={45} icon={<Gift size={24} />} trend="up" trendValue={8} delay={0.2} path="/admin/rewards" />
        <StatCard title="Avg Performance" value={88} icon={<TrendingUp size={24} />} trend="up" trendValue={5} delay={0.3} path="/admin/performance" />
        <StatCard title="Avg Attendance" value={94} icon={<Activity size={24} />} trend="down" trendValue={2} delay={0.4} path="/admin/attendance" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-2 glass-card"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Performance Trends</h3>
            <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" className="dark:stroke-slate-700" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', color: '#fff', backdropFilter: 'blur(8px)' }}
                  itemStyle={{ color: '#818CF8', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="score" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Side Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-card"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Reward Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={rewardDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {rewardDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, name]}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {rewardDistribution.map((tier) => (
              <div key={tier.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tier.color }}></div>
                <span className="text-sm text-slate-600 dark:text-slate-300">{tier.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AdminDashboard;
