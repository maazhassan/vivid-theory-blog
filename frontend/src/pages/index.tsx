import { Inter } from "next/font/google";
import Head from "next/head";
import BlogListItem from "@/components/BlogListItem";
import { getBlogs } from "@/services/api";
import { Blog } from "@/types/blog";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";

const inter = Inter({ subsets: ["latin"] });

export default function BlogSearchPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    searchBlogs("", currentPage, true);
  }, [currentPage]); // Fetch blogs when the currentPage changes

  const searchBlogs = async (search: string, page: number, content: boolean) => {
    try {
      const { blogs: fetchedBlogs, total } = await getBlogs(search, page, content);
      setBlogs(fetchedBlogs);
      setTotalPages(Math.ceil(total / 6));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <main className={inter.className}>
      <Head>
        <title>Blog Search</title>
      </Head>
      <div className="container mx-auto">
        <h1 className="text-4xl font-semibold my-4">Blog Search</h1>
        
        <div className="flex flex-col justify-center">
          {blogs.map((blog) => (
            <BlogListItem key={blog.slug} blog={blog} className="my-2"/>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </main>
  );
}
