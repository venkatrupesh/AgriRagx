import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function StatusCard({ icon: Icon, title, status, description }) {
  const { isDark } = useTheme();
  const isOnline = status === 'Connected' || status === 'ok';
  const statusLabel = isOnline ? 'Connected' : 'Unavailable';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={`rounded-2xl border p-5 transition-shadow duration-200 ${isDark
        ? 'border-white/5 bg-white/[0.02] hover:shadow-lg hover:shadow-agri-500/5'
        : 'border-surface-200 bg-white hover:shadow-lg hover:shadow-surface-200/50'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isDark ? 'bg-agri-500/10' : 'bg-agri-50'}`}>
          <Icon className="w-5 h-5 text-agri-500" />
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-agri-500 animate-pulse' : isDark ? 'bg-surface-600' : 'bg-surface-300'}`} />
          <span className={`text-xs font-medium ${isOnline ? 'text-agri-500' : isDark ? 'text-surface-500' : 'text-surface-400'}`}>
            {statusLabel}
          </span>
        </div>
      </div>
      <h3 className={`text-sm font-semibold mb-1 ${isDark ? 'text-white' : 'text-surface-900'}`}>{title}</h3>
      {description && (
        <p className={`text-xs leading-relaxed ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>{description}</p>
      )}
    </motion.div>
  );
}
