import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";

export const getPostComments = async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate("user")
    .sort({ createdAt: -1 });

  return res.json(comments);
};

export const addComment = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const postId = req.params.postId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerk_userid: clerkUserId });
  console.log("USER: ", user);

  const newComment = new Comment({ ...req.body, user: user._id, post: postId });
  const savedComment = await newComment.save();
  setTimeout(() => {
    return res.status(201).json(savedComment);
  }, 3000);
};

export const deleteComment = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const id = req.params.id;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId });

  const deletedComment = await Comment.findOneAndDelete({
    _id: id,
    user: user._id,
  });

  if (!deletedComment) {
    return res.status(403).json("You can delete only your comment");
  }
  return res.status(200).json("Comment deleted");
};
