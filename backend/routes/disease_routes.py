from flask import Blueprint, request, jsonify
from services import disease_predictor

disease_bp = Blueprint("disease", __name__)

ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "webp"}


def _allowed(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@disease_bp.route("/api/predict-disease", methods=["POST"])
def predict_disease():
    if "image" not in request.files:
        return jsonify({"success": False, "error": "No image file provided."}), 400

    file = request.files["image"]

    if file.filename == "":
        return jsonify({"success": False, "error": "No file selected."}), 400

    if not _allowed(file.filename):
        return jsonify({
            "success": False,
            "error": "Unsupported file format. Please upload a JPG, JPEG, PNG, or WEBP image.",
        }), 415

    try:
        result = disease_predictor.predict(file)
        return jsonify({"success": True, **result}), 200

    except ValueError as e:
        return jsonify({"success": False, "error": str(e)}), 400

    except Exception:
        return jsonify({
            "success": False,
            "error": "An error occurred during disease detection. Please try again.",
        }), 500
