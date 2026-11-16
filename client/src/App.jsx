import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { FeaturedArticle } from "./components/FeaturedArticle.jsx";
import { TagFilter } from "./components/TagFilter.jsx";
import { PostCard } from "./components/PostCard.jsx";
import { PostDetail } from "./components/PostDetail.jsx";
import { WritePostModal } from "./components/WritePostModal.jsx";
import { AuthModal } from "./components/AuthModal.jsx";
import { Footer } from "./components/Footer.jsx";
import { api } from "./services/api.js";
import { Loader2, BookOpen, Feather } from "lucide-react";

// Curated initial fallback essays if the database is newly created and empty
const SAMPLE_EDITORIAL_POSTS = [
  {
    _id: "sample-1",
    title: "The Architecture of Reading: Notes on Deep Focus in a Hyperlinked World",
    slug: "the-architecture-of-reading",
    content: `# The Architecture of Reading

In an era measured in milliseconds and ephemeral notifications, the act of sitting with a single longform essay has become a quiet rebellion. 

> "Reading is an act of co-creation between author and reader, demanding a tactile room of one's own."

When we open an archival text, we enter a deliberate cadence. The printed page offers boundaries—white space that allows contemplation, typography that guides the rhythm of thought, and margins that invite silent dialogue.

## The Loss of Linear Reflection

The modern web was engineered for velocity. Blue links beckon us away from the current paragraph; feeds refresh infinitely with algorithmic urgency. Yet, profound ideas require duration. They need time to settle into memory, to brush against our personal experiences, and to synthesize into genuine understanding.

- The tactile weight of intentional typography
- Deliberate white space as cognitive breathing room
- The preservation of longform discourse over ephemeral soundbites

As community authors and readers, our challenge is to cultivate spaces that honor this timeless pact between writer and reader.`,
    excerpt: "On cultivating deep attention, tactile bookbinding aesthetics, and reclaiming solitary thought amid algorithmic acceleration.",
    tags: ["literature", "philosophy", "culture"],
    author: { name: "Elena Rostova" },
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    _id: "sample-2",
    title: "Vegetal Inks and Archival Paper: Crafting Physicality in Digital Design",
    slug: "vegetal-inks-and-archival-paper",
    content: `# Vegetal Inks and Archival Paper

Why do certain digital interfaces feel clinical and disposable, while others evoke the calm permanence of a personal library?

The answer lies in subtle material honesty. When design respects classical proportions—using deep botanical teals, warm paper substrates, and balanced humanist letterforms—the screen transforms from a glaring terminal into a tactile desk.`,
    excerpt: "Exploring why warmth, hairline dividers, and classical serifs create interfaces that age gracefully.",
    tags: ["design", "craft", "typography"],
    author: { name: "Julian Vance" },
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    _id: "sample-3",
    title: "The Unhurried Mind: Slow Curation as a Creative Discipline",
    slug: "the-unhurried-mind",
    content: `# The Unhurried Mind

Prolific output is frequently mistaken for creative vitality. Yet the most enduring literary works emerged from periods of deliberate dormancy and slow observation.`,
    excerpt: "A defense of patient craftsmanship, notebook drafting, and the refusal to rush creative synthesis.",
    tags: ["philosophy", "writing"],
    author: { name: "Sarah Chen" },
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
  },
  {
    _id: "sample-4",
    title: "Marginalia in the Margins of History: How Readers Shaped Literature",
    slug: "marginalia-in-the-margins-of-history",
    content: `# Marginalia in the Margins of History

From medieval monks annotating vellum codices to modern readers scribbling pencil thoughts on paperback covers, marginalia reveals the private history of human reading.`,
    excerpt: "Tracing the intimate dialogue between readers and authors through handwritten notes across centuries.",
    tags: ["history", "literature"],
    author: { name: "Marcus Thorne" },
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
  },
];

const MainContent = () => {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSlug, setActiveSlug] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedTag, setSelectedTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [notification, setNotification] = useState("");

  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3500);
  };

  // Fetch posts from backend
  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await api.getPosts();
      if (Array.isArray(data) && data.length > 0) {
        setPosts(data);
      } else {
        // Fallback to sample posts if DB has no entries yet
        setPosts(SAMPLE_EDITORIAL_POSTS);
      }
    } catch {
      // If server is not running or returns error, gracefully display sample posts
      setPosts(SAMPLE_EDITORIAL_POSTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // Handle single post selection
  const handleSelectPost = async (slug) => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const localFound = posts.find((p) => p.slug === slug);
      if (localFound) {
        setSelectedPost(localFound);
        setActiveSlug(slug);
        return;
      }
      const remotePost = await api.getPostBySlug(slug);
      setSelectedPost(remotePost);
      setActiveSlug(slug);
    } catch (err) {
      showToast("Unable to load essay: " + err.message);
    }
  };

  const handleBackToFeed = () => {
    setActiveSlug(null);
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
    showToast("Essay published to the Gazette successfully!");
    handleSelectPost(newPost.slug);
  };

  // Extract unique tags across all posts
  const allTags = Array.from(
    new Set(
      posts.flatMap((p) => (p.tags && Array.isArray(p.tags) ? p.tags : []))
    )
  );

  // Filter posts based on search and active tag
  const filteredPosts = posts.filter((post) => {
    const matchesTag =
      selectedTag === "all" ||
      (post.tags && post.tags.map((t) => t.toLowerCase()).includes(selectedTag.toLowerCase()));

    const matchesSearch =
      !searchQuery.trim() ||
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTag && matchesSearch;
  });

  const leadStory = posts[0] || null;
  const sideHighlights = posts.slice(1, 4);

  return (
    <div className="site-wrapper">
      {/* Editorial Toast Banner */}
      {notification && (
        <div className="toast-banner">
          <Feather size={15} />
          <span>{notification}</span>
        </div>
      )}

      {/* Literary Navbar with STRICTLY ONE ACTION BUTTON */}
      <Navbar
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenWrite={() => {
          if (!isAuthenticated) {
            setIsAuthOpen(true);
          } else {
            setIsWriteOpen(true);
          }
        }}
        onNavigateHome={handleBackToFeed}
      />

      <main className="main-content-flow">
        {activeSlug && selectedPost ? (
          /* Single Article Reading View */
          <PostDetail
            post={selectedPost}
            onBack={handleBackToFeed}
            onSelectTag={(tag) => {
              handleBackToFeed();
              setSelectedTag(tag);
            }}
          />
        ) : (
          /* Homepage / Magazine Feed View */
          <>
            {/* Featured 8/4 Lead Story Grid (shown when not actively searching) */}
            {!searchQuery && selectedTag === "all" && leadStory && (
              <FeaturedArticle
                leadPost={leadStory}
                sidePosts={sideHighlights}
                onSelectPost={handleSelectPost}
              />
            )}

            {/* Pill Tags Filter & Search */}
            <TagFilter
              tags={allTags}
              selectedTag={selectedTag}
              onSelectTag={setSelectedTag}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Article Grid Section */}
            <section className="feed-grid-section">
              <div className="editorial-container">
                <div className="feed-section-header">
                  <div>
                    <h2 className="headline-md">
                      {selectedTag === "all"
                        ? "Chronicle & Collected Essays"
                        : `Essays on #${selectedTag.toUpperCase()}`}
                    </h2>
                    <p className="body-sm" style={{ color: "var(--outline)", marginTop: "2px" }}>
                      {filteredPosts.length} {filteredPosts.length === 1 ? "piece" : "pieces"} available for open public reading
                    </p>
                  </div>
                </div>

                {loading ? (
                  <div className="loading-state-box">
                    <Loader2 size={24} className="spin-animation" style={{ color: "var(--primary)" }} />
                    <span className="body-sm" style={{ color: "var(--outline)" }}>
                      Retrieving articles from the archive...
                    </span>
                  </div>
                ) : filteredPosts.length > 0 ? (
                  <div className="articles-grid">
                    {filteredPosts.map((post) => (
                      <PostCard
                        key={post._id || post.slug}
                        post={post}
                        onSelectPost={handleSelectPost}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="empty-results-box">
                    <BookOpen size={36} strokeWidth={1.5} style={{ color: "var(--outline)" }} />
                    <h3 className="headline-sm" style={{ marginTop: "1rem" }}>
                      No essays found matching your inquiry
                    </h3>
                    <p className="body-sm" style={{ color: "var(--on-surface-variant)", maxWidth: "420px", marginTop: "0.5rem" }}>
                      Try selecting another topic from the editorial bar or clearing your search keywords.
                    </p>
                    <button
                      type="button"
                      className="btn-secondary"
                      style={{ marginTop: "1.25rem" }}
                      onClick={() => {
                        setSelectedTag("all");
                        setSearchQuery("");
                      }}
                    >
                      Reset Filter
                    </button>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => showToast("Welcome! You are now signed in.")}
      />

      <WritePostModal
        isOpen={isWriteOpen}
        onClose={() => setIsWriteOpen(false)}
        onPostCreated={handlePostCreated}
      />

      <style>{`
        .site-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: var(--surface);
        }

        .main-content-flow {
          flex: 1;
        }

        .toast-banner {
          position: fixed;
          top: 1rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2000;
          background: #ffffff;
          border: 1px solid var(--primary);
          color: var(--on-surface);
          box-shadow: 0 10px 30px -4px rgba(27, 138, 126, 0.2);
          border-radius: 9999px;
          padding: 0.6rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 13px;
          font-weight: 600;
          animation: modalEnter 0.2s ease;
        }

        .feed-grid-section {
          padding-bottom: 4rem;
        }

        .feed-section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 1.75rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-hairline);
        }

        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 1.5rem;
        }

        @media (max-width: 640px) {
          .articles-grid {
            grid-template-columns: 1fr;
          }
        }

        .loading-state-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 0;
          gap: 1rem;
        }

        .spin-animation {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .empty-results-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 1.5rem;
          text-align: center;
          background: #ffffff;
          border: 1px dashed var(--border-hairline);
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}
