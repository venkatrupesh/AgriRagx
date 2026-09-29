import { motion } from 'framer-motion';
import {
  BookOpen, Database, Brain, Cpu, FileText, Search,
  MessageSquare, BarChart3, ScanLine, Layers, ArrowDown
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const pipelineSteps = [
  { icon: FileText, title: '1. Data Collection', description: 'Gather agricultural data including crop parameters, leaf images, and domain knowledge documents.' },
  { icon: Layers, title: '2. Data Preprocessing', description: 'Clean, normalize, and transform raw data into suitable formats for model training and inference.' },
  { icon: BarChart3, title: '3. Machine Learning', description: 'Train scikit-learn regression models on historical crop yield data for yield prediction.' },
  { icon: ScanLine, title: '4. Deep Learning', description: 'Train PyTorch EfficientNet models on labeled leaf disease image datasets for visual classification.' },
  { icon: Cpu, title: '5. Prediction', description: 'Run trained models on new inputs to generate crop yield estimates and disease classifications.' },
  { icon: Search, title: '6. Retrieval (RAG)', description: 'Embed user queries and search the FAISS vector store for relevant agricultural knowledge documents.' },
  { icon: Database, title: '7. Knowledge Grounding', description: 'Combine retrieved document passages with the user query to form a grounded prompt context.' },
  { icon: Brain, title: '8. LLM Response', description: 'Pass the grounded prompt to a large language model to generate a comprehensive, evidence-based answer.' },
  { icon: MessageSquare, title: '9. User-Friendly Explanation', description: 'Format and present the AI response with sources, confidence levels, and actionable insights.' },
];

export default function Methodology() {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-surface-900'}`}>
            Technical <span className="gradient-text">Methodology</span>
          </h1>
          <p className={`text-base max-w-2xl mx-auto ${isDark ? 'text-surface-400' : 'text-surface-600'}`}>
            Understanding the AgriRAG-X AI pipeline — from data input to agricultural insights.
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`rounded-2xl border p-6 sm:p-8 mb-12 ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-surface-200 bg-white'}`}
        >
          <h2 className={`text-xl font-bold mb-6 text-center ${isDark ? 'text-white' : 'text-surface-900'}`}>System Architecture</h2>

          <div className="flex flex-col items-center gap-3 text-sm">
            {/* User layer */}
            <div className={`px-6 py-3 rounded-xl border ${isDark ? 'border-white/10 bg-white/5 text-surface-200' : 'border-surface-200 bg-surface-50 text-surface-800'} font-semibold`}>
              👤 User
            </div>
            <ArrowDown className={`w-5 h-5 ${isDark ? 'text-surface-600' : 'text-surface-300'}`} />

            {/* Frontend */}
            <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 font-semibold">
              <span className="text-blue-500">React + Vite Frontend</span>
            </div>
            <ArrowDown className={`w-5 h-5 ${isDark ? 'text-surface-600' : 'text-surface-300'}`} />

            {/* REST API */}
            <div className={`px-6 py-2 rounded-lg text-xs font-medium ${isDark ? 'bg-white/5 text-surface-400' : 'bg-surface-100 text-surface-500'}`}>
              REST API (HTTP)
            </div>
            <ArrowDown className={`w-5 h-5 ${isDark ? 'text-surface-600' : 'text-surface-300'}`} />

            {/* Backend */}
            <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-agri-500/10 to-emerald-500/10 border border-agri-500/20 font-semibold">
              <span className="text-agri-500">Python Flask Backend</span>
            </div>
            <ArrowDown className={`w-5 h-5 ${isDark ? 'text-surface-600' : 'text-surface-300'}`} />

            {/* Models */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl">
              <div className={`px-4 py-3 rounded-xl border text-center ${isDark ? 'border-white/5 bg-white/[0.03]' : 'border-surface-200 bg-surface-50'}`}>
                <BarChart3 className="w-5 h-5 text-agri-500 mx-auto mb-1" />
                <p className={`text-xs font-semibold ${isDark ? 'text-surface-200' : 'text-surface-800'}`}>Crop Yield ML</p>
                <p className={`text-[10px] ${isDark ? 'text-surface-500' : 'text-surface-400'}`}>scikit-learn</p>
              </div>
              <div className={`px-4 py-3 rounded-xl border text-center ${isDark ? 'border-white/5 bg-white/[0.03]' : 'border-surface-200 bg-surface-50'}`}>
                <ScanLine className="w-5 h-5 text-cyan-500 mx-auto mb-1" />
                <p className={`text-xs font-semibold ${isDark ? 'text-surface-200' : 'text-surface-800'}`}>Disease DL</p>
                <p className={`text-[10px] ${isDark ? 'text-surface-500' : 'text-surface-400'}`}>PyTorch EfficientNet</p>
              </div>
              <div className={`px-4 py-3 rounded-xl border text-center ${isDark ? 'border-white/5 bg-white/[0.03]' : 'border-surface-200 bg-surface-50'}`}>
                <Brain className="w-5 h-5 text-violet-500 mx-auto mb-1" />
                <p className={`text-xs font-semibold ${isDark ? 'text-surface-200' : 'text-surface-800'}`}>RAG + LLM</p>
                <p className={`text-[10px] ${isDark ? 'text-surface-500' : 'text-surface-400'}`}>FAISS + Sentence Transformers</p>
              </div>
            </div>
            <ArrowDown className={`w-5 h-5 ${isDark ? 'text-surface-600' : 'text-surface-300'}`} />

            {/* Insights */}
            <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 font-semibold">
              <span className="text-amber-500">🌾 Agricultural Insights</span>
            </div>
          </div>
        </motion.div>

        {/* Pipeline Steps */}
        <h2 className={`text-2xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-surface-900'}`}>
          Processing <span className="gradient-text">Pipeline</span>
        </h2>

        <div className="space-y-4">
          {pipelineSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-2xl border p-5 flex items-start gap-4 ${isDark
                ? 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04]'
                : 'border-surface-200 bg-white hover:bg-surface-50'
              } transition-colors`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-agri-500/10' : 'bg-agri-50'}`}>
                <step.icon className="w-5 h-5 text-agri-500" />
              </div>
              <div>
                <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-surface-900'}`}>{step.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mt-12 rounded-2xl border p-6 sm:p-8 ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-surface-200 bg-white'}`}
        >
          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-surface-900'}`}>Technology Stack</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-surface-300' : 'text-surface-700'}`}>Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'Axios', 'React Router'].map((t) => (
                  <span key={t} className={`text-xs px-3 py-1.5 rounded-lg ${isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-700'}`}>{t}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-surface-300' : 'text-surface-700'}`}>Backend</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Flask', 'PyTorch', 'scikit-learn', 'FAISS', 'Sentence Transformers', 'Pillow', 'pandas'].map((t) => (
                  <span key={t} className={`text-xs px-3 py-1.5 rounded-lg ${isDark ? 'bg-agri-500/10 text-agri-400' : 'bg-agri-50 text-agri-700'}`}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
