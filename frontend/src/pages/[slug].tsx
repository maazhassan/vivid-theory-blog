import React, { useEffect, useState } from 'react';
import { Blog } from '@/types/blog';
import { getBlog, getBlogs, getImageUrl } from '@/services/api';
import MoonLoader from 'react-spinners/MoonLoader';
import BlogListItem from '@/components/BlogListItem';
import { useRouter } from 'next/router';
import DOMPurify from 'dompurify';
import Image from 'next/image';

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
            getBlogs('', 1, 4, false, slug)
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
    <div className="container mx-auto mt-8 w-1/2">
      <h1 className="text-3xl mb-4 font-semibold">{blog.title}</h1>
      <Image
        src={getImageUrl(blog.image!)}
        alt={blog.title} 
        height={1920} width={1080}
        className="rounded-md w-full mb-2 max-h-[36rem]"
        priority={true}
      />
      <p className="text-gray-600 mb-8">{new Date(blog.published_at).toDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content!) }} className="mb-12" />
      {relatedBlogs.length > 0 && (
        <div className="w-fit mb-8">
          <h2 className="text-lg font-semibold mb-2">Related Blogs:</h2>
          {relatedBlogs.map((relatedBlog) => (
            <BlogListItem key={relatedBlog.slug} blog={relatedBlog} className="p-2"/>
          ))}
        </div>
      )}
      <button
        className="bg-red-500 text-white p-4 rounded-md mb-4 hover:bg-red-600 transition-colors"
        onClick={() => router.push(`/delete/${blog.slug}`)}
      >
        Delete This Blog
      </button>
    </div>
  );
}

export default SingleBlogPage;