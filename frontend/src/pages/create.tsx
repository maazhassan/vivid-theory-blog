import React from 'react';
import BlogForm from '@/components/BlogForm';

const CreateBlogPage: React.FC = () => {
  return (
    <div className="container mx-auto mt-8 w-3/4">
      <h1 className="text-4xl font-semibold mb-8">Create Blog</h1>
      <BlogForm redirect="/" />
    </div>
  );
};

export default CreateBlogPage;