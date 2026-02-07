import express from 'express';
const router = express.Router();
import { register_user, login_user, logout_user, get_current_user } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

// Route for user registration
router.post('/register', register_user); 
// Route for user login
router.post('/login', login_user);
router.post('/logout', logout_user);
router.get('/me', authMiddleware, get_current_user);


export default router;