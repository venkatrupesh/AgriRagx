import os
import json
import requests
from config import Config


class LLMService:
    """
    LLM integration service for generating agricultural responses.

    Supports OpenAI-compatible APIs. The API key and model are configured
    via environment variables (LLM_API_KEY, LLM_MODEL, LLM_API_URL).

    If no API key is configured, falls back to a structured knowledge-based response.
    """

    def __init__(self):
        self.api_key = Config.LLM_API_KEY
        self.model = Config.LLM_MODEL
        self.api_url = Config.LLM_API_URL

    def generate(self, query: str, retrieved_context: str, metadata: dict = None) -> str:
        """
        Generate a response using the LLM with retrieved context.

        Args:
            query: The user's original question.
            retrieved_context: Relevant text passages from the vector store.
            metadata: Optional dict with crop/disease context.

        Returns:
            Generated answer string.
        """
        system_prompt = self._build_system_prompt()
        user_prompt = self._build_user_prompt(query, retrieved_context, metadata)

        # If API key is configured, call the LLM API
        if self.api_key:
            return self._call_llm_api(system_prompt, user_prompt)

        # Fallback: return the retrieved context formatted as a response
        return self._fallback_response(query, retrieved_context, metadata)

    def _build_system_prompt(self) -> str:
        return (
            "You are AgriRAG-X, an expert AI agricultural assistant. "
            "You provide accurate, evidence-based agricultural advice. "
            "Your responses are grounded in the retrieved knowledge documents provided. "
            "Always cite your sources when possible. "
            "If you are unsure about something, say so clearly. "
            "You are NOT a replacement for professional agricultural experts — "
            "present your answers as AI-assisted information. "
            "Be concise but thorough."
        )

    def _build_user_prompt(self, query: str, context: str, metadata: dict = None) -> str:
        parts = []

        if metadata:
            if metadata.get("crop"):
                parts.append(f"Detected crop: {metadata['crop']}")
            if metadata.get("disease"):
                disease_name = metadata["disease"].replace("__", " — ").replace("_", " ")
                parts.append(f"Detected disease: {disease_name}")

        parts.append(f"\nRetrieved agricultural knowledge:\n{context}")
        parts.append(f"\nUser question: {query}")
        parts.append("\nPlease provide a comprehensive, evidence-grounded answer.")

        return "\n".join(parts)

    def _call_llm_api(self, system_prompt: str, user_prompt: str) -> str:
        """Call an OpenAI-compatible chat completion API."""
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}",
        }
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            "temperature": 0.3,
            "max_tokens": 1024,
        }

        try:
            response = requests.post(self.api_url, headers=headers, json=payload, timeout=30)
            response.raise_for_status()
            data = response.json()
            return data["choices"][0]["message"]["content"].strip()
        except requests.exceptions.RequestException as e:
            # On API failure, fall back to context-based response
            return self._fallback_response("", user_prompt, None)

    def _fallback_response(self, query: str, context: str, metadata: dict = None) -> str:
        """
        Generate a structured response from retrieved context when no LLM API is available.
        """
        if not context or not context.strip() or context.strip() == "No relevant documents found.":
            return (
                "I couldn't find specific information about that in the knowledge base. "
                "Please try rephrasing your question or consult a local agricultural expert."
            )

        # Clean up the raw context chunks into readable paragraphs
        cleaned = context.replace("\n---\n", "\n").strip()

        parts = []
        if metadata and metadata.get("disease"):
            disease_name = metadata["disease"].replace("__", " — ").replace("_", " ")
            parts.append(f"**Regarding {disease_name}:**\n")
        elif metadata and metadata.get("crop"):
            parts.append(f"**Regarding {metadata['crop']}:**\n")

        parts.append(cleaned)
        parts.append(
            "\n\n*This response is based on the AgriRAG-X knowledge base. "
            "Configure an LLM API key in the backend `.env` for AI-generated answers.*"
        )

        return "\n".join(parts)
