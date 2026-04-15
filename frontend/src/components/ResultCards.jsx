import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Target, Flame, ActivitySquare, BrainCircuit, HeartPulse, Scale } from 'lucide-react';

export default function ResultCards({ data }) {
  if (!data) return null;

  const cards = [
    {
      title: "BMI",
      value: data.bmi?.toFixed(1) || "N/A",
      icon: <ActivitySquare className="w-6 h-6 text-primary-500" />,
      colorState: calculateBMIColor(data.bmi),
      label: "Body Mass Index"
    },
    {
      title: "Category",
      value: data.category || "N/A",
      icon: <Scale className="w-6 h-6 text-emerald-500" />,
      colorState: "emerald",
      label: "Health Category"
    },
    {
      title: "Health Goal",
      value: data.goal || "N/A",
      icon: <Target className="w-6 h-6 text-indigo-500" />,
      colorState: "indigo",
      label: "AI Target"
    },
    {
      title: "Rec. Calories",
      value: `${data.recommended_intake || data.daily_calories} kcal`,
      icon: <Flame className="w-6 h-6 text-orange-500" />,
      colorState: "orange",
      label: "Daily Target"
    },
    {
      title: "Exercise Level",
      value: data.exercise_category || "General",
      icon: <HeartPulse className="w-6 h-6 text-rose-500" />,
      colorState: "rose",
      label: "Intensity Focus"
    },
    {
      title: "Personalization",
      value: data.personalization || "Generated Plan",
      icon: <BrainCircuit className="w-6 h-6 text-sky-500" />,
      colorState: "sky",
      label: "AI Note",
      isLargeText: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all
              before:absolute before:inset-x-0 before:top-0 before:h-2 before:bg-${card.colorState}-400
            `}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-${card.colorState}-50 group-hover:scale-110 transition-transform`}>
                {card.icon}
              </div>
              <span className={`text-xs font-bold text-${card.colorState}-700 bg-${card.colorState}-50 px-3 py-1 rounded-full uppercase tracking-wider`}>
                {card.label}
              </span>
            </div>
            
            <h3 className="text-sm font-medium text-slate-500 mb-1">{card.title}</h3>
            <div className={`font-bold tracking-tight text-slate-900 ${card.isLargeText ? 'text-lg leading-tight' : 'text-3xl'}`}>
              {card.value}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function calculateBMIColor(bmi) {
  if (!bmi) return "slate";
  if (bmi < 18.5) return "sky"; // Underweight
  if (bmi >= 18.5 && bmi < 25) return "emerald"; // Healthy
  if (bmi >= 25 && bmi < 30) return "orange"; // Overweight
  return "rose"; // Obese
}
