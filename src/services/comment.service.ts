import { prisma } from "../lib/prisma";
import { NotFoundError, ValidationError } from "../errors/appErrors";

// Create comment (supports anonymous or user)
export const createComment = async (data: {
  content: string;
  postId: string;
  authorId?: string;
  name?: string;
  email?: string;
}) => {
  const { content, postId, authorId, name, email } = data;

  // 1. Business rule: must have content
  if (!content || !content.trim()) {
    throw new ValidationError("Comment content is required");
  }

  // 2. Check if post exists (prevents Prisma FK crash)
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { id: true },
  });

  if (!post) {
    throw new NotFoundError("Post not found");
  }

  // 3. Identity rule (auth OR guest name required)
  if (!authorId && (!name || !name.trim())) {
    throw new ValidationError("Name is required for anonymous comments");
  }

  //limit comment 1 comment every 12hrs
   const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);

const where: any = {
  postId,
  createdAt: {
    gte: twelveHoursAgo,
  },
};

if (authorId) {
  where.authorId = authorId;
} else {
  if (name?.trim()) {
    where.name = name.trim();
  }

  if (email?.trim()) {
    where.email = email.trim();
  }
}

const recentComment = await prisma.comment.findFirst({ where });

  if (recentComment) {
    throw new ValidationError(
      "You can only comment once every 12 hours on this post"
    );
  }

  // 4. Optional: normalize data
  const cleanData = {
    content: content.trim(),
    postId,
    authorId: authorId ?? null,
    name: name?.trim() ?? null,
    email: email?.trim() ?? null,
  };

  // 5. Create comment
  return prisma.comment.create({
    data: cleanData,
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