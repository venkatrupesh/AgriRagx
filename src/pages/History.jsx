import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  History as HistoryIcon, Clock, BarChart3, ScanLine, Bot,
  ArrowRight, CheckCircle2, XCircle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useApi } from '../hooks/useApi';
import { getHistory } from '../api/historyApi';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

const typeIcons = {
  yield: BarChart3,
  disease: ScanLine,
  rag: Bot,
};

const typeColors = {
  yield: 'from-agri-500 to-emerald-600',
  disease: 'from-cyan-500 to-blue-600',
  rag: 'from-violet-500 to-purple-600',
};

export default function History() {
  const { isDark } = useTheme();
  const { data, loading, error, execute } = useApi(getHistory);

  useEffect(() => {
    execute();
  }, []);

  const history = data?.history || [];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
              <HistoryIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-surface-900'}`}>
              Analysis History
            </h1>
          </div>
          <p className={`text-base max-w-2xl ${isDark ? 'text-surface-400' : 'text-surface-600'}`}>
            Review previous agricultural analyses, predictions, and AI assistant queries.
          </p>
        </motion.div>

        {loading && <LoadingSpinner message="Loading analysis history..." />}

        {error && <ErrorMessage message={error} onRetry={execute} />}

        {!loading && !error && history.length === 0 && (
          <EmptyState
            icon={Clock}
            title="No analysis history available"
            description="Your crop yield predictions, disease detections, and AI queries will be recorded here."
            action={
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  to="/crop-yield"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-agri-500 to-agri-600 text-white text-sm font-semibold transition-all"
                >
                  <BarChart3 className="w-4 h-4" /> Predict Yield
                </Link>
                <Link
                  to="/disease-detection"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold transition-all"
                >
                  <ScanLine className="w-4 h-4" /> Detect Disease
                </Link>
              </div>
            }
          />
        )}

        {!loading && !error && history.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`rounded-2xl border overflow-hidden ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-surface-200 bg-white'}`}
          >
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
                  {history.map((item, i) => {
                    const TypeIcon = typeIcons[item.type] || Clock;
                    return (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className={`border-b last:border-b-0 ${isDark ? 'border-white/5 hover:bg-white/[0.02]' : 'border-surface-100 hover:bg-surface-50'}`}
                      >
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${typeColors[item.type] || 'from-surface-400 to-surface-500'} flex items-center justify-center`}>
                              <TypeIcon className="w-3.5 h-3.5 text-white" />
                            </div>
                            <span className={`font-medium capitalize ${isDark ? 'text-surface-200' : 'text-surface-800'}`}>{item.type}</span>
                          </div>
                        </td>
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
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
