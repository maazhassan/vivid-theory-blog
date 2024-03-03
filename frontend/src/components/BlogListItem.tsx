import React from 'react';
import Link from 'next/link';
import { Blog } from '@/types/blog';

interface BlogListItemProps {
  blog: Blog;
  className?: string
}

const BlogListItem: React.FC<BlogListItemProps> = ({ blog, className }) => {
  const content = blog.content ? blog.content.substring(0, 100).replace(/(<([^>]+)>)/ig, '') : '';
  const utcDate = new Date(blog.published_at + "T07:00:00Z");
  console.log(utcDate);

  return (
    <div className={`border border-gray-200 rounded-md bg-white ${className}`}>
      <Link href={`/${blog.slug}`}>
        <span className="text-lg font-semibold hover:underline">{blog.title}</span>
      </Link>
      <p className="text-gray-600">{utcDate.toDateString()}</p>
      {
        content &&
        <div className="mt-2">
          <p>{content}...</p> {/* Just a preview of the content */}
        </div>
      }
    </div>
  );
};

export default BlogListItem;