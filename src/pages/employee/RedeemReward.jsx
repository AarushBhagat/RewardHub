import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Briefcase, Coffee, Monitor, Plane, Award, Heart, Gift, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';

const rewardCategories = [
  {
    id: 'esops',
    title: 'Company ESOPs & Equity',
    description: 'Invest your points back into the company. Redeem points for Employee Stock Ownership Plans.',
    icon: <Briefcase className="w-6 h-6 text-indigo-400" />,
    items: [
      { id: 'esop-5', name: '5 ESOP Units', cost: 2600, available: true },
      { id: 'esop-10', name: '10 ESOP Units', cost: 5000, available: true },
      { id: 'esop-25', name: '25 ESOP Units', cost: 12000, available: true },
      { id: 'esop-50', name: '50 ESOP Units', cost: 23000, available: false },
      { id: 'esop-100', name: '100 ESOP Units', cost: 45000, available: true },
    ]
  },
  {
    id: 'learning',
    title: 'Learning & Experiences',
    description: 'Invest in your personal and professional growth with exclusive experiences.',
    icon: <BookOpen className="w-6 h-6 text-blue-400" />,
    items: [
      { id: 'learn-course', name: 'Fully Paid Certification Course', cost: 2500, available: true },
      { id: 'learn-lunch', name: 'Sponsored Team Lunch', cost: 3000, available: true },
      { id: 'learn-ceo', name: '1-on-1 Mentorship with CEO', cost: 5000, available: true },
      { id: 'learn-conf', name: '3-Day Tech Conference Ticket', cost: 8000, available: false },
    ]
  },
  {
    id: 'perks',
    title: 'Company Perks & Policies',
    description: 'Redeem points for extra time off, premium health add-ons, or workspace upgrades.',
    icon: <Heart className="w-6 h-6 text-emerald-400" />,
    items: [
      { id: 'pto-pet', name: 'Pet to Work Day Pass', cost: 500, available: true },
      { id: 'pto-parking', name: 'Premium Parking Spot (1 Mo)', cost: 1200, available: true },
      { id: 'pto-1', name: '1 Extra Paid Day Off', cost: 1500, available: true },
      { id: 'wfh-1', name: '1 Week Work From Anywhere', cost: 3000, available: true },
      { id: 'health-plus', name: 'Premium Health Add-on', cost: 4500, available: true },
      { id: 'health-insurance', name: 'Comprehensive Health Insurance (1 Yr)', cost: 15000, available: true },
      { id: 'mutual-fund', name: '₹1000 Mutual Fund Investment', cost: 10000, available: true },
      { id: 'pto-4day', name: '1 Month 4-Day Work Week', cost: 8000, available: true },
    ]
  },
  {
    id: 'merch',
    title: 'Merchandise & Goodies',
    description: 'Exclusive company swag, tech gadgets, and gift vouchers.',
    icon: <Gift className="w-6 h-6 text-amber-400" />,
    items: [
      { id: 'voucher-coffee', name: '₹50 Coffee Shop Voucher', cost: 500, available: true },
      { id: 'swag-hoodie', name: 'Premium Company Hoodie', cost: 800, available: true },
      { id: 'swag-bag', name: 'Premium Waterproof Backpack', cost: 1000, available: true },
      { id: 'voucher-amazon', name: '₹100 Amazon Gift Card', cost: 1000, available: true },
      { id: 'tech-chair', name: 'Ergonomic Office Chair', cost: 3500, available: false },
      { id: 'tech-headphones', name: 'Noise Cancelling Headphones', cost: 4000, available: true },
      { id: 'tech-monitor', name: '4K External Monitor', cost: 6000, available: true },
    ]
  }
];

const RedeemReward = () => {
  const [currentPoints, setCurrentPoints] = useState(4250);

  const handleRedeem = (item) => {
    if (currentPoints >= item.cost) {
      setCurrentPoints(prev => prev - item.cost);
      toast.success(`Successfully redeemed ${item.name}!`);
    } else {
      toast.error(`Not enough points to redeem ${item.name}.`);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Reward Redemption Center
          </h1>
          <p className="text-gray-400 mt-1">Turn your hard-earned points into real-world value.</p>
        </div>
        
        <div className="glass-card px-6 py-4 flex items-center gap-4 bg-indigo-500/10 border-indigo-500/20">
          <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
            <Award size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">Available Points</p>
            <p className="text-2xl font-black text-white">{currentPoints.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-12"
      >
        {rewardCategories.map((category) => (
          <div key={category.id} className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                {category.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{category.title}</h2>
                <p className="text-sm text-gray-400">{category.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item) => (
                <motion.div 
                  key={item.id}
                  variants={itemVariants}
                  className="glass-card p-6 flex flex-col group hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Decorative background glow */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
                  
                  <div className="flex-1 relative z-10">
                    <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                    <div className="flex items-center gap-2 mb-6">
                      <span className="px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 text-sm font-bold border border-indigo-500/20">
                        {item.cost.toLocaleString()} pts
                      </span>
                      {!item.available && (
                        <span className="px-2.5 py-1 rounded-md bg-red-500/20 text-red-300 text-xs font-bold border border-red-500/20">
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleRedeem(item)}
                    disabled={!item.available || currentPoints < item.cost}
                    className={`relative z-10 w-full py-2.5 rounded-xl font-bold transition-all duration-200 shadow-lg ${
                      !item.available 
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none'
                        : currentPoints < item.cost
                          ? 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20 hover:shadow-indigo-500/40 active:scale-[0.98]'
                    }`}
                  >
                    {!item.available 
                      ? 'Unavailable' 
                      : currentPoints < item.cost 
                        ? 'Not Enough Points' 
                        : 'Redeem Now'}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default RedeemReward;
