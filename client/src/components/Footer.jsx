import { BookOpen, Feather, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="footer-root" id="about">
      <div className="editorial-container">
        {/* Top Colophon Line */}
        <div className="footer-colophon-grid">
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <BookOpen size={22} className="footer-brand-icon" />
              <span className="brand-title" style={{ fontSize: "20px" }}>BookBound</span>
            </div>
            <p className="body-sm footer-deck-text">
              An independent literary gazette and community publishing space. Dedicated to deep inquiry, slow curation, and intellectual vitality.
            </p>
            <span className="label-sm" style={{ color: "var(--tertiary)", marginTop: "0.75rem", display: "inline-block" }}>
              ARCHIVAL EDITION &bull; ISSN 2994-0192
            </span>
          </div>

          <div className="footer-nav-col">
            <span className="label-md footer-heading">EDITORIAL SECTIONS</span>
            <ul className="footer-list">
              <li><a href="#topics" className="footer-link">Essays & Inquiries</a></li>
              <li><a href="#topics" className="footer-link">Literary Criticism</a></li>
              <li><a href="#topics" className="footer-link">Philosophy of Tech</a></li>
              <li><a href="#topics" className="footer-link">Cultural Dispatch</a></li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <span className="label-md footer-heading">COMMUNITY PRINCIPLES</span>
            <ul className="footer-list">
              <li className="footer-static-item">Open Public Access</li>
              <li className="footer-static-item">Reader-First Typography</li>
              <li className="footer-static-item">Anti-Sterile Editorial Craft</li>
              <li className="footer-static-item">Tactile Digital Reading</li>
            </ul>
          </div>
        </div>

        <hr className="editorial-divider" style={{ margin: "2rem 0 1.5rem" }} />

        {/* Bottom Credits */}
        <div className="footer-bottom-row">
          <span className="label-sm" style={{ color: "var(--outline)" }}>
            &copy; {new Date().getFullYear()} BookBound Gazette. Crafted with reverence for literature & typography.
          </span>
          <span className="label-sm" style={{ color: "var(--tertiary)" }}>
            READ FREELY &bull; PUBLISH THOUGHTFULLY
          </span>
        </div>
      </div>

      <style>{`
        .footer-root {
          background-color: #ffffff;
          border-top: 1px solid var(--border-hairline);
          padding: 3.5rem 0 2.5rem;
          margin-top: 4rem;
        }

        .footer-colophon-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 2.5rem;
        }

        @media (max-width: 768px) {
          .footer-colophon-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .footer-brand-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .footer-brand-icon {
          color: var(--primary);
        }

        .footer-deck-text {
          color: var(--on-surface-variant);
          max-width: 380px;
          line-height: 1.6;
        }

        .footer-heading {
          color: var(--on-surface);
          display: block;
          margin-bottom: 1rem;
        }

        .footer-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .footer-link {
          font-size: 13px;
          color: var(--outline);
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .footer-link:hover {
          color: var(--primary);
        }

        .footer-static-item {
          font-size: 13px;
          color: var(--outline);
        }

        .footer-bottom-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
      `}</style>
    </footer>
  );
};
