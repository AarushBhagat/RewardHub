import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Reports</h1>
          <p className="text-gray-400 mt-1">Generate and view system reports.</p>
        </div>
      </div>
      
      <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
          <FileText size={32} className="text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Reports Module Coming Soon</h2>
        <p className="text-gray-400 max-w-md">
          The comprehensive reporting module is currently under development. Soon you'll be able to generate detailed analytics and performance reports.
        </p>
      </div>
    </div>
  );
};

export default Reports;
