import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard.jsx";
import { API_URL } from "../config/api.js";

const CATEGORIES = ["All", "Technology", "Lifestyle", "Business", "Travel"];

function formatDate(dateString) {
  if (!dateString) return "Recent";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [recentReads, setRecentReads] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/posts`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setFeaturedPost(data[0] || null);
          setRecentReads(data.slice(0, 4));
        }
      } catch {
        setFeaturedPost(null);
        setRecentReads([]);
      }
    };

    fetchAllPosts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search.trim()) {
          params.append("search", search.trim());
        }
        if (selectedTag !== "All") {
          params.append("tag", selectedTag.toLowerCase());
        }

        const queryString = params.toString();
        const url = queryString
          ? `${API_URL}/api/posts?${queryString}`
          : `${API_URL}/api/posts`;

        const res = await fetch(url);
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [search, selectedTag]);

  const handleTagClick = (category) => {
    if (category === selectedTag && category !== "All") {
      setSelectedTag("All");
    } else {
      setSelectedTag(category);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F6F7F9] py-10 px-4 sm:px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        {featuredPost && (
          <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-10 shadow-sm">
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-[#1B8A7E] bg-[#1B8A7E]/10 px-3 py-1 rounded-full">
              FEATURED POST
            </span>

            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-gray-900 mt-4 leading-tight">
              {featuredPost.title}
            </h1>

            <p className="text-gray-600 text-base mt-3 line-clamp-2 max-w-3xl">
              {featuredPost.excerpt ||
                (featuredPost.content
                  ? featuredPost.content.replace(/[#*`>_]/g, "").slice(0, 180) +
                    "..."
                  : "")}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                <span className="font-medium text-gray-800">
                  {featuredPost.author?.name || "Community Author"}
                </span>
                <span className="mx-2">&bull;</span>
                <span>{formatDate(featuredPost.createdAt)}</span>
              </div>

              <Link
                to={`/post/${featuredPost.slug}`}
                className="bg-[#1B8A7E] hover:bg-[#146B62] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                Read More &rarr;
              </Link>
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif font-bold text-2xl text-gray-900">
                Latest Blog Posts
              </h2>
              {(search.trim() || selectedTag !== "All") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSelectedTag("All");
                  }}
                  className="text-sm text-[#1B8A7E] font-medium hover:underline cursor-pointer"
                >
                  Clear filters
                </button>
              )}
            </div>

            {loading ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-sm text-gray-500">
                Loading articles...
              </div>
            ) : posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <PostCard key={post._id || post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <h3 className="font-serif font-bold text-xl text-gray-900">
                  No articles found
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  No posts match your current search or category filter.
                </p>
              </div>
            )}
          </div>

          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Search
              </h3>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1B8A7E] focus:ring-2 focus:ring-[#1B8A7E]/20"
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => {
                  const isActive = selectedTag === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleTagClick(category)}
                      className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                        isActive
                          ? "bg-[#1B8A7E] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Popular / Recent Reads
              </h3>
              {recentReads.length > 0 ? (
                <ul className="space-y-4">
                  {recentReads.map((post) => (
                    <li
                      key={post._id || post.slug}
                      className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0"
                    >
                      <Link
                        to={`/post/${post.slug}`}
                        className="font-serif font-semibold text-sm text-gray-900 hover:text-[#1B8A7E] transition-colors line-clamp-2 block"
                      >
                        {post.title}
                      </Link>
                      <span className="text-xs text-gray-500 mt-1 block">
                        {formatDate(post.createdAt)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-500">No recent posts yet.</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
