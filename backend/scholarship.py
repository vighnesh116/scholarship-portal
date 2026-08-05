from flask import request, jsonify
from datetime import datetime, date
from database import get_db


def add_scholarship():
    data = request.json

    gender = data.get("gender", "NULL")
    caste = data.get("caste", "NULL")
    educationqualifiation = data.get("educationqualifiation", "NULL")

    db = get_db()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute(
            """
            SELECT *
            FROM sclrinfo
            WHERE LOWER(sclrname) = LOWER(%s)
            """,
            (data["sclrname"],),
        )
        existing = cursor.fetchone()

        if existing:
            return jsonify({"message": "Scholarship already exists"}), 400

        cursor.execute(
            """
            INSERT INTO sclrinfo
            (
                sclrname,
                amount,
                percentreeq,
                miniincome,
                deadline,
                gender,
                caste,
                educationqualifiation,
                application_link,
                draft
            )
            VALUES
            (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
            """,
            (
                data["sclrname"],
                data["amount"],
                data["percentreeq"],
                data["miniincome"],
                data["deadline"],
                gender,
                caste,
                educationqualifiation,
                data["application_link"],
                data["draft"],
            ),
        )

        db.commit()
        return jsonify({"message": "Scholarship Added Successfully"})
    except Exception as e:
        print(e)
        return jsonify({"message": "Failed to add scholarship"}), 500
    finally:
        cursor.close()
        db.close()


def delete_scholarship(id):
    db = get_db()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute(
            """
            DELETE FROM sclrinfo
            WHERE sclrid=%s
            """,
            (id,),
        )
        db.commit()
        return jsonify({"message": "Deleted Successfully"})
    finally:
        cursor.close()
        db.close()


def update_scholarship(id):
    data = request.json

    db = get_db()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute(
            """
            UPDATE sclrinfo
            SET
                sclrname=%s,
                amount=%s,
                percentreeq=%s,
                miniincome=%s,
                deadline=%s,
                gender=%s,
                caste=%s,
                educationqualifiation=%s,
                application_link=%s,
                draft=%s
            WHERE sclrid=%s
            """,
            (
                data["sclrname"],
                data["amount"],
                data["percentreeq"],
                data["miniincome"],
                data["deadline"],
                data["gender"],
                data["caste"],
                data["educationqualifiation"],
                data["application_link"],
                data["draft"],
                id,
            ),
        )
        db.commit()
        return jsonify({"message": "Updated Successfully"})
    finally:
        cursor.close()
        db.close()


def scholarships():
    data = request.json

    marks = int(data["marks"])
    income = int(data["income"])
    education = int(data["education"])

    caste = data["caste"]
    gender = data["gender"]

    db = get_db()
    cursor = db.cursor(dictionary=True)

    try:
        query = """
        SELECT
            sclrname,
            amount,
            percentreeq,
            miniincome,
            application_link,
            deadline,
            draft,

            CASE
                WHEN STR_TO_DATE(deadline,'%d-%b-%Y') >= CURDATE()
                THEN 1
                ELSE 0
            END AS is_active,

            DATEDIFF(
                STR_TO_DATE(deadline,'%d-%b-%Y'),
                CURDATE()
            ) AS days_left

        FROM sclrinfo

        WHERE
            percentreeq <= %s
            AND miniincome >= %s
            AND (
                educationqualifiation IS NULL
                OR educationqualifiation = %s
            )
            AND (
                caste IS NULL
                OR LOWER(caste)=LOWER(%s)
            )
            AND (
                gender IS NULL
                OR LOWER(gender)=LOWER(%s)
            )

        ORDER BY
            is_active DESC,
            STR_TO_DATE(deadline,'%d-%b-%Y') ASC
        """

        cursor.execute(query, (marks, income, education, caste, gender))
        result = cursor.fetchall()

        return jsonify(result)
    finally:
        cursor.close()
        db.close()


def admin_scholarships():
    db = get_db()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute(
            """
            SELECT *
            FROM sclrinfo
            ORDER BY sclrid DESC
            """
        )

        scholarships = cursor.fetchall()
        today = date.today()

        for scholarship in scholarships:
            deadline = datetime.strptime(scholarship["deadline"], "%d-%b-%Y").date()
            scholarship["is_active"] = deadline >= today

        return jsonify(scholarships)
    finally:
        cursor.close()
        db.close()


def admin_stats():
    db = get_db()
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute("SELECT COUNT(*) AS total_users FROM users")
        users = cursor.fetchone()

        cursor.execute("SELECT COUNT(*) AS total_students FROM students")
        students = cursor.fetchone()

        cursor.execute("SELECT COUNT(*) AS total_scholarships FROM sclrinfo")
        scholarships = cursor.fetchone()

        cursor.execute(
            """
            SELECT COUNT(*) AS active
            FROM sclrinfo
            WHERE STR_TO_DATE(deadline,'%d-%b-%Y') >= CURDATE()
            """
        )
        active = cursor.fetchone()

        cursor.execute(
            """
            SELECT COUNT(*) AS inactive
            FROM sclrinfo
            WHERE STR_TO_DATE(deadline,'%d-%b-%Y') < CURDATE()
            """
        )
        inactive = cursor.fetchone()

        return jsonify({
            "total_users": users["total_users"],
            "total_students": students["total_students"],
            "total_scholarships": scholarships["total_scholarships"],
            "active_scholarships": active["active"],
            "inactive_scholarships": inactive["inactive"],
        })
    finally:
        cursor.close()
        db.close()