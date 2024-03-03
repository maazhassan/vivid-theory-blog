import { Blog, BlogSearchResult } from "@/types/blog";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getBlogs = async (search: string, page: number, limit: number, content: boolean, exclude: string = ""): Promise<BlogSearchResult> => {
  try {
    const res = await fetch(`${API_URL}/v1/posts?search=${search}&page=${page}&limit=${limit}&exclude=${exclude}${content ? "&content" : ""}`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data");
  }
}

export const getBlog = async (slug: string): Promise<Blog> => {
  try {
    const res = await fetch(`${API_URL}/v1/posts/${slug}`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data");
  }
}

export const deleteBlog = async (slug: string): Promise<void> => {
  try {
    const res = await fetch(`${API_URL}/v1/posts/${slug}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    throw new Error("An error occurred while deleting");
  }
}