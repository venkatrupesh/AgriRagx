import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart3, ScanLine, Bot, Leaf, Brain, Database,
  MessageSquare, ArrowRight, Clock, CheckCircle2, XCircle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { checkHealth, getHistory } from '../api/historyApi';
import StatusCard from '../components/StatusCard';
import EmptyState from '../components/EmptyState';

const quickActions = [
  { icon: BarChart3, label: 'Predict Crop Yield', description: 'Run the ML yield model', link: '/crop-yield', color: 'from-agri-500 to-emerald-600' },
  { icon: ScanLine, label: 'Detect Leaf Disease', description: 'Upload a leaf image', link: '/disease-detection', color: 'from-cyan-500 to-blue-600' },
  { icon: Bot, label: 'Ask AI Assistant', description: 'RAG-powered Q&A', link: '/assistant', color: 'from-violet-500 to-purple-600' },
];

export default function Dashboard() {
  const { isDark } = useTheme();
  const [health, setHealth] = useState({ status: 'checking' });
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    checkHealth()
      .then((data) => setHealth(data))
      .catch(() => setHealth({ status: 'offline' }));

    getHistory()
      .then((data) => setHistory(data.history || []))
      .catch(() => setHistory([]))
      .finally(() => setHistoryLoading(false));
  }, []);

  const isOnline = health.status === 'ok';

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-surface-900'}`}>
            Welcome to <span className="gradient-text">AgriRAG-X</span>
          </h1>
          <p className={`text-base ${isDark ? 'text-surface-400' : 'text-surface-600'}`}>
            Your intelligent agricultural analysis workspace.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-surface-900'}`}>Quick Actions</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Link key={action.label} to={action.link}>
                <div className={`group rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-1 ${isDark
                  ? 'border-white/5 bg-white/[0.02] hover:border-agri-500/20 hover:shadow-lg hover:shadow-agri-500/5'
                  : 'border-surface-200 bg-white hover:border-agri-300 hover:shadow-lg'
                }`}>
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-surface-900'}`}>{action.label}</h3>
                  <p className={`text-xs ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>{action.description}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-medium text-agri-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    Go <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* System Overview */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-surface-900'}`}>System Overview</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatusCard
              icon={BarChart3}
              title="Crop Yield Model"
              status={isOnline ? 'Connected' : 'Unavailable'}
              description="scikit-learn regression model"
            />
            <StatusCard
              icon={ScanLine}
              title="Disease Detection"
              status={isOnline ? 'Connected' : 'Unavailable'}
              description="PyTorch EfficientNet model"
            />
            <StatusCard
              icon={Database}
              title="RAG Knowledge Base"
              status={isOnline ? 'Connected' : 'Unavailable'}
              description="FAISS vector store"
            />
            <StatusCard
              icon={Brain}
              title="AI Assistant"
              status={isOnline ? 'Connected' : 'Unavailable'}
              description="LLM-powered responses"
            />
          </div>
        </motion.div>

        {/* Backend Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-10"
        >
          <div className={`rounded-2xl border p-4 flex items-center gap-4 ${
            isOnline
              ? isDark ? 'border-agri-500/20 bg-agri-500/5' : 'border-agri-200 bg-agri-50'
              : health.status === 'checking'
                ? isDark ? 'border-white/5 bg-white/[0.02]' : 'border-surface-200 bg-surface-50'
                : isDark ? 'border-red-500/20 bg-red-500/5' : 'border-red-200 bg-red-50'
          }`}>
            {health.status === 'checking' ? (
              <div className="w-5 h-5 border-2 border-surface-400 border-t-transparent rounded-full animate-spin" />
            ) : isOnline ? (
              <CheckCircle2 className="w-5 h-5 text-agri-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-surface-900'}`}>
                Backend: {health.status === 'checking' ? 'Checking...' : isOnline ? 'Connected' : 'Offline'}
              </p>
              <p className={`text-xs ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>
                {isOnline
                  ? 'Flask API is running and all services are available.'
                  : health.status === 'checking'
                    ? 'Verifying connection to the Flask backend...'
                    : 'Unable to connect. Make sure the Flask server is running on the configured port.'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Recent Analyses */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-surface-900'}`}>Recent Analyses</h2>
          <div className={`rounded-2xl border overflow-hidden ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-surface-200 bg-white'}`}>
            {historyLoading ? (
              <div className="p-8 text-center">
                <div className="w-6 h-6 border-2 border-agri-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className={`text-sm ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>Loading history...</p>
              </div>
            ) : history.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b ${isDark ? 'border-white/5' : 'border-surface-100'}`}>
                      {['Type', 'Crop', 'Result', 'Date', 'Status'].map((h) => (
                        <th key={h} className={`px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-surface-500' : 'text-surface-400'}`}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {history.slice(0, 10).map((item, i) => (
                      <tr key={i} className={`border-b last:border-b-0 ${isDark ? 'border-white/5 hover:bg-white/[0.02]' : 'border-surface-100 hover:bg-surface-50'}`}>
                        <td className={`px-5 py-3 ${isDark ? 'text-surface-300' : 'text-surface-700'}`}>{item.type}</td>
                        <td className={`px-5 py-3 ${isDark ? 'text-surface-300' : 'text-surface-700'}`}>{item.crop || '—'}</td>
                        <td className={`px-5 py-3 ${isDark ? 'text-surface-300' : 'text-surface-700'}`}>{item.result || '—'}</td>
                        <td className={`px-5 py-3 ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>
                          {item.date ? new Date(item.date).toLocaleDateString() : '—'}
                        </td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                            item.status === 'success'
                              ? isDark ? 'bg-agri-500/10 text-agri-400' : 'bg-agri-50 text-agri-700'
                              : isDark ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-700'
                          }`}>
                            {item.status === 'success' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState
                icon={Clock}
                title="No analyses yet"
                description="Your analysis history will appear here once you run predictions or queries."
                action={
                  <Link
                    to="/crop-yield"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-agri-500 to-agri-600 text-white text-sm font-semibold hover:from-agri-600 hover:to-agri-700 transition-all"
                  >
                    Run First Analysis <ArrowRight className="w-4 h-4" />
                  </Link>
                }
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
