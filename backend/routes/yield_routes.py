from flask import Blueprint, request, jsonify
from services.yield_predictor import YieldPredictor

yield_bp = Blueprint("yield", __name__)

# Lazy-loaded singleton
_predictor = None


def get_predictor():
    global _predictor
    if _predictor is None:
        _predictor = YieldPredictor()
    return _predictor


@yield_bp.route("/api/predict-yield", methods=["POST"])
def predict_yield():
    """
    Predict crop yield from agricultural parameters.

    Expects JSON body with crop parameters.
    Returns prediction result with unit.
    """
    try:
        data = request.get_json(force=True)
        if not data:
            return jsonify({"success": False, "error": "No input data provided."}), 400

        predictor = get_predictor()
        result = predictor.predict(data)

        return jsonify({
            "success": True,
            "prediction": result["prediction"],
            "unit": result.get("unit", "tons/hectare"),
        }), 200

    except FileNotFoundError as e:
        return jsonify({
            "success": False,
            "error": "Crop yield model not found. Please ensure the model file is placed in backend/models/."
        }), 503

    except ValueError as e:
        return jsonify({"success": False, "error": str(e)}), 400

    except Exception as e:
        return jsonify({
            "success": False,
            "error": "An error occurred during yield prediction. Please try again."
        }), 500
