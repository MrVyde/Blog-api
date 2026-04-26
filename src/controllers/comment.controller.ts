import { Request, Response } from "express";
import * as commentService from "../services/comment.service";
import { NotFoundError, ValidationError } from "../errors/appErrors";

// CREATE COMMENT
export const createComment = async (req: Request, res: Response) => {
  try {
    const { content, postId, name, email } = req.body;

    const comment = await commentService.createComment({
      content,
      postId,
      name,
      email,
      authorId: req.user?.userId,
    });

    return res.status(201).json(comment);
  } catch (error: any) {
    console.error(error.message);

    // Validation errors (bad input / missing required fields)
    if (error instanceof ValidationError) {
    return res.status(400).json({ message: error.message });
    }

    // Resource not found (invalid postId)
    if (error instanceof NotFoundError) {
    return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({
      message: "Failed to create comment",
    });
  }
};

// GET COMMENTS BY POST
export const getCommentsByPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    if (!postId || Array.isArray(postId)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const comments = await commentService.getCommentsByPost(postId);

    return res.json(comments);
  } catch {
    return res.status(500).json({ message: "Failed to fetch comments" });
  }
};

// UPDATE COMMENT
export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid comment id" });
    }

    const comment = await commentService.getCommentById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // ownership check
    if (
      comment.authorId !== req.user?.userId &&
      req.user?.role !== "ADMIN"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updated = await commentService.updateComment(id, {
      content: req.body.content,
    });

    return res.json(updated);
  } catch {
    return res.status(500).json({ message: "Failed to update comment" });
  }
};

// DELETE COMMENT
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid comment id" });
    }

    const comment = await commentService.getCommentById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // ownership check
    if (
      comment.authorId !== req.user?.userId &&
      req.user?.role !== "ADMIN"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await commentService.deleteComment(id);

    return res.json({ message: "Comment deleted successfully" });
  } catch {
    return res.status(500).json({ message: "Failed to delete comment" });
  }
};