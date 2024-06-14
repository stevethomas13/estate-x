import express from 'express';
import { signup, signin } from '../controllers/auth.controller.js';
import { all } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/all',all)

export default router;