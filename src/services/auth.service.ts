import { prisma } from "../lib/prisma";
import { Role } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async (data: {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}) => {
  return prisma.user.create({
    data,
    select: {
      id: true,
      username: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true,
    },
  });
};

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      posts: {
        select: {
          id: true,
          title: true,
          published: true,
        },
      },
    },
  });
};