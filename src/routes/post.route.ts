import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getMyPosts,
} from "../controllers/post.controller";

import { authenticate, optionalAuthenticate } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";
import { createPostValidator, updatePostValidator } from "../middleware/post.validator";
import { validate } from "../middleware/validate";

const router = express.Router();

// public
router.get("/",optionalAuthenticate, getAllPosts);


// protected (ADMIN ONLY)
router.post("/", authenticate, requireRole("ADMIN"), createPostValidator, validate, createPost);
router.put("/:id", authenticate,  requireRole("ADMIN"),updatePostValidator, validate, updatePost);
router.delete("/:id", authenticate, requireRole("ADMIN"), deletePost);

// optional (if needed)
router.get("/me/posts", authenticate, getMyPosts);
router.get("/:id", getPostById);

export default router;