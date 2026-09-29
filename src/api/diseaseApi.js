import apiClient from './apiClient';

/**
 * Detect crop leaf disease using the deep learning model on the Flask backend.
 * @param {File} imageFile - The leaf image file to analyze.
 * @returns {Promise<Object>} Disease prediction result from the backend.
 */
export async function predictDisease(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await apiClient.post('/api/predict-disease', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 120000,
  });
  return response.data;
}
