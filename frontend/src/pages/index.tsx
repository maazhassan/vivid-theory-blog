import Head from "next/head";
import BlogListItem from "@/components/BlogListItem";
import { getBlogs } from "@/services/api";
import { Blog } from "@/types/blog";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import MoonLoader from "react-spinners/MoonLoader";

export default function BlogSearchPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    searchBlogs("", currentPage);
  }, [currentPage]); // Fetch blogs when the currentPage changes

  const searchBlogs = async (search: string, page: number) => {
    try {
      setLoading(true);
      const { blogs: fetchedBlogs, total } = await getBlogs(search, page, 6, true);
      setBlogs(fetchedBlogs);
      // setLoading(false);
      setTotalPages(Math.ceil(total / 6));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleInputChange = (search: string) => {
    setSearch(search);
  }

  const handleSearch = () => {
    setCurrentPage(1);
    searchBlogs(search, 1);
  }

  return (
    <>
      <Head>
        <title>Blog Search</title>
      </Head>
      <div className="container mx-auto">
        <h1 className="text-4xl font-semibold my-4">Blog Search</h1>
        <SearchBar
          search={search}
          onInputChange={handleInputChange}
          onSearch={handleSearch}
        />
        <div className="flex flex-col justify-center relative">
          {blogs.map((blog) => (
            <BlogListItem key={blog.slug} blog={blog} className="my-1 p-4"/>
          ))}
          <div className="absolute w-fit top-6 right-0 left-0 mx-auto -z-10">
            <MoonLoader color="#000" loading={loading} size={50} />
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
