import Post from "../models/post.model.js";
import User from "../models/user.model.js";
export const getPosts = async (req, res) => {
  const posts = await Post.find({});
  return res.status(200).send(posts);
};
export const getPost = async (req, res) => {
  const { slug } = req.params;
  const post = await Post.findOne({ slug });
  if (!post) {
    return res
      .status(400)
      .json({ success: false, message: "Could not find post!" });
  }
  return res.status(200).send(post);
};

export const postPost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  if (!clerkUserId) {
    return res
      .status(401)
      .json({ success: false, message: "User must be authenticated!" });
  }
  console.log(req.headers);
  const user = await User.findOne({ clerk_userid: clerkUserId });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found!" });
  }
  let slug = req.body.title.replace(/ /g, "-").toLowerCase();

  let existingPost = await Post.findOne({ slug });
  let counter = 2;
  const oldSlug = slug;
  while (existingPost) {
    slug = `${oldSlug}-${counter}`;
    existingPost = await Post.findOne({ slug });
    counter++;
  }

  const newPost = new Post({ user: user._id, ...req.body, slug });
  const post = await newPost.save();

  return res.status(200).json({ post });
};
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const clerkUserId = req.auth.userId;
  if (!clerkUserId) {
    return res
      .status(401)
      .json({ success: false, message: "User must be authenticated!" });
  }
  const user = await User.findOne({ clerk_userid: clerkUserId });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found!" });
  }

  const post = await Post.findByIdAndDelete({ _id: id, user: user._id });

  if (!post) {
    return res
      .status(403)
      .json({ success: false, message: "Post does not exist!" });
  }
  return res
    .status(200)
    .json({ success: true, message: "Post deleted successfully!" });
};
