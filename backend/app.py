# from pathlib import Path
# import sys


# BASE_DIR = Path(__file__).resolve().parent
# if str(BASE_DIR) not in sys.path:
#     sys.path.insert(0, str(BASE_DIR))

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token,jwt_required

from auth import signup, login, update_password
from scholarship import (
    add_scholarship,
    admin_scholarships,
    delete_scholarship,
    update_scholarship,
    scholarships,
    admin_stats,
)
from student import portal, admin_students, user_data

app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = "Nqn4muAADg3RbAgeucbuwbcueich"
jwt=JWTManager(app)

# Authentication
app.add_url_rule("/signup", view_func=signup, methods=["POST"])
app.add_url_rule("/login", view_func=login, methods=["POST"])
app.add_url_rule("/update-password", view_func=update_password, methods=["POST"])

# Scholarship Management
app.add_url_rule("/add-scholarship", view_func=add_scholarship, methods=["POST"])
app.add_url_rule("/update-scholarship/<int:id>", view_func=update_scholarship, methods=["PUT"])
app.add_url_rule("/scholarships", view_func=jwt_required()(scholarships), methods=["POST"])
app.add_url_rule("/admin-scholarships", view_func=admin_scholarships, methods=["GET"])
app.add_url_rule("/admin-stats", view_func=admin_stats, methods=["GET"])
app.add_url_rule("/delete-scholarship/<int:id>", view_func=delete_scholarship, methods=["DELETE"])

# Student Management
app.add_url_rule("/admin-students", view_func=admin_students, methods=["GET"])
app.add_url_rule("/portal", view_func=jwt_required()(portal), methods=["POST"])
app.add_url_rule("/admin-users", view_func=user_data, methods=["GET"])

if __name__ == "__main__":
    app.run(debug=True)