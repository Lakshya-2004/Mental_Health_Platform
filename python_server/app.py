import json
import os
import requests
from flask import Flask, Blueprint, request, jsonify, render_template
from flask_cors import CORS
from textblob import TextBlob

try:
    import nltk
    nltk.download('punkt', quiet=True)
except Exception:
    pass

# ════════════════════════════════════════════════
#  CONFIG
# ════════════════════════════════════════════════

OLLAMA_URL  = os.environ.get("OLLAMA_BASE_URL", "http://localhost:11434/api/generate")
MODEL_NAME  = os.environ.get("OLLAMA_MODEL", "llama3")

SYSTEM_PROMPT = """
You are MIRA 💫, an empathetic and supportive emotional chatbot. Your primary goal is to act as a close friend, listen to the user, validate their feelings, and offer a comforting or relevant meme URL based on the detected emotion.

1. Analyze Emotion
2. Generate Reply
3. Provide Meme URL using placehold.co
4. Output STRICT JSON

EMOTIONS: joy, sadness, anger, fear, disgust, neutral
"""

PLAYLISTS = {
    "happy":   "https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC",
    "sad":     "https://open.spotify.com/embed/playlist/37i9dQZF1DX7qK8ma5wgG1",
    "angry":   "https://open.spotify.com/embed/playlist/37i9dQZF1DWYxwmBaMqxsl",
    "anxious": "https://open.spotify.com/embed/playlist/37i9dQZF1DWXe9gFZP0gtP",
    "neutral": "https://open.spotify.com/embed/playlist/37i9dQZF1DX3rxVfibe1L0",
}

MEDITATIONS = {
    "happy":   {"video": "https://www.youtube.com/embed/1ZYbU82GVz4",  "audio": "https://www.youtube.com/embed/cEqZthCaMpo"},
    "sad":     {"video": "https://www.youtube.com/embed/inpok4MKVLM",  "audio": "https://www.youtube.com/embed/z6X5oEIg6Ak"},
    "angry":   {"video": "https://www.youtube.com/embed/MIr3RsUWrdo",  "audio": "https://www.youtube.com/embed/qQyQj2Fgi_k"},
    "anxious": {"video": "https://www.youtube.com/embed/sTANio_2E0Q",  "audio": "https://www.youtube.com/embed/GgP75HAvrlY"},
    "neutral": {"video": "https://www.youtube.com/embed/ZToicYcHIOU",  "audio": "https://www.youtube.com/embed/o-6f5wQXSu8"},
}

# ════════════════════════════════════════════════
#  SHARED UTILITY
# ════════════════════════════════════════════════

def detect_mood(text: str) -> str:
    """Shared TextBlob mood detection used by mood & meditation routes."""
    blob       = TextBlob(text)
    polarity   = blob.sentiment.polarity
    text_lower = text.lower()

    if polarity > 0.2:
        return "happy"
    if polarity < -0.2:
        if any(w in text_lower for w in ("angry", "mad")):
            return "angry"
        if any(w in text_lower for w in ("anxious", "nervous", "stress")):
            return "anxious"
        return "sad"
    return "neutral"


def call_ollama(messages: list) -> dict:
    """Send conversation history to local Ollama and return parsed JSON."""
    payload = [{"role": "system", "content": SYSTEM_PROMPT}] + messages
    try:
        resp = requests.post(
            OLLAMA_URL,
            json={
                "model":   MODEL_NAME,
                "messages": payload,
                "format":  "json",
                "options": {"temperature": 0.7},
                "stream":  False,
            },
            timeout=120,
        )
        resp.raise_for_status()
        raw = resp.json()["response"].strip()
        # Strip markdown code fences if model wraps output
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
        return json.loads(raw.strip())
    except requests.exceptions.RequestException as e:
        raise ConnectionError(f"Ollama not reachable: {e}")
    except (json.JSONDecodeError, KeyError):
        raise ValueError("Invalid JSON returned from model")


# ════════════════════════════════════════════════
#  MIRA BLUEPRINT  (/api)
# ════════════════════════════════════════════════

mira_bp     = Blueprint("mira", __name__, url_prefix="/api")
chat_history: list = []


@mira_bp.route("/")
def mira_status():
    return jsonify({"status": "ok", "message": "MIRA Chatbot API running 🚀"})


@mira_bp.route("/chat", methods=["POST"])
def chat():
    global chat_history
    data         = request.get_json(silent=True) or {}
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    chat_history.append({"role": "user", "content": user_message})

    try:
        result = call_ollama(chat_history[-10:])
        chat_history.append({"role": "assistant", "content": result.get("reply", "")})
        return jsonify(result)
    except (ConnectionError, ValueError) as e:
        return jsonify({
            "error":    str(e),
            "reply":    "I'm having trouble connecting right now 💔",
            "emotion":  "sadness",
            "meme_url": "https://placehold.co/400x300/FF0000/FFFFFF?text=Connection+Error",
        }), 500


@mira_bp.route("/reset", methods=["POST"])
def reset_chat():
    global chat_history
    chat_history = []
    return jsonify({"status": "success", "message": "Chat history cleared"}), 200


# ════════════════════════════════════════════════
#  MOOD BLUEPRINT  (no prefix)
# ════════════════════════════════════════════════

mood_bp = Blueprint("mood", __name__)


@mood_bp.route("/detect_mood", methods=["POST"])
def detect_mood_route():
    data = request.get_json(silent=True) or {}
    text = data.get("text", "")
    mood = detect_mood(text)
    return jsonify({"mood": mood, "playlist": PLAYLISTS[mood]})


# ════════════════════════════════════════════════
#  MEDITATION BLUEPRINT  (/meditation)
# ════════════════════════════════════════════════

meditation_bp = Blueprint("meditation", __name__, url_prefix="/meditation")


@meditation_bp.route("/")
def meditation_status():
    return jsonify({"message": "Meditation API running 🧘"})


@meditation_bp.route("/detect_mood", methods=["POST"])
def meditation_mood_route():
    data = request.get_json(silent=True) or {}
    text = data.get("text", "")
    mood = detect_mood(text)
    return jsonify({"mood": mood, **MEDITATIONS[mood]})


# ════════════════════════════════════════════════
#  MEME CHATBOT PAGE
# ════════════════════════════════════════════════

main_bp = Blueprint("main", __name__)


@main_bp.route("/meme-chat")
def meme_chat():
    return render_template("index.html")


# ════════════════════════════════════════════════
#  APP FACTORY
# ════════════════════════════════════════════════

def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(mira_bp)
    app.register_blueprint(mood_bp)
    app.register_blueprint(meditation_bp)
    app.register_blueprint(main_bp)

    return app


if __name__ == "__main__":
    print("🚀 Starting Flask server...")
    app  = create_app()
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)