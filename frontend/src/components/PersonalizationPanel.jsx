import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { ArrowRightLeft, UserCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PersonalizationPanel({ data }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        if (!userId) return;
        const response = await axios.get(`/history?user_id=${userId}`);
        setHistory(response.data.history || []);
      } catch (err) {
        console.error("Could not fetch history for personalization panel", err);
      }
    };
    fetchHistory();
  }, [data]);

  const currentWeight = data?.weight || 0; // if provided
  let prevWeight = "N/A";
  
  if (history && history.length > 1) {
    // Current submission might be the last one, so previous is length-2
    prevWeight = history[history.length - 2].weight;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl"
    >
      <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
        <UserCircle2 size={120} />
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-indigo-200 mb-2">Personalization Insights</h2>
          <p className="text-3xl font-bold mb-4">{data.personalization || "Keep pushing forward!"}</p>
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
             <span className="text-indigo-200">Goal:</span> 
             <span className="font-semibold">{data.goal}</span>
          </div>
        </div>

        <div className="w-full md:w-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="text-sm font-medium text-indigo-200 mb-4 text-center">Weight Progress</div>
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{prevWeight}</div>
              <div className="text-xs text-indigo-300 mt-1 uppercase tracking-wider">Previous kg</div>
            </div>
            
            <div className="bg-indigo-500/30 p-3 rounded-full">
               <ArrowRightLeft className="w-6 h-6 text-indigo-300" />
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-white">{history.length > 0 ? history[history.length - 1].weight : currentWeight || '...'}</div>
              <div className="text-xs text-indigo-300 mt-1 uppercase tracking-wider">Current kg</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
