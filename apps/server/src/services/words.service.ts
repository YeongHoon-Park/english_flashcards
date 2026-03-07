import { prisma } from '@/utils/prisma.js';

export const getAllWords = async () => {
  return await prisma.word.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const createWord = async (term: string, definition: string) => {
  return await prisma.word.create({
    data: {
      term,
      definition,
    },
  });
};

export const updateWord = async (id: string, term: string, definition: string) => {
  try {
    return await prisma.word.update({
      where: {
        id,
      },
      data: {
        term,
        definition,
      },
    });
  } catch (error) {
    return null;
  }
};

export const deleteWord = async (id: string) => {
  try {
    await prisma.word.delete({
      where: {
        id,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
};
