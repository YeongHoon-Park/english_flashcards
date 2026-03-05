import { mockWords } from '@/constants/mockData.js';

import { Word } from '@repo/schema';

export const getAllWords = (): Word[] => {
  return mockWords;
};

export const createWord = (term: string, definition: string): Word => {
  const newWord: Word = {
    id: Date.now().toString(),
    term,
    definition,
  };

  mockWords.push(newWord);

  return newWord;
};

export const deleteWord = (id: string): boolean => {
  const index = mockWords.findIndex((word) => word.id === id);

  if (index !== -1) {
    mockWords.splice(index, 1);

    return true;
  }

  return false;
};

export const updateWord = (id: string, term: string, definition: string): Word | null => {
  const word = mockWords.find((w) => w.id === id);

  if (word) {
    word.term = term;
    word.definition = definition;

    return word;
  }

  return null;
};
