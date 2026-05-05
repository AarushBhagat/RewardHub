import React, { useState } from 'react';
import { Send, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const Feedback = () => {
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Feedback submitted successfully! Earned +5 points for participation.', { icon: '🤝' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Peer Feedback</h1>
        <p className="text-slate-500 mt-1">Submit 360° anonymous feedback for your colleagues.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card">
          <h2 className="font-semibold mb-4 text-slate-800 dark:text-white">Submit New Feedback</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Colleague</label>
              <select className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                <option>Select a colleague...</option>
                <option>Sarah Smith (Marketing)</option>
                <option>Mike Johnson (Sales)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`cursor-pointer ${rating >= star ? 'text-amber-400 fill-current' : 'text-slate-300'}`} 
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Comments</label>
              <textarea 
                className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white h-24"
                placeholder="What did they do well? How can they improve?"
              ></textarea>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <input type="checkbox" id="anon" className="rounded text-primary" defaultChecked />
              <label htmlFor="anon" className="text-sm text-slate-600 dark:text-slate-400">Keep this feedback anonymous</label>
            </div>

            <button type="submit" className="w-full btn-primary flex justify-center">
              <Send size={18} /> Submit Feedback
            </button>
          </form>
        </div>

        <div className="glass-card bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
          <h2 className="font-semibold mb-4 text-slate-800 dark:text-white">Feedback Guidelines</h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
              <span>Be specific and constructive in your comments.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
              <span>Focus on behavior and outcomes, not personality.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
              <span>Both positive feedback and areas for improvement are valuable.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
              <span>Feedback data is used by the AI engine to ensure fair 360° evaluations.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
