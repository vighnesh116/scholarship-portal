import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2, XCircle, ArrowLeft } from "lucide-react";

import logo from "../../../assets/new2.ico";
import api from "../../../shared/api/axiosInstance";
import "../components/ForgotPassword.css";

function MagicLogin() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading"); // "loading" | "error"
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setErrorMsg("No login token found in the URL.");
      setStatus("error");
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await api.get(`/magic-login?token=${token}`);

        if (res.data.success) {
          // Store auth data exactly like normal login
          localStorage.setItem("user", res.data.name);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("refresh_token", res.data.refresh_token);
          localStorage.setItem("role", res.data.role);

          toast.success("Logged in! Please set your new password.");
          navigate("/update-password", { replace: true });
        } else {
          setErrorMsg(res.data.message || "This link is invalid or expired.");
          setStatus("error");
        }
      } catch (error) {
        const msg =
          error?.response?.data?.message ||
          "This link is invalid or has expired.";
        setErrorMsg(msg);
        setStatus("error");
      }
    };

    verifyToken();
  }, [searchParams, navigate]);

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
        <div className="fp-card" style={{ textAlign: "center" }}>
          {status === "loading" && (
            <>
              <div className="fp-icon-wrap">
                <div className="fp-icon-circle" style={{ animation: "fp-spin 1s linear infinite" }}>
                  <Loader2 size={30} color="#ffffff" />
                </div>
              </div>
              <h1 style={{ fontSize: "1.5rem" }}>Verifying your link…</h1>
              <p className="fp-subtitle">Please wait while we log you in securely.</p>
            </>
          )}

          {status === "error" && (
            <>
              <div className="fp-icon-wrap">
                <div
                  className="fp-icon-circle"
                  style={{ background: "linear-gradient(135deg, #dc2626 0%, #f87171 100%)" }}
                >
                  <XCircle size={30} color="#ffffff" />
                </div>
              </div>
              <h1 style={{ fontSize: "1.5rem", color: "#dc2626" }}>Link Invalid</h1>
              <p className="fp-subtitle">{errorMsg}</p>

              <Link to="/forgot-password" replace className="fp-submit-btn" style={{ display: "block", textDecoration: "none", textAlign: "center", marginBottom: "12px" }}>
                Request a New Link
              </Link>

              <Link to="/login" replace className="fp-back-link">
                <ArrowLeft size={16} />
                Back to Login
              </Link>
            </>
          )}
        </div>
      </main>

      <style>{`
        @keyframes fp-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default MagicLogin;
