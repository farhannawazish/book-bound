import { ArrowLeft, Clock, Calendar, Share2, Bookmark, User, Tag } from "lucide-react";

export const PostDetail = ({ post, onBack, onSelectTag }) => {
  if (!post) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "Recent Dispatch";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateReadTime = (content) => {
    if (!content) return "3 min read";
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 180));
    return `${minutes} min read`;
  };

  // Simple, clean Markdown renderer without bulky dependencies
  const renderFormattedContent = (text) => {
    if (!text) return null;

    const lines = text.split("\n");
    const elements = [];
    let inList = false;
    let listItems = [];

    const flushList = () => {
      if (inList && listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="article-unordered-list">
            {listItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Heading 1
      if (trimmed.startsWith("# ")) {
        flushList();
        elements.push(
          <h1 key={index} className="display-lg article-inner-h1">
            {trimmed.replace("# ", "")}
          </h1>
        );
      }
      // Heading 2
      else if (trimmed.startsWith("## ")) {
        flushList();
        elements.push(
          <h2 key={index} className="headline-lg article-inner-h2">
            {trimmed.replace("## ", "")}
          </h2>
        );
      }
      // Heading 3
      else if (trimmed.startsWith("### ")) {
        flushList();
        elements.push(
          <h3 key={index} className="headline-md article-inner-h3">
            {trimmed.replace("### ", "")}
          </h3>
        );
      }
      // Blockquote / Pull Quote (as defined in ui.md)
      else if (trimmed.startsWith("> ")) {
        flushList();
        elements.push(
          <blockquote key={index} className="pull-quote">
            "{trimmed.replace("> ", "")}"
          </blockquote>
        );
      }
      // Bullet list items
      else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        inList = true;
        listItems.push(trimmed.replace(/^[-*]\s+/, ""));
      }
      // Empty line / paragraph break
      else if (trimmed === "") {
        flushList();
      }
      // Regular paragraph
      else {
        flushList();
        elements.push(
          <p key={index} className="body-lg article-paragraph">
            {line}
          </p>
        );
      }
    });

    flushList();
    return elements;
  };

  return (
    <article className="post-detail-view">
      <div className="reading-container">
        {/* Back Button */}
        <div className="detail-top-nav">
          <button type="button" className="btn-ghost" onClick={onBack}>
            <ArrowLeft size={16} />
            <span>Back to Journal</span>
          </button>

          <span className="label-sm" style={{ color: "var(--tertiary)" }}>
            BOOKBOUND ARCHIVE
          </span>
        </div>

        {/* Article Header */}
        <header className="article-header">
          {post.tags && post.tags.length > 0 && (
            <div className="article-tag-pills">
              {post.tags.map((tag, i) => (
                <button
                  key={i}
                  type="button"
                  className="tag-pill"
                  onClick={() => onSelectTag && onSelectTag(tag)}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}

          <h1 className="display-lg article-main-title">{post.title}</h1>

          {post.excerpt && (
            <p className="body-lg article-lead-deck">{post.excerpt}</p>
          )}

          {/* Author Byline Box */}
          <div className="author-byline-card">
            <div className="author-avatar-medium">
              {post.author?.name ? post.author.name.charAt(0).toUpperCase() : "A"}
            </div>
            <div className="author-byline-details">
              <span className="author-byline-name">
                Written by {post.author?.name || "Independent Contributor"}
              </span>
              <div className="author-byline-meta">
                <span>{formatDate(post.createdAt)}</span>
                <span className="bullet-separator">&bull;</span>
                <span>{calculateReadTime(post.content)}</span>
              </div>
            </div>
          </div>
        </header>

        <hr className="editorial-divider" />

        {/* Main Editorial Text Body */}
        <div className="article-body-content">
          {renderFormattedContent(post.content)}
        </div>

        <hr className="editorial-divider" style={{ margin: "3rem 0 2rem" }} />

        {/* Footer of Article */}
        <footer className="article-footer-colophon">
          <div className="colophon-box">
            <span className="label-md" style={{ color: "var(--tertiary)" }}>
              COLOPHON & NOTES
            </span>
            <p className="body-sm" style={{ color: "var(--on-surface-variant)", marginTop: "0.5rem" }}>
              Published in the BookBound Gazette. This work represents the thoughtful reflections
              of the author and is open for public reading under our independent open-press principles.
            </p>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <button type="button" className="btn-secondary" onClick={onBack}>
              <ArrowLeft size={16} />
              <span>Return to All Essays</span>
            </button>
          </div>
        </footer>
      </div>

      <style>{`
        .post-detail-view {
          padding: 2.5rem 0 5rem;
          background-color: var(--surface);
        }

        .detail-top-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-hairline);
        }

        .article-tag-pills {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }

        .article-main-title {
          margin-bottom: 1.25rem;
          color: var(--on-surface);
        }

        .article-lead-deck {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 20px;
          line-height: 32px;
          color: var(--on-surface-variant);
          margin-bottom: 2rem;
        }

        .author-byline-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 0;
        }

        .author-avatar-medium {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(27, 138, 126, 0.15);
          color: var(--primary);
          font-size: 16px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .author-byline-name {
          font-size: 15px;
          font-weight: 600;
          color: var(--on-surface);
          display: block;
        }

        .author-byline-meta {
          font-size: 13px;
          color: var(--outline);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 2px;
        }

        .article-body-content {
          font-family: var(--font-sans);
          color: var(--on-surface);
          line-height: 1.85;
        }

        .article-inner-h1 {
          margin: 2.5rem 0 1rem;
        }

        .article-inner-h2 {
          margin: 2.25rem 0 0.85rem;
        }

        .article-inner-h3 {
          margin: 1.75rem 0 0.65rem;
        }

        .article-paragraph {
          margin-bottom: 1.5rem;
          color: #2a2e33;
        }

        .article-unordered-list {
          margin: 1rem 0 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 17px;
          line-height: 28px;
        }

        .colophon-box {
          background: #ffffff;
          border: 1px solid var(--border-hairline);
          border-radius: 12px;
          padding: 1.5rem;
        }
      `}</style>
    </article>
  );
};
