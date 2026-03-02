import cors from 'cors';
import express from 'express';

import { Word, testMessage } from '@repo/schema';

const app = express();
const port = 3001;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Mock
let mockWords: Word[] = [
  { id: '1', term: 'Serendipity', definition: '뜻밖의 발견 (우연한 행운)' },
  { id: '2', term: 'Ephemeral', definition: '수명이 짧은, 덧없는' },
  { id: '3', term: 'Ubiquitous', definition: '어디에나 있는, 아주 흔한' },
];

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Express Server!',
    sharedMessage: testMessage,
  });
});

app.get('/api/words', (req, res) => {
  res.json(mockWords);
});

app.post('/api/words', (req, res) => {
  const { term, definition } = req.body;

  const newWord: Word = {
    id: Date.now().toString(),
    term,
    definition,
  };

  mockWords.push(newWord);

  res.status(201).json(newWord);
});

app.delete('/api/words/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = mockWords.length;

  mockWords = mockWords.filter((word) => word.id !== id);

  if (mockWords.length < initialLength) {
    res.status(200).json({ message: 'The Words was successfully deleted.' });
  } else {
    res.status(404).json({ message: "Can't find the Words." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Shared message: ${testMessage}`);
});
