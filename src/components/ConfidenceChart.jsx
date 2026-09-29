import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function ConfidenceChart({ confidence, label = 'Confidence' }) {
  const { isDark } = useTheme();
  const clampedValue = Math.min(100, Math.max(0, confidence || 0));

  const getColor = (val) => {
    if (val >= 80) return { bar: 'from-agri-500 to-emerald-500', text: 'text-agri-500', bg: isDark ? 'bg-agri-500/10' : 'bg-agri-50' };
    if (val >= 50) return { bar: 'from-amber-500 to-orange-500', text: 'text-amber-500', bg: isDark ? 'bg-amber-500/10' : 'bg-amber-50' };
    return { bar: 'from-red-500 to-rose-500', text: 'text-red-500', bg: isDark ? 'bg-red-500/10' : 'bg-red-50' };
  };

  const colors = getColor(clampedValue);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${isDark ? 'text-surface-300' : 'text-surface-600'}`}>
          {label}
        </span>
        <span className={`text-2xl font-bold ${colors.text}`}>
          {clampedValue.toFixed(1)}%
        </span>
      </div>
      <div className={`w-full h-3 rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-surface-100'}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          className={`h-full rounded-full bg-gradient-to-r ${colors.bar}`}
        />
      </div>
      <div className={`flex justify-between text-xs ${isDark ? 'text-surface-500' : 'text-surface-400'}`}>
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
}
