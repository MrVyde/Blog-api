import { prisma } from "../lib/prisma";

// Create post
export const createPost = async (data: {
  title: string;
  content: string;
  authorId: string;
  published?: boolean;
}) => {
  return prisma.post.create({
    data,
  });
};

// Get all posts
export const getPosts = async (publishedOnly = false) => {
  return prisma.post.findMany({
    where: publishedOnly ? { published: true } : {},
    include: {
      author: true,
      comments: true,
    },
  });
};

// Get post by ID
export const getPostById = async (id: string) => {
  return prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
      comments: {
        include: {
          author: true,
        },
      },
    },
  });
};

// Get posts by author
export const getPostsByAuthor = async (authorId: string) => {
  return prisma.post.findMany({
    where: { authorId },
  });
};

// Update post
export const updatePost = async (
  id: string,
  data: Partial<{
    title: string;
    content: string;
    published: boolean;
  }>
) => {

  return prisma.post.update({
    where: { id },
    data,
  });
};

// Delete post
export const deletePost = async (id: string) => {
  return prisma.post.delete({
    where: { id },
  });
};