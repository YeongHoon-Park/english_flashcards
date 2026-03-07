import { wordsService } from '@/services/index.js';
import { Request, Response } from 'express';

export const getWordsHandler = async (req: Request, res: Response) => {
  const words = await wordsService.getAllWords();

  res.json(words);
};

export const createWordHandler = async (req: Request, res: Response) => {
  const { term, definition } = req.body;
  const newWord = await wordsService.createWord(term, definition);

  res.status(201).json(newWord);
};

export const updateWordHandler = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const { term, definition } = req.body;
  const updatedWord = await wordsService.updateWord(id, term, definition);

  if (updatedWord) {
    res.status(200).json({
      message: 'The Words was successfully updated.',
    });
  } else {
    res.status(404).json({
      message: "Can't find the words.",
    });
  }
};

export const deleteWordHandler = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const isDelete = await wordsService.deleteWord(id);

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
