import { useState } from "react";
import { PenLine, LogIn, LogOut, User as UserIcon, BookOpen, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export const Navbar = ({ onOpenAuth, onOpenWrite, onNavigateHome }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="navbar-root">
      <div className="editorial-container">
        {/* Masthead Eyebrow */}
        <div className="masthead-bar">
          <span className="label-sm" style={{ color: "var(--tertiary)" }}>
            VOL. IV &bull; AN INDEPENDENT JOURNAL OF IDEAS &bull; WINTER 2026
          </span>
          <span className="label-sm" style={{ color: "var(--outline)" }}>
            READ FREELY &bull; PUBLISH THOUGHTFULLY
          </span>
        </div>

        {/* Main Navbar */}
        <div className="navbar-content">
          {/* Brand Logo */}
          <div className="brand-group" onClick={onNavigateHome} role="button" tabIndex={0}>
            <div className="brand-logo-icon">
              <BookOpen size={20} strokeWidth={2.2} />
            </div>
            <div>
              <span className="brand-title">BookBound</span>
              <span className="brand-subtitle">Editorial Gazette</span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="nav-links">
            <button className="nav-link-btn" onClick={onNavigateHome}>
              Current Issue
            </button>
            <a href="#topics" className="nav-link-btn">
              Topics
            </a>
            <a href="#about" className="nav-link-btn">
              About
            </a>
          </nav>

          {/* Right Action: EXACTLY ONE BUTTON (either Write Blog OR Sign In/Join) */}
          <div className="nav-action-zone">
            {isAuthenticated ? (
              <div className="authenticated-wrapper">
                {/* THE ONE PRIMARY ACTION BUTTON: WRITE BLOG */}
                <button
                  type="button"
                  className="btn-primary"
                  onClick={onOpenWrite}
                  aria-label="Write a new blog post"
                >
                  <PenLine size={16} strokeWidth={2} />
                  <span>Write Blog</span>
                </button>

                {/* Subtle author profile indicator & dropdown */}
                <div className="profile-menu-container">
                  <button
                    type="button"
                    className="profile-pill-trigger"
                    onClick={() => setShowProfileMenu((prev) => !prev)}
                    title={`Logged in as ${user?.name}`}
                  >
                    <span className="avatar-circle">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </span>
                    <span className="profile-name">{user?.name?.split(" ")[0]}</span>
                    <ChevronDown size={14} className="profile-caret" />
                  </button>

                  {showProfileMenu && (
                    <div className="profile-dropdown-menu">
                      <div className="dropdown-user-header">
                        <p className="title-md" style={{ fontSize: "14px", fontWeight: 600 }}>
                          {user?.name}
                        </p>
                        <p className="body-sm" style={{ color: "var(--outline)" }}>
                          {user?.email}
                        </p>
                      </div>
                      <hr className="editorial-divider" style={{ margin: "0.5rem 0" }} />
                      <button
                        type="button"
                        className="dropdown-item danger"
                        onClick={() => {
                          setShowProfileMenu(false);
                          logout();
                        }}
                      >
                        <LogOut size={14} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* THE ONE PRIMARY ACTION BUTTON: SIGN IN / LOGIN */
              <button
                type="button"
                className="btn-primary"
                onClick={onOpenAuth}
                aria-label="Sign in or create account"
              >
                <LogIn size={16} strokeWidth={2} />
                <span>Sign In / Join</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .navbar-root {
          background-color: #ffffff;
          border-bottom: 1px solid var(--border-hairline);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 1px 3px rgba(20, 22, 25, 0.02);
        }

        .masthead-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.4rem 0;
          border-bottom: 1px solid #f0f0f4;
          font-size: 11px;
        }

        @media (max-width: 640px) {
          .masthead-bar {
            display: none;
          }
        }

        .navbar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
        }

        .brand-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          user-select: none;
        }

        .brand-logo-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background-color: rgba(27, 138, 126, 0.1);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-title {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--on-surface);
          display: block;
        }

        .brand-subtitle {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--tertiary);
          display: block;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
        }

        .nav-link-btn {
          background: none;
          border: none;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 500;
          color: var(--on-surface-variant);
          text-decoration: none;
          cursor: pointer;
          transition: color 0.15s ease;
          padding: 0.25rem 0;
        }

        .nav-link-btn:hover {
          color: var(--primary);
        }

        .nav-action-zone {
          display: flex;
          align-items: center;
        }

        .authenticated-wrapper {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .profile-menu-container {
          position: relative;
        }

        .profile-pill-trigger {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--surface-container-low);
          border: 1px solid var(--border-hairline);
          padding: 4px 10px 4px 4px;
          border-radius: 9999px;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .profile-pill-trigger:hover {
          background: var(--surface-container);
        }

        .avatar-circle {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: var(--primary);
          color: #ffffff;
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--on-surface);
        }

        .profile-caret {
          color: var(--outline);
        }

        .profile-dropdown-menu {
          position: absolute;
          right: 0;
          top: calc(100% + 8px);
          width: 200px;
          background: #ffffff;
          border: 1px solid var(--border-hairline);
          border-radius: 10px;
          box-shadow: 0 10px 25px -4px rgba(20, 22, 25, 0.1);
          padding: 0.75rem;
          z-index: 200;
          animation: modalEnter 0.15s ease;
        }

        .dropdown-user-header {
          padding: 0.25rem 0.5rem;
        }

        .dropdown-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          border-radius: 6px;
          border: none;
          background: transparent;
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
          color: var(--on-surface);
          transition: background 0.15s ease;
        }

        .dropdown-item.danger {
          color: var(--error);
        }

        .dropdown-item.danger:hover {
          background-color: #ffdad6;
        }
      `}</style>
    </header>
  );
};

