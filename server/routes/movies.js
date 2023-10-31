import { Router } from 'express';
import { searchMovies, trendingMovies, getMovie } from '../controllers/moviesController.js';

const router = Router()

router.get('/trending', trendingMovies);
router.get('/' , searchMovies);
router.get('/:id', getMovie);

export default router;