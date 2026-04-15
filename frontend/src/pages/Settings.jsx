import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import axios from 'axios';
import { Settings as SettingsIcon, User, Database, Shield, Download } from 'lucide-react';

export default function Settings() {
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    let isMounted = true;
    const fetchHistory = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await axios.get(`/history?user_id=${userId}`);
        if (isMounted && response.data.history) {
          setHistoryData(response.data.history.sort((a, b) => b.id - a.id)); // Newest first
        }
      } catch (err) {
        console.error("Fetch history err:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchHistory();
    return () => { isMounted = false; };
  }, [userId]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2 tracking-tight">
            <SettingsIcon className="text-primary-500 w-8 h-8" /> Settings & Profile
          </h1>
          <p className="text-slate-500 mt-1">Manage your account and view detailed logs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - User Profile info */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary-600 to-secondary-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {userId ? userId.charAt(0).toUpperCase() : 'G'}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{userId}</h3>
                  <p className="text-sm text-slate-500">Free Tier Account</p>
                </div>
             </div>
             <div className="space-y-3">
               <div className="flex items-center gap-3 text-sm text-slate-600 p-3 bg-slate-50 rounded-xl">
                 <Shield className="w-4 h-4 text-slate-400" />
                 Password: <span className="font-mono">••••••••</span>
               </div>
               <div className="flex items-center gap-3 text-sm text-slate-600 p-3 bg-slate-50 rounded-xl">
                 <Database className="w-4 h-4 text-slate-400" />
                 Total Logs: <span className="font-bold">{historyData.length} entries</span>
               </div>
             </div>
             
             <button className="w-full mt-6 py-2.5 rounded-xl border border-rose-200 text-rose-600 font-medium hover:bg-rose-50 transition-colors">
               Delete Account
             </button>
          </motion.div>
        </div>

        {/* Right Column - Data Logs Table */}
        <div className="lg:col-span-2">
           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm overflow-hidden">
             <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Historical Logs</h3>
                  <p className="text-sm text-slate-500">Raw generated data from the recommendation engine</p>
                </div>
                {historyData.length > 0 && (
                  <button className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                )}
             </div>

             <div className="overflow-x-auto">
               {isLoading ? (
                 <div className="py-12 text-center text-slate-500">Loading history...</div>
               ) : historyData.length === 0 ? (
                 <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                   No data logs found. Use the dashboard to generate your first plan.
                 </div>
               ) : (
                 <table className="w-full text-left text-sm text-slate-600">
                   <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold">
                     <tr>
                       <th className="px-4 py-3 rounded-tl-xl rounded-bl-xl">Date</th>
                       <th className="px-4 py-3">Weight</th>
                       <th className="px-4 py-3">BMI</th>
                       <th className="px-4 py-3">Goal</th>
                       <th className="px-4 py-3 rounded-tr-xl rounded-br-xl">Rec. Intake</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                     {historyData.map((row) => (
                       <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                         <td className="px-4 py-3 whitespace-nowrap">{new Date(row.timestamp).toLocaleDateString()}</td>
                         <td className="px-4 py-3 font-medium text-slate-800">{row.weight} kg</td>
                         <td className="px-4 py-3">{row.bmi}</td>
                         <td className="px-4 py-3"><span className="px-2 py-1 bg-primary-50 text-primary-700 rounded-md text-xs">{row.goal}</span></td>
                         <td className="px-4 py-3 font-bold text-orange-600">{row.calories} kcal</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               )}
             </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
