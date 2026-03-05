import { wordsController } from '@/controllers/index.js';
import { Router } from 'express';

const router: Router = Router();

router.get('/', wordsController.getWordsHandler);
router.post('/', wordsController.createWordHandler);
router.put('/:id', wordsController.updateWordHandler);
router.delete('/:id', wordsController.deleteWordHandler);

export default router;
