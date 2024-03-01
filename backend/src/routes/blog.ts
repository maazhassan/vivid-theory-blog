import express from 'express';
import { getPosts, getPost, addPost } from '../controllers/blog.js';

export const blogRouter = express.Router();

blogRouter.get('/posts', getPosts);
blogRouter.get('/posts/:slug', getPost);
blogRouter.post('/posts', addPost);