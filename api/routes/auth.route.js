import express from 'express';
import { signup, signin, all, google, signout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/google',google)
router.get('/signout',signout)
router.get('/all',all)

export default router;