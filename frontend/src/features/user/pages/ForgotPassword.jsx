import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

import logo from "../../../assets/new2.ico";
import "../components/ForgotPassword.css";
import api from "../../../shared/api/axiosInstance";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await api.post("/forgot-password", { email });
      toast.success(res.data.message || "Login link sent to your email.");
      setSent(true);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-page">
      {/* Header */}
      <header className="fp-header">
        <div className="fp-brand-box">
          <img src={logo} alt="logo" className="fp-logo" />
          <h1 className="fp-brand-title">Scholarship-Information-Portal</h1>
        </div>
      </header>

      {/* Main */}
      <main className="fp-main">
        <div className="fp-card">
          {!sent ? (
            <>
              {/* Icon */}
              <div className="fp-icon-wrap">
                <div className="fp-icon-circle">
                  <Mail size={30} color="#ffffff" />
                </div>
              </div>

              <h1>Forgot Password?</h1>
              <p className="fp-subtitle">
                Enter your registered email address and we&apos;ll send you a
                secure login link to reset your password.
              </p>

              <form className="fp-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  id="fp-email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
                <button
                  type="submit"
                  className="fp-submit-btn"
                  disabled={loading}
                >
                  {loading ? "Sending Link..." : "Send Login Link"}
                </button>
              </form>

              <Link to="/login" replace className="fp-back-link">
                <ArrowLeft size={16} />
                Back to Login
              </Link>
            </>
          ) : (
            /* Success state */
            <div className="fp-success">
              <div className="fp-success-icon">
                <div className="fp-success-circle">
                  <CheckCircle size={36} color="#ffffff" />
                </div>
              </div>

              <h2>Check your inbox!</h2>
              <p>
                A login link has been sent to{" "}
                <strong>{email}</strong>.<br />
                The link expires in <strong>15 minutes</strong> and can only be
                used once.
              </p>

              <p style={{ fontSize: "0.85rem", color: "#888" }}>
                Didn&apos;t receive it? Check your spam folder or{" "}
                <button
                  onClick={() => setSent(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#16247d",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    padding: 0,
                  }}
                >
                  try again
                </button>
                .
              </p>

              <Link to="/login" replace className="fp-back-link">
                <ArrowLeft size={16} />
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ForgotPassword;
