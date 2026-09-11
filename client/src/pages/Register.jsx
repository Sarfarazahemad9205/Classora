import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Register.css";


function Register() {
  const { register } = useAuth();
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const data = await register(
      formData.name,
      formData.email,
      formData.password
    );

    console.log("Registration successful:", data);

    sessionStorage.setItem(
      "activationToken",
      data.activationToken
    );

    sessionStorage.setItem(
      "registrationEmail",
      formData.email
    );

    alert(data.message);

    navigate("/verify");

  } catch (error) {
    console.error("Registration error:", error);
    alert(error.message);
  }
};

  return (
    <div className="register-page">

      {/* Decorative background elements */}
      <div className="register-shape register-shape-one"></div>
      <div className="register-shape register-shape-two"></div>

      <div className="register-container">

        {/* Left Section */}
        <div className="register-info">

          <div className="info-badge">
            📚 Class 10 E-Learning
          </div>

          <h1>
            Start Your
            <span> Learning Journey</span>
          </h1>

          <p>
            Create your account and get access to your
            Class 10 learning materials, chapters and subjects
            in one place.
          </p>

          <div className="learning-points">

            <div className="learning-point">
              <div className="point-icon">📖</div>
              <div>
                <h3>Study Smarter</h3>
                <p>Access organized study materials easily.</p>
              </div>
            </div>

            <div className="learning-point">
              <div className="point-icon">🎯</div>
              <div>
                <h3>Stay Focused</h3>
                <p>Learn at your own pace and stay on track.</p>
              </div>
            </div>

            <div className="learning-point">
              <div className="point-icon">🚀</div>
              <div>
                <h3>Achieve Your Goals</h3>
                <p>Build strong concepts for your Class 10 exams.</p>
              </div>
            </div>

          </div>

        </div>

        {/* Registration Card */}
        <div className="register-card">

          <div className="register-header">
            <div className="register-icon">
              ✨
            </div>

            <h2>Create Account</h2>

            <p>
              Join us and start learning today
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="name">
                Full Name
              </label>

              <div className="input-wrapper">
                <span className="input-icon">👤</span>

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">
                Email Address
              </label>

              <div className="input-wrapper">
                <span className="input-icon">✉️</span>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <div className="input-wrapper">
                <span className="input-icon">🔒</span>

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <div className="input-wrapper">
                <span className="input-icon">🔐</span>

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="register-submit"
            >
              <span>Create My Account</span>
              <span className="button-arrow">→</span>
            </button>

          </form>

          {/* Login */}
          <div className="login-link">
            <span>Already have an account?</span>{" "}
            <Link to="/login">
              Login
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Register;