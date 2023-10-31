import { Router } from 'express';

import { addMovie, createList, getLists } from '../controllers/listsController.js';

const router = Router();

router.post('/create', createList);
router.get('/', getLists);
router.patch('/:id', addMovie);

export default router;