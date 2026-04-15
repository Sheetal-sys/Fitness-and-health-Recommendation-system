import { useState } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import axios from 'axios';
import InputForm from '../components/InputForm';
import ResultCards from '../components/ResultCards';
import DietCards from '../components/DietCards';
import ExerciseCards from '../components/ExerciseCards';
import PersonalizationPanel from '../components/PersonalizationPanel';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setError('');
    try {
      const user_id = localStorage.getItem('user_id') || 'guest';
      const payload = { ...formData, user_id };
      const response = await axios.post('/recommend', payload);
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch recommendations. Ensure the backend is running at http://127.0.0.1:8000');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Your Dashboard</h1>
          <p className="text-slate-500 mt-1">AI-powered insights based on your unique profile.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* A. Profile Input Card */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 bg-slate-50/50 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="text-primary-500 w-5 h-5" />
                Update Profile
              </h2>
            </div>
            <div className="p-6">
               <InputForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="xl:col-span-8 flex flex-col gap-8">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 flex items-center gap-3">
               <span className="font-bold">Error:</span> {error}
            </div>
          )}

          {!result && !isLoading && !error && (
            <div className="flex-1 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
              <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-tr from-slate-100 to-slate-50 flex items-center justify-center shadow-sm border border-slate-200">
                <ArrowRight className="w-8 h-8 text-slate-400 rotate-180 xl:rotate-0" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">Awaiting Data</h3>
              <p className="text-slate-500 max-w-sm mx-auto">Fill out your profile form to generate your personalized AI health plan.</p>
            </div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="flex justify-end mb-[-1rem] relative z-10 print:hidden">
                <button 
                  onClick={() => window.print()}
                  className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-colors shadow-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Export Report PDF
                </button>
              </div>

              <ResultCards data={result} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DietCards dietPlan={result.diet} />
                <ExerciseCards exercisePlan={result.exercise} />
              </div>

              <PersonalizationPanel data={result} />
              
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
