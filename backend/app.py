from flask import Flask, jsonify
from flask_cors import CORS
app=Flask(__name__)
CORS(app)
@app.route("/")
def home():
    return "Scholarship Portal Backend"

@app.route("/scholarships")
def scholarships():
    data=[
    {
        "id":1,
        "name":"National Scholarship",
        "amount":50000
    },
    {
        "id":2,
        "name":"Karnataka state Scholarship",
        "amount":25000
    }
    ] 
    return jsonify(data)
if __name__=="__main__":
    app.run(debug=True)
