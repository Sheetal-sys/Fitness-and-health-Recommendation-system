import { useState } from 'react';
import { Activity, Thermometer, Heart, User, Ruler, Weight } from 'lucide-react';

export default function InputForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    activity_level: 'moderate',
    heart_rate: '',
    body_temp: '',
    health_condition: 'none'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      age: Number(formData.age),
      weight: Number(formData.weight),
      height: Number(formData.height),
      heart_rate: Number(formData.heart_rate),
      body_temp: Number(formData.body_temp),
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800">Your Profile & Vitals</h2>
        <p className="text-slate-500 mt-1 text-sm">Enter accurate details for personalized AI recommendations.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Age */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
            <User size={13} /> Age
          </label>
          <input type="number" name="age" value={formData.age} onChange={handleChange}
            placeholder="Years" required className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none text-sm transition-all" />
        </div>

        {/* Gender */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none text-sm transition-all">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Weight */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
            <Weight size={13} /> Weight (kg)
          </label>
          <input type="number" name="weight" value={formData.weight} onChange={handleChange}
            placeholder="kg" required className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none text-sm transition-all" />
        </div>

        {/* Height */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
            <Ruler size={13} /> Height (cm)
          </label>
          <input type="number" name="height" value={formData.height} onChange={handleChange}
            placeholder="cm" required className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none text-sm transition-all" />
        </div>

        {/* Heart Rate */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
            <Heart size={13} className="text-rose-500" /> Heart Rate (bpm)
          </label>
          <input type="number" name="heart_rate" value={formData.heart_rate} onChange={handleChange}
            placeholder="bpm" required className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none text-sm transition-all" />
        </div>

        {/* Body Temp */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
            <Thermometer size={13} className="text-orange-500" /> Body Temp (°F)
          </label>
          <input type="number" step="0.1" name="body_temp" value={formData.body_temp} onChange={handleChange}
            placeholder="°F" required className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none text-sm transition-all" />
        </div>

        {/* Activity Level */}
        <div className="col-span-2">
          <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
            <Activity size={13} /> Activity Level
          </label>
          <select name="activity_level" value={formData.activity_level} onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none text-sm transition-all">
            <option value="low">Low (Sedentary)</option>
            <option value="moderate">Moderate (Active)</option>
            <option value="high">High (Very Active)</option>
          </select>
        </div>

        {/* Health Condition */}
        <div className="col-span-2">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Health Condition</label>
          <select name="health_condition" value={formData.health_condition} onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none text-sm transition-all">
            <option value="none">None</option>
            <option value="diabetes">Diabetes</option>
            <option value="bp">High Blood Pressure</option>
            <option value="thyroid">Thyroid</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <button type="submit" disabled={isLoading}
          className="w-full relative py-3 px-6 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 outline-none disabled:opacity-70 disabled:cursor-not-allowed group overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-600 to-secondary-500 group-hover:opacity-90 transition-opacity"></div>
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : 'Generate AI Recommendations'}
          </span>
        </button>
      </div>
    </form>
  );
}
