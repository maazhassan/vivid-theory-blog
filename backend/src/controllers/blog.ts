import { Request, Response } from 'express';
import { blog } from '../models/blog.model.js';
import { Op, ValidationError } from 'sequelize';

export const getPosts = async (req: Request, res: Response) => {
  const search = req.query.search || '';

  const blogs = await blog.findAll({
    where: {
      title: {
        [Op.iLike]: `%${search}%`
      }
    },
    order: [['published_at', 'DESC']],
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

export const addPost = async (req: Request, res: Response) => {
  const { title, content, image } = req.body;

  if (!title || !content || !image) {
    return res.status(400).send('Title, content, and image are required.');
  }

  const slug = title.toLowerCase().split(' ').join('-');
  const published_at = new Date();

  blog.create({ title, slug, content, image, published_at })
    .then(() => res.sendStatus(201))
    .catch((error: ValidationError) => {
      console.error(error.message);
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(409).send('A post with that title already exists.');
      }
      else {
        res.sendStatus(500);
      }
    });
};

export const deletePost = async (req: Request, res: Response) => {
  const { slug } = req.params;
  await blog.destroy({ where: { slug } });
  res.sendStatus(204);
}