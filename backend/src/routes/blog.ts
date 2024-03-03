import express from 'express';
import { getPosts, getPost, addPost, deletePost } from '../controllers/blog.js';
import upload from '../middleware/upload.js';

export const blogRouter = express.Router();

blogRouter.get('/posts', getPosts);
blogRouter.get('/posts/:slug', getPost);
blogRouter.post('/posts', upload.single('image'), addPost);
blogRouter.delete('/posts/:slug', deletePost);