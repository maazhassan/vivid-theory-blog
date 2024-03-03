import React, { useState } from 'react';
import { createBlog } from '@/services/api';
import { useRouter } from 'next/router';

interface BlogFormProps {
  redirect: string
}

const BlogForm: React.FC<BlogFormProps> = ({ redirect }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: new File([], ''),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0].size > 5242880) {
        alert('File size must be less than 5MB');
        e.target.value = "";
        return;
      }
      const file = e.target.files[0];
      setFormData(prevState => ({
        ...prevState,
        image: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('content', formData.content);
    formDataToSend.append('image', formData.image);
    
    try {
      await createBlog(formDataToSend);
      router.push(redirect);
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          rows={5}
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleFileChange}
          required
          accept="image/*"
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <div className="mt-8">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => router.push(redirect)}
          className="bg-gray-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
