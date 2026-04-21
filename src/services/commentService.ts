import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create comment (supports anonymous or user)
export const createComment = async (data: {
  content: string;
  postId: string;
  authorId?: string;
  name?: string;
  email?: string;
}) => {
  return prisma.comment.create({
    data,
  });
};

// Get comments for a post
export const getCommentsByPost = async (postId: string) => {
  return prisma.comment.findMany({
    where: { postId },
    include: {
      author: true,
    },
  });
};

// Get comment by ID
export const getCommentById = async (id: string) => {
  return prisma.comment.findUnique({
    where: { id },
    include: {
      author: true,
      post: true,
    },
  });
};

// Update comment
export const updateComment = async (
  id: string,
  data: Partial<{
    content: string;
  }>
) => {
  return prisma.comment.update({
    where: { id },
    data,
  });
};

// Delete comment
export const deleteComment = async (id: string) => {
  return prisma.comment.delete({
    where: { id },
  });
};