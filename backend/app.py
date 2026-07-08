from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)


# DATABASE CONNECTION
def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="root123",
        database="scholarship_portal"
    )


# SIGNUP
@app.route('/signup', methods=['POST'])
def signup():

    data = request.json

    name = data['name']
    email = data['email']
    password = data['password']

    hashed_password = generate_password_hash(password)

    db = get_db()
    cursor = db.cursor(dictionary=True)

    try:

        cursor.execute(
            """
            INSERT INTO users
            (name,email,password)
            VALUES(%s,%s,%s)
            """,
            (
                name,
                email,
                hashed_password
            )
        )

        db.commit()

        return jsonify({
            "message": "Registration Successful"
        })

    except Exception as e:

        print(e)

        return jsonify({
            "message": "Email already exists"
        }), 400

    finally:

        cursor.close()
        db.close()


# LOGIN
@app.route('/login', methods=['POST'])
def login():

    data = request.json

    email = data['email']
    password = data['password']

    db = get_db()
    cursor = db.cursor(dictionary=True)

    try:

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
                "success": True,
                "name": user['name'],
                "role": user['role']
            })

        return jsonify({
            "success": False
        }), 401

    finally:

        cursor.close()
        db.close()


# ADD SCHOLARSHIP
@app.route('/add-scholarship', methods=['POST'])
def add_scholarship():

    data = request.json

    gender = data.get('gender','NULL')
    caste = data.get('caste','NULL')
    educationqualifiation = data.get('educationqualifiation','NULL')

    db = get_db()
    cursor = db.cursor(dictionary=True)

    try:

        cursor.execute(
            """
            SELECT *
            FROM sclrinfo
            WHERE LOWER(sclrname) = LOWER(%s)
            """,
            (data['sclrname'],)
        )

        existing = cursor.fetchone()

        if existing:
            return jsonify({
                "message": "Scholarship already exists"
            }), 400

        cursor.execute(
            """
            INSERT INTO sclrinfo
            (
                sclrname,
                amount,
                percentreeq,
                miniincome,
                deadline,
                gender,
                caste,
                educationqualifiation,
                application_link
            )
            VALUES
            (%s,%s,%s,%s,%s,%s,%s,%s,%s)
            """,
            (
                data['sclrname'],
                data['amount'],
                data['percentreeq'],
                data['miniincome'],
                data['deadline'],
                gender,
                caste,
                educationqualifiation,
                data['application_link']
            )
        )

        db.commit()

        return jsonify({
            "message": "Scholarship Added Successfully"
        })

    except Exception as e:

        print(e)

        return jsonify({
            "message": "Failed to add scholarship"
        }), 500

    finally:

        cursor.close()
        db.close()

# VIEW ALL SCHOLARSHIPS
@app.route('/admin-scholarships', methods=['GET'])
def admin_scholarships():

    db = get_db()
    cursor = db.cursor(dictionary=True)

    try:

        cursor.execute(
            """
            SELECT *
            FROM sclrinfo
            ORDER BY sclrid DESC
            """
        )

        scholarships = cursor.fetchall()

        return jsonify(scholarships)

    finally:

        cursor.close()
        db.close()


# DELETE SCHOLARSHIP
@app.route('/delete-scholarship/<int:id>', methods=['DELETE'])
def delete_scholarship(id):

    db = get_db()
    cursor = db.cursor(dictionary=True)

    try:

        cursor.execute(
            """
            DELETE From sclrinfo
            WHERE sclrid=%s
            """,
            (id,)
        )

        db.commit()

        return jsonify({
            "message": "Deleted Successfully"
        })

    finally:

        cursor.close()
        db.close()


# UPDATE SCHOLARSHIP
@app.route('/update-scholarship/<int:id>', methods=['PUT'])
def update_scholarship(id):

    data = request.json

    db = get_db()
    cursor = db.cursor(dictionary=True)

    try:

        cursor.execute(
            """
            UPDATE sclrinfo
            SET
                sclrname=%s,
                amount=%s,
                percentreeq=%s,
                miniincome=%s,
                deadline=%s,
                gender=%s,
                caste=%s,
                educationqualifiation=%s,
                application_link=%s
            WHERE sclrid=%s
            """,
            (
                data['sclrname'],
                data['amount'],
                data['percentreeq'],
                data['miniincome'],
                data['deadline'],
                data['gender'],
                data['caste'],
                data['educationqualifiation'],
                data['application_link'],
                id
            )
        )

        db.commit()

        return jsonify({
            "message": "Updated Successfully"
        })

    finally:

        cursor.close()
        db.close()


# SAVE STUDENT INFO
@app.route('/portal', methods=['POST'])
def portal():

    data = request.json

    db = get_db()
    cursor = db.cursor(dictionary=True)

    try:

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
            "message": "Saved"
        })

    finally:

        cursor.close()
        db.close()


# ADMIN STATS
from flask import jsonify
from datetime import datetime

@app.route('/admin-stats', methods=['GET'])
def admin_stats():

    db = get_db()
    cursor = db.cursor(dictionary=True)

    try:

        cursor.execute("SELECT COUNT(*) AS total_users FROM users")
        users = cursor.fetchone()

        cursor.execute("SELECT COUNT(*) AS total_students FROM students")
        students = cursor.fetchone()

        cursor.execute("SELECT COUNT(*) AS total_scholarships FROM sclrinfo")
        scholarships = cursor.fetchone()

        # Active Scholarships
        cursor.execute("""
            SELECT COUNT(*) AS active
            FROM sclrinfo
            WHERE STR_TO_DATE(deadline,'%d-%b-%Y') >= CURDATE()
        """)
        active = cursor.fetchone()

        # Inactive Scholarships
        cursor.execute("""
            SELECT COUNT(*) AS inactive
            FROM sclrinfo
            WHERE STR_TO_DATE(deadline,'%d-%b-%Y') < CURDATE()
        """)
        inactive = cursor.fetchone()

        return jsonify({
            "total_users": users["total_users"],
            "total_students": students["total_students"],
            "total_scholarships": scholarships["total_scholarships"],
            "active_scholarships": active["active"],
            "inactive_scholarships": inactive["inactive"]
        })

    finally:
        cursor.close()
        db.close()

#User data sent to Admin
@app.route('/admin-users', methods=['GET'])
def user_data():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()
        return jsonify(users)
    finally:
        cursor.close()
        db.close()

# SCHOLARSHIP FILTER
@app.route('/scholarships', methods=['POST'])
def scholarships():

    data = request.json

    marks = int(data['marks'])
    income = int(data['income'])
    education = int(data['education'])

    caste = data['caste']
    gender = data['gender']

    db = get_db()
    cursor = db.cursor(dictionary=True)

    try:

        query = """
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
            END AS is_active,

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
                OR educationqualifiation = %s
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

        result = cursor.fetchall()

        return jsonify(result)

    finally:

        cursor.close()
        db.close()
# VIEW ALL STUDENTS
@app.route('/admin-students', methods=['GET'])
def admin_students():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM students ORDER BY stdid ASC")
        students = cursor.fetchall()
        return jsonify(students)
    except Exception as e:
        print(e)
        return jsonify({"message": "Error fetching students"}), 500
    finally:
        cursor.close()
        db.close()

# UPDATE PASSWORD
@app.route('/update-password', methods=['POST'])
def update_password():  
    
    data = request.json

    email = data['email']
    new_password = data['new_password']

    hashed_password = generate_password_hash(new_password)

    db = get_db()
    cursor = db.cursor(dictionary=True)

    try:

        cursor.execute(
            "UPDATE users SET password=%s WHERE email=%s",
            (hashed_password, email)
        )

        db.commit()

        return jsonify({
            "message": "Password updated successfully"
        })

    except Exception as e:

        print(e)

        return jsonify({
            "message": "Failed to update password"
        }), 500

    finally:

        cursor.close()
        db.close()

if __name__ == "__main__":
    app.run(debug=True)