import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf, LayoutDashboard, ScanLine, BarChart3, Bot,
  History, Menu, X, Sun, Moon, Info
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { path: '/', label: 'Home', icon: Leaf },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/disease-detection', label: 'Disease Detection', icon: ScanLine },
  { path: '/crop-yield', label: 'Crop Yield', icon: BarChart3 },
  { path: '/assistant', label: 'AI Assistant', icon: Bot },
  { path: '/history', label: 'History', icon: History },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-surface-900/80' : 'bg-white/80'} backdrop-blur-xl border-b ${isDark ? 'border-white/5' : 'border-black/5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-agri-500 to-agri-700 flex items-center justify-center shadow-lg shadow-agri-500/20 group-hover:shadow-agri-500/40 transition-shadow">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-surface-900'}`}>
              Agri<span className="gradient-text">RAG-X</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive(path)
                    ? isDark
                      ? 'bg-agri-500/15 text-agri-400'
                      : 'bg-agri-50 text-agri-700'
                    : isDark
                      ? 'text-surface-400 hover:text-white hover:bg-white/5'
                      : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${isDark ? 'text-surface-400 hover:text-white hover:bg-white/5' : 'text-surface-500 hover:text-surface-900 hover:bg-surface-100'}`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Link
              to="/about"
              className={`p-2 rounded-lg transition-colors ${isDark ? 'text-surface-400 hover:text-white hover:bg-white/5' : 'text-surface-500 hover:text-surface-900 hover:bg-surface-100'}`}
              aria-label="About"
            >
              <Info className="w-5 h-5" />
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${isDark ? 'text-surface-400 hover:text-white' : 'text-surface-500 hover:text-surface-900'}`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`lg:hidden overflow-hidden border-t ${isDark ? 'border-white/5 bg-surface-900/95' : 'border-black/5 bg-white/95'} backdrop-blur-xl`}
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${isActive(path)
                      ? isDark
                        ? 'bg-agri-500/15 text-agri-400'
                        : 'bg-agri-50 text-agri-700'
                      : isDark
                        ? 'text-surface-400 hover:text-white hover:bg-white/5'
                        : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
