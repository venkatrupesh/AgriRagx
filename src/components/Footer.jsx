import { Link } from 'react-router-dom';
import { Leaf, Github, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Disease Detection', path: '/disease-detection' },
  { label: 'Crop Yield', path: '/crop-yield' },
  { label: 'AI Assistant', path: '/assistant' },
  { label: 'Methodology', path: '/methodology' },
  { label: 'About', path: '/about' },
];

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className={`border-t ${isDark ? 'border-white/5 bg-surface-950' : 'border-surface-200 bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-agri-500 to-agri-700 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-surface-900'}`}>
                Agri<span className="gradient-text">RAG-X</span>
              </span>
            </div>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>
              AI-powered agricultural intelligence platform combining machine learning, deep learning,
              retrieval-augmented generation, and LLMs.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-surface-900'}`}>Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className={`text-sm transition-colors ${isDark ? 'text-surface-400 hover:text-agri-400' : 'text-surface-500 hover:text-agri-600'}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech */}
          <div>
            <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-surface-900'}`}>Built With</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Flask', 'PyTorch', 'scikit-learn', 'FAISS', 'RAG', 'LLM'].map((tech) => (
                <span
                  key={tech}
                  className={`text-xs px-2.5 py-1 rounded-md ${isDark ? 'bg-white/5 text-surface-400' : 'bg-surface-100 text-surface-600'}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={`mt-10 pt-6 border-t ${isDark ? 'border-white/5' : 'border-surface-200'} flex flex-col sm:flex-row items-center justify-between gap-4`}>
          <p className={`text-xs ${isDark ? 'text-surface-500' : 'text-surface-400'}`}>
            © {new Date().getFullYear()} AgriRAG-X. Built with React, Flask, Machine Learning, Deep Learning, RAG and LLMs.
          </p>
          <p className={`text-xs ${isDark ? 'text-surface-600' : 'text-surface-400'}`}>
            AI-assisted information — not a replacement for agricultural experts.
          </p>
        </div>
      </div>
    </footer>
  );
}
