import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Login.css'

function Login() {
    const { login } = useAuth()
const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })

    // Remove error when user starts correcting the field
    setErrors({
      ...errors,
      [name]: '',
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Please enter your password'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }
const handleSubmit = async (e) => {
  e.preventDefault()

  if (!validateForm()) {
    return
  }

  try {
    const data = await login(
      formData.email,
      formData.password
    )

    console.log('Login successful:', data)

    alert(data.message)

    navigate('/subjects')

  } catch (error) {
    console.error('Login error:', error)

    setErrors({
      general: error.message,
    })
  }
}

  return (
    <div className="login-page">

      {/* Left Section */}
      <div className="login-info">

        <Link to="/" className="login-logo">
          E<span>Learning</span>
        </Link>

        <div className="login-info-content">
          <div className="login-icon">
            🎓
          </div>

          <h1>Welcome Back!</h1>

          <p>
            Continue your learning journey and access your
            subjects, chapters, and study materials.
          </p>

          <div className="login-benefits">
            <div>
              <span>✓</span>
              <p>Learn at your own pace</p>
            </div>

            <div>
              <span>✓</span>
              <p>Access organized study materials</p>
            </div>

            <div>
              <span>✓</span>
              <p>Study Science, Mathematics & English</p>
            </div>
          </div>
        </div>

      </div>

      {/* Right Section */}
      <div className="login-form-section">

        <div className="login-card">

          <div className="login-heading">
            <h2>Sign in</h2>

            <p>
              Enter your details to continue learning.
            </p>
          </div>

      <form onSubmit={handleSubmit}>

  {errors.general && (
    <div className="error-message">
      {errors.general}
    </div>
  )}

  {/* Email */}
  <div className="form-group">
              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'input-error' : ''}
              />

              {errors.email && (
                <small className="error-message">
                  {errors.email}
                </small>
              )}

            </div>

            {/* Password */}
            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="password-wrapper">

                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'input-error' : ''}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>

              </div>

              {errors.password && (
                <small className="error-message">
                  {errors.password}
                </small>
              )}

            </div>

            {/* Remember Me */}
            <div className="login-options">

              <label className="remember-me">

                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />

                <span>Remember me</span>

              </label>

              <button
                type="button"
                className="forgot-password"
                onClick={() =>
                  alert('Password reset will be implemented soon.')
                }
              >
                Forgot password?
              </button>

            </div>

            {/* Submit */}
            <button
              type="submit"
              className="login-button"
            >
              Sign In
            </button>

          </form>

          {/* Register */}
          <div className="register-link">

            <p>
              Don't have an account?
              {' '}

              <Link to="/register">
                Create an account
              </Link>
            </p>

          </div>

          {/* Home */}
          <Link to="/" className="back-home">
            ← Back to Home
          </Link>

        </div>

      </div>

    </div>
  )
}

export default Login