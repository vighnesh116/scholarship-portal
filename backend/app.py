
from decoder import admin_required

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager,jwt_required 
from datetime import timedelta
from auth import signup, login, update_password,refresh,admin_update_password
from scholarship import (
    add_scholarship,
    admin_scholarships,
    delete_scholarship,
    update_scholarship,
    admin_stats,
)
from student import portal, admin_students, user_data , delete_users
from scholarshipFilter import scholarships
app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = "Nqn4muAADg3RbAgervv4v99464[&SDTGVwbc^$&^CC"
app.config["JWT_ACCESS_TOKEN_EXPIRES"]=timedelta(days=1)
app.config["JWT_REFRESH_TOKEN_EXPIRES"]=timedelta(days=7)
jwt=JWTManager(app)

# Authentication
app.add_url_rule("/signup", view_func=signup, methods=["POST"])
app.add_url_rule("/login", view_func=login, methods=["POST"])
app.add_url_rule("/update-password", view_func=update_password, methods=["POST"])
app.add_url_rule("/refresh",view_func=refresh,methods=["POST"])

# Scholarship Management
app.add_url_rule("/add-scholarship", view_func=admin_required()(add_scholarship), methods=["POST"])
app.add_url_rule("/update-scholarship/<int:id>", view_func=admin_required()(update_scholarship), methods=["PUT"])
app.add_url_rule("/admin-students", view_func=admin_required()(admin_students), methods=["GET"])
app.add_url_rule("/admin-users", view_func=admin_required()(user_data), methods=["GET"])
app.add_url_rule("/admin-scholarships", view_func=admin_required()(admin_scholarships), methods=["GET"])
app.add_url_rule("/admin-stats", view_func=admin_required()(admin_stats), methods=["GET"])
app.add_url_rule("/delete-scholarship/<int:id>", view_func=admin_required()(delete_scholarship), methods=["DELETE"])
app.add_url_rule("/admin-updatepassword", view_func=admin_required()(admin_update_password), methods=[""])

# app.add_url_rule("/admin_access",view_func=admin_required()(admin_access),methods=["PUT"])

# Student Management
app.add_url_rule("/portal", view_func=jwt_required()(portal), methods=["POST"])
app.add_url_rule("/scholarships", view_func=jwt_required()(scholarships), methods=["POST"])
app.add_url_rule("/delete_users/<int:id>",view_func=jwt_required()(delete_users),methods=["DELETE"])

if __name__ == "__main__":
    app.run(host="192.168.1.68", port=5000, debug=True)