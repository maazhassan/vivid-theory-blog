import { Inter } from "next/font/google";
import Head from "next/head";
import BlogListItem from "@/components/BlogListItem";
import { getBlogs } from "@/services/api";
import { Blog } from "@/types/blog";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function BlogSearchPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const searchBlogs = async (search: string, page: number, content: boolean) => {
    try {
      const { blogs: fetchedBlogs, total } = await getBlogs(search, page, content);
      setBlogs(fetchedBlogs);
      setTotalPages(Math.ceil(total / 6));
      console.log("Fetched blogs:", fetchedBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <main className={inter.className}>
      <Head>
        <title>Blog Search</title>
      </Head>
      <BlogListItem 
        blog={{
          slug: "my-first-blog",
          title: "My First Blog",
          content: "This is my first blog. I hope you like it!",
          published_at: "2021-08-01"
        }}
      />
      <button onClick={async () => {await searchBlogs("", 1, true)}}>Search</button>
    </main>
  );
}
