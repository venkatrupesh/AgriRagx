import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    """Application configuration loaded from environment variables."""

    # Flask
    SECRET_KEY = os.getenv("SECRET_KEY", "agriragx-dev-secret-key")
    DEBUG = os.getenv("FLASK_DEBUG", "True").lower() in ("true", "1")

    # CORS
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")

    # Uploads
    UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")
    MAX_CONTENT_LENGTH = 10 * 1024 * 1024  # 10 MB

    # Model paths
    MODELS_DIR = os.path.join(os.path.dirname(__file__), "models")
    YIELD_MODEL_PATH = os.path.join(MODELS_DIR, "best_crop_yield_model.pkl")
    DISEASE_MODEL_PATH = os.path.join(MODELS_DIR, "leaf_disease_efficientnet_b0.pth")

    # RAG
    RAG_DOCUMENTS_DIR = os.path.join(os.path.dirname(__file__), "rag", "documents")
    VECTOR_STORE_PATH = os.path.join(os.path.dirname(__file__), "rag", "vector_store")
    EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")

    # LLM
    LLM_API_KEY = os.getenv("LLM_API_KEY", "")
    LLM_MODEL = os.getenv("LLM_MODEL", "gpt-3.5-turbo")
    LLM_API_URL = os.getenv("LLM_API_URL", "https://api.openai.com/v1/chat/completions")

    # Disease class names (EfficientNet B0 trained on PlantVillage)
    DISEASE_CLASSES = [
        "Apple__Apple_scab",
        "Apple__Black_rot",
        "Apple__Cedar_apple_rust",
        "Apple__healthy",
        "Blueberry__healthy",
        "Cherry__Powdery_mildew",
        "Cherry__healthy",
        "Corn__Cercospora_leaf_spot",
        "Corn__Common_rust",
        "Corn__Northern_Leaf_Blight",
        "Corn__healthy",
        "Grape__Black_rot",
        "Grape__Esca",
        "Grape__Leaf_blight",
        "Grape__healthy",
        "Orange__Haunglongbing",
        "Peach__Bacterial_spot",
        "Peach__healthy",
        "Pepper__Bacterial_spot",
        "Pepper__healthy",
        "Potato__Early_blight",
        "Potato__Late_blight",
        "Potato__healthy",
        "Raspberry__healthy",
        "Soybean__healthy",
        "Squash__Powdery_mildew",
        "Strawberry__Leaf_scorch",
        "Strawberry__healthy",
        "Tomato__Bacterial_spot",
        "Tomato__Early_blight",
        "Tomato__Late_blight",
        "Tomato__Leaf_Mold",
        "Tomato__Septoria_leaf_spot",
        "Tomato__Spider_mites",
        "Tomato__Target_Spot",
        "Tomato__Tomato_Yellow_Leaf_Curl_Virus",
        "Tomato__Tomato_mosaic_virus",
        "Tomato__healthy",
    ]
