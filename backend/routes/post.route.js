import express from "express";
import Post from "../models/post.model.js";
import * as postController from "../controllers/post.controller.js";
const router = express.Router();

router.get("/", postController.getPosts);
router.get("/:slug", postController.getPost);
router.post("/", postController.postPost);
router.delete("/:id", postController.deletePost);
export default router;
