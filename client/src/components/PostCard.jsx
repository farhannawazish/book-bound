import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  const primaryTag =
    post.tags && post.tags.length > 0 ? post.tags[0] : "Editorial";

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recent";

  const shortExcerpt =
    post.excerpt ||
    (post.content
      ? post.content.replace(/[#*`>_]/g, "").slice(0, 120) + "..."
      : "Read this story on Book-Bound.");

  return (
    <article className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div className="relative h-40 bg-gradient-to-br from-[#1B8A7E]/15 via-[#E8F3F1] to-[#F6F7F9]">
        <span className="absolute -bottom-3 left-5 bg-[#1B8A7E] text-white text-xs font-medium capitalize px-3 py-1 rounded-full shadow-sm">
          {primaryTag}
        </span>
      </div>

      <div className="p-5 pt-6 flex-1 flex flex-col">
        <Link
          to={`/post/${post.slug}`}
          className="font-serif font-bold text-xl text-gray-900 hover:text-[#1B8A7E] transition-colors line-clamp-2 leading-snug"
        >
          {post.title}
        </Link>

        <p className="text-sm text-gray-600 mt-2.5 line-clamp-3 flex-1">
          {shortExcerpt}
        </p>

        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span className="font-medium text-gray-700">
            {post.author?.name || "Community Author"}
          </span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </article>
  );
}
