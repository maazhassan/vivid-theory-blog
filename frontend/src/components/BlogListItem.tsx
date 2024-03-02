import React from 'react';
import Link from 'next/link';
import { Blog } from '@/types/blog';

interface BlogListItemProps {
  blog: Blog;
}

const BlogListItem: React.FC<BlogListItemProps> = ({ blog }) => {
  return (
    <div className="border p-4 my-4">
      <Link href={`/${blog.slug}`}>
        <h2 className="text-lg font-semibold hover:underline">{blog.title}</h2>
      </Link>
      <p className="text-gray-600">{new Date(blog.published_at).toDateString()}</p>
      <div className="mt-2">
        <p>{blog.content.substring(0, 100)}...</p> {/* Just a preview of the content */}
      </div>
    </div>
  );
};

export default BlogListItem;