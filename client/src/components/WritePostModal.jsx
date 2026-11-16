import { useState } from "react";
import { X, PenLine, Sparkles, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../services/api.js";

export const WritePostModal = ({ isOpen, onClose, onPostCreated }) => {
  const { token, user } = useAuth();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!title.trim()) {
      setErrorMessage("Please enter an essay title.");
      return;
    }

    if (!content.trim()) {
      setErrorMessage("Please write some content for your essay.");
      return;
    }

    setIsSubmitting(true);
    try {
      const tagsArray = tagsInput
        .split(",")
        .map((t) => t.trim().toLowerCase().replace(/^#/, ""))
        .filter((t) => t.length > 0);

      const created = await api.createPost(
        {
          title: title.trim(),
          content: content.trim(),
          excerpt: excerpt.trim(),
          tags: tagsArray,
        },
        token
      );

      // Reset form
      setTitle("");
      setExcerpt("");
      setContent("");
      setTagsInput("");
      onClose();

      if (onPostCreated) {
        onPostCreated(created);
      }
    } catch (err) {
      setErrorMessage(err.message || "Failed to publish article. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content write-modal-window"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="write-modal-header">
          <div>
            <span className="label-sm" style={{ color: "var(--tertiary)" }}>
              NEW DISPATCH &bull; BY {user?.name?.toUpperCase() || "AUTHOR"}
            </span>
            <h2 className="headline-sm" style={{ marginTop: "4px" }}>
              Draft an Editorial Essay
            </h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close draft"
          >
            <X size={18} />
          </button>
        </div>

        {errorMessage && (
          <div className="error-banner">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="write-form-body">
          <div className="form-field-group">
            <label className="label-md field-label">Title</label>
            <input
              type="text"
              placeholder="A clear, reflective title for your piece..."
              className="input-editorial"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-field-group">
            <label className="label-md field-label">
              Short Excerpt (Deck / Subtitle)
            </label>
            <input
              type="text"
              placeholder="One or two sentences summarizing the premise..."
              className="input-editorial"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>

          <div className="form-field-group">
            <label className="label-md field-label">
              Topics & Tags (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. literature, philosophy, digital-culture"
              className="input-editorial"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
            />
          </div>

          <div className="form-field-group">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
              <label className="label-md field-label" style={{ marginBottom: 0 }}>
                Essay Content (Markdown supported)
              </label>
              <span className="label-sm" style={{ color: "var(--outline)" }}>
                Supports # Heading, &gt; Pull quote, - Lists
              </span>
            </div>
            <textarea
              placeholder="Begin writing your reflections here...&#10;&#10;Use > for editorial pull quotes.&#10;Use ## for section titles."
              className="textarea-editorial writing-canvas"
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="write-modal-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel Draft
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              <PenLine size={16} />
              <span>{isSubmitting ? "Publishing..." : "Publish to Gazette"}</span>
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .write-modal-window {
          max-width: 700px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
        }

        .write-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1.5rem 1.75rem 1rem;
          border-bottom: 1px solid var(--border-hairline);
        }

        .modal-close-btn {
          background: transparent;
          border: none;
          color: var(--outline);
          cursor: pointer;
          padding: 4px;
          border-radius: 6px;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .modal-close-btn:hover {
          background: var(--surface-container-low);
          color: var(--on-surface);
        }

        .error-banner {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: var(--error-bg);
          color: var(--error-text);
          padding: 0.75rem 1.75rem;
          font-size: 13px;
          font-weight: 500;
        }

        .write-form-body {
          padding: 1.5rem 1.75rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-field-group {
          display: flex;
          flex-direction: column;
        }

        .field-label {
          color: var(--on-surface);
          margin-bottom: 0.4rem;
        }

        .writing-canvas {
          min-height: 220px;
          font-family: var(--font-sans);
          line-height: 1.7;
        }

        .write-modal-actions {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-hairline);
        }
      `}</style>
    </div>
  );
};
