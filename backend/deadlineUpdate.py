from datetime import datetime, date
import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root123",
    database="scholarship_portal"
)

cursor = db.cursor()

cursor.execute("""
SELECT sclrid, deadline
FROM sclrinfo
""")

rows = cursor.fetchall()

today = date.today()
print("Today:", today)
for row in rows:

    scholarshipid = row[0]
    deadline = row[1]

    if deadline and deadline.upper() != "CLOSED":
        print("Today:", today)
    
        try:

            deadline_date = datetime.strptime(
                deadline,
                "%d-%m-%Y"
            ).date()
            print("Today:", today)
            print("Deadline:", deadline_date)
            if deadline_date < today:

                cursor.execute("""
                UPDATE sclrinfo
                SET deadline='CLOSED'
                WHERE scholarshipid=%s
                """, (scholarshipid,))

        except:
            pass

db.commit()

print("Scholarship deadlines updated successfully")

cursor.close()
db.close()