import { blog } from '../models/blog.model.js';

export const getSlugFromTitle = async (title: string) => {
  const amount = await blog.count({ where: { title } });

  title.toLowerCase().split(' ').join('-');

  if (amount) {
    return `${title}-${amount}`;
  }
  return title;
}