import { Request, Response } from "express";
import * as postService from "../services/post.service";

// CREATE POST
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    const post = await postService.createPost({
      title,
      content,
      authorId: req.user!.userId,
    });

    return res.status(201).json(post);
  } catch (err) {
    return res.status(500).json({ message: "Failed to create post" });
  }
};

// GET ALL POSTS
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const isAdmin = req.user?.role === "ADMIN";

    const posts = await postService.getPosts(!isAdmin);

    return res.json(posts);
  } catch {
    return res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// GET SINGLE POST
export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

     if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const post = await postService.getPostById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
};

// GET POSTS BY AUTHOR (useful endpoint)
export const getMyPosts = async (req: any, res: Response) => {
  try {
    const posts = await postService.getPostsByAuthor(req.user.userId);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user posts" });
  }
};

// UPDATE POST
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const existingPost = await postService.getPostById(id);

    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    const updatedPost = await postService.updatePost(id, req.body);

    return res.json(updatedPost);
  } catch {
    return res.status(500).json({ message: "Failed to update post" });
  }
};

// DELETE POST
export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const existingPost = await postService.getPostById(id);

    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    await postService.deletePost(id);

    res.json({ message: "Post deleted successfully" });
  } catch {
    res.status(500).json({ message: "Failed to delete post" });
  }
};