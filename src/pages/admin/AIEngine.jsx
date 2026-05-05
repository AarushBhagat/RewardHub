import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, AlertTriangle, CheckCircle, UserPlus, Gift } from 'lucide-react';
import { runRewardAnalysis } from '../../utils/gemini';
import { employees } from '../../data/employees';
import { performance } from '../../data/performance';
import { attendance } from '../../data/attendance';

const AIEngine = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    try {
      // In a real app, we'd fetch this from backend. Here we use our mock data.
      const result = await runRewardAnalysis(employees, performance, attendance);
      setAnalysisResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="text-accent" /> AI Fair Reward Engine
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Powered by Google Gemini. The AI analyzes attendance, performance metrics, and feedback to ensure fair, unbiased reward distribution across the organization.
          </p>
        </div>
        
        <button 
          onClick={handleRunAnalysis}
          disabled={isAnalyzing}
          className="btn bg-accent hover:bg-amber-600 text-white shadow-lg hover:shadow-accent/50 disabled:opacity-70 disabled:cursor-wait relative overflow-hidden group min-w-[200px]"
        >
          {isAnalyzing ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Gemini is thinking...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Brain size={18} />
              <span>Run AI Analysis</span>
            </div>
          )}
          {/* Shine effect */}
          <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-white/20 skew-x-12 group-hover:animate-[shine_1s_ease-in-out]" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!analysisResult && !isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="h-96 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800/50"
          >
            <Brain className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />
            <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400">Ready for Analysis</h3>
            <p className="text-slate-500 text-sm mt-2 text-center max-w-md">
              Click the button above to run the Gemini AI model on this month's employee data.
            </p>
          </motion.div>
        )}

        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="h-96 flex flex-col items-center justify-center glass-card"
          >
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-accent rounded-full border-t-transparent animate-spin"></div>
              <Brain className="absolute inset-0 m-auto text-accent w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Analyzing Data...</h3>
            <div className="space-y-2 text-center text-slate-500 dark:text-slate-400 text-sm">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>✓ Processing attendance records...</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>✓ Evaluating performance KPIs...</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>✓ Running bias detection models...</motion.p>
            </div>
          </motion.div>
        )}

        {analysisResult && !isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Top Recommendations */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Gift className="text-primary" /> Recommended for Rewards
              </h3>
              
              <div className="space-y-4">
                {analysisResult.topRecommendations.map((rec, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={rec.employeeId} 
                    className="glass-card flex items-start gap-4 p-5 hover:border-primary/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-900 dark:text-white">{rec.name}</h4>
                        <span className="text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-1 rounded-md">
                          {rec.suggestedReward}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                        <span className="font-semibold text-primary/80">AI Reasoning:</span> {rec.reason}
                      </p>
                      
                      <button className="mt-4 text-sm font-medium text-primary hover:text-primary-hover flex items-center gap-1 bg-primary/5 px-3 py-1.5 rounded-lg transition-colors">
                        <UserPlus size={16} /> Approve & Issue Reward
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bias Report & Insights */}
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`glass-card border-l-4 ${analysisResult.biasReport.isFair ? 'border-l-green-500' : 'border-l-red-500'}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  {analysisResult.biasReport.isFair ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <AlertTriangle className="text-red-500" />
                  )}
                  <h3 className="font-bold text-slate-900 dark:text-white">Bias Detection Report</h3>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                  {analysisResult.biasReport.analysis}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-indigo-900/20 border-indigo-100 dark:border-indigo-900/30"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="text-indigo-500" />
                  <h3 className="font-bold text-slate-900 dark:text-white">General Insights</h3>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {analysisResult.generalInsights}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIEngine;
