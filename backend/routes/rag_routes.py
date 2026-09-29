from flask import Blueprint, request, jsonify
from services.rag_service import RAGService

rag_bp = Blueprint("rag", __name__)

# Lazy-loaded singleton
_rag_service = None


def get_rag_service():
    global _rag_service
    if _rag_service is None:
        _rag_service = RAGService()
    return _rag_service


@rag_bp.route("/api/rag", methods=["POST"])
def query_rag():
    """
    Process a RAG query: embed → retrieve → generate answer.

    Expects JSON with 'query' and optional 'context' object.
    Returns answer text and source references.
    """
    try:
        data = request.get_json(force=True)
        query = data.get("query", "").strip()
        context = data.get("context", {})

        if not query:
            return jsonify({"success": False, "error": "No query provided."}), 400

        rag = get_rag_service()
        result = rag.query(query, context)

        return jsonify({
            "success": True,
            "answer": result["answer"],
            "sources": result.get("sources", []),
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "error": "An error occurred while processing your query. Please try again."
        }), 500
