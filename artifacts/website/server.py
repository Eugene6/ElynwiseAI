import os
import traceback

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from google import genai

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True
CORS(app)

# Получаем API ключ из Replit Secrets
api_key = os.environ.get("GEMINI_API_KEY")

print("================================")
print("GEMINI_API_KEY EXISTS:", bool(api_key))
print("================================")

# Создаём Gemini client
client = genai.Client(
    api_key=api_key,
    http_options={"api_version": "v1beta"}  # Заставляет использовать стандартные веб-запросы
)

@app.route("/ping")
def ping():
    return "pong"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/chat", methods=["POST"])
def chat():
    print("\n========== API CHAT CALLED ==========")
    try:
        data = request.get_json(silent=True)
        print("RECEIVED DATA:", data)

        if not data:
            return jsonify({"error": "Invalid or empty JSON request"}), 400

        prompt = data.get("prompt", "").strip()
        print("PROMPT:", prompt)

        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400

        if not api_key:
            return jsonify({"error": "GEMINI_API_KEY is not configured"}), 500

        print("Calling Gemini...")
        response = client.models.generate_content(
            model="gemini-3.6-flash",  # Версия 2.5 стабильнее в текущих SDK, чем экспериментальная 3.6
            contents=prompt
        )
        print("Gemini response received")

        reply = response.text
        print("GEMINI REPLY:", reply)

        if not reply:
            return jsonify({"error": "Gemini returned an empty response"}), 500

        return jsonify({"reply": reply}), 200

    except Exception as e:
        print("\n========== GEMINI ERROR ==========")
        traceback.print_exc()
        print("==================================\n")
        return jsonify({"error": str(e)}), 500

@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Route not found"}), 404

@app.errorhandler(Exception)
def handle_exception(e):
    print("\n========== SERVER ERROR ==========")
    traceback.print_exc()
    print("==================================\n")
    return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     # Берем порт из переменной окружения PORT или используем 5000 по умолчанию
#     port = int(os.environ.get("PORT", 5000))

#     print(f"Starting server on port {port}")
#     print(f"PORT from env: {os.environ.get('PORT', 'not set')}")

#     app.run(
#         host="0.0.0.0",
#         port=port,
#         debug=False
#     )

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))

    print(f"Flask запускается на порту: {port}")

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )