import { Router } from 'express';
import { auth, register } from '../middleware/auth/auth.js';
import { getUser, updateUser, deleteUser } from '../controllers/users/users.js';

const router = Router();

router.use(auth);
router.get('/me', getUser);
router.put('/me', updateUser);
router.delete('/me', deleteUser);

export default router;