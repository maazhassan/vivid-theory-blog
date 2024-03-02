export interface Blog {
  slug: string;
  title: string;
  content: string;
  published_at: string;
  image?: string;
}

export interface NewBlog {
  title: string;
  content: string;
  image: string;
}

export interface BlogSearchResult {
  blogs: Blog[];
  total: number;
}