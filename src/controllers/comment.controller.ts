import { Request, Response } from "express";
import * as commentService from "../services/comment.service";


// CREATE COMMENT
export const createComment = async (req: Request, res: Response, next: any) => {
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
  } catch (error) {
    next(error);
  }
};

// GET COMMENTS BY POST
export const getCommentsByPost = async (req: Request, res: Response, next: any) => {
  try {
    const { postId } = req.params;

    if (!postId || Array.isArray(postId)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const comments = await commentService.getCommentsByPost(postId);

    return res.json(comments);
  } catch (error) {
    next(error);
  }
};

// UPDATE COMMENT
export const updateComment = async (req: Request, res: Response, next: any) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid comment id" });
    }

    const comment = await commentService.getCommentById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

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
  } catch (error) {
    next(error);
  }
};

// DELETE COMMENT
export const deleteComment = async (req: Request, res: Response, next: any) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid comment id" });
    }

    const comment = await commentService.getCommentById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (
      comment.authorId !== req.user?.userId &&
      req.user?.role !== "ADMIN"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await commentService.deleteComment(id);

    return res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};