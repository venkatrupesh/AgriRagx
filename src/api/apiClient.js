import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for consistent error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      error.message = 'Cannot connect to the backend. Please start the Flask server: cd backend && python app.py';
    } else if (error.response.status === 500) {
      error.message = error.response.data?.error || 'An internal server error occurred. Please try again later.';
    } else if (error.response.status === 413) {
      error.message = 'The uploaded file is too large. Please reduce the file size and try again.';
    } else if (error.response.status === 415) {
      error.message = 'Unsupported file format. Please upload a JPG, JPEG, or PNG image.';
    }
    return Promise.reject(error);
  }
);

export { API_BASE_URL };
export default apiClient;
