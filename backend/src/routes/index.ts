import express from 'express';
import { blogRouter } from './blog.js';

export const router = express.Router();

router.use('/api/v1', blogRouter);