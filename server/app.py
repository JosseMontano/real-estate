from flask import Flask, jsonify, request
from flask_cors import CORS
from routes.realEstate import post_realEstate,translate_text

app = Flask(__name__)

CORS(app, resources={
     "*": {"origins": ["http://localhost:5173", "exp://192.168.1.13:19000"]}})

@app.route('/')
def index():
    return jsonify({"Choo Choo": "Welcome to the API realEstates 🚅"})

@app.route('/api/translate', methods=['POST'])
def translateEsEn():
    val = request.get_json().get('val', '')
    fromLanguage= request.get_json().get('from', '')
    to = request.get_json().get('to', '')
    print(fromLanguage, to)
    value = translate_text(val, fromLanguage, to)
    return jsonify({"val": value})


@app.route('/api/real-estate', methods=['POST'])
def post_companyApi():
    ubication = request.get_json().get('ubication', '')
    address = post_realEstate(ubication)

    response = {
        "val":    address,
    }

    return jsonify(response)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
