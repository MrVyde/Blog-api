import express from "express";
import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller";
import {
  createCommentValidator,
  updateCommentValidator,
  postIdParamValidator,
} from "../middleware/comment.validator";

import { validate } from "../middleware/validate";
import { authenticate, optionalAuthenticate } from "../middleware/auth.middleware";

const router = express.Router();

// PUBLIC (read comments)
router.get("/post/:postId", postIdParamValidator,  validate, getCommentsByPost);

// CREATE COMMENT (auth optional but allowed)
router.post("/", optionalAuthenticate, createCommentValidator, validate, createComment);

// UPDATE COMMENT (must be logged in)
router.put("/:id", authenticate, updateCommentValidator, validate,updateComment);

// DELETE COMMENT (must be logged in)
router.delete("/:id",  authenticate, deleteComment);

export default router;