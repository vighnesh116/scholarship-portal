import { useLocation } from "react-router-dom";

function ScholarshipResult() {

    const location = useLocation();

    const scholarships = location.state?.scholarships || [];

    return (

        <div className="container">

            <h1>Eligible Scholarships</h1>

            {
                scholarships.length === 0 ?

                    (
                        <p>No Scholarships Found</p>
                    )

                    :

                    (
                        scholarships.map((item, index) => (

                            <div
                                key={index}
                                className="scholarship-card"
                            >

                                <h3>
                                    {item.sclrname}
                                </h3>

                                <p>
                                    Amount: {item.amount}
                                </p>

                            </div>

                        ))
                    )
            }

        </div>

    );

}

export default ScholarshipResult;