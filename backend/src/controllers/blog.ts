import { Request, Response } from 'express';
import { blog } from '../models/blog.model.js';
import { Op } from 'sequelize';

export const getPosts = async (req: Request, res: Response) => {
  const search = req.query.search || '';

  const blogs = await blog.findAll({
    where: {
      title: {
        [Op.iLike]: `%${search}%`
      }
    },
    order: [['published_at', 'ASC']],
    limit: 6,
    attributes: ['title', 'slug', 'image', 'published_at']
  });
  res.json(blogs);
};

export const getPost = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const blogPost = await blog.findOne({ where: { slug } });
  res.json(blogPost);
};