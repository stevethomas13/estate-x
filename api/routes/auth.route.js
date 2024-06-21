import express from 'express';
import { signup, signin, all, google } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/google',google)
router.get('/all',all)

export default router;