import { useLocation, useNavigate } from "react-router-dom";
import "./Scholarship.css";
import Admin from "./Admin.jsx"
function ScholarshipResult() {

    const location = useLocation();
    const navigate = useNavigate();

    let scholarships = [];

    if (location.state) {
        scholarships = location.state.scholarships;
    }

    const role = localStorage.getItem("role");

    return (

        <div className="scholarship-page">

            <h1>Eligible Scholarships</h1>

            {/* Admin Button */}
            {
                role === "admin" && (
                    <button
                        className="admin-btn"
                        onClick={() => navigate("/admin")}
                    >
                        Admin Panel
                    </button>
                )
            }

            <h3>{scholarships.length} Scholarships Found</h3>

            {
                scholarships.length === 0 ?

                    (
                        <div className="scholarship-box">

                            <h2>
                                No Scholarship Found
                                <br />
                                Eligibility Criteria Not Met:
                                <strong>
                                    <br />1) Minimum Percentage Required above 45%
                                    <br />2) Minimum Income Limit below 8 Lakh/per annum
                                </strong>
                            </h2>

                        </div>
                    )

                    :

                    scholarships.map((item, index) => (

                        <div
                            className="scholarship-card"
                            key={index}
                        >

                            <h2>{item.sclrname}</h2>

                            <div className="details">

                                <div className="row">
                                    <span className="label">Amount</span>
                                    <span className="value">
                                        ₹{item.amount}
                                    </span>
                                </div>

                                <div className="row">
                                    <span className="label">
                                        Required Percentage
                                    </span>
                                    <span className="value">
                                        {item.percentreeq}%
                                    </span>
                                </div>

                                <div className="row">
                                    <span className="label">
                                        Income Limit
                                    </span>
                                    <span className="value">
                                        ₹{item.miniincome}
                                    </span>
                                </div>

                                <div className="row">
                                    <span className="label">
                                        Deadline
                                    </span>
                                    <span className="value">
                                        {item.deadline}
                                    </span>
                                </div>

                                <div className="row">
                                    <span className="label">
                                        Status
                                    </span>
                                    <span className="value">
                                        {item.is_active
                                            ? "🟢 Available"
                                            : "🔴 Closed"}
                                    </span>
                                </div>

                                <div className="row">
                                    <span className="label">
                                        Days Left
                                    </span>
                                    <span className="value">
                                        {item.days_left}
                                    </span>
                                </div>

                            </div>

                            <p className="details-text">
                                For More Details:
                            </p>

                            {
                                item.is_active ?

                                    (
                                        <a
                                            href={item.application_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="apply-btn"
                                        >
                                            Apply Now
                                        </a>
                                    )

                                    :

                                    (
                                        <button
                                            className="closed-btn"
                                            disabled
                                        >
                                            Applications Closed
                                        </button>
                                    )
                            }

                        </div>

                    ))
            }

        </div>
    );
}

export default ScholarshipResult;