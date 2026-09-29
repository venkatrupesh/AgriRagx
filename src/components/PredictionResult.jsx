import { motion } from 'framer-motion';
import { CheckCircle2, Clock, BarChart3 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function PredictionResult({ title, value, unit, icon: Icon = BarChart3, details = [], timestamp }) {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl border overflow-hidden ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-surface-200 bg-white shadow-sm'}`}
    >
      {/* Header */}
      <div className={`px-6 py-4 border-b ${isDark ? 'border-white/5 bg-agri-500/5' : 'border-surface-100 bg-agri-50/50'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-agri-500 to-emerald-600 flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-surface-900'}`}>{title}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-agri-500" />
              <span className="text-xs text-agri-500 font-medium">Prediction Complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="px-6 py-8 text-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <p className="text-5xl font-bold gradient-text mb-2">
            {typeof value === 'number' ? value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : value}
          </p>
          {unit && (
            <p className={`text-sm font-medium ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>
              {unit}
            </p>
          )}
        </motion.div>
      </div>

      {/* Details */}
      {details.length > 0 && (
        <div className={`px-6 py-4 border-t ${isDark ? 'border-white/5' : 'border-surface-100'}`}>
          <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-surface-500' : 'text-surface-400'}`}>
            Input Summary
          </p>
          <div className="grid grid-cols-2 gap-3">
            {details.map((detail, i) => (
              <div key={i} className={`flex justify-between items-center text-sm px-3 py-2 rounded-lg ${isDark ? 'bg-white/[0.03]' : 'bg-surface-50'}`}>
                <span className={isDark ? 'text-surface-400' : 'text-surface-500'}>{detail.label}</span>
                <span className={`font-medium ${isDark ? 'text-surface-200' : 'text-surface-800'}`}>{detail.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timestamp */}
      {timestamp && (
        <div className={`px-6 py-3 border-t ${isDark ? 'border-white/5' : 'border-surface-100'}`}>
          <div className="flex items-center gap-1.5">
            <Clock className={`w-3.5 h-3.5 ${isDark ? 'text-surface-500' : 'text-surface-400'}`} />
            <span className={`text-xs ${isDark ? 'text-surface-500' : 'text-surface-400'}`}>
              {new Date(timestamp).toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
