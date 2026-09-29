import numpy as np
from config import Config

# Lazy import to avoid mandatory sentence-transformers install for basic usage
_model = None


def get_embedding_model():
    """Lazy-load the sentence transformer embedding model."""
    global _model
    if _model is None:
        try:
            from sentence_transformers import SentenceTransformer
            _model = SentenceTransformer(Config.EMBEDDING_MODEL)
        except ImportError:
            raise ImportError(
                "sentence-transformers is required for embeddings. "
                "Install it with: pip install sentence-transformers"
            )
    return _model


def embed_text(text: str) -> np.ndarray:
    """
    Generate an embedding vector for a single text string.

    Args:
        text: Input text to embed.

    Returns:
        Numpy array of the embedding vector.
    """
    model = get_embedding_model()
    embedding = model.encode(text, convert_to_numpy=True, show_progress_bar=False)
    return embedding.astype("float32")


def embed_texts(texts: list) -> np.ndarray:
    """
    Generate embedding vectors for a batch of texts.

    Args:
        texts: List of text strings.

    Returns:
        2D numpy array of shape (len(texts), embedding_dim).
    """
    model = get_embedding_model()
    embeddings = model.encode(texts, convert_to_numpy=True, show_progress_bar=False, batch_size=32)
    return embeddings.astype("float32")
