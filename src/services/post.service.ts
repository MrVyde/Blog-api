import { prisma } from "../lib/prisma";

// Create post
export const createPost = async (data: {
  title: string;
  content: string;
  authorId: string;
}) => {
  return prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      authorId: data.authorId,
      published: false, // backend-controlled rule
    },
  });
};

// Get all posts
export const getPosts = async (publishedOnly = false) => {
  return prisma.post.findMany({
    where: publishedOnly ? { published: true } : {},
    include: {
      author: {
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
        },
      },
      comments: {
        include: {
          author: {
            select: {
              id: true,
              username: true,
              email: true,
              role: true,
            },
          },
        },
      },
    },
  });
};

// Get post by ID
export const getPostById = async (id: string) => {
  return prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
        },
      },
      comments: {
        include: {
          author: {
            select: {
              id: true,
              username: true,
              email: true,
              role: true,
            },
          },
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