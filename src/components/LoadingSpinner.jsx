import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function LoadingSpinner({ message = 'Loading...', size = 'md' }) {
  const { isDark } = useTheme();
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center gap-4 py-12"
    >
      <Loader2 className={`${sizes[size]} text-agri-500 animate-spin`} />
      <p className={`text-sm font-medium ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>
        {message}
      </p>
    </motion.div>
  );
}
