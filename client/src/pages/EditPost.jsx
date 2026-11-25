import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import PostEditor from "../components/PostEditor.jsx";
import { API_URL } from "../config/api.js";

export default function EditPost() {
  const { slug } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [postId, setPostId] = useState("");
  const [initialValues, setInitialValues] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_URL}/api/posts/${slug}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Post not found.");
          return;
        }

        setPostId(data._id);
        setInitialValues({
          title: data.title || "",
          excerpt: data.excerpt || "",
          tags: Array.isArray(data.tags) ? data.tags.join(", ") : "",
          content: data.content || "",
        });
      } catch {
        setError("Unable to load post.");
      } finally {
        setFetching(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleUpdate = async (postData) => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to update post.");
        return;
      }

      navigate(`/post/${data.slug}`);
    } catch {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-[#F6F7F9] py-12 px-4 text-center text-sm text-gray-500">
        Loading post...
      </div>
    );
  }

  if (!initialValues) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-[#F6F7F9] py-12 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-xl border border-gray-200 p-8 text-center">
          <p className="text-sm text-red-600">{error || "Post not found."}</p>
        </div>
      </div>
    );
  }

  return (
    <PostEditor
      heading="Edit Post"
      submitLabel="Save Changes"
      initialValues={initialValues}
      onSubmit={handleUpdate}
      error={error}
      loading={loading}
    />
  );
}
