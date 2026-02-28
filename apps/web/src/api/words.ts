import axios from 'axios';

import type { Word } from '@repo/schema';

const API_BASE_URL = 'http://localhost:3001/api';

export const fetchWords = async (): Promise<Word[]> => {
  const response = await axios.get<Word[]>(`${API_BASE_URL}/words`);

  return response.data;
};
