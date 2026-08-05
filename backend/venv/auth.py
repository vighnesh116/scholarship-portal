
from flask import request, jsonify
from backend.venv import app
from backend.venv.database import get_db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
# SIGNUP

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
            
            token=jwt.encode(
                {
                    "user_id":user['email'],
                    "role":user['role'],
                    "expiration":datetime.utcnow()+timedelta(hours=3)
                }
            )

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
# Update Password

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
