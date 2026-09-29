import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import SourceCard from './SourceCard';

export default function ChatMessage({ message }) {
  const { isDark } = useTheme();
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${
        isUser
          ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
          : 'bg-gradient-to-br from-agri-500 to-emerald-700'
      }`}>
        {isUser
          ? <User className="w-4 h-4 text-white" />
          : <Bot className="w-4 h-4 text-white" />
        }
      </div>

      {/* Content */}
      <div className={`flex-1 max-w-[80%] ${isUser ? 'flex flex-col items-end' : ''}`}>
        <div className={`rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-tr-md'
            : isDark
              ? 'bg-white/5 border border-white/5 text-surface-200 rounded-tl-md'
              : 'bg-white border border-surface-200 text-surface-800 rounded-tl-md shadow-sm'
        }`}>
          <div className="text-sm leading-relaxed markdown-content whitespace-pre-wrap">
            {message.content}
          </div>
        </div>

        {/* Sources */}
        {message.sources && message.sources.length > 0 && (
          <div className="mt-3 space-y-2 w-full">
            <p className={`text-xs font-medium px-1 ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>
              Sources ({message.sources.length})
            </p>
            {message.sources.map((source, index) => (
              <SourceCard key={index} {...source} />
            ))}
          </div>
        )}

        {/* Timestamp */}
        {message.timestamp && (
          <p className={`text-[10px] mt-1.5 px-1 ${isDark ? 'text-surface-600' : 'text-surface-400'}`}>
            {new Date(message.timestamp).toLocaleTimeString()}
          </p>
        )}
      </div>
    </motion.div>
  );
}
