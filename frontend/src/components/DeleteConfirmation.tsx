import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getBlog, deleteBlog } from '@/services/api';
import { Blog } from '@/types/blog';
import { MoonLoader } from 'react-spinners';

interface DeleteConfirmationProps {
  redirect: string
  className?: string;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ redirect, className }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const blogData = await getBlog(slug as string); // Fetch the blog data
        setBlog(blogData);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogData();
  }, [slug]);

  const handleDelete = async () => {
    try {
      await deleteBlog(slug as string);
      router.push(redirect); // Redirect to the Blog Search Page after deletion
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleCancel = () => {
    router.push(redirect); // Redirect to the Blog Search Page if deletion is cancelled
  };

  if (!blog) {
    return (
      <div className="absolute w-fit top-20 right-0 left-0 mx-auto -z-10">
        <MoonLoader color="#000" loading={true} size={50} />
      </div>
    );
  }

  return (
    <div className={`container mx-auto w-fit text-center bg-slate-300 p-4 rounded-md ${className}`}>
      <h1 className="text-2xl font-semibold mb-4">Delete Blog</h1>
      <p className="text-gray-700 mb-4">Are you sure you want to delete the blog &quot;{blog.title}&quot;?</p>
      <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 mr-2 rounded-md hover:bg-red-600 transition-colors">Delete</button>
      <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors">Cancel</button>
    </div>
  );
};

export default DeleteConfirmation;
