import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function EmptyState({ icon: Icon, title, description, action }) {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      {Icon && (
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${isDark ? 'bg-white/5' : 'bg-surface-100'}`}>
          <Icon className={`w-8 h-8 ${isDark ? 'text-surface-500' : 'text-surface-400'}`} />
        </div>
      )}
      <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-surface-900'}`}>
        {title}
      </h3>
      <p className={`text-sm max-w-md leading-relaxed ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
}
