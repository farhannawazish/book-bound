import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function PostEditor({
  heading,
  submitLabel,
  initialValues = {},
  onSubmit,
  error,
  loading,
}) {
  const [title, setTitle] = useState(initialValues.title || "");
  const [excerpt, setExcerpt] = useState(initialValues.excerpt || "");
  const [tagsInput, setTagsInput] = useState(initialValues.tags || "");
  const [content, setContent] = useState(initialValues.content || "");
  const [activeTab, setActiveTab] = useState("write");

  const handleSubmit = (e) => {
    e.preventDefault();

    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    onSubmit({
      title: title.trim(),
      excerpt: excerpt.trim(),
      tags,
      content: content.trim(),
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F6F7F9] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-gray-900 mb-6">
          {heading}
        </h1>

        {error && (
          <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter an engaging article title"
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1B8A7E] focus:ring-2 focus:ring-[#1B8A7E]/20"
            />
          </div>

          <div>
            <label
              htmlFor="excerpt"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Short Excerpt
            </label>
            <input
              id="excerpt"
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A brief summary of your story"
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1B8A7E] focus:ring-2 focus:ring-[#1B8A7E]/20"
            />
          </div>

          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tags (comma-separated)
            </label>
            <input
              id="tags"
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Technology, React"
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1B8A7E] focus:ring-2 focus:ring-[#1B8A7E]/20"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Content (Markdown)
              </label>

              <div className="inline-flex rounded-lg border border-gray-200 p-0.5 bg-gray-50">
                <button
                  type="button"
                  onClick={() => setActiveTab("write")}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    activeTab === "write"
                      ? "bg-[#1B8A7E] text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Write
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    activeTab === "preview"
                      ? "bg-[#1B8A7E] text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Preview
                </button>
              </div>
            </div>

            {activeTab === "write" ? (
              <textarea
                id="content"
                rows={12}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article using Markdown..."
                className="w-full px-3.5 py-3 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:border-[#1B8A7E] focus:ring-2 focus:ring-[#1B8A7E]/20"
              />
            ) : (
              <div className="min-h-[280px] w-full px-5 py-4 border border-gray-300 rounded-lg bg-gray-50/50 markdown-body">
                {content.trim() ? (
                  <ReactMarkdown>{content}</ReactMarkdown>
                ) : (
                  <p className="text-sm text-gray-400">
                    Nothing to preview yet. Switch to Write to add content.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#1B8A7E] hover:bg-[#146B62] disabled:opacity-60 text-white font-medium text-sm px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              {loading ? "Saving..." : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
