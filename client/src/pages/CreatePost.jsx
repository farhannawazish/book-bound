import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import PostEditor from "../components/PostEditor.jsx";
import { API_URL } from "../config/api.js";

export default function CreatePost() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (postData) => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to publish post.");
        return;
      }

      navigate(`/post/${data.slug}`);
    } catch {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostEditor
      heading="Write a Post"
      submitLabel="Publish Post"
      onSubmit={handleCreate}
      error={error}
      loading={loading}
    />
  );
}
