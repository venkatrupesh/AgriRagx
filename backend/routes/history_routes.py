import json
import os
from datetime import datetime
from flask import Blueprint, jsonify

history_bp = Blueprint("history", __name__)

HISTORY_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "history.json")


def _load_history():
    """Load analysis history from disk."""
    if not os.path.exists(HISTORY_FILE):
        return []
    try:
        with open(HISTORY_FILE, "r") as f:
            return json.load(f)
    except (json.JSONDecodeError, IOError):
        return []


def save_history_entry(entry):
    """Append an analysis entry to history. Called by other services."""
    os.makedirs(os.path.dirname(HISTORY_FILE), exist_ok=True)
    history = _load_history()
    entry["date"] = datetime.utcnow().isoformat()
    history.insert(0, entry)
    # Keep last 100 entries
    history = history[:100]
    with open(HISTORY_FILE, "w") as f:
        json.dump(history, f, indent=2)


@history_bp.route("/api/history", methods=["GET"])
def get_history():
    """Return analysis history."""
    try:
        history = _load_history()
        return jsonify({"success": True, "history": history}), 200
    except Exception:
        return jsonify({"success": True, "history": []}), 200
