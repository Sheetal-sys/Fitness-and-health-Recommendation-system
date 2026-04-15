import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import axios from 'axios';
import { TrendingUp, Award, Calendar, RefreshCw } from 'lucide-react';
import { WeightChart, CaloriesChart, BmiChart } from '../components/Charts';

export default function Progress() {
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const userId = localStorage.getItem('user_id');

  const fetchHistory = async () => {
    if (!userId) {
      setError('No user logged in.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get('/history', {
        params: { user_id: userId }
      });

      const raw = response.data.history || [];

      if (raw.length === 0) {
        setHistoryData([]);
      } else {
        const formatted = raw.map(item => ({
          ...item,
          // Parse timestamp to milliseconds for Recharts X axis
          timestamp: new Date(item.timestamp).getTime(),
          // calories is already stored in the DB
          calories: item.calories,
          weight: item.weight,
          bmi: item.bmi,
        }));
        setHistoryData(formatted);
      }
    } catch (err) {
      console.error('History fetch error:', err);
      const msg = err.response?.data?.detail || 'Failed to load progress data. Make sure backend is running.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const latestEntry = historyData[historyData.length - 1];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2 tracking-tight">
            <TrendingUp className="text-primary-500 w-8 h-8" /> Your Progress
          </h1>
          <p className="text-slate-500 mt-1">
            Tracking wellness data for <span className="font-semibold text-slate-700">{userId}</span>
          </p>
        </div>
        <button
          onClick={fetchHistory}
          disabled={isLoading}
          className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium disabled:opacity-50"
        >
          <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Summary Stats (when data exists) */}
      {historyData.length > 0 && !isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Latest Weight', value: `${latestEntry?.weight} kg`, color: 'blue' },
            { label: 'Latest BMI', value: latestEntry?.bmi, color: 'emerald' },
            { label: 'Current Goal', value: latestEntry?.goal, color: 'indigo' },
            { label: 'Rec. Calories', value: `${latestEntry?.calories} kcal`, color: 'orange' },
          ].map((stat, i) => (
            <div key={i} className={`bg-white rounded-2xl p-4 border border-slate-100 shadow-sm border-l-4 border-l-${stat.color}-400`}>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{stat.label}</p>
              <p className="text-xl font-bold text-slate-800 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error */}
      {!isLoading && error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 flex items-center gap-3">
          <span className="font-bold">Error:</span> {error}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && historyData.length === 0 && (
        <div className="bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-16 text-center">
          <Calendar className="w-16 h-16 mb-4 text-slate-300" />
          <h3 className="text-xl font-bold text-slate-700 mb-2">No History Yet</h3>
          <p className="text-slate-500 max-w-sm mx-auto">
            Go to the Dashboard, fill in your profile and click <strong>Generate AI Recommendations</strong>. Your data will appear here.
          </p>
        </div>
      )}

      {/* Charts */}
      {!isLoading && !error && historyData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 xl:grid-cols-2 gap-8"
        >
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Weight Trend</h3>
                <p className="text-sm text-slate-500">kg over time</p>
              </div>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <TrendingUp size={20} />
              </div>
            </div>
            <WeightChart data={historyData} />
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800">BMI Trend</h3>
                <p className="text-sm text-slate-500">Body Mass Index over time</p>
              </div>
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <Award size={20} />
              </div>
            </div>
            <BmiChart data={historyData} />
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm xl:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Recommended Calories</h3>
                <p className="text-sm text-slate-500">kcal/day over time</p>
              </div>
              <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                <TrendingUp size={20} />
              </div>
            </div>
            <CaloriesChart data={historyData} />
          </div>
        </motion.div>
      )}
    </div>
  );
}
