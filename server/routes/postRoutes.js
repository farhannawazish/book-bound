import express from "express";
import Post from "../models/Post.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { search, tag } = req.query;
    const query = {};

    if (search && search.trim()) {
      const safeSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(safeSearch, "i");
      query.$or = [{ title: regex }, { content: regex }];
    }

    if (tag && tag.trim() && tag.trim().toLowerCase() !== "all") {
      query.tags = tag.trim().toLowerCase();
    }

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .populate("author", "name avatar");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate("author", "name");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const { title, content, excerpt, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-");

    const newPost = await Post.create({
      title,
      slug,
      content,
      excerpt,
      tags,
      author: req.user.id,
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to edit this post" });
    }

    const { title, content, excerpt, tags } = req.body;

    post.title = title || post.title;
    post.content = content || post.content;
    post.excerpt = excerpt !== undefined ? excerpt : post.excerpt;
    post.tags = tags !== undefined ? tags : post.tags;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

