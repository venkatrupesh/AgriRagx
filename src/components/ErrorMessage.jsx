import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, WifiOff } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ErrorMessage({ message, onRetry }) {
  const { isDark } = useTheme();
  const isConnectionError = message?.toLowerCase().includes('connect') || message?.toLowerCase().includes('network');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border p-6 ${isDark ? 'bg-red-500/5 border-red-500/20' : 'bg-red-50 border-red-200'}`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2.5 rounded-xl ${isDark ? 'bg-red-500/10' : 'bg-red-100'}`}>
          {isConnectionError
            ? <WifiOff className="w-5 h-5 text-red-500" />
            : <AlertTriangle className="w-5 h-5 text-red-500" />
          }
        </div>
        <div className="flex-1">
          <h3 className={`text-sm font-semibold mb-1 ${isDark ? 'text-red-400' : 'text-red-700'}`}>
            {isConnectionError ? 'Connection Error' : 'Something went wrong'}
          </h3>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-red-300/70' : 'text-red-600'}`}>
            {message}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-400 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
