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
