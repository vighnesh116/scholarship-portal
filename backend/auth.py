
from flask import request, jsonify

from database import get_db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token , create_refresh_token ,get_jwt,get_jwt_identity,jwt_required

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
            access_token = create_access_token(
                identity=str(user['userid']),
                additional_claims={
                    "role": user['role'],
                    "name":str(user['name']),
                    
                }
            )

            refresh_token = create_refresh_token(
                identity=str(user['userid']),
                additional_claims={"role":user['role'] ,"name":user['name'] }

            )
            
            return jsonify({
                "success": True,
                "role": user['role'],
                "name":user['name'],
                "access_token": access_token,
                "refresh_token":refresh_token,
                "power":user['power']
                
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
        
def admin_update_password():  
    
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
        

@jwt_required(refresh=True)
def refresh():
    user_id = get_jwt_identity()
    claims =get_jwt()

    new_access_token = create_access_token(
        identity=user_id,
        additional_claims={
            "role":claims.get("role")
        }
    )
    return jsonify({
        "access_token":new_access_token
    })