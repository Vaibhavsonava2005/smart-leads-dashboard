import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.controller';
import { validate } from '../middleware/validate.middleware';
import { protect } from '../middleware/auth.middleware';
import { registerValidator, loginValidator } from '../validators/auth.validator';

const router = Router();

router.post('/register', validate(registerValidator), register);
router.post('/login', validate(loginValidator), login);
router.get('/me', protect, getMe);

export default router;
