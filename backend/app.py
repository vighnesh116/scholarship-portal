
from decoder import admin_required

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required
from flask_mail import Mail
from datetime import timedelta
from auth import signup, login, update_password, refresh, admin_update_password, forgot_password, magic_login
from scholarship import (
    add_scholarship,
    admin_scholarships,
    delete_scholarship,
    update_scholarship,
    admin_stats,
)
from student import portal, admin_students, user_data, delete_users
from scholarshipFilter import scholarships
import os

app = Flask(__name__)
CORS(app, origins=["https://scholarship-mitra.vercel.app", "http://localhost:5173"])
app.config["JWT_SECRET_KEY"] = os.environ["JWT_SECRET_KEY"]
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=7)

# Flask-Mail configuration (Gmail SMTP)
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = os.environ.get("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.environ.get("MAIL_PASSWORD")
app.config["MAIL_DEFAULT_SENDER"] = os.environ.get("MAIL_DEFAULT_SENDER", os.environ.get("MAIL_USERNAME"))

jwt = JWTManager(app)
mail = Mail(app)

# Authentication
app.add_url_rule("/signup", view_func=signup, methods=["POST"])
app.add_url_rule("/login", view_func=login, methods=["POST"])
app.add_url_rule("/update-password", view_func=update_password, methods=["PUT"])
app.add_url_rule("/refresh", view_func=refresh, methods=["POST"])
app.add_url_rule("/forgot-password", view_func=forgot_password, methods=["POST"])
app.add_url_rule("/magic-login", view_func=magic_login, methods=["GET"])

# Scholarship Management
app.add_url_rule("/add-scholarship", view_func=admin_required()(add_scholarship), methods=["POST"])
app.add_url_rule("/update-scholarship/<int:id>", view_func=admin_required()(update_scholarship), methods=["PUT"])
app.add_url_rule("/admin-students", view_func=admin_required()(admin_students), methods=["GET"])
app.add_url_rule("/admin-users", view_func=admin_required()(user_data), methods=["GET"])
app.add_url_rule("/admin-scholarships", view_func=admin_required()(admin_scholarships), methods=["GET"])
app.add_url_rule("/admin-stats", view_func=admin_required()(admin_stats), methods=["GET"])
app.add_url_rule("/delete-scholarship/<int:id>", view_func=admin_required()(delete_scholarship), methods=["DELETE"])
app.add_url_rule("/admin-updatepassword", view_func=admin_required()(admin_update_password), methods=["PUT"])

# app.add_url_rule("/admin_access",view_func=admin_required()(admin_access),methods=["PUT"])

# Student Management
app.add_url_rule("/portal", view_func=jwt_required()(portal), methods=["POST"])
app.add_url_rule("/scholarships", view_func=jwt_required()(scholarships), methods=["POST"])
app.add_url_rule("/delete_users/<int:id>", view_func=admin_required()(delete_users), methods=["DELETE"])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=True)