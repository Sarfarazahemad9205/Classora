import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Icon from "../components/Icon";
import AuthVisual from "../components/AuthVisual";
import "./Login.css";
import "./AuthPages.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    setErrors((current) => ({ ...current, [name]: "", general: "" }));
    setNotice("");
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.email.trim()) nextErrors.email = "Enter the email address for your account.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) nextErrors.email = "Enter a valid email address.";
    if (!formData.password) nextErrors.password = "Enter your password to continue.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setNotice("");
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await login(formData.email, formData.password);
      navigate("/subjects");
    } catch (error) {
      setErrors((current) => ({ ...current, general: error.message || "We couldn’t sign you in. Please try again." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-page auth-page">
      <section className="login-info auth-panel">
        <Link to="/" className="login-logo auth-logo"><span className="auth-logo-mark"><Icon name="openBook" size={18} /></span>Classora</Link>
        <div className="login-info-content auth-intro">
          <div className="login-icon"><Icon name="cap" size={30} /></div>
          <p className="auth-kicker">YOUR LEARNING SPACE</p>
          <h1>Welcome<br />back.</h1>
          <p>Pick up where you left off. Your subjects, chapters, and study materials are ready when you are.</p>
          <div className="login-benefits auth-benefits">
            <div><span><Icon name="target" size={14} /></span><p>Learn at your own pace</p></div>
            <div><span><Icon name="openBook" size={14} /></span><p>Keep your study materials organized</p></div>
            <div><span><Icon name="sparkle" size={14} /></span><p>Build confidence, one chapter at a time</p></div>
          </div>
        </div>
        <AuthVisual />
        <span className="auth-panel-caption">CLASSORA · LEARN WITH PURPOSE</span>
      </section>

      <section className="login-form-section auth-form-side">
        <div className="login-card auth-card">
          <div className="auth-mobile-brand"><Link to="/" className="auth-logo"><span className="auth-logo-mark"><Icon name="openBook" size={18} /></span>Classora</Link></div>
          <div className="login-heading auth-heading">
            <p className="auth-kicker">WELCOME BACK</p>
            <h2>Sign in</h2>
            <p>Enter your details to continue learning.</p>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            {errors.general && <div className="auth-message auth-message--error" role="alert">{errors.general}</div>}
            {notice && <div className="auth-message" role="status">{notice}</div>}
            <div className="form-group auth-field">
              <label htmlFor="login-email">Email address</label>
              <input id="login-email" type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "login-email-error" : undefined} />
              {errors.email && <small className="error-message" id="login-email-error">{errors.email}</small>}
            </div>
            <div className="form-group auth-field">
              <label htmlFor="login-password">Password</label>
              <div className="password-wrapper">
                <input id="login-password" type={showPassword ? "text" : "password"} name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} autoComplete="current-password" aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? "login-password-error" : undefined} />
                <button type="button" className="password-toggle auth-password-toggle" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? "Hide" : "Show"}</button>
              </div>
              {errors.password && <small className="error-message" id="login-password-error">{errors.password}</small>}
            </div>
            <div className="login-options auth-options">
              <label className="remember-me"><input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} /><span>Remember me</span></label>
              <button type="button" className="forgot-password" onClick={() => setNotice("Password reset isn’t available yet. Please contact your administrator for help.")}>Need help?</button>
            </div>
            <button type="submit" className="login-button auth-submit" disabled={isSubmitting}><span>{isSubmitting ? "Signing you in…" : "Sign in"}</span><Icon name="arrow" size={17} /></button>
          </form>
          <div className="register-link auth-switch"><p>New to Classora? <Link to="/register">Create your account <Icon name="arrow" size={14} /></Link></p></div>
          <Link to="/" className="back-home">← Back to home</Link>
        </div>
      </section>
    </main>
  );
}

export default Login;
