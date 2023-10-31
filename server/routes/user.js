import { Router } from 'express';
import { userLogin, userSignup, userVerify } from '../controllers/userController.js';

const router = Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/verify', userVerify);

export default router;