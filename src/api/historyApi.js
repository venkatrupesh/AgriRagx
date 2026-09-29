import apiClient from './apiClient';

/**
 * Fetch analysis history from the Flask backend.
 * @returns {Promise<Object>} History records.
 */
export async function getHistory() {
  const response = await apiClient.get('/api/history');
  return response.data;
}

/**
 * Check Flask backend health status.
 * @returns {Promise<Object>} Health status.
 */
export async function checkHealth() {
  const response = await apiClient.get('/api/health');
  return response.data;
}
