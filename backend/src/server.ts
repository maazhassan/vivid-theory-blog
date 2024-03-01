import express from 'express';
import cors from 'cors';
import { sequelize, testDbConnection } from './services/db.js';
import { blog } from './models/blog.model.js';
import { Op } from 'sequelize';

sequelize.sync();
testDbConnection();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/api/v1/posts', async (req, res) => {
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
});

app.get('/api/v1/posts/:slug', async (req, res) => {
  const { slug } = req.params;
  const blogPost = await blog.findOne({ where: { slug } });
  res.json(blogPost);
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`)
});