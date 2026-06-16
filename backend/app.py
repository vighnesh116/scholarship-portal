from flask import Flask,request,jsonify
from flask_cors import CORS
import mysql.connector
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash



app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root123",
    database="scholarship_portal"
)

cursor = db.cursor(dictionary=True)

#  SIGNUP 

@app.route('/signup',methods=['POST'])
def signup():

    data=request.json

    name=data['name']
    email=data['email']
    password=data['password']

    hashed=generate_password_hash(password)

    try:

        cursor.execute(
            """
            INSERT INTO users
            (name,email,password)
            VALUES(%s,%s,%s)
            """,
            (name,email,hashed)
        )

        db.commit()

        return jsonify({
            "message":"Registration Successful"
        })

    except Exception as e:

        print(e)

        return jsonify({
            "message":"Email already exists"
        }),400

#  LOGIN

@app.route('/login',methods=['POST'])
def login():

    data=request.json

    email=data['email']
    password=data['password']

    cursor.execute(
        "SELECT * FROM users WHERE email=%s",
        (email,)
    )

    user=cursor.fetchone()

    if user and check_password_hash(
        user['password'],
        password
    ):

        return jsonify({
            "success":True,
            "name":user['name']
        })

    return jsonify({
        "success":False
    }),401

# SAVE STUDENT 

@app.route('/portal',methods=['POST'])
def portal():

    data=request.json

    cursor.execute(
        """
        INSERT INTO students
        (
        stdname,
        stdpercent,
        stdincome,
        stdgender,
        education,
        caste
        )
        VALUES
        (%s,%s,%s,%s,%s,%s)
        """,
        (
            data['name'],
            data['marks'],
            data['income'],
            data['gender'],
            data['education'],
            data['caste']
        )
    )

    db.commit()

    return jsonify({
        "message":"Saved"
    })

#  SCHOLARSHIPS

@app.route('/scholarships',methods=['POST'])
def scholarships():

    data=request.json

    marks=int(data['marks'])
    income=int(data['income'])
    education=int(data['education'])

    caste=data['caste']
    gender=data['gender']

    query="""
SELECT
    sclrname,
    amount,
    percentreeq,
    miniincome,
    application_link,
    deadline,

    CASE
        WHEN STR_TO_DATE(deadline,'%d-%b-%Y') >= CURDATE()
        THEN 1
        ELSE 0
    END AS is_active ,
    
    DATEDIFF(
    STR_TO_DATE(deadline,'%d-%b-%Y'),
    CURDATE()
) AS days_left

FROM sclrinfo

WHERE

    percentreeq <= %s

    AND miniincome >= %s

    AND
    (
        educationqualifiation IS NULL
        OR educationqualifiation=%s
    )

    AND
    (
        caste IS NULL
        OR LOWER(caste)=LOWER(%s)
    )

    AND
    (
        gender IS NULL
        OR LOWER(gender)=LOWER(%s)
    )

ORDER BY
    is_active DESC,
    STR_TO_DATE(deadline,'%d-%b-%Y') ASC
"""
    cursor.execute(
        query,
        (
            marks,
            income,
            education,
            caste,
            gender
        )
    )

    result=cursor.fetchall()
    print(result)
    return jsonify(result)
if __name__=="__main__":
    app.run(debug=True)