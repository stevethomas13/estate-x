import express from 'express';
import { signup } from '../controllers/auth.controller.js';
import { all } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup',signup)
router.post('/all',all)

export default router;