import express from "express";
import * as commentController from "../controllers/comment.controller.js";
const router = express.Router();

router.get("/:postId", commentController.getPostComments);
router.post("/:postId", commentController.addComment);
router.delete("/:id", commentController.deleteComment);

export default router;
