import { prisma } from "../lib/prisma";
import sanitizeHtml from "sanitize-html";
import { AppError } from "../errors/appErrors";

// Create comment (supports authenticated + guest users)
export const createComment = async (data: {
  content: string;
  postId: string;
  authorId?: string;
  name?: string;
  email?: string;
}) => {
  const { content, postId, authorId, name, email } = data;

  // Normalize input
  const trimmedContent = content?.trim();
  const trimmedName = name?.trim();
  const trimmedEmail = email?.trim();

  // 1. Business rule: content required
  if (!trimmedContent) {
  throw new AppError("INVALID_CONTENT", 400);
}

  // 2. Guest identity rule
  // Guests must provide either name or email
  if (!authorId && !trimmedName && !trimmedEmail) {
  throw new AppError("ANONYMOUS_IDENTITY_REQUIRED", 400);
}

  // 3. Ensure post exists
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { id: true },
  });

  if (!post) {
  throw new AppError("POST_NOT_FOUND", 404);
}

  // 4. Comment cooldown rule (1 comment every 12hrs per post)
  const twelveHoursAgo = new Date(
    Date.now() - 12 * 60 * 60 * 1000
  );

  const where: any = {
    postId,
    createdAt: {
      gte: twelveHoursAgo,
    },
  };

  // Logged-in user cooldown
  if (authorId) {
    where.authorId = authorId;
  } else {
    // Guest cooldown
    // Match by email if provided
    if (trimmedEmail) {
      where.email = trimmedEmail;
    }
    // Otherwise fallback to name
    else if (trimmedName) {
      where.name = trimmedName;
    }
  }

  const recentComment = await prisma.comment.findFirst({
    where,
    select: { id: true },
  });

 if (recentComment) {
  throw new AppError("COMMENT_COOLDOWN", 400);
}

  // 5. Sanitize content
  const cleanContent = sanitizeHtml(trimmedContent, {
    allowedTags: [],
    allowedAttributes: {},
  });

  // 6. Create comment
  return prisma.comment.create({
    data: {
      content: cleanContent,
      postId,
      authorId: authorId ?? null,
      name: trimmedName ?? null,
      email: trimmedEmail ?? null,
    },
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