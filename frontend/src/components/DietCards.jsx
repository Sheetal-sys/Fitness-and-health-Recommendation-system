import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { UtensilsCrossed, CheckCircle2, ChevronRight, Apple, Leaf } from 'lucide-react';

const dietDictionary = {
  "oats": { desc: "Fiber-rich whole grains", benefit: "Helps regulate blood sugar" },
  "green salad": { desc: "Fresh vegetable mix", benefit: "Packed with essential vitamins" },
  "fruits": { desc: "Assorted fresh seasonal fruits", benefit: "Natural antioxidants" },
  "boiled vegetables": { desc: "Zero-oil steamed veggies", benefit: "Easy to digest, nutrient dense" },
  "soup": { desc: "Warm and comforting liquid meal", benefit: "Hydrating and low calorie" },
  "eggs": { desc: "Complete protein source", benefit: "Muscle repair and growth" },
  "chicken": { desc: "Lean poultry meat", benefit: "High protein for lean bulk" },
  "rice": { desc: "Complex carbohydrates", benefit: "Sustained energy source" },
  "milk": { desc: "Dairy beverage", benefit: "Bone health and calcium" },
  "peanut butter": { desc: "Healthy fats and protein", benefit: "Caloric density for gain" },
  "balanced diet": { desc: "A mix of macros", benefit: "Overall well-being" },
  "vegetables": { desc: "Fibrous plant foods", benefit: "Supports digestion" },
  "whole grains": { desc: "Unrefined grains", benefit: "Slow release energy" },
};

export default function DietCards({ dietPlan }) {
  if (!dietPlan || dietPlan.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
        <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
          <UtensilsCrossed size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">Recommended Diet</h3>
          <p className="text-sm text-slate-500">Foods aligned with your goals</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {dietPlan.map((item, idx) => {
          const detail = dietDictionary[item.toLowerCase()] || { desc: "Nutritious selection", benefit: "Supports your target health goal" };
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors shrink-0">
                  {idx % 2 === 0 ? <Apple size={20} /> : <Leaf size={20} />}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg capitalize">{item}</h4>
                  <p className="text-sm text-slate-500 mt-1">{detail.desc}</p>
                  <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 inline-flex px-2 py-1 rounded-lg">
                    <CheckCircle2 size={14} /> 
                    <span>{detail.benefit}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
