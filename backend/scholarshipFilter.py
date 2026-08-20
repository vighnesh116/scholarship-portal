from flask import request, jsonify

from database import get_db
from sklearn.metrics.pairwise import cosine_similarity





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
            sclrid,
            sclrname,
            amount,
            percentreeq,
            miniincome,
            application_link,
            deadline,
            draft,
            educationqualifiation,
            caste,
            gender,

            CASE
                WHEN STR_TO_DATE(deadline, '%d-%b-%Y') >= CURDATE()
                THEN 1
                ELSE 0
            END AS is_active,

            DATEDIFF(
                STR_TO_DATE(deadline, '%d-%b-%Y'),
                CURDATE()
            ) AS days_left

        FROM sclrinfo

        WHERE
            (
                percentreeq IS NULL
                OR percentreeq <= %s
            )

            AND (
                miniincome IS NULL
                OR miniincome >= %s
            )

            AND (
                educationqualifiation IS NULL
                OR educationqualifiation = %s
            )

            AND (
                caste IS NULL
                OR LOWER(caste) = LOWER(%s)
            )

            AND (
                gender IS NULL
                OR LOWER(gender) = LOWER(%s)
            )

        """

        cursor.execute(
            query,
            (
                marks,
                income,
                education,
                caste,
                gender
            )
        )

        eligible_scholarships = cursor.fetchall()


       
        # RECOMMENDATION CALCULATION


        caste_values = {
            "ST": 1.00,
            "SC": 0.90,
            "Minority": 0.70,
            "OBC": 0.65,
            "General": 0.30
        }

        results = []

        for scholarship in eligible_scholarships:

                        # 1. INCOME
        

            if scholarship["miniincome"] is None:

                # Scholarship has no income limit
                scholarship_income_vector = 0


                student_income_vector = income / 1_000_000

            else:

                scholarship_income = scholarship["miniincome"]

                calculated_income = (
                    scholarship_income - income
                )

                student_income_vector = (
                    calculated_income / scholarship_income
                )

    
                if student_income_vector < 0:
                    student_income_vector = 0

                if student_income_vector > 1:
                    student_income_vector = 1

                scholarship_income_vector = 1


            
            # 2. MARKS
        

            if marks is None:
                student_marks_vector = 1
            else:
                student_marks_vector = marks / 100

            scholarship_marks_vector = 1


            # 3. CASTE


            if scholarship["caste"] is not None:

            
                student_caste_vector = 1.0

            else:

            
                student_caste_vector = caste_values.get(
                    caste,
                    0.30
                )

            scholarship_caste_vector = 1.0


            # 4. GENDER

            if scholarship["gender"] is not None:

                student_gender_vector = 1.0

            else:

                if gender.lower() == "female":
                    student_gender_vector = 0.90
                else:
                    student_gender_vector = 0.75

            scholarship_gender_vector = 1.0


            # 5. EDUCATION

            if (
                scholarship["educationqualifiation"] is not None
                and
                int(scholarship["educationqualifiation"]) == education
            ):

                student_education_vector = 1.0

            else:

              
                student_education_vector = 0.75

            scholarship_education_vector = 1.0


    
            # FINAL VECTORS
            # [Income, Marks, Caste, Gender, Education]

            student_vector = [
                student_income_vector,
                student_marks_vector,
                student_caste_vector,
                student_gender_vector,
                student_education_vector
            ]

            scholarship_vector = [
                scholarship_income_vector,
                scholarship_marks_vector,
                scholarship_caste_vector,
                scholarship_gender_vector,
                scholarship_education_vector
            ]


        
            # COSINE SIMILARITY
        

            score = cosine_similarity(
                [student_vector],
                [scholarship_vector]
            )[0][0]


            # ADD SCORE TO SCHOLARSHIP
            

            scholarship["recommendation_score"] = round(
                float(score),
                4
            )

            scholarship["student_vector"] = student_vector
            scholarship["scholarship_vector"] = scholarship_vector

            results.append(scholarship)


    
        # RANK ALL ELIGIBLE SCHOLARSHIPS
    

        results.sort(
            key=lambda x: x["recommendation_score"],
            reverse=True
        )


        return jsonify(results), 200


    finally:

        cursor.close()
        db.close()


