import {useLocation} from "react-router-dom";

import "./Scholarship.css";

function ScholarshipResult(){

    const location=useLocation();

   let scholarships = [];

if (location.state) {
    scholarships = location.state.scholarships;
}
    const sortedScholarships = [...scholarships].sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline));
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
                         Eligibility Criteria Not Met :
                         1) Minimum Percentage Required above 45%
                         2) Minimum Income Limit below 5 Lakh
                        </h2>

                    </div>
                )

                :
                
                sortedScholarships.map((item,index)=>(
                    
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
                        
                        <p>
                           <strong>Deadline:</strong> {item.deadline}
                        </p>

                        <p>
                         <strong>Status:</strong>
                         {item.is_active ? " 🟢 Available" : " 🔴 Closed"}
                       </p>
                       
                        <p>For More Details:</p>

                       {
                        item.is_active ?

                        (
                          <a
                          href={item.application_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="apply-btn">
                              Apply Now
                          </a>
                        )

                         :

                        (
                            <button
                            className="closed-btn"
                            disabled>
                            Applications Closed
                            </button>
                        )
}

                    </div>

                ))
            }

        </div>

    )

}

export default ScholarshipResult;