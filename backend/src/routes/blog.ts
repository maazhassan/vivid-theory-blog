import express from 'express';
import { getPosts, getPost, addPost, deletePost } from '../controllers/blog.js';

export const blogRouter = express.Router();

blogRouter.get('/posts', getPosts);
blogRouter.get('/posts/:slug', getPost);
blogRouter.post('/posts', addPost);
blogRouter.delete('/posts/:slug', deletePost);