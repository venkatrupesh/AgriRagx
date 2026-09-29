import apiClient from './apiClient';

/**
 * Send a query to the RAG-powered AI agricultural assistant.
 * @param {string} query - The user's question.
 * @param {Object} [context] - Optional context (e.g., detected crop/disease).
 * @returns {Promise<Object>} RAG response with answer and sources.
 */
export async function queryRAG(query, context = {}) {
  const response = await apiClient.post('/api/rag', { query, context });
  return response.data;
}
