import { prisma } from "../prisma/client";
import { PrismaClient, Role } from "@prisma/client";

// Create user
export const createUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  return prisma.user.create({ 
    data,
});
};

// Get all users
export const getUsers = async () => {
  return prisma.user.findMany({
    include: {
      posts: true,
      comments: true,
    },
  });
};

// Get user by ID
export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      posts: true,
      comments: true,
    },
  });
};

// Get user by email
export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

// Update user
export const updateUser = async (
  id: string,
  data: Partial<{
    username: string;
    email: string;
    password: string;
    role: Role;
  }>
) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

// Delete user
export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};