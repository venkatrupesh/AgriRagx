import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, Building2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function SourceCard({ title, source, url, description }) {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border p-4 transition-all duration-200 hover:shadow-md ${isDark
        ? 'border-white/5 bg-white/[0.02] hover:border-agri-500/20 hover:bg-white/[0.04]'
        : 'border-surface-200 bg-white hover:border-agri-300 hover:bg-agri-50/30'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg flex-shrink-0 ${isDark ? 'bg-agri-500/10' : 'bg-agri-50'}`}>
          <BookOpen className="w-4 h-4 text-agri-500" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-semibold mb-1 truncate ${isDark ? 'text-white' : 'text-surface-900'}`}>
            {title || 'Untitled Source'}
          </h4>
          {source && (
            <div className="flex items-center gap-1.5 mb-2">
              <Building2 className={`w-3 h-3 ${isDark ? 'text-surface-500' : 'text-surface-400'}`} />
              <span className={`text-xs ${isDark ? 'text-surface-500' : 'text-surface-400'}`}>{source}</span>
            </div>
          )}
          {description && (
            <p className={`text-xs leading-relaxed ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>
              {description}
            </p>
          )}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-agri-500 hover:text-agri-400 mt-2 font-medium transition-colors"
            >
              View Source <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
