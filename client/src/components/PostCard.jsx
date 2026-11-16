import { Clock, ArrowRight, Bookmark } from "lucide-react";

export const PostCard = ({ post, onSelectPost }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
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

  const primaryTag = post.tags && post.tags.length > 0 ? post.tags[0] : "Editorial";

  return (
    <article
      className="card-editorial post-card-item"
      onClick={() => onSelectPost(post.slug)}
      role="button"
      tabIndex={0}
    >
      <div className="card-top-row">
        <span className="eyebrow-tag">
          {primaryTag.toUpperCase()}
        </span>
        <span className="card-read-time">
          <Clock size={12} />
          {calculateReadTime(post.content)}
        </span>
      </div>

      <h2 className="headline-sm card-headline">{post.title}</h2>

      <p className="body-sm card-excerpt">
        {post.excerpt ||
          (post.content
            ? post.content.replace(/[#*`_]/g, "").slice(0, 130) + "..."
            : "Explore this piece from our independent community contributors.")}
      </p>

      {post.tags && post.tags.length > 1 && (
        <div className="card-tags-row">
          {post.tags.slice(1, 4).map((tag, idx) => (
            <span key={idx} className="card-mini-tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="card-footer-row">
        <div className="card-author-info">
          <span className="author-avatar-tiny">
            {post.author?.name ? post.author.name.charAt(0).toUpperCase() : "A"}
          </span>
          <div>
            <p className="author-name-text">
              {post.author?.name || "Community Author"}
            </p>
            <p className="author-date-text">{formatDate(post.createdAt)}</p>
          </div>
        </div>

        <span className="read-arrow-indicator">
          <ArrowRight size={16} />
        </span>
      </div>

      <style>{`
        .post-card-item {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          height: 100%;
        }

        .card-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.85rem;
        }

        .eyebrow-tag {
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--tertiary);
        }

        .card-read-time {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: var(--outline);
        }

        .card-headline {
          margin-bottom: 0.75rem;
          color: var(--on-surface);
          font-size: 20px;
          line-height: 28px;
          transition: color 0.15s ease;
        }

        .post-card-item:hover .card-headline {
          color: var(--primary);
        }

        .card-excerpt {
          color: var(--on-surface-variant);
          margin-bottom: 1.25rem;
          flex-grow: 1;
        }

        .card-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.25rem;
        }

        .card-mini-tag {
          font-size: 11px;
          color: var(--outline);
          background-color: var(--surface-container-low);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .card-footer-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid var(--border-hairline);
        }

        .card-author-info {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .author-avatar-tiny {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(27, 138, 126, 0.12);
          color: var(--primary);
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .author-name-text {
          font-size: 12px;
          font-weight: 600;
          color: var(--on-surface);
          line-height: 1.2;
        }

        .author-date-text {
          font-size: 11px;
          color: var(--outline);
          line-height: 1.2;
        }

        .read-arrow-indicator {
          color: var(--outline);
          transition: transform 0.15s ease, color 0.15s ease;
        }

        .post-card-item:hover .read-arrow-indicator {
          transform: translateX(4px);
          color: var(--primary);
        }
      `}</style>
    </article>
  );
};

