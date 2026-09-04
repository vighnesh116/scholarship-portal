
from flask import request, jsonify, current_app
from flask_mail import Message

from database import get_db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt, get_jwt_identity, jwt_required

import secrets
import os
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
            access_token = create_access_token(
                identity=str(user['userid']),
                additional_claims={
                    "role": user['role'],
                    "name": str(user['name']),
                }
            )

            refresh_token = create_refresh_token(
                identity=str(user['userid']),
                additional_claims={"role": user['role'], "name": user['name']}
            )

            return jsonify({
                "success": True,
                "role": user['role'],
                "name": user['name'],
                "access_token": access_token,
                "refresh_token": refresh_token,
                "power": user['power']
            })

        return jsonify({
            "success": False
        }), 401

    finally:

        cursor.close()
        db.close()


# FORGOT PASSWORD — Send magic login link to email

def forgot_password():

    data = request.json
    email = data.get('email', '').strip().lower()

    if not email:
        return jsonify({"message": "Email is required"}), 400

    db = get_db()
    cursor = db.cursor(dictionary=True)

    try:
        # Check if user exists
        cursor.execute("SELECT * FROM users WHERE LOWER(email)=LOWER(%s)", (email,))
        user = cursor.fetchone()

        if not user:
            return jsonify({"message": "Email does not exist"}), 404

        # Generate secure random token
        token = secrets.token_urlsafe(48)
        expires_at = datetime.utcnow() + timedelta(minutes=15)

        # Delete any existing unused tokens for this email
        cursor.execute(
            "DELETE FROM password_reset_tokens WHERE email=%s",
            (email,)
        )

        # Insert new token
        cursor.execute(
            """
            INSERT INTO password_reset_tokens (email, token, expires_at)
            VALUES (%s, %s, %s)
            """,
            (email, token, expires_at)
        )
        db.commit()

        # Build magic link
        frontend_url = os.environ.get("FRONTEND_URL", "http://localhost:5173")
        magic_link = f"{frontend_url}/magic-login?token={token}"

        # Send email
        mail = current_app.extensions['mail']
        msg = Message(
            subject="Your Scholarship Portal Login Link",
            recipients=[email],
            html=f"""
            <div style="font-family: Georgia, serif; max-width: 560px; margin: auto; padding: 32px;
                        border: 1px solid #e0e0e0; border-radius: 16px; background: #ffffff;">
                <h2 style="color: #16247d; margin-bottom: 8px;">Scholarship Information Portal</h2>
                <p style="color: #555; font-size: 15px;">Hello <strong>{user['name']}</strong>,</p>
                <p style="color: #555; font-size: 15px;">
                    We received a request to reset your password. Click the button below to log in
                    and set a new password. This link expires in <strong>15 minutes</strong>.
                </p>
                <div style="text-align: center; margin: 32px 0;">
                    <a href="{magic_link}"
                       style="background-color: #16247d; color: #ffffff; text-decoration: none;
                              padding: 14px 32px; border-radius: 999px; font-size: 16px;
                              font-weight: bold; display: inline-block;">
                        Login &amp; Reset Password
                    </a>
                </div>
                <p style="color: #888; font-size: 13px;">
                    If you did not request this, you can safely ignore this email.
                    This link can only be used once.
                </p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
                <p style="color: #aaa; font-size: 12px; text-align: center;">
                    © 2026 Scholarship Information Portal
                </p>
            </div>
            """
        )
        mail.send(msg)

        return jsonify({"message": "Login link has been sent to your email."})

    except Exception as e:
        print(e)
        return jsonify({"message": "Failed to send email. Please try again later."}), 500

    finally:
        cursor.close()
        db.close()


# MAGIC LOGIN — Validate token and return JWT tokens

def magic_login():

    token = request.args.get('token', '').strip()

    if not token:
        return jsonify({"success": False, "message": "Invalid or missing token"}), 400

    db = get_db()
    cursor = db.cursor(dictionary=True)

    try:
        # Fetch token record
        cursor.execute(
            "SELECT * FROM password_reset_tokens WHERE token=%s",
            (token,)
        )
        record = cursor.fetchone()

        if not record:
            return jsonify({"success": False, "message": "Link is invalid or has expired."}), 400

        if record['used']:
            return jsonify({"success": False, "message": "This link has already been used."}), 400

        if datetime.utcnow() > record['expires_at']:
            return jsonify({"success": False, "message": "This link has expired. Please request a new one."}), 400

        # Mark token as used
        cursor.execute(
            "UPDATE password_reset_tokens SET used=1 WHERE token=%s",
            (token,)
        )

        # Fetch the user
        cursor.execute("SELECT * FROM users WHERE email=%s", (record['email'],))
        user = cursor.fetchone()

        if not user:
            return jsonify({"success": False, "message": "User not found."}), 404

        db.commit()

        # Issue JWT tokens
        access_token = create_access_token(
            identity=str(user['userid']),
            additional_claims={
                "role": user['role'],
                "name": str(user['name']),
            }
        )
        refresh_token = create_refresh_token(
            identity=str(user['userid']),
            additional_claims={"role": user['role'], "name": user['name']}
        )

        return jsonify({
            "success": True,
            "role": user['role'],
            "name": user['name'],
            "email": user['email'],
            "access_token": access_token,
            "refresh_token": refresh_token,
            "power": user['power']
        })

    except Exception as e:
        print(e)
        return jsonify({"success": False, "message": "Something went wrong."}), 500

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
    claims = get_jwt()

    new_access_token = create_access_token(
        identity=user_id,
        additional_claims={
            "role": claims.get("role")
        }
    )
    return jsonify({
        "access_token": new_access_token
    })