import os
import joblib
import pandas as pd
from config import Config


class YieldPredictor:
    FEATURE_COLUMNS = [
        "Crop", "Region", "Soil_Type", "Soil_pH",
        "Rainfall_mm", "Temperature_C", "Humidity_pct",
        "Fertilizer_Used_kg", "Irrigation", "Pesticides_Used_kg",
        "Planting_Density", "Previous_Crop",
    ]

    def __init__(self):
        self.model = None
        self._load_model()

    def _load_model(self):
        model_path = Config.YIELD_MODEL_PATH
        if not os.path.exists(model_path):
            raise FileNotFoundError(
                f"Crop yield model not found at {model_path}."
            )
        self.model = joblib.load(model_path)

    def predict(self, params: dict) -> dict:
        if self.model is None:
            raise FileNotFoundError("Model not loaded.")

        # Build DataFrame with exact columns the model was trained on
        row = {col: params.get(col, None) for col in self.FEATURE_COLUMNS}
        df = pd.DataFrame([row])

        prediction = self.model.predict(df)
        pred_value = float(prediction[0])

        return {
            "prediction": round(pred_value, 2),
            "unit": "tons/hectare",
        }
