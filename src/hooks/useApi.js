import { useState, useCallback } from 'react';

/**
 * Custom hook for managing API call states (loading, error, data).
 * Wraps any async API function with consistent loading/error handling.
 */
export function useApi(apiFunction) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      const message = err.response?.data?.error
        || err.response?.data?.message
        || err.message
        || 'An unexpected error occurred. Please try again.';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return { data, loading, error, execute, reset };
}
