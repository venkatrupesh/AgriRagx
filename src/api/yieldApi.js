import apiClient from './apiClient';

/**
 * Predict crop yield using the ML model on the Flask backend.
 * @param {Object} params - Agricultural parameters for yield prediction.
 * @returns {Promise<Object>} Prediction result from the backend.
 */
export async function predictYield(params) {
  const response = await apiClient.post('/api/predict-yield', params);
  return response.data;
}
