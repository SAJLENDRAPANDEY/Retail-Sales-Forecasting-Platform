import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Inter:wght@300;400;500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .register-root {
    min-height: 100vh;
    background-color: #F5F0E8;
    display: flex;
    align-items: stretch;
  }

  /* Left decorative panel */
  .register-left {
    width: 42%;
    background-color: #2C2A25;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 52px 48px;
    position: relative;
    overflow: hidden;
  }

  .register-left::before {
    content: '';
    position: absolute;
    top: -80px;
    right: -80px;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    border: 1px solid rgba(245, 240, 232, 0.08);
  }

  .register-left::after {
    content: '';
    position: absolute;
    bottom: 60px;
    left: -60px;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    border: 1px solid rgba(245, 240, 232, 0.06);
  }

  .brand-mark {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .brand-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #C8A96E;
  }

  .brand-name {
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    font-size: 13px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #F5F0E8;
  }

  .left-content {
    position: relative;
    z-index: 1;
  }

  .left-steps {
    margin-bottom: 36px;
  }

  .step-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 28px;
  }

  .step-number {
    font-family: 'Playfair Display', serif;
    font-size: 13px;
    color: #C8A96E;
    margin-top: 2px;
    min-width: 18px;
  }

  .step-text {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: rgba(245, 240, 232, 0.6);
    line-height: 1.6;
  }

  .step-text strong {
    display: block;
    color: rgba(245, 240, 232, 0.9);
    font-weight: 400;
    margin-bottom: 2px;
  }

  .left-heading {
    font-family: 'Playfair Display', serif;
    font-size: 36px;
    font-weight: 400;
    line-height: 1.25;
    color: #F5F0E8;
    margin-bottom: 32px;
  }

  .left-heading em {
    font-style: italic;
    color: #C8A96E;
  }

  .left-footer {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: rgba(245, 240, 232, 0.25);
    letter-spacing: 0.08em;
  }

  /* Right form panel */
  .register-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 40px;
  }

  .register-card {
    width: 100%;
    max-width: 400px;
  }

  .form-eyebrow {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #C8A96E;
    margin-bottom: 12px;
  }

  .form-title {
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    font-weight: 400;
    color: #2C2A25;
    margin-bottom: 8px;
  }

  .form-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 300;
    color: #7A7468;
    margin-bottom: 36px;
    line-height: 1.5;
  }

  .field-group {
    margin-bottom: 20px;
  }

  .field-label {
    display: block;
    font-family: 'Inter', sans-serif;
    font-size: 11.5px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #4A4640;
    margin-bottom: 8px;
  }

  .field-input {
    width: 100%;
    padding: 13px 16px;
    background-color: #EDE8DE;
    border: 1px solid transparent;
    border-radius: 6px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: #2C2A25;
    outline: none;
    transition: border-color 0.2s ease, background-color 0.2s ease;
  }

  .field-input::placeholder {
    color: #AEA89E;
    font-weight: 300;
  }

  .field-input:focus {
    border-color: #C8A96E;
    background-color: #E8E2D6;
  }

  .field-hint {
    margin-top: 6px;
    font-family: 'Inter', sans-serif;
    font-size: 11.5px;
    color: #AEA89E;
    font-weight: 300;
  }

  .submit-btn {
    width: 100%;
    padding: 14px;
    margin-top: 8px;
    background-color: #2C2A25;
    color: #F5F0E8;
    border: none;
    border-radius: 6px;
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;
  }

  .submit-btn:hover {
    background-color: #3D3A33;
  }

  .submit-btn:active {
    transform: scale(0.995);
  }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .terms-note {
    margin-top: 14px;
    font-family: 'Inter', sans-serif;
    font-size: 11.5px;
    font-weight: 300;
    color: #AEA89E;
    text-align: center;
    line-height: 1.6;
  }

  .terms-note a {
    color: #7A7468;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 28px 0;
  }

  .divider-line {
    flex: 1;
    height: 1px;
    background-color: #D8D2C6;
  }

  .divider-text {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: #AEA89E;
    letter-spacing: 0.06em;
  }

  .login-prompt {
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: #7A7468;
  }

  .login-prompt a {
    color: #2C2A25;
    font-weight: 500;
    text-decoration: none;
    border-bottom: 1px solid #C8A96E;
    padding-bottom: 1px;
    transition: color 0.2s;
  }

  .login-prompt a:hover {
    color: #C8A96E;
  }

  .error-msg {
    font-family: 'Inter', sans-serif;
    font-size: 12.5px;
    color: #B85C4A;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .success-msg {
    font-family: 'Inter', sans-serif;
    font-size: 12.5px;
    color: #5A8A6A;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  @media (max-width: 720px) {
    .register-left {
      display: none;
    }
    .register-right {
      padding: 40px 24px;
    }
  }
`;

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("All fields are required to create your account.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/register", { name, email, password });

      if (response.data.success) {
        setSuccess("Account created! Redirecting to sign in…");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(response.data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleRegister();
  };

  return (
    <>
      <style>{styles}</style>
      <div className="register-root">

        {/* Left Panel */}
        <div className="register-left">
          <div className="brand-mark">
            <div className="brand-dot" />
            <span className="brand-name">Retail-Sales-Forecasting-Platform</span>
          </div>

          <div className="left-content">
            <h2 className="left-heading">
              Set up in<br /><em>under a minute.</em>
            </h2>

            <div className="left-steps">
              <div className="step-item">
                <span className="step-number">01</span>
                <div className="step-text">
                  <strong>Create your account</strong>
                  Fill in your name, email, and a secure password.
                </div>
              </div>
              <div className="step-item">
                <span className="step-number">02</span>
                <div className="step-text">
                  <strong>Sign in instantly</strong>
                  No email verification delays — access your dashboard right away.
                </div>
              </div>
              <div className="step-item">
                <span className="step-number">03</span>
                <div className="step-text">
                  <strong>Start where it matters</strong>
                  Your workspace is ready the moment you land.
                </div>
              </div>
            </div>
          </div>

          <p className="left-footer">© 2025 YourBrand. All rights reserved.</p>
        </div>

        {/* Right Form Panel */}
        <div className="register-right">
          <div className="register-card">
            <p className="form-eyebrow">Get started</p>
            <h1 className="form-title">Create account</h1>
            <p className="form-subtitle">
              Free to join. No card required.
            </p>

            {error && (
              <p className="error-msg"><span>⚠</span> {error}</p>
            )}
            {success && (
              <p className="success-msg"><span>✓</span> {success}</p>
            )}

            <div className="field-group">
              <label className="field-label" htmlFor="name">Full name</label>
              <input
                id="name"
                className="field-input"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="name"
              />
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="email">Email address</label>
              <input
                id="email"
                className="field-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="email"
              />
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="password">Password</label>
              <input
                id="password"
                className="field-input"
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="new-password"
              />
              <p className="field-hint">Use a mix of letters, numbers, and symbols.</p>
            </div>

            <button
              className="submit-btn"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? "Creating account…" : "Create account"}
            </button>

            <p className="terms-note">
              By registering, you agree to our{" "}
              <a href="/terms">Terms of Service</a> and{" "}
              <a href="/privacy">Privacy Policy</a>.
            </p>

            <div className="divider">
              <div className="divider-line" />
              <span className="divider-text">or</span>
              <div className="divider-line" />
            </div>

            <p className="login-prompt">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>

      </div>
    </>
  );
}

export default Register;