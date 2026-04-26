import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getMyPosts,
} from "../controllers/post.controller";

import { authenticate } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = express.Router();

// public
router.get("/", getAllPosts);
router.get("/:id", getPostById);

// protected (ADMIN ONLY)
router.post("/", authenticate, requireRole("ADMIN"), createPost);
router.put("/:id", authenticate, requireRole("ADMIN"), updatePost);
router.delete("/:id", authenticate, requireRole("ADMIN"), deletePost);

// optional (if needed)
router.get("/me/posts", authenticate, getMyPosts);

export default router;