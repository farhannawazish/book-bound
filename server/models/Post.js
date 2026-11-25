import mongoose from "mongoose";

/**
 * Helper function to produce a clean, URL-friendly slug from a string.
 * Strips accents, removes special characters, and condenses spaces into dashes.
 *
 * @param {string} text - Title or string to slugify
 * @returns {string} - Clean URL-safe slug
 */
const generateSlug = (text) => {
  return text
    .toString()
    .normalize("NFKD") // Normalize unicode characters / accents
    .replace(/[\u0300-\u036f]/g, "") // Remove accent diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove all non-alphanumeric chars (except spaces and hyphens)
    .replace(/[\s_-]+/g, "-") // Replace multiple spaces, hyphens, or underscores with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
};

/**
 * Post Schema
 *
 * Represents a community blog article written in Markdown.
 */
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: [400, "Excerpt cannot exceed 400 characters"],
      default: "",
    },
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Relationship reference to User model
      required: [true, "Author is required"],
    },
    viewsCount: {
      type: Number,
      default: 0,
      min: [0, "Views count cannot be negative"],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

/**
 * Slug generation middleware:
 * Mongoose validates schema constraints (like `required: true`) *before* pre-save hooks.
 * Running in pre('validate') ensures `slug` is populated from `title` before validation fires.
 * Running in pre('save') serves as a safeguard during direct save lifecycles.
 */
const handleSlugGeneration = function () {
  if (this.title && (!this.slug || this.slug.trim() === "")) {
    this.slug = generateSlug(this.title);
  } else if (this.slug) {
    this.slug = generateSlug(this.slug);
  }
};

postSchema.pre("validate", handleSlugGeneration);
postSchema.pre("save", handleSlugGeneration);


// 1. Unique index on slug for fast O(1) single-post routing lookup (GET /posts/:slug)
postSchema.index({ slug: 1 }, { unique: true });

// 2. Descending index on createdAt for chronological feeds (newest posts first)
postSchema.index({ createdAt: -1 });

// 3. Multikey index on tags array for fast filtering by tag (GET /posts?tag=nodejs)
postSchema.index({ tags: 1 });

// 4. Compound index for public feeds (filtering published posts sorted by latest date)
postSchema.index({ isPublished: 1, createdAt: -1 });

const Post = mongoose.model("Post", postSchema);

export default Post;
