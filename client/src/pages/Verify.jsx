import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Verify.css";

function Verify() {
  const [otp, setOtp] = useState("");

  const { verifyUser } = useAuth();
  const navigate = useNavigate();

  const activationToken = sessionStorage.getItem("activationToken");
  const email = sessionStorage.getItem("registrationEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert("Please enter a 6-digit OTP");
      return;
    }

    if (!activationToken) {
      alert("Activation session expired. Please register again.");
      navigate("/register");
      return;
    }

    try {
      const data = await verifyUser(otp, activationToken);

      alert(data.message);

      sessionStorage.removeItem("activationToken");
      sessionStorage.removeItem("registrationEmail");

      navigate("/login");
    } catch (error) {
      console.error("OTP verification error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-card">

        <div className="verify-icon">✉️</div>

        <h1>Verify Your Email</h1>

        <p>Enter the 6-digit OTP sent to</p>

        <p className="verify-email">{email}</p>

        <form onSubmit={handleSubmit}>
          <div className="verify-form-group">
            <label htmlFor="otp">Enter OTP</label>

            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => {
                const value = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 6);

                setOtp(value);
              }}
              placeholder="Enter 6-digit OTP"
              maxLength="6"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
            />
          </div>

          <button type="submit" className="verify-button">
            Verify Account
          </button>
        </form>

        <p className="verify-note">
          OTP is valid for 5 minutes.
        </p>

      </div>
    </div>
  );
}

export default Verify;