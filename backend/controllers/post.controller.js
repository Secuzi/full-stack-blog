import Post from "../models/post.model.js";
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
  const { title, slug, user, content } = req.body;
  if (!title || !slug || !user || !content) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials!" });
  }
  const post = new Post({ title, slug, user, content });
  const newPost = await post.save();
  return res.status(200).json({ success: true, data: newPost });
};
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndDelete(id);
  if (!post) {
    return res
      .status(400)
      .json({ success: false, message: "Post does not exist!" });
  }
  return res
    .status(200)
    .json({ success: true, message: "Post deleted successfully!" });
};
