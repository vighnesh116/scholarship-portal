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
            <h3>{scholarships.length} Scholarships Found</h3>
            {
                scholarships.length===0 ?
                

                (
                    <div className="scholarship-box">
                        
                        <h2>
                            No Scholarship Found 
                         Eligibility Criteria Not Met :
                         <strong>
                        <br/> 1) Minimum Percentage Required above 45%.
                         <br/>2) Minimum Income Limit below 8 Lakh/per anum.
                        </strong>
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
                         <span className="label">Amount : </span>
                            ₹{item.amount}
                        </p>

                        <p>
                            <span className="label">Required Percentage</span>
                            {item.percentreeq}%
                        </p>

                        
                        <p>
                           <span className="label">Deadline:</span> {item.deadline}
                        </p>

                        <p>
                         <span className="label">Status:</span>
                         {item.is_active ? " 🟢 Available" : " 🔴 Closed"}
                       </p>

                       <p>
                         <span className="label">Days Left:</span>
                             {item.days_left}
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