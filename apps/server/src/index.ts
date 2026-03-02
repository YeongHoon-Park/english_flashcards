import wordsRouter from '@/routes/words.router.js';
import cors from 'cors';
import express from 'express';

const app = express();
const port = 3001;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api/words', wordsRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
