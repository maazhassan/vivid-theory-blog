import { BlogSearchResult } from "@/types/blog";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getBlogs = async (search: string, page: number, limit: number, content: boolean): Promise<BlogSearchResult> => {
  try {
    const res = await fetch(`${API_URL}/v1/posts?search=${search}&page=${page}&limit=${limit}${content ? "&content" : ""}`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data");
  }
}