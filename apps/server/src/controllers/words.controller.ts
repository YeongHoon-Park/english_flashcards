import { wordsService } from '@/services/index.js';
import { Request, Response } from 'express';

export const getWordsHandler = (req: Request, res: Response) => {
  const words = wordsService.getAllWords();

  res.json(words);
};

export const createWordHandler = (req: Request, res: Response) => {
  const { term, definition } = req.body;
  const newWord = wordsService.createWord(term, definition);

  res.status(201).json(newWord);
};

export const deleteWordHandler = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const isDelete = wordsService.deleteWord(id);

  if (isDelete) {
    res.status(200).json({
      message: 'The Words was successfully deleted.',
    });
  } else {
    res.status(404).json({
      message: "Can't find the Words.",
    });
  }
};
