import { API_URL } from "../config/api.js";

const API_BASE_URL = `${API_URL}/api`;

/**
 * API client for interacting with the Express & MongoDB backend.
 */
export const api = {
  // Posts
  async getPosts() {
    const res = await fetch(`${API_BASE_URL}/posts`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to fetch articles");
    }
    return res.json();
  },

  async getPostBySlug(slug) {
    const res = await fetch(`${API_BASE_URL}/posts/${slug}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Post not found");
    }
    return res.json();
  },

  async createPost(postData, token) {
    const res = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to publish post");
    }
    return res.json();
  },

  // Auth
  async register(userData) {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || "Registration failed");
    }
    return data;
  },

  async login(credentials) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }
    return data;
  },
};

