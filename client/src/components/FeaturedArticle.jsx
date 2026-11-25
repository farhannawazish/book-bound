import { ArrowRight, Clock, Calendar, BookOpen, Feather } from "lucide-react";

export const FeaturedArticle = ({ leadPost, sidePosts, onSelectPost }) => {
  if (!leadPost) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "Recent Edition";
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
    const minutes = Math.ceil(words / 180);
    return `${minutes} min read`;
  };

  return (
    <section className="featured-section">
      <div className="editorial-container">
        {/* Section Header */}
        <div className="section-eyebrow-row">
          <span className="label-sm" style={{ color: "var(--tertiary)", display: "flex", alignItems: "center", gap: "6px" }}>
            <Feather size={13} />
            FEATURED ESSAY & DISPATCHES
          </span>
          <span className="label-sm" style={{ color: "var(--outline)" }}>
            CURATED FOR THOUGHTFUL INQUIRY
          </span>
        </div>

        {/* 8-Column / 4-Column Editorial Magazine Grid */}
        <div className="magazine-grid">
          {/* 8-Column Lead Essay */}
          <article
            className="card-editorial lead-story"
            onClick={() => onSelectPost(leadPost.slug)}
            role="button"
            tabIndex={0}
          >
            <div className="lead-tag-badge">
              <span className="label-sm" style={{ color: "var(--primary)", fontWeight: 700 }}>
                {leadPost.tags?.[0] ? `#${leadPost.tags[0].toUpperCase()}` : "ESSAY"}
              </span>
              <span className="bullet-separator">&bull;</span>
              <span className="label-sm" style={{ color: "var(--outline)" }}>
                {calculateReadTime(leadPost.content)}
              </span>
            </div>

            <h1 className="display-lg lead-title">{leadPost.title}</h1>

            <p className="body-lg lead-excerpt">
              {leadPost.excerpt ||
                (leadPost.content
                  ? leadPost.content.replace(/[#*`_]/g, "").slice(0, 180) + "..."
                  : "An in-depth inquiry into culture, literature, and independent thought.")}
            </p>

            <div className="lead-meta-row">
              <div className="author-signature">
                <span className="author-dot"></span>
                <span className="label-md" style={{ color: "var(--on-surface)", fontWeight: 600 }}>
                  By {leadPost.author?.name || "Editorial Staff"}
                </span>
                <span className="bullet-separator">&bull;</span>
                <span className="label-sm" style={{ color: "var(--outline)" }}>
                  {formatDate(leadPost.createdAt)}
                </span>
              </div>

              <span className="btn-ghost" style={{ fontSize: "14px", fontWeight: 600 }}>
                Read Full Essay <ArrowRight size={16} />
              </span>
            </div>
          </article>

          {/* 4-Column Editorial Side Collection */}
          <aside className="side-collection">
            <div className="side-collection-header">
              <span className="label-md" style={{ color: "var(--tertiary)" }}>
                COLLECTION HIGHLIGHTS
              </span>
            </div>

            <div className="side-cards-list">
              {sidePosts && sidePosts.length > 0 ? (
                sidePosts.slice(0, 3).map((post, idx) => (
                  <article
                    key={post._id || post.slug || idx}
                    className="card-editorial side-card"
                    onClick={() => onSelectPost(post.slug)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="side-card-top">
                      <span className="volume-number">
                        0{idx + 1}
                      </span>
                      <span className="label-sm" style={{ color: "var(--primary)" }}>
                        {post.tags?.[0] ? `#${post.tags[0]}` : "DISPATCH"}
                      </span>
                    </div>

                    <h3 className="headline-sm side-card-title">{post.title}</h3>

                    <div className="side-card-meta">
                      <span className="label-sm" style={{ color: "var(--on-surface-variant)" }}>
                        {post.author?.name || "Staff"}
                      </span>
                      <span className="bullet-separator">&bull;</span>
                      <span className="label-sm" style={{ color: "var(--outline)" }}>
                        {calculateReadTime(post.content)}
                      </span>
                    </div>
                  </article>
                ))
              ) : (
                <div className="empty-side-box">
                  <p className="body-sm" style={{ color: "var(--outline)" }}>
                    Additional essays from our authors will appear here shortly.
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .featured-section {
          padding: 2.5rem 0 1.5rem;
        }

        .section-eyebrow-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.75rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid var(--border-hairline);
        }

        .magazine-grid {
          display: grid;
          grid-template-columns: 8fr 4fr;
          gap: 1.5rem;
        }

        @media (max-width: 900px) {
          .magazine-grid {
            grid-template-columns: 1fr;
          }
        }

        .lead-story {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
        }

        @media (max-width: 640px) {
          .lead-story {
            padding: 1.5rem;
          }
        }

        .lead-tag-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .bullet-separator {
          color: var(--outline-variant);
        }

        .lead-title {
          margin-bottom: 1.25rem;
          color: var(--on-surface);
          transition: color 0.15s ease;
        }

        .lead-story:hover .lead-title {
          color: var(--primary);
        }

        .lead-excerpt {
          color: var(--on-surface-variant);
          margin-bottom: 2rem;
          max-width: 680px;
        }

        .lead-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-hairline);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .author-signature {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .author-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--primary);
        }

        .side-collection {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .side-collection-header {
          padding: 0.25rem 0;
          border-bottom: 2px solid var(--tertiary);
          margin-bottom: 0.25rem;
        }

        .side-cards-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .side-card {
          padding: 1.25rem;
          cursor: pointer;
        }

        .side-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .volume-number {
          font-family: var(--font-serif);
          font-size: 14px;
          font-weight: 600;
          color: var(--tertiary);
        }

        .side-card-title {
          font-size: 17px;
          line-height: 24px;
          margin-bottom: 0.75rem;
          color: var(--on-surface);
          transition: color 0.15s ease;
        }

        .side-card:hover .side-card-title {
          color: var(--primary);
        }

        .side-card-meta {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .empty-side-box {
          background: #ffffff;
          border: 1px dashed var(--border-hairline);
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
        }
      `}</style>
    </section>
  );
};

