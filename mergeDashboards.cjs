const fs = require('fs');

const oldCodePath = 'c:/Users/HP/AppData/Roaming/Code/User/workspaceStorage/0f170bc978f8351cb6cbef05c6dc6e16/GitHub.copilot-chat/chat-session-resources/3007c9f7-5de6-42c3-8037-14a956231894/call_MHxNOERxUEdxV2gwaG1zWXBaUU4__vscode-1777985968712/content.txt';
let oldCode = fs.readFileSync(oldCodePath, 'utf8');

const newCodePath = './src/pages/admin/AdminDashboard.jsx';
let newCode = fs.readFileSync(newCodePath, 'utf8');

// The original old code has imports and dummy data. Let's extract them.
const importsEnd = oldCode.indexOf('const AdminDashboard = () => {');
let oldImportsAndData = oldCode.substring(0, importsEnd);

// For the UI, we extract the inside of AdminDashboard from old code
const oldReturnStart = oldCode.indexOf('return (');
const oldReturnEnd = oldCode.lastIndexOf('</div>\\n    </div>\\n  );'); 
let oldUI = oldCode.substring(oldReturnStart + 9, oldReturnEnd + 14); // getting the inner part

// Now extract the logic from the new code
const newLogicStart = newCode.indexOf('const AdminDashboard = () => {');
const newReturnStart = newCode.indexOf('return (');
let newLogic = newCode.substring(newLogicStart, newReturnStart);

// Extract the UI from new code (the metrics and details)
const newFiltersStart = newCode.indexOf('  {/* FILTERS FOR BELOW METRICS */}');
const newDetailsEnd = newCode.lastIndexOf('</div>'); 
// basically everything from FILTERS downwards until the end of the wrapper div
let newUI = newCode.substring(newFiltersStart, newDetailsEnd - 10); 
newUI = newUI.substring(0, newUI.lastIndexOf('</div>')-5); // hacky trim

// We need to merge imports of new code because we use 'bonuses', etc.
const newImports = `
import { employees } from '../../data/employees';
import { rewards } from '../../data/rewards';
import { bonuses } from '../../data/bonuses';
import { Search, BarChart3, PieChart as PieIcon, Download } from 'lucide-react';
`;

// Construct final file
const finalFile = `
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Gift, TrendingUp, Activity, Award, MoreVertical, ArrowRight,
  Download, Share2, DollarSign, Trophy, Search, BarChart3, PieChart as PieIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

import { employees } from '../../data/employees';
import { rewards } from '../../data/rewards';
import { bonuses } from '../../data/bonuses';

// Dummy data for charts
const performanceData = [
  { name: 'Jan', score: 65 },
  { name: 'Feb', score: 70 },
  { name: 'Mar', score: 68 },
  { name: 'Apr', score: 75 },
  { name: 'May', score: 82 },
  { name: 'Jun', score: 85 },
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
      className="glass-card flex flex-col relative overflow-hidden group cursor-pointer border-transparent hover:border-primary/30 transition-all duration-300"
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
        </div>
      </div>
      
      <div>
        <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium tracking-wide">{title}</h3>
        <div className="flex items-baseline gap-2 mt-2">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white font-display tracking-tight">
            {typeof value === 'number' ? <AnimatedCounter value={value} /> : value}
          </h2>
          <div className={\`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold \${
            trend === 'up' 
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
              : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
          }\`}>
            <span>{trend === 'up' ? '↗' : '↘'}</span>
            <span>{trendValue}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

\${newLogic}
  return (
    <div className="space-y-6 pb-12 bg-slate-50/50 dark:bg-slate-950/20 min-h-screen p-4 md:p-8">
      \${oldUI}

      <div className="pt-12 mt-12 border-t border-slate-200 dark:border-slate-800 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-indigo-500/20">
          Deep Reporting
        </div>
        <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white font-display">Deep Analytics Engine & Reports</h2>
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-95">
              <Download size={16} /> Export Deep Report
            </button>
        </div>
        \${newUI}
      </div>
    </div>
  );
};

export default AdminDashboard;
`;

fs.writeFileSync('./src/pages/admin/AdminDashboard.jsx', finalFile);
console.log('Merge complete!');
