import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Dumbbell, Timer, Flame, Activity } from 'lucide-react';

const exerciseDictionary = {
  "running": { type: "Cardio", intensity: "High", duration: "30-45 mins" },
  "cycling": { type: "Cardio", intensity: "Medium", duration: "45-60 mins" },
  "jump rope": { type: "Cardio", intensity: "High", duration: "15-20 mins" },
  "hiit": { type: "Cardio/Strength", intensity: "High", duration: "20-30 mins" },
  "weight lifting": { type: "Strength", intensity: "High", duration: "45-60 mins" },
  "squats": { type: "Strength", intensity: "Medium to High", duration: "4 sets of 10-15 reps" },
  "deadlifts": { type: "Strength", intensity: "High", duration: "4 sets of 8-12 reps" },
  "bench press": { type: "Strength", intensity: "High", duration: "4 sets of 8-12 reps" },
  "yoga": { type: "Flexibility/Core", intensity: "Low to Medium", duration: "45-60 mins" },
  "walking": { type: "Cardio", intensity: "Low", duration: "30-60 mins" },
  "light jogging": { type: "Cardio", intensity: "Medium", duration: "20-30 mins" },
};

export default function ExerciseCards({ exercisePlan }) {
  if (!exercisePlan || exercisePlan.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mt-8 xl:mt-0">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
        <div className="p-3 rounded-2xl bg-rose-50 text-rose-600">
          <Dumbbell size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">Exercise Plan</h3>
          <p className="text-sm text-slate-500">Activities tailored for you</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {exercisePlan.map((item, idx) => {
          const detail = exerciseDictionary[item.toLowerCase()] || { type: "General", intensity: "Variable", duration: "30 mins" };
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="group flex flex-col p-4 rounded-2xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/50 transition-all gap-3"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-slate-50 text-slate-400 rounded-lg group-hover:bg-rose-100 group-hover:text-rose-600 transition-colors">
                  <Activity size={18} />
                </div>
                <h4 className="font-bold text-slate-800 text-lg capitalize">{item}</h4>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-lg">
                  <span className="opacity-70 border-r border-sky-200 pr-1.5">Type</span> {detail.type}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg flex-1 min-w-[max-content]">
                  <Flame size={14} className="opacity-70" /> 
                  <span className="opacity-70 border-r border-orange-200 pr-1.5 hidden sm:inline">Intensity</span> {detail.intensity}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg flex-1 min-w-[max-content]">
                  <Timer size={14} className="opacity-70" />
                  <span className="opacity-70 border-r border-indigo-200 pr-1.5 hidden sm:inline">Duration</span> {detail.duration}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
