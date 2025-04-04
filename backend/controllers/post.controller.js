import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import ImageKit from "imagekit";
export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;

  const posts = await Post.find({})
    .populate("user", "username")
    .limit(limit)
    .skip((page - 1) * limit);
  const totalPosts = await Post.countDocuments();
  const hasMore = page * limit < totalPosts;
  return res.status(200).send({ posts, hasMore });
};
export const getPost = async (req, res) => {
  const { slug } = req.params;
  const post = await Post.findOne({ slug }).populate("user", "username img");
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

let _imagekitInstance = null;

const getImageKit = () => {
  if (!_imagekitInstance) {
    _imagekitInstance = new ImageKit({
      urlEndpoint: process.env.IK_URL_ENDPOINT,
      publicKey: process.env.IK_PUBLIC_KEY,
      privateKey: process.env.IK_PRIVATE_KEY,
    });

    // Safety check (recommended)
    if (!process.env.IK_PUBLIC_KEY) {
      throw new Error("ImageKit environment variables not loaded!");
    }
  }
  return _imagekitInstance;
};

export const uploadAuth = (req, res) => {
  const result = getImageKit().getAuthenticationParameters();
  res.send(result);
};
