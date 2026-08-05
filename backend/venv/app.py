from flask import Flask
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


#--------------------Authentication--------------------#

# SIGNUP
@app.route('/signup', methods=['POST'])(signup)

# LOGIN
@app.route('/login', methods=['POST'])(login)

#Update Password
@app.route('/update-password', methods=['POST'])(update_password)


#--------------------Scholarship Management--------------------

# ADD SCHOLARSHIP

# VIEW ALL SCHOLARSHIPS


# ADMIN STATS




# SCHOLARSHIP FILTER



#-------------------------Student Management-------------------------#

# VIEW ALL STUDENTS
@app.route('/admin-students', methods=['GET'])(admin_students)

# portal
@app.route('/portal', methods=['POST'])(portal)

#User data sent to Admin
@app.route('/admin-users', methods=['GET'])(user_data)

if __name__ == "__main__":
    app.run(debug=True)