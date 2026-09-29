import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart3, ScanLine, Bot, BookOpen, History,
  ArrowRight, Sprout, Leaf, Zap, Shield
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import HeroVisualization from '../components/HeroVisualization';

const features = [
  {
    icon: BarChart3,
    title: 'Crop Yield Prediction',
    description: 'Estimate crop yield using machine learning and agricultural parameters.',
    color: 'from-agri-500 to-emerald-600',
    link: '/crop-yield',
  },
  {
    icon: ScanLine,
    title: 'Leaf Disease Detection',
    description: 'Analyze crop leaf images using deep learning for disease identification.',
    color: 'from-cyan-500 to-blue-600',
    link: '/disease-detection',
  },
  {
    icon: Bot,
    title: 'AI Agricultural Assistant',
    description: 'Ask agricultural questions and receive knowledge-grounded answers.',
    color: 'from-violet-500 to-purple-600',
    link: '/assistant',
  },
  {
    icon: BookOpen,
    title: 'Evidence-Grounded RAG',
    description: 'Retrieve relevant agricultural knowledge before generating answers.',
    color: 'from-amber-500 to-orange-600',
    link: '/assistant',
  },
  {
    icon: History,
    title: 'Analysis History',
    description: 'Review previous agricultural analyses and track your insights.',
    color: 'from-rose-500 to-pink-600',
    link: '/history',
  },
];

const stagger = {
  container: { transition: { staggerChildren: 0.08 } },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
};

export default function Home() {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
        {/* Background gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] ${isDark ? 'bg-agri-500/8' : 'bg-agri-200/40'}`} />
          <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px] ${isDark ? 'bg-cyan-500/5' : 'bg-cyan-200/30'}`} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6 text-xs font-medium
                ${isDark ? 'border-agri-500/20 bg-agri-500/10 text-agri-400' : 'border-agri-200 bg-agri-50 text-agri-700'}">
                <Zap className="w-3.5 h-3.5" />
                ML + DL + RAG + LLM Platform
              </div>

              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 ${isDark ? 'text-white' : 'text-surface-900'}`}>
                AI-Powered Intelligence for{' '}
                <span className="gradient-text">Smarter Agriculture</span>
              </h1>

              <p className={`text-lg leading-relaxed max-w-xl mb-8 ${isDark ? 'text-surface-400' : 'text-surface-600'}`}>
                AgriRAG-X combines machine learning, deep learning, retrieval-augmented generation, and agricultural knowledge to help transform complex agricultural data into understandable insights.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-agri-500 to-agri-600 text-white font-semibold text-sm
                    hover:from-agri-600 hover:to-agri-700 shadow-lg shadow-agri-500/25 hover:shadow-agri-500/40 transition-all duration-200"
                >
                  Start Analysis <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/assistant"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 ${isDark
                    ? 'border-white/10 text-white hover:bg-white/5'
                    : 'border-surface-300 text-surface-700 hover:bg-surface-50'
                  }`}
                >
                  <Bot className="w-4 h-4" /> Explore AI Assistant
                </Link>
              </div>
            </motion.div>

            {/* Right — Visualization */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative h-[350px] lg:h-[420px]"
            >
              <div className={`absolute inset-0 rounded-3xl overflow-hidden ${isDark ? 'bg-white/[0.02]' : 'bg-surface-50/50'} border ${isDark ? 'border-white/5' : 'border-surface-200'}`}>
                <HeroVisualization />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className={`py-20 ${isDark ? 'bg-surface-950/50' : 'bg-surface-50/50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-surface-900'}`}>
              Comprehensive Agricultural <span className="gradient-text">AI Suite</span>
            </h2>
            <p className={`text-base max-w-2xl mx-auto ${isDark ? 'text-surface-400' : 'text-surface-600'}`}>
              Five integrated AI modules working together to provide end-to-end agricultural intelligence.
            </p>
          </motion.div>

          <motion.div
            variants={stagger.container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={stagger.item}>
                <Link to={f.link}>
                  <div className={`group rounded-2xl border p-6 h-full transition-all duration-300 ${isDark
                    ? 'border-white/5 bg-white/[0.02] hover:border-agri-500/20 hover:bg-white/[0.04]'
                    : 'border-surface-200 bg-white hover:border-agri-300 hover:shadow-lg hover:shadow-surface-200/50'
                  }`}>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <f.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-surface-900'}`}>{f.title}</h3>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>{f.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-agri-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== ARCHITECTURE OVERVIEW ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-surface-900'}`}>
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className={`text-base max-w-2xl mx-auto ${isDark ? 'text-surface-400' : 'text-surface-600'}`}>
              A multi-layered AI architecture combining multiple paradigms for comprehensive agricultural analysis.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-4"
          >
            {[
              { step: '01', label: 'Input', desc: 'Provide crop data, leaf images, or questions', icon: Sprout },
              { step: '02', label: 'Process', desc: 'ML, DL, and RAG pipelines analyze the input', icon: Zap },
              { step: '03', label: 'Ground', desc: 'Retrieve evidence from agricultural knowledge', icon: Shield },
              { step: '04', label: 'Insight', desc: 'Receive AI-powered recommendations', icon: Leaf },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl border p-6 text-center ${isDark
                  ? 'border-white/5 bg-white/[0.02]'
                  : 'border-surface-200 bg-white'
                }`}
              >
                <span className="text-4xl font-black gradient-text opacity-20 absolute top-3 right-4">{s.step}</span>
                <div className={`w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-4 ${isDark ? 'bg-agri-500/10' : 'bg-agri-50'}`}>
                  <s.icon className="w-6 h-6 text-agri-500" />
                </div>
                <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-surface-900'}`}>{s.label}</h3>
                <p className={`text-xs ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className={`py-20 ${isDark ? 'bg-surface-950/50' : 'bg-surface-50/50'}`}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-surface-900'}`}>
              Ready to Get Started?
            </h2>
            <p className={`text-base mb-8 ${isDark ? 'text-surface-400' : 'text-surface-600'}`}>
              Begin analyzing crop data and get AI-powered agricultural insights.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-agri-500 to-agri-600 text-white font-semibold
                hover:from-agri-600 hover:to-agri-700 shadow-lg shadow-agri-500/25 hover:shadow-agri-500/40 transition-all duration-200"
            >
              Open Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
