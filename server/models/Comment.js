import mongoose from "mongoose";

/*
 * Comment Schema
 * post   -> references 'Post' (identifies the article being commented on)
 * author -> references 'User' (identifies the comment author)
 */
const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // Reference to the parent blog post
      required: [true, "Post reference is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the user who wrote the comment
      required: [true, "Comment author is required"],
    },
    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
      maxlength: [1000, "Comment cannot exceed 1000 characters"],
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);


// 1. Index on 'post' enables high-performance lookups of all comments for an article
//    (e.g., db.comments.find({ post: postId }))
commentSchema.index({ post: 1 });

// 2. Compound index on post and createdAt (-1) optimizes sorted comment retrieval
//    (newest comments first without requiring an in-memory sort stage)
commentSchema.index({ post: 1, createdAt: -1 });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;

