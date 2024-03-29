import React, { useState, useEffect, useRef } from 'react';
import { Blog } from '@/types/blog';
import { getBlogs } from '@/services/api';
import Link from 'next/link';

interface SearchBarProps {
  search: string;
  onInputChange: (search: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, onInputChange, onSearch }) => {
  const [suggestions, setSuggestions] = useState<Blog[]>([]);

  const delayDebounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!search) {
      setSuggestions([]);
      return;
    }

    delayDebounceRef.current = setTimeout(async () => {
      try {
        const { blogs: fetchedBlogs } = await getBlogs(search, 1, 4, false);
        setSuggestions(fetchedBlogs);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }, 300);

    return () => clearTimeout(delayDebounceRef.current);
  }, [search]);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      clearTimeout(delayDebounceRef.current);
      setSuggestions([]);
      onSearch();
    }
  }

  const handleClickSearch = () => {
    clearTimeout(delayDebounceRef.current);
    setSuggestions([]);
    onSearch();
  }

  return (
    <div className="w-1/2 mx-auto relative">
      <div className="flex flex-row justify-center my-4 gap-2">
        <input
          type="text"
          placeholder='Search...'
          value={search}
          onChange={e => onInputChange(e.target.value)}
          className="border border-gray-200 p-4 rounded-md w-full bg-white focus:outline-none"
          onKeyDown={handleEnter}
        />
        <button
          className="bg-blue-500 text-white p-4 rounded-md hover:bg-blue-600 transition-colors"
          onClick={handleClickSearch}
        >
          Search
        </button>
      </div>
      <div className="absolute flex flex-col justify-center w-full top-full z-10">
        {suggestions.map((blog) => (
          <Link href={`/${blog.slug}`} key={blog.slug}>
            <div className="border border-gray-300 shadow p-2 rounded-md bg-white hover:bg-slate-300 hover:cursor-pointer">
              <span className="text-md font-semibold">{blog.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;