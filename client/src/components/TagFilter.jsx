import { Search, SlidersHorizontal } from "lucide-react";

export const TagFilter = ({
  tags,
  selectedTag,
  onSelectTag,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="filter-bar-root" id="topics">
      <div className="editorial-container">
        <div className="filter-inner">
          {/* Pill Tags Bar */}
          <div className="tags-scroll-container">
            <button
              type="button"
              className={`tag-pill ${selectedTag === "all" ? "active" : ""}`}
              onClick={() => onSelectTag("all")}
            >
              All Topics
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`tag-pill ${selectedTag === tag ? "active" : ""}`}
                onClick={() => onSelectTag(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Editorial Search Bar */}
          <div className="search-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search essays, authors, ideas..."
              className="input-editorial search-input-field"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      <style>{`
        .filter-bar-root {
          padding: 1.25rem 0;
          background-color: var(--surface);
          border-bottom: 1px solid var(--border-hairline);
          margin-bottom: 2rem;
        }

        .filter-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .tags-scroll-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 2px;
          scrollbar-width: none;
        }

        .tags-scroll-container::-webkit-scrollbar {
          display: none;
        }

        .search-wrapper {
          position: relative;
          min-width: 280px;
          flex-grow: 0;
        }

        @media (max-width: 640px) {
          .search-wrapper {
            width: 100%;
          }
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--outline);
          pointer-events: none;
        }

        .search-input-field {
          padding-left: 2.5rem;
        }
      `}</style>
    </div>
  );
};
