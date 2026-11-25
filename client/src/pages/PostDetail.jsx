import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../context/AuthContext.jsx";
import { API_URL } from "../config/api.js";

export default function PostDetail() {
  const { slug } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${API_URL}/api/posts/${slug}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Post not found.");
          return;
        }

        setPost(data);
      } catch {
        setError("Unable to load article.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(
        `${API_URL}/api/posts/${post._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Failed to delete post.");
        return;
      }

      navigate("/");
    } catch {
      setError("Unable to connect to the server.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-[#F6F7F9] py-12 px-4 text-center text-sm text-gray-500">
        Loading article...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-[#F6F7F9] py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl border border-gray-200 p-8 text-center">
          <p className="text-sm text-red-600 mb-4">
            {error || "Post not found."}
          </p>
          <Link to="/" className="text-sm font-medium text-[#1B8A7E] hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isAuthor = user && post.author?._id === user.id;
  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recent";

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F6F7F9] py-10 px-4">
      <article className="max-w-3xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-10">
        <div className="mb-6">
          <Link
            to="/"
            className="text-sm font-medium text-[#1B8A7E] hover:underline"
          >
            &larr; Back to Home
          </Link>
        </div>

        <header className="border-b border-gray-200 pb-6 mb-8">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#1B8A7E]/10 text-[#1B8A7E] text-xs font-medium capitalize px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-gray-900 leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-gray-600 text-lg mt-3">{post.excerpt}</p>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              <span className="font-medium text-gray-800">
                {post.author?.name || "Community Author"}
              </span>
              <span className="mx-2">&bull;</span>
              <span>{formattedDate}</span>
            </div>

            {isAuthor && (
              <div className="flex items-center gap-3">
                <Link
                  to={`/edit/${post.slug}`}
                  className="px-3.5 py-1.5 text-sm font-medium text-[#1B8A7E] border border-[#1B8A7E] rounded-lg hover:bg-[#1B8A7E]/10 transition-colors"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-3.5 py-1.5 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 disabled:opacity-60 transition-colors cursor-pointer"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}
          </div>
        </header>

        <div className="markdown-body">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
