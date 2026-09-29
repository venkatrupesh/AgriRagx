import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, RotateCcw, Sprout } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useApi } from '../hooks/useApi';
import { predictYield } from '../api/yieldApi';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import PredictionResult from '../components/PredictionResult';

// Fields match exact feature columns of best_crop_yield_model.pkl
const yieldFields = [
  { name: 'Crop', label: 'Crop', type: 'select', options: ['Barley', 'Maize', 'Rice', 'Wheat'], required: true },
  { name: 'Region', label: 'Region', type: 'select', options: ['Region_A', 'Region_B', 'Region_C', 'Region_D'], required: true },
  { name: 'Soil_Type', label: 'Soil Type', type: 'select', options: ['Clay', 'Loam', 'Sandy'], required: true },
  { name: 'Soil_pH', label: 'Soil pH', type: 'number', min: 0, max: 14, step: 0.1, required: true },
  { name: 'Rainfall_mm', label: 'Rainfall (mm)', type: 'number', min: 0, step: 1, required: true },
  { name: 'Temperature_C', label: 'Temperature (°C)', type: 'number', min: -10, max: 60, step: 0.1, required: true },
  { name: 'Humidity_pct', label: 'Humidity (%)', type: 'number', min: 0, max: 100, step: 1, required: true },
  { name: 'Fertilizer_Used_kg', label: 'Fertilizer Used (kg)', type: 'number', min: 0, step: 1, required: true },
  { name: 'Irrigation', label: 'Irrigation Method', type: 'select', options: ['Drip', 'Flood', 'Sprinkler'], required: false },
  { name: 'Pesticides_Used_kg', label: 'Pesticides Used (kg)', type: 'number', min: 0, step: 0.1, required: true },
  { name: 'Planting_Density', label: 'Planting Density (plants/ha)', type: 'number', min: 0, step: 1, required: true },
  { name: 'Previous_Crop', label: 'Previous Crop', type: 'select', options: ['Barley', 'Maize', 'Rice', 'Wheat'], required: false },
];

export default function CropYield() {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const { data: result, loading, error, execute, reset } = useApi(predictYield);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errors = {};
    yieldFields.forEach((field) => {
      if (field.required && !formData[field.name] && formData[field.name] !== 0) {
        errors[field.name] = `${field.label} is required`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = { ...formData };
    yieldFields.forEach((f) => {
      if (f.type === 'number' && payload[f.name] !== undefined) {
        payload[f.name] = parseFloat(payload[f.name]);
      }
    });
    try {
      await execute(payload);
    } catch (e) {
      // Error handled by useApi
    }
  };

  const handleReset = () => {
    setFormData({});
    setFormErrors({});
    reset();
  };

  const inputDetails = yieldFields
    .filter((f) => formData[f.name] !== undefined && formData[f.name] !== '')
    .map((f) => ({ label: f.label, value: String(formData[f.name]) }));

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-agri-500 to-emerald-600 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-surface-900'}`}>
              Crop Yield Prediction
            </h1>
          </div>
          <p className={`text-base max-w-2xl ${isDark ? 'text-surface-400' : 'text-surface-600'}`}>
            Provide agricultural parameters to estimate expected crop yield using the trained machine learning model.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <form onSubmit={handleSubmit} className={`rounded-2xl border p-6 sm:p-8 ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-surface-200 bg-white'}`}>
                <div className="grid sm:grid-cols-2 gap-5">
                  {yieldFields.map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-surface-300' : 'text-surface-700'}`}
                      >
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>

                      {field.type === 'select' ? (
                        <select
                          id={field.name}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-agri-500/40 ${isDark
                            ? 'bg-white/5 border-white/10 text-white placeholder-surface-500'
                            : 'bg-white border-surface-300 text-surface-900 placeholder-surface-400'
                          } ${formErrors[field.name] ? 'border-red-500' : ''}`}
                        >
                          <option value="">Select {field.label}</option>
                          {field.options.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={field.name}
                          type={field.type}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-agri-500/40 ${isDark
                            ? 'bg-white/5 border-white/10 text-white placeholder-surface-500'
                            : 'bg-white border-surface-300 text-surface-900 placeholder-surface-400'
                          } ${formErrors[field.name] ? 'border-red-500' : ''}`}
                        />
                      )}

                      {formErrors[field.name] && (
                        <p className="text-xs text-red-500 mt-1">{formErrors[field.name]}</p>
                      )}
                    </div>
                  ))}
                </div>

                {error && (
                  <div className="mt-6">
                    <ErrorMessage message={error} onRetry={handleSubmit} />
                  </div>
                )}

                {loading && (
                  <div className="mt-6">
                    <LoadingSpinner message="Running crop yield model..." />
                  </div>
                )}

                {!loading && (
                  <div className="mt-8 flex justify-center">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-agri-500 to-emerald-600 text-white font-semibold text-sm
                        hover:from-agri-600 hover:to-emerald-700 shadow-lg shadow-agri-500/25 hover:shadow-agri-500/40 transition-all duration-200"
                    >
                      <Sprout className="w-4 h-4" />
                      Predict Yield
                    </button>
                  </div>
                )}
              </form>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <PredictionResult
                title="Predicted Crop Yield"
                value={result.prediction}
                unit={result.unit || 'tons/hectare'}
                icon={BarChart3}
                details={inputDetails}
                timestamp={new Date().toISOString()}
              />

              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleReset}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border text-sm font-semibold transition-all ${isDark
                    ? 'border-white/10 text-white hover:bg-white/5'
                    : 'border-surface-300 text-surface-700 hover:bg-surface-50'
                  }`}
                >
                  <RotateCcw className="w-4 h-4" />
                  Run Another Prediction
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
