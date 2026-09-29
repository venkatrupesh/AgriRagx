import { useCallback, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image as ImageIcon, X, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function ImageUploader({ onFileSelect, disabled = false }) {
  const { isDark } = useTheme();
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return 'Unsupported format. Please upload a JPG, JPEG, or PNG image.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File too large. Maximum size is 10MB.';
    }
    return null;
  };

  const handleFile = useCallback((file) => {
    setError('');
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
    onFileSelect(file);
  }, [onFileSelect]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setFileName('');
    setError('');
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {preview ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`relative rounded-2xl overflow-hidden border-2 ${isDark ? 'border-white/10 bg-white/5' : 'border-surface-200 bg-surface-50'}`}
          >
            <img
              src={preview}
              alt="Uploaded leaf image preview"
              className="w-full max-h-80 object-contain p-4"
            />
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={removeImage}
                disabled={disabled}
                className="p-2 rounded-xl bg-red-500/90 text-white hover:bg-red-600 transition-colors shadow-lg"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className={`px-4 py-3 border-t ${isDark ? 'border-white/5 bg-white/5' : 'border-surface-200 bg-surface-50'}`}>
              <div className="flex items-center gap-2">
                <ImageIcon className={`w-4 h-4 ${isDark ? 'text-surface-400' : 'text-surface-500'}`} />
                <span className={`text-sm truncate ${isDark ? 'text-surface-300' : 'text-surface-600'}`}>{fileName}</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => !disabled && inputRef.current?.click()}
            className={`relative rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-200
              ${dragActive
                ? 'border-agri-500 bg-agri-500/5'
                : isDark
                  ? 'border-white/10 hover:border-agri-500/50 bg-white/[0.02] hover:bg-agri-500/5'
                  : 'border-surface-300 hover:border-agri-500/50 bg-surface-50 hover:bg-agri-50'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleChange}
              className="hidden"
              aria-label="Upload leaf image"
            />
            <div className="flex flex-col items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isDark ? 'bg-agri-500/10' : 'bg-agri-50'}`}>
                <Upload className="w-7 h-7 text-agri-500" />
              </div>
              <div>
                <p className={`text-base font-semibold mb-1 ${isDark ? 'text-white' : 'text-surface-900'}`}>
                  {dragActive ? 'Drop your image here' : 'Drag & drop a leaf image'}
                </p>
                <p className={`text-sm ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>
                  or <span className="text-agri-500 font-medium">browse</span> to upload
                </p>
              </div>
              <div className={`flex items-center gap-4 text-xs ${isDark ? 'text-surface-500' : 'text-surface-400'}`}>
                <span>JPG, JPEG, PNG</span>
                <span>•</span>
                <span>Max 10MB</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-2 text-sm p-3 rounded-xl ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-600'}`}
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </motion.div>
      )}
    </div>
  );
}
