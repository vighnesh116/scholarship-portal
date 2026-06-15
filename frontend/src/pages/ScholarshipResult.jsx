import {useLocation} from "react-router-dom";

import "./Scholarship.css";

function ScholarshipResult(){

    const location=useLocation();

    const scholarships=
    location.state?.scholarships || [];

    return(

        <div className="scholarship-page">

            <h1>
                Eligible Scholarships
            </h1>

            {
                scholarships.length===0 ?

                (
                    <div className="scholarship-box">

                        <h2>
                            No Scholarship Found
                        </h2>

                    </div>
                )

                :

                scholarships.map((item,index)=>(

                    <div
                    className="scholarship-box"
                    key={index}
                    >

                        <h2>
                            {item.sclrname}
                        </h2>

                        <p>
                            Amount :
                            ₹{item.amount}
                        </p>

                        <p>
                            Required Percentage :
                            {item.percentreeq}%
                        </p>

                        <p>
                            Income Limit :
                            ₹{item.miniincome}
                        </p>
                        
                        <p>For More Details:</p>

                        <a href={item.application_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="apply-btn">
                            Apply Now  
                        </a>

                    </div>

                ))
            }

        </div>

    )

}

export default ScholarshipResult;