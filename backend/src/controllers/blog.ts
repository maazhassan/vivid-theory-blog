import { Request, Response } from 'express';
import { blog } from '../models/blog.model.js';
import { Op, ValidationError } from 'sequelize';
import { getSlugFromTitle } from '../utils/slug.js';

export const getPosts = async (req: Request, res: Response) => {
  const search = req.query.search || '';
  const page = req.query.page || 1;
  const limit = req.query.limit || 6;
  const content = req.query.content === "" ? true : false;
  const exclude = req.query.exclude || '';

  const { count, rows } = await blog.findAndCountAll({
    where: {
      title: {
        [Op.iLike]: `%${search}%`,
      },
      slug: {
        [Op.not]: exclude
      }
    },
    order: [['published_at', 'DESC']],
    limit: limit,
    offset: (page - 1) * limit,
    attributes: [
      ...(content ? ['content'] : []), // Only include content if the query parameter is set
      'title', 'slug', 'image', 'published_at'
    ]
  });
  res.json({ blogs: rows, total: count});
};

export const getPost = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const blogPost = await blog.findOne({
    where: { slug },
    attributes: ['title', 'slug', 'content', 'image', 'published_at']
  });
  res.json(blogPost);
};

export const addPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const image = req.file!.filename;

  if (!title || !content || !image) {
    return res.status(400).send('Title, content, and image are required.');
  }

  const slug = await getSlugFromTitle(title);
  const published_at = new Date();

  blog.create({ title, slug, content, image, published_at })
    .then(() => res.sendStatus(201))
    .catch((error: ValidationError) => {
      console.error(error.message);
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(409).send('A post with that slug already exists.');
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