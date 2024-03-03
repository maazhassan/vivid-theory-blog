import React, { useEffect, useState } from 'react';
import { Blog } from '@/types/blog';
import { getBlog, getBlogs } from '@/services/api';
import MoonLoader from 'react-spinners/MoonLoader';
import BlogListItem from '@/components/BlogListItem';
import { useRouter } from 'next/router';
import DOMPurify from 'dompurify';

const SingleBlogPage: React.FC = () => {
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const { slug } = router.query;
        if (typeof slug === 'string') {
          const [fetchedBlog, fetchedRelatedBlogs] = await Promise.all([
            getBlog(slug),
            getBlogs('', 1, 4, false)
          ]);
          setBlog(fetchedBlog);
          setRelatedBlogs(fetchedRelatedBlogs.blogs);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    }

    fetchBlogData();
  }, [router.query]);

  // Loading state spinner
  if (!blog) {
    return (
      <div className="absolute w-fit top-20 right-0 left-0 mx-auto -z-10">
        <MoonLoader color="#000" loading={true} size={50} />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-2">
      <h1 className="text-2xl font-semibold">{blog.title}</h1>
      <p className="text-gray-600 mb-4">{new Date(blog.published_at).toDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content!) }} className="mb-4"></div>
      {relatedBlogs.length > 0 && (
        <div className="w-fit">
          <h2 className="text-lg font-semibold mb-2">Related Blogs:</h2>
          {relatedBlogs.map((relatedBlog) => (
            <BlogListItem key={relatedBlog.slug} blog={relatedBlog} className="p-2"/>
          ))}
        </div>
      )}
    </div>
  );
}

export default SingleBlogPage;