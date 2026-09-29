import os
from flask import Flask
from flask_cors import CORS
from config import Config

# Import route blueprints
from routes.yield_routes import yield_bp
from routes.disease_routes import disease_bp
from routes.rag_routes import rag_bp
from routes.history_routes import history_bp


def create_app():
    """Application factory for Flask."""
    app = Flask(__name__)
    app.config.from_object(Config)

    # Ensure required directories exist
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
    os.makedirs(app.config["MODELS_DIR"], exist_ok=True)
    os.makedirs(Config.RAG_DOCUMENTS_DIR, exist_ok=True)

    # CORS — allow the React frontend origin
    CORS(app, origins=app.config["CORS_ORIGINS"])

    # Register blueprints
    app.register_blueprint(yield_bp)
    app.register_blueprint(disease_bp)
    app.register_blueprint(rag_bp)
    app.register_blueprint(history_bp)

    # Health check endpoint
    @app.route("/api/health", methods=["GET"])
    def health():
        return {"status": "ok"}, 200

    return app


# ──────────────────────────────────────────────
# Entry‑point
# ──────────────────────────────────────────────
if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=Config.DEBUG)
