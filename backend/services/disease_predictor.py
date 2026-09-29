import torch
from pathlib import Path
from PIL import Image
from transformers import MobileNetV2ForImageClassification, MobileNetV2ImageProcessor

MODEL_DIR = Path(__file__).resolve().parent.parent / "plant-disease"
CONFIDENCE_THRESHOLD = 0.60

# Load model once at module import time
_processor = MobileNetV2ImageProcessor.from_pretrained(str(MODEL_DIR))
_model = MobileNetV2ForImageClassification.from_pretrained(str(MODEL_DIR))
_model.eval()


def _parse_label(raw_label: str) -> dict:
    """
    Parse a raw model label into crop and disease.
    e.g. 'Tomato___Early_blight' -> {'crop': 'Tomato', 'disease': 'Early blight'}
    """
    if "___" in raw_label:
        parts = raw_label.split("___", 1)
        crop = parts[0].replace("_", " ").replace("(", "").replace(")", "").replace(",", "").strip()
        disease = parts[1].replace("_", " ").strip()
        if disease.lower() == "healthy":
            disease = "Healthy"
    else:
        crop = raw_label.replace("_", " ").strip()
        disease = "Unknown"
    return {"crop": crop, "disease": disease}


def predict(image_file) -> dict:
    """
    Run plant disease classification on an uploaded image file object.

    Args:
        image_file: A file-like object (Flask request.files entry).

    Returns:
        dict with prediction, top_predictions, and optional message.
    """
    try:
        image = Image.open(image_file).convert("RGB")
    except Exception:
        raise ValueError("Could not read the image. Please upload a valid JPG, JPEG, PNG, or WEBP file.")

    inputs = _processor(images=image, return_tensors="pt")

    with torch.no_grad():
        outputs = _model(**inputs)
        probabilities = torch.softmax(outputs.logits, dim=-1)[0]

    top3_confidences, top3_indices = torch.topk(probabilities, k=3)

    top_predictions = []
    for conf, idx in zip(top3_confidences.tolist(), top3_indices.tolist()):
        raw_label = _model.config.id2label[idx]
        parsed = _parse_label(raw_label)
        top_predictions.append({
            "crop": parsed["crop"],
            "disease": parsed["disease"],
            "label": raw_label,
            "confidence": round(conf * 100, 2),
        })

    best = top_predictions[0]

    if best["confidence"] / 100 < CONFIDENCE_THRESHOLD:
        return {
            "prediction": None,
            "message": "The image could not be classified confidently. Please upload a clear leaf image.",
            "top_predictions": top_predictions,
        }

    return {
        "prediction": best,
        "top_predictions": top_predictions,
    }
