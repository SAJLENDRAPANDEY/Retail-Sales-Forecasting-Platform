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

  .login-root {
    min-height: 100vh;
    background-color: #F5F0E8;
    display: flex;
    align-items: stretch;
  }

  /* Left decorative panel */
  .login-left {
    width: 42%;
    background-color: #2C2A25;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 52px 48px;
    position: relative;
    overflow: hidden;
  }

  .login-left::before {
    content: '';
    position: absolute;
    top: -80px;
    right: -80px;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    border: 1px solid rgba(245, 240, 232, 0.08);
  }

  .login-left::after {
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

  .left-heading {
    font-family: 'Playfair Display', serif;
    font-size: 38px;
    font-weight: 400;
    line-height: 1.25;
    color: #F5F0E8;
    margin-bottom: 20px;
  }

  .left-heading em {
    font-style: italic;
    color: #C8A96E;
  }

  .left-subtext {
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 300;
    color: rgba(245, 240, 232, 0.55);
    line-height: 1.7;
    max-width: 280px;
  }

  .left-footer {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: rgba(245, 240, 232, 0.25);
    letter-spacing: 0.08em;
  }

  /* Right form panel */
  .login-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 40px;
  }

  .login-card {
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
    margin-bottom: 40px;
    line-height: 1.5;
  }

  .field-group {
    margin-bottom: 22px;
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

  .forgot-link {
    display: block;
    text-align: right;
    margin-top: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: #9A9288;
    text-decoration: none;
    transition: color 0.2s;
  }

  .forgot-link:hover {
    color: #C8A96E;
  }

  .submit-btn {
    width: 100%;
    padding: 14px;
    margin-top: 10px;
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

  .register-prompt {
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: #7A7468;
  }

  .register-prompt a {
    color: #2C2A25;
    font-weight: 500;
    text-decoration: none;
    border-bottom: 1px solid #C8A96E;
    padding-bottom: 1px;
    transition: color 0.2s;
  }

  .register-prompt a:hover {
    color: #C8A96E;
  }

  /* Error message */
  .error-msg {
    font-family: 'Inter', sans-serif;
    font-size: 12.5px;
    color: #B85C4A;
    margin-top: 6px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  /* Responsive */
  @media (max-width: 720px) {
    .login-left {
      display: none;
    }
    .login-right {
      padding: 40px 24px;
    }
  }
`;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Both fields are required to continue.");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/login", { email, password });

      if (response.data.success) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", response.data.user_id);
        localStorage.setItem("userName", response.data.name);
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Incorrect credentials. Please try again.");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-root">

        {/* Left Panel */}
        <div className="login-left">
          <div className="brand-mark">
            <div className="brand-dot" />
            <span className="brand-name">Retail-Sales-Forecasting-Platform</span>
          </div>

          <div className="left-content">
            <h2 className="left-heading">
              A workspace built<br />for <em>serious</em> work.
            </h2>
            <p className="left-subtext">
              Everything you need, nothing you don't. Sign in to pick up right where you left off.
            </p>
          </div>

          <p className="left-footer">© 2026 Retail-Sales-Forecasting-Platform. All rights reserved.</p>
        </div>

        {/* Right Form Panel */}
        <div className="login-right">
          <div className="login-card">
            <p className="form-eyebrow">Welcome back</p>
            <h1 className="form-title">Sign in</h1>
            <p className="form-subtitle">
              Enter your credentials to access your account.
            </p>

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
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="current-password"
              />
              <a href="/forgot-password" className="forgot-link">Forgot password?</a>
            </div>

            {error && (
              <p className="error-msg">
                <span>⚠</span> {error}
              </p>
            )}

            <button
              className="submit-btn"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>

            <div className="divider">
              <div className="divider-line" />
              <span className="divider-text">or</span>
              <div className="divider-line" />
            </div>

            <p className="register-prompt">
              New here? <Link to="/register">Create an account</Link>
            </p>
          </div>
        </div>

      </div>
    </>
  );
}

export default Login;