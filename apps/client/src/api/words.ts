import axios from 'axios';

import type { Word } from '@repo/schema';

const API_BASE_URL = 'http://localhost:3001/api';

export const fetchWords = async (): Promise<Word[]> => {
  const response = await axios.get<Word[]>(`${API_BASE_URL}/words`);

  return response.data;
};

export const createWord = async (newWord: Omit<Word, 'id'>): Promise<Word> => {
  const response = await axios.post<Word>(`${API_BASE_URL}/words`, newWord);

  return response.data;
};

export const updateWord = async (word: Word): Promise<Word> => {
  const response = await axios.put(`${API_BASE_URL}/words/${word.id}`, {
    term: word.term,
    definition: word.definition,
  });

  return response.data;
};

export const deleteWord = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/words/${id}`);
};
