import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';

const router = Router();

router.post('/login', login);
router.post('/register', register);
// router.post('/logout', logout);
// router.get('/verify', verifyToken);
// router.get('/profile', profile);

export default router;