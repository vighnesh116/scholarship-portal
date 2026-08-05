from flask import Flask, request, jsonify
from flask_cors import CORS
from flask import Flask, request, jsonify
from flask_cors import CORS

from auth import signup, login, update_password
from scholarship import (
    add_scholarship,
    admin_scholarships,
    delete_scholarship,
    update_scholarship,
    scholarships,
    admin_stats
)
from student import portal, admin_students, user_data

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'Nqn4muAADg3RbA'
#Auth


# SIGNUP
@app.route('/signup', methods=['POST'])(signup)

# LOGIN
@app.route('/login', methods=['POST'])(login)

#Update Password

# ADD SCHOLARSHIP

# VIEW ALL SCHOLARSHIPS

# portal
# ADMIN STATS


#User data sent to Admin

# SCHOLARSHIP FILTER

# VIEW ALL STUDENTS

# UPDATE PASSWORD

if __name__ == "__main__":
    app.run(debug=True)