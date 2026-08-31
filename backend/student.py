from flask import Flask, request, jsonify
from database import get_db  

# SAVE STUDENT INFO Portal

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
                collegeName, 
                stdpercent,
                stdincome,
                stdgender,
                education,
                caste
            )
            VALUES
            (%s,%s,%s,%s,%s,%s,%s)
            """,
            (
                data['name'],
                data['collegeName'],
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

def user_data():
    db = get_db()

    

    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute( 
            """
            SELECT *
            FROM users
            ORDER BY userid DESC
            """  
        )
        users = cursor.fetchall()
        return jsonify(users)
    finally:
        cursor.close()
        db.close()

# VIEW ALL STUDENTS

def admin_students():
    db = get_db()
    
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute( """
            SELECT *
            FROM students
            ORDER BY stdid DESC
            """  
        )
        students = cursor.fetchall()
        
        return jsonify(students)
    except Exception as e:
        print(e)
        return jsonify({"message": "Error fetching students"}), 500

    finally:
        cursor.close()
        db.close()


def delete_users(id):
    db = get_db()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute(
            """
            DELETE FROM users
            WHERE userid=%s
            """,
            (id,),
        )
        db.commit()
        return jsonify({"message": "Deleted Successfully"})
    finally:
        cursor.close()
        db.close()
