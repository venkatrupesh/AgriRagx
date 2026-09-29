import os
from config import Config
from services.llm_service import LLMService
from rag.retriever import Retriever


class RAGService:
    """
    Retrieval-Augmented Generation service.

    Pipeline:
        1. Embed the user query
        2. Search the FAISS vector store for relevant document chunks
        3. Pass query + retrieved context to the LLM
        4. Return answer with source references
    """

    def __init__(self):
        self.retriever = Retriever()
        self.llm = LLMService()

    def query(self, user_query: str, context: dict = None) -> dict:
        """
        Process a RAG query end-to-end.

        Args:
            user_query: The user's agricultural question.
            context: Optional dict with crop/disease context from disease detection.

        Returns:
            dict with 'answer' (str) and 'sources' (list of source dicts).
        """
        # Build an enriched query if context is provided
        enriched_query = user_query
        if context:
            parts = []
            if context.get("crop"):
                parts.append(f"Crop: {context['crop']}")
            if context.get("disease"):
                disease_name = context["disease"].replace("__", " — ").replace("_", " ")
                parts.append(f"Disease: {disease_name}")
            if parts:
                enriched_query = f"{' | '.join(parts)} — {user_query}"

        # Step 1 & 2: Retrieve relevant documents
        retrieved = self.retriever.search(enriched_query, top_k=5)

        # Build context string from retrieved chunks
        context_text = ""
        sources = []
        seen_titles = set()

        for doc in retrieved:
            context_text += f"\n---\n{doc.get('text', '')}\n"

            title = doc.get("title", "Agricultural Knowledge Document")
            if title not in seen_titles:
                seen_titles.add(title)
                sources.append({
                    "title": title,
                    "source": doc.get("source", "AgriRAG-X Knowledge Base"),
                    "url": doc.get("url", ""),
                    "description": doc.get("description", ""),
                })

        # Step 3: Generate answer using LLM
        answer = self.llm.generate(
            query=user_query,
            retrieved_context=context_text if context_text.strip() else "No relevant documents found.",
            metadata=context,
        )

        return {
            "answer": answer,
            "sources": sources,
        }
