import { auth } from "@clerk/nextjs";

import prisma from "./prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

export const increaseApiCount = async () => {
  const { userId } = auth();

  if (!userId) return;

  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: {
      userId: userId,
    },
  });

  if (userApiLimit) {
    await prisma.userApiLimit.update({
      where: {
        userId: userId,
      },
      data: {
        count: userApiLimit.count + 1,
      },
    });
  } else {
    await prisma.userApiLimit.create({
      data: {
        userId: userId,
        count: 1,
      },
    });
  }
};

export const userApiLimit = async () => {
  const { userId } = auth();

  if (!userId) return;

  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) return true;
  else return false;
};

export const getApiLimitCount = async () => {
  const { userId } = auth();

  if (!userId) return 0;

  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!userApiLimit) return 0;
  else return userApiLimit.count;
};
