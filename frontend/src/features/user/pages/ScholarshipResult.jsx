import { useLocation, useNavigate } from "react-router-dom";
import "../components/Scholarship.css";
import logo from "../../../assets/new2.ico";
import { confirmAction } from "../../../shared/components/ConfirmAction";

function ScholarshipResult() {
  const location = useLocation();
  const navigate = useNavigate();

  let scholarships = [];

  if (location.state) {
    scholarships = location.state.scholarships;
  }
  console.log(scholarships);

  const handleDirect = async (e, link) => {
    e.preventDefault();

    const confirmed = await confirmAction({
      title: "Alert",
      text: "You will be redirected to another website.",
    });

    if (confirmed) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  const activeScholarships = scholarships.filter(item => item.days_left > 0 && item.draft === 0);
  const inactiveScholarships = scholarships.filter(item => item.days_left <= 0 || item.draft !== 0);
  return (
    <div className="scholarship-page">
      <img src={logo} alt="Scholarship Portal Logo" className="logo" />
      <h1>Eligible Scholarships</h1>

      <h3>{scholarships.length} Scholarships Found</h3>

      {scholarships.length === 0 ? (
        <div className="scholarship-box">
          <h2>
            No Scholarship Found
            <br />
            Eligibility Criteria Not Met:
            <strong>
              <br />
              1) Minimum Percentage Required above 45%
              <br />
              2) Minimum Income Limit below 8 Lakh/per annum
            </strong>
          </h2>
        </div>
      ) : (
        <>
          <div className="scholarships-grid">
            {activeScholarships.map((item) => (
              <div className="scholarship-card" key={item.sclrid}>
                <h2>{item.sclrname}</h2>

                <div className="details">
                  <div className="row">
                    <span className="label">Amount</span>
                    <span className="value">₹{item.amount}</span>
                  </div>

                  <div className="row">
                    <span className="label">Required Percentage</span>
                    <span className="value">{item.percentreeq}%</span>
                  </div>

                  <div className="row">
                    <span className="label">Income Limit</span>
                    <span className="value">₹{item.miniincome}</span>
                  </div>

                  <div className="row">
                    <span className="label">Deadline</span>
                    <span className="value">{item.deadline}</span>
                  </div>

                  <div className="row">
                    <span className="label">Status</span>
                    <span className="value">🟢 Available</span>
                  </div>

                  <div className="row">
                    <span className="label">Days Left</span>
                    <span className="value">{item.days_left}</span>
                  </div>
                </div>

                <p className="details-text">Application Link:</p>

                <a
                  href={item.application_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apply-btn"
                  onClick={(e) => handleDirect(e, item.application_link)}
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>

          {inactiveScholarships.length > 0 && (
            <div className="Unavailable-Sclr">
              <h2>Applications Closed</h2>

              <ol>
                {inactiveScholarships.map((item) => (
                  <ul key={item.sclrid}>
                    <strong>{item.sclrname}</strong> (Deadline: {item.deadline})
                  </ul>
                ))}
              </ol>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ScholarshipResult;
