import { motion } from 'framer-motion';
import { Leaf, Target, Lightbulb, Layers, Rocket, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const objectives = [
  'Predict crop yield using trained machine learning models',
  'Detect crop diseases from leaf images using deep learning',
  'Provide agricultural knowledge through an AI assistant',
  'Ground AI responses in retrieved evidence using RAG',
  'Make agricultural AI understandable and accessible',
];

const futureScope = [
  'Real-time weather data integration for dynamic predictions',
  'Multi-language support for regional accessibility',
  'Mobile application for field usage',
  'IoT sensor data integration for precision agriculture',
  'Expanded crop and disease coverage',
  'Community-contributed knowledge base',
  'Integration with government agricultural portals',
];

export default function About() {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-agri-500 to-agri-700 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-surface-900'}`}>
            About <span className="gradient-text">AgriRAG-X</span>
          </h1>
          <p className={`text-base max-w-2xl mx-auto ${isDark ? 'text-surface-400' : 'text-surface-600'}`}>
            An AI-powered agriculture decision-support platform.
          </p>
        </motion.div>

        {/* Project Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`rounded-2xl border p-6 sm:p-8 mb-6 ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-surface-200 bg-white'}`}
        >
          <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-surface-900'}`}>Project Overview</h2>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-surface-400' : 'text-surface-600'}`}>
            AgriRAG-X is an integrated AI platform that brings together multiple artificial intelligence paradigms
            to provide comprehensive agricultural decision support. The system combines machine learning for crop yield
            prediction, deep learning for disease detection from leaf images, and retrieval-augmented generation (RAG)
            for evidence-grounded agricultural Q&A — all accessible through a modern, intuitive interface.
          </p>
        </motion.section>

        {/* Problem Statement */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`rounded-2xl border p-6 sm:p-8 mb-6 ${isDark ? 'border-amber-500/10 bg-amber-500/5 border-amber-500/20' : 'border-amber-200 bg-amber-50'}`}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-surface-900'}`}>Problem Statement</h2>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-surface-300' : 'text-surface-700'}`}>
                Farmers often struggle to make informed crop and disease management decisions because agricultural
                information can be complex, fragmented, and difficult to interpret. Access to timely, accurate, and
                actionable agricultural intelligence remains a significant challenge, particularly for small and
                medium-scale farmers.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Objectives */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`rounded-2xl border p-6 sm:p-8 mb-6 ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-surface-200 bg-white'}`}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-agri-500 to-emerald-600 flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-surface-900'}`}>Objectives</h2>
          </div>
          <ul className="space-y-3">
            {objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-agri-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-agri-500">{i + 1}</span>
                </div>
                <span className={`text-sm leading-relaxed ${isDark ? 'text-surface-300' : 'text-surface-700'}`}>{obj}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* AI Architecture */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`rounded-2xl border p-6 sm:p-8 mb-6 ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-surface-200 bg-white'}`}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-surface-900'}`}>AI Architecture</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Machine Learning', desc: 'scikit-learn models for structured agricultural data regression and prediction.', color: 'border-agri-500/20' },
              { label: 'Deep Learning', desc: 'PyTorch EfficientNet for high-accuracy visual crop disease classification.', color: 'border-cyan-500/20' },
              { label: 'RAG + LLM', desc: 'FAISS vector retrieval with Sentence Transformers and LLM for knowledge-grounded Q&A.', color: 'border-violet-500/20' },
            ].map((arch) => (
              <div key={arch.label} className={`rounded-xl border p-4 ${isDark ? `${arch.color} bg-white/[0.02]` : 'border-surface-200 bg-surface-50'}`}>
                <h3 className={`text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-surface-900'}`}>{arch.label}</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>{arch.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Future Scope */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`rounded-2xl border p-6 sm:p-8 ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-surface-200 bg-white'}`}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-surface-900'}`}>Future Scope</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {futureScope.map((item, i) => (
              <div key={i} className={`flex items-center gap-2 text-sm px-4 py-3 rounded-xl ${isDark ? 'bg-white/[0.03] text-surface-300' : 'bg-surface-50 text-surface-700'}`}>
                <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
