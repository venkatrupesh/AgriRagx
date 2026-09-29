from rag.embeddings import embed_text
from rag.vector_store import VectorStore


class Retriever:
    """
    Document retriever that embeds a query and searches the vector store
    for relevant agricultural knowledge.
    """

    def __init__(self):
        self.vector_store = VectorStore()

    def search(self, query: str, top_k: int = 5) -> list:
        """
        Embed a query and search the vector store.

        Args:
            query: The search query string.
            top_k: Number of top results to return.

        Returns:
            List of document dicts sorted by relevance.
        """
        try:
            query_embedding = embed_text(query)
            results = self.vector_store.search(query_embedding, top_k=top_k)
            return results
        except Exception:
            # If embedding or search fails, return empty results gracefully
            return []
