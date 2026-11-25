import { useState } from "react";
import { X, LogIn, UserPlus, AlertCircle, BookOpen } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export const AuthModal = ({ isOpen, onClose, defaultMode = "login", onSuccess }) => {
  const { login, register, loading } = useAuth();
  const [mode, setMode] = useState(defaultMode); // 'login' or 'register'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    if (mode === "register" && !name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    try {
      if (mode === "login") {
        await login(email.trim(), password);
      } else {
        await register(name.trim(), email.trim(), password);
      }
      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      setErrorMessage(err.message || "Authentication failed. Please verify details.");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content auth-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="auth-header">
          <div className="auth-brand-badge">
            <BookOpen size={16} strokeWidth={2.2} />
            <span className="label-sm" style={{ color: "var(--primary)" }}>
              BOOKBOUND GAZETTE
            </span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Title */}
        <div className="auth-title-section">
          <h2 className="headline-md">
            {mode === "login" ? "Welcome Back to the Reading Desk" : "Join Our Community of Authors"}
          </h2>
          <p className="body-sm" style={{ color: "var(--on-surface-variant)", marginTop: "4px" }}>
            {mode === "login"
              ? "Sign in to draft and publish your personal essays."
              : "Create an author account to participate in our open literary journal."}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${mode === "login" ? "active" : ""}`}
            onClick={() => {
              setMode("login");
              setErrorMessage("");
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${mode === "register" ? "active" : ""}`}
            onClick={() => {
              setMode("register");
              setErrorMessage("");
            }}
          >
            Create Account
          </button>
        </div>

        {errorMessage && (
          <div className="auth-error-banner">
            <AlertCircle size={15} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {mode === "register" && (
            <div className="form-group">
              <label className="label-md field-label">Your Name</label>
              <input
                type="text"
                placeholder="e.g. Virginia Woolf"
                className="input-editorial"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="label-md field-label">Email Address</label>
            <input
              type="email"
              placeholder="reader@editorial.org"
              className="input-editorial"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="label-md field-label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="input-editorial"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="btn-primary auth-submit-btn"
            disabled={loading}
          >
            {mode === "login" ? <LogIn size={16} /> : <UserPlus size={16} />}
            <span>
              {loading
                ? "Connecting..."
                : mode === "login"
                ? "Sign In to Journal"
                : "Register Account"}
            </span>
          </button>
        </form>

        {/* Footnote */}
        <div className="auth-footer-note">
          <p className="label-sm" style={{ color: "var(--outline)", textAlign: "center" }}>
            PUBLIC ACCESS REMAINS PERMANENTLY OPEN & FREE FOR ALL READERS
          </p>
        </div>
      </div>

      <style>{`
        .auth-modal-box {
          max-width: 440px;
        }

        .auth-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem 0.5rem;
        }

        .auth-brand-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--primary);
        }

        .auth-title-section {
          padding: 0.5rem 1.5rem 1rem;
        }

        .auth-tabs {
          display: flex;
          padding: 0 1.5rem;
          border-bottom: 1px solid var(--border-hairline);
        }

        .auth-tab-btn {
          flex: 1;
          padding: 0.75rem 0;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 600;
          color: var(--outline);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .auth-tab-btn:hover {
          color: var(--on-surface);
        }

        .auth-tab-btn.active {
          color: var(--primary);
          border-bottom-color: var(--primary);
        }

        .auth-error-banner {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: var(--error-bg);
          color: var(--error-text);
          padding: 0.65rem 1.5rem;
          font-size: 13px;
        }

        .auth-form {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .auth-submit-btn {
          width: 100%;
          height: 44px;
          margin-top: 0.5rem;
        }

        .auth-footer-note {
          padding: 0.75rem 1.5rem 1.25rem;
          background: var(--surface-container-low);
          border-top: 1px solid var(--border-hairline);
        }
      `}</style>
    </div>
  );
};

