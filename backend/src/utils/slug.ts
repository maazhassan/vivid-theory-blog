import { blog } from '../models/blog.model.js';

export const getSlugFromTitle = async (title: string) => {
  const amount = await blog.count({ where: { title } });

  const slug = title.toLowerCase().split(' ').join('-');

  if (amount) {
    return `${slug}-${amount}`;
  }
  return slug;
}