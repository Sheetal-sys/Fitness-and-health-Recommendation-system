import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';
import { Activity, Brain, Utensils, TrendingUp, ArrowRight } from 'lucide-react';

export default function Landing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-200 blur-3xl opacity-50 animated-blob"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-secondary-200 blur-3xl opacity-50 animated-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-1/2 w-80 h-80 rounded-full bg-indigo-200 blur-3xl opacity-50 animated-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          className="text-center mt-16 md:mt-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary-600 to-secondary-500 flex items-center justify-center p-4 shadow-lg shadow-primary-500/30">
              <Activity className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 drop-shadow-sm">
            AI Fitness & <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
              Health System
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 font-light">
            Unlock your full potential with personalized AI-driven recommendations.
            Get smart exercise plans, diet routines, and proactive health tracking in one beautiful platform.
          </motion.p>
          
          <motion.div variants={itemVariants} className="mt-10 flex justify-center gap-4">
            <Link
              to="/dashboard"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white transition-all duration-200 bg-slate-900 border border-transparent rounded-full overflow-hidden hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 shadow-xl shadow-slate-900/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-primary-600 to-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-32 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <FeatureCard 
            icon={<Brain className="text-primary-500" />}
            title="AI Recommendations"
            desc="Advanced algorithms analyze your physiological data to generate tailored insights."
          />
          <FeatureCard 
            icon={<Utensils className="text-secondary-500" />}
            title="Personalized Diet"
            desc="Catering to your health condition and goals, ensuring optimal nutrition."
          />
          <FeatureCard 
            icon={<Activity className="text-indigo-500" />}
            title="Smart Exercise"
            desc="Routines optimized for your current activity level and fitness objectives."
          />
          <FeatureCard 
            icon={<TrendingUp className="text-emerald-500" />}
            title="Progress Tracking"
            desc="Beautiful, simple analytics to monitor your health journey over time."
          />
        </motion.div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      className="glass p-8 hover:-translate-y-2 transition-transform duration-300 group cursor-default"
    >
      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </motion.div>
  );
}
