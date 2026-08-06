
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="error-content">
        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          Sorry, the page you are looking for doesn't exist
          or may have been moved.
        </p>

        <button onClick={() => navigate("/")}>
          Go Back Home
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
