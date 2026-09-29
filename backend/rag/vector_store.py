import os
import json
import numpy as np
from config import Config

try:
    import faiss
    HAS_FAISS = True
except ImportError:
    HAS_FAISS = False

from rag.embeddings import embed_texts


class VectorStore:
    """
    FAISS-based vector store for agricultural knowledge documents.

    Stores document chunks with their embeddings for fast similarity search.
    The index is persisted to disk for reuse across restarts.
    """

    def __init__(self):
        self.index = None
        self.documents = []
        self.index_path = os.path.join(Config.VECTOR_STORE_PATH, "index.faiss")
        self.docs_path = os.path.join(Config.VECTOR_STORE_PATH, "documents.json")
        os.makedirs(Config.VECTOR_STORE_PATH, exist_ok=True)
        self._load_or_build()

    def _load_or_build(self):
        """Load existing index from disk, or build from documents directory."""
        if os.path.exists(self.index_path) and os.path.exists(self.docs_path):
            self._load_index()
        else:
            self._build_from_documents()

    def _load_index(self):
        """Load a persisted FAISS index and document metadata."""
        if not HAS_FAISS:
            self.documents = self._load_docs_json()
            return

        self.index = faiss.read_index(self.index_path)
        self.documents = self._load_docs_json()

    def _load_docs_json(self):
        try:
            with open(self.docs_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError):
            return []

    def _build_from_documents(self):
        """
        Build a new vector store from text files in the documents directory.

        Each text file in rag/documents/ is chunked and embedded.
        Files can optionally have JSON metadata sidecar files.
        """
        docs_dir = Config.RAG_DOCUMENTS_DIR
        if not os.path.exists(docs_dir):
            os.makedirs(docs_dir, exist_ok=True)
            return

        chunks = []
        text_files = [
            f for f in os.listdir(docs_dir)
            if f.endswith((".txt", ".md"))
        ]

        if not text_files:
            return

        for filename in text_files:
            filepath = os.path.join(docs_dir, filename)
            meta_path = os.path.join(docs_dir, filename.rsplit(".", 1)[0] + ".json")

            # Load metadata if available
            metadata = {}
            if os.path.exists(meta_path):
                try:
                    with open(meta_path, "r", encoding="utf-8") as mf:
                        metadata = json.load(mf)
                except (json.JSONDecodeError, IOError):
                    pass

            # Read and chunk text
            with open(filepath, "r", encoding="utf-8") as f:
                text = f.read()

            file_chunks = self._chunk_text(text, chunk_size=500, overlap=50)

            for chunk in file_chunks:
                chunks.append({
                    "text": chunk,
                    "title": metadata.get("title", filename),
                    "source": metadata.get("source", "AgriRAG-X Knowledge Base"),
                    "url": metadata.get("url", ""),
                    "description": metadata.get("description", ""),
                })

        if not chunks:
            return

        self.documents = chunks

        # Embed all chunks
        texts = [c["text"] for c in chunks]
        try:
            embeddings = embed_texts(texts)
        except Exception:
            # If embedding fails (e.g., model not available), save docs without index
            self._save_docs_json()
            return

        # Build FAISS index
        if HAS_FAISS:
            dimension = embeddings.shape[1]
            self.index = faiss.IndexFlatIP(dimension)  # Inner product (cosine after norm)
            # Normalize for cosine similarity
            faiss.normalize_L2(embeddings)
            self.index.add(embeddings)

            # Persist
            faiss.write_index(self.index, self.index_path)

        self._save_docs_json()

    def _save_docs_json(self):
        with open(self.docs_path, "w", encoding="utf-8") as f:
            json.dump(self.documents, f, indent=2, ensure_ascii=False)

    def _chunk_text(self, text: str, chunk_size: int = 500, overlap: int = 50) -> list:
        """Split text into overlapping chunks by words."""
        words = text.split()
        chunks = []
        start = 0
        while start < len(words):
            end = start + chunk_size
            chunk = " ".join(words[start:end])
            if chunk.strip():
                chunks.append(chunk)
            start = end - overlap
        return chunks

    def search(self, query_embedding: np.ndarray, top_k: int = 5) -> list:
        """
        Search for the most similar documents to the query embedding.

        Args:
            query_embedding: 1D numpy array of the query embedding.
            top_k: Number of results to return.

        Returns:
            List of document dicts with similarity scores.
        """
        if not self.documents:
            return []

        if self.index is None or not HAS_FAISS:
            # Fallback: return first documents if no FAISS index
            return self.documents[:top_k]

        # Normalize query for cosine similarity
        query = query_embedding.reshape(1, -1).astype("float32")
        faiss.normalize_L2(query)

        k = min(top_k, len(self.documents))
        scores, indices = self.index.search(query, k)

        results = []
        for score, idx in zip(scores[0], indices[0]):
            if idx < 0 or idx >= len(self.documents):
                continue
            doc = dict(self.documents[idx])
            doc["score"] = float(score)
            results.append(doc)

        return results
