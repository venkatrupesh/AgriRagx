import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, AlertTriangle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function NotFound() {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className={`w-20 h-20 rounded-2xl mx-auto flex items-center justify-center mb-6 ${isDark ? 'bg-amber-500/10' : 'bg-amber-50'}`}>
          <AlertTriangle className="w-10 h-10 text-amber-500" />
        </div>
        <h1 className={`text-6xl font-extrabold mb-3 gradient-text`}>404</h1>
        <h2 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-surface-900'}`}>Page Not Found</h2>
        <p className={`text-sm mb-8 ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-agri-500 to-agri-600 text-white font-semibold text-sm
            hover:from-agri-600 hover:to-agri-700 shadow-lg shadow-agri-500/25 transition-all"
        >
          <Home className="w-4 h-4" /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
