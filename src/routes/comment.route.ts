import express from "express";
import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller";

import { authenticate, optionalAuthenticate } from "../middleware/auth.middleware";

const router = express.Router();

// PUBLIC (read comments)
router.get("/post/:postId", getCommentsByPost);

// CREATE COMMENT (auth optional but allowed)
router.post("/", optionalAuthenticate, createComment);

// UPDATE COMMENT (must be logged in)
router.put("/:id",optionalAuthenticate, updateComment);

// DELETE COMMENT (must be logged in)
router.delete("/:id", optionalAuthenticate, deleteComment);

export default router;