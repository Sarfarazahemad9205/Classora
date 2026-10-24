import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Icon from "../components/Icon";
import AuthVisual from "../components/AuthVisual";
import "./Register.css";
import "./AuthPages.css";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Those passwords don’t match yet. Check them and try again.");
      return;
    }
    setIsSubmitting(true);
    try {
      const data = await register(formData.name, formData.email, formData.password);
      sessionStorage.setItem("activationToken", data.activationToken);
      sessionStorage.setItem("registrationEmail", formData.email);
      navigate("/verify");
    } catch (submitError) {
      setError(submitError.message || "We couldn’t create your account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="register-page auth-page">
      <div className="register-shape register-shape-one" aria-hidden="true" />
      <div className="register-shape register-shape-two" aria-hidden="true" />
      <section className="register-info auth-panel">
        <Link to="/" className="auth-logo register-logo"><span className="auth-logo-mark"><Icon name="openBook" size={18} /></span>Classora</Link>
        <div className="register-info-content auth-intro">
          <p className="auth-kicker">A GOOD PLACE TO BEGIN</p>
          <h1>Make room<br />for <em>what’s next.</em></h1>
          <p>Create your free learning account and keep your Class 10 subjects, chapters, and resources together.</p>
          <div className="learning-points auth-benefits">
            <div className="learning-point"><span className="point-icon"><Icon name="openBook" size={18} /></span><div><h3>Study with clarity</h3><p>Find resources organized around your subjects.</p></div></div>
            <div className="learning-point"><span className="point-icon"><Icon name="target" size={18} /></span><div><h3>Go at your pace</h3><p>Return to topics whenever you need a refresher.</p></div></div>
            <div className="learning-point"><span className="point-icon"><Icon name="sparkle" size={18} /></span><div><h3>Build your confidence</h3><p>Make steady progress, one lesson at a time.</p></div></div>
          </div>
        </div>
        <AuthVisual />
        <span className="auth-panel-caption">CLASSORA · LEARN WITH PURPOSE</span>
      </section>

      <section className="register-form-side auth-form-side">
        <div className="register-card auth-card">
          <div className="auth-mobile-brand"><Link to="/" className="auth-logo"><span className="auth-logo-mark"><Icon name="openBook" size={18} /></span>Classora</Link></div>
          <div className="register-header auth-heading">
            <p className="auth-kicker">GET STARTED</p>
            <h2>Create your account</h2>
            <p>It only takes a moment to set up your learning space.</p>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            {error && <div className="auth-message auth-message--error" role="alert">{error}</div>}
            <div className="form-group auth-field">
              <label htmlFor="register-name">Full name</label>
              <div className="input-wrapper"><span className="input-icon"><Icon name="cap" size={17} /></span><input type="text" id="register-name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} autoComplete="name" required /></div>
            </div>
            <div className="form-group auth-field">
              <label htmlFor="register-email">Email address</label>
              <div className="input-wrapper"><span className="input-icon"><Icon name="arrow" size={17} /></span><input type="email" id="register-email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} autoComplete="email" required /></div>
            </div>
            <div className="form-group auth-field">
              <label htmlFor="register-password">Password</label>
              <div className="input-wrapper"><span className="input-icon"><Icon name="lock" size={17} /></span><input type={showPassword ? "text" : "password"} id="register-password" name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} autoComplete="new-password" required /><button type="button" className="password-toggle auth-password-toggle" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? "Hide" : "Show"}</button></div>
            </div>
            <div className="form-group auth-field">
              <label htmlFor="register-confirm-password">Confirm password</label>
              <div className="input-wrapper"><span className="input-icon"><Icon name="lock" size={17} /></span><input type={showConfirmPassword ? "text" : "password"} id="register-confirm-password" name="confirmPassword" placeholder="Enter your password again" value={formData.confirmPassword} onChange={handleChange} autoComplete="new-password" required /><button type="button" className="password-toggle auth-password-toggle" onClick={() => setShowConfirmPassword((visible) => !visible)} aria-label={showConfirmPassword ? "Hide password" : "Show password"}>{showConfirmPassword ? "Hide" : "Show"}</button></div>
            </div>
            <button type="submit" className="register-submit auth-submit" disabled={isSubmitting}><span>{isSubmitting ? "Creating your account…" : "Create account"}</span><Icon name="arrow" size={17} /></button>
          </form>
          <div className="login-link auth-switch"><span>Already have an account?</span> <Link to="/login">Sign in <Icon name="arrow" size={14} /></Link></div>
          <Link to="/" className="back-home">← Back to home</Link>
        </div>
      </section>
    </main>
  );
}

export default Register;
