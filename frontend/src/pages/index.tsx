import { Inter } from "next/font/google";
import Head from "next/head";
import BlogListItem from "@/components/BlogListItem";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
    </main>
  );
}
