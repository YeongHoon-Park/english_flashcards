import cors from 'cors';
import express from 'express';

import { Word, testMessage } from '@repo/schema';

const app = express();
const port = 3001;

app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Express Server!',
    sharedMessage: testMessage,
  });
});

app.get('/api/words', (req, res) => {
  const mockWords: Word[] = [
    { id: '1', term: 'Serendipity', definition: '뜻밖의 발견 (우연한 행운)' },
    { id: '2', term: 'Ephemeral', definition: '수명이 짧은, 덧없는' },
    { id: '3', term: 'Ubiquitous', definition: '어디에나 있는, 아주 흔한' },
  ];

  setTimeout(() => {
    res.json(mockWords);
  }, 1000);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Shared message: ${testMessage}`);
});
