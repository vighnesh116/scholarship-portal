from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root123",
    database="scholarship_portal"
)

cursor = db.cursor(dictionary=True)

# ------------------ SIGNUP ------------------

@app.route('/signup', methods=['POST'])
def signup():

    data = request.json

    name = data['name']
    email = data['email']
    password = data['password']

    hashed_password = generate_password_hash(password)

    try:
        sql = """
        INSERT INTO users(name,email,password)
        VALUES(%s,%s,%s)
        """

        cursor.execute(
            sql,
            (name,email,hashed_password)
        )

        db.commit()

        return jsonify({
            "message":"User Registered Successfully"
        })

    except Exception as e:
        return jsonify({
            "message":"Email Already Exists"
        }),400

# ------------------ LOGIN ------------------

@app.route('/login', methods=['POST'])
def login():

    data = request.json

    email = data['email']
    password = data['password']

    cursor.execute(
        "SELECT * FROM users WHERE email=%s",
        (email,)
    )

    user = cursor.fetchone()

    if user and check_password_hash(
        user['password'],
        password
    ):

        return jsonify({
            "success":True,
            "name":user['name']
        })

    return jsonify({
        "success":False,
        "message":"Invalid Credentials"
    }),401
#--------------------------////// ///////---------------------------
@app.route('/Home', methods=['POST'])
def save_student_info():

    data = request.json

    user_id = data['user_id']

    income = data['income']
    caste = data['caste']
    education = data['education']
    marks = data['marks']
    gender = data['gender']

    cursor.execute(
        """
        SELECT name,email
        FROM users
        WHERE id=%s
        """,
        (user_id,)
    )

    user = cursor.fetchone()

    cursor.execute(
        """
        INSERT INTO student_info
        (
            user_id,
            name,
            email,
            income,
            caste,
            education,
            marks,
            gender
        )
        VALUES
        (%s,%s,%s,%s,%s,%s,%s,%s)
        """,
        (
            user_id,
            user['name'],
            user['email'],
            income,
            caste,
            education,
            marks,
            gender
        )
    )

    db.commit()

    return jsonify({
        "message":"Saved"
    })

# ------------------ GET STUDENT INFO ------------------

@app.route('/scholarship_portal_sclrinfo', methods=['POST'])
def eligible():

    data = request.json

    income = data['income']
    caste = data['caste']
    education = data['education']
    marks = data['marks']
    gender = data['gender']

    query = """
    SELECT *
    FROM scholarship_info
    WHERE
    (maxIncome IS NULL OR maxIncome >= %s)
    AND
    (category IS NULL OR category = %s)
    AND
    (requiredClass IS NULL OR requiredClass = %s)
    AND
    (minMarks IS NULL OR minMarks <= %s)
    AND
    (applicableGender IS NULL OR applicableGender = %s)
    """

    cursor.execute(
        query,
        (
            income,
            caste,
            education,
            marks,
            gender
        )
    )

    scholarships = cursor.fetchall()

    return jsonify(scholarships)
if __name__ == "__main__":
    app.run(debug=True)